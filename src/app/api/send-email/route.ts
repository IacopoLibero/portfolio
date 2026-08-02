import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getClientIp, rateLimit } from '@/lib/rate-limit';

// Configurazione SMTP (Zoho Mail per il dominio iacopolibero.dev).
// Host e porta sono sovrascrivibili via env per cambiare provider senza toccare il codice.
const SMTP_HOST = process.env.EMAIL_HOST || 'smtp.zoho.eu';
const SMTP_PORT = Number(process.env.EMAIL_PORT || 465);

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/** Massimo 3 invii ogni 15 minuti dallo stesso IP. */
const RATE_LIMIT = {
  name: 'send-email',
  limit: 3,
  windowMs: 15 * 60 * 1000
} as const;

/** Tetto sul corpo grezzo della richiesta, prima ancora del parsing JSON. */
const MAX_BODY_BYTES = 64 * 1024;

/** Lunghezze massime per campo: oltre non e' un messaggio, e' un abuso. */
const FIELD_LIMITS = {
  firstName: 100,
  lastName: 100,
  email: 254, // massimo previsto dalla RFC 5321
  phone: 40,
  message: 5000
} as const;

// Funzione per validare l'email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/** Accetta solo stringhe entro il limite: qualsiasi altro tipo diventa null. */
function readField(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= max ? trimmed : null;
}

export async function POST(request: NextRequest) {
  try {
    const { allowed, retryAfter } = rateLimit(getClientIp(request), RATE_LIMIT);
    if (!allowed) {
      return NextResponse.json(
        { error: "Hai inviato troppi messaggi. Riprova più tardi." },
        { status: 429, headers: { 'Retry-After': String(retryAfter) } }
      );
    }

    // Il corpo viene letto come testo per poterne misurare la dimensione
    // prima di costruire in memoria l'oggetto JSON corrispondente.
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { error: "Il messaggio è troppo lungo" },
        { status: 413 }
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
    }

    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
    }

    const payload = body as Record<string, unknown>;
    const firstName = readField(payload.firstName, FIELD_LIMITS.firstName);
    const lastName = readField(payload.lastName, FIELD_LIMITS.lastName);
    const email = readField(payload.email, FIELD_LIMITS.email);
    const message = readField(payload.message, FIELD_LIMITS.message);
    const phone = readField(payload.phone, FIELD_LIMITS.phone);

    // Validazione dei campi obbligatori
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Tutti i campi obbligatori devono essere compilati" },
        { status: 400 }
      );
    }

    // Validazione dell'email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Indirizzo email non valido" },
        { status: 400 }
      );
    }

    // Verifica che le credenziali email siano configurate
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error('Credenziali email mancanti. Controlla le variabili d\'ambiente.');
      return NextResponse.json(
        { error: "Configurazione del server email non completa. Contatta l'amministratore." },
        { status: 500 }
      );
    }

    // Opzioni email
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Nuovo messaggio da ${firstName} ${lastName}`,
      html: `
        <h2>Hai ricevuto un nuovo messaggio dal tuo sito portfolio</h2>
        <p><strong>Nome:</strong> ${escapeHtml(firstName)}</p>
        <p><strong>Cognome:</strong> ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefono:</strong> ${escapeHtml(phone || 'Non specificato')}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `
    };

    // Invio email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Errore nell\'invio dell\'email:', error);
    return NextResponse.json(
      { error: "Si è verificato un errore durante l'invio dell'email" },
      { status: 500 }
    );
  }
}
