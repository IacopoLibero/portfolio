import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configurazione per inviare le email tramite credenziali da GitHub Secrets
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Funzione per validare l'email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body;
    
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
        <p><strong>Nome:</strong> ${firstName}</p>
        <p><strong>Cognome:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefono:</strong> ${phone || 'Non specificato'}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
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