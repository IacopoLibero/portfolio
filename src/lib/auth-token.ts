import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Token di sessione firmato per le pagine protette da password.
 *
 * Sostituisce il precedente cookie dal valore statico "authenticated", che
 * chiunque poteva rimandare al server per superare il controllo: il flag
 * httpOnly impedisce a JavaScript di leggere un cookie, non a un client di
 * inviarlo. Qui il valore e' firmato in HMAC e ha una scadenza verificata
 * lato server, quindi non e' forgiabile senza conoscere il segreto.
 *
 * Formato: "<scadenzaEpochMs>.<firmaBase64Url>"
 */

export const AUTH_COOKIE_NAME = "authToken";
export const SESSION_DURATION_MS = 60 * 60 * 1000; // un'ora, come il maxAge precedente

/**
 * Segreto di firma. Si preferisce AUTH_SECRET; in sua assenza si deriva dalla
 * password d'accesso, cosi' la protezione funziona senza nuova configurazione.
 * Cambiare la password invalida i token gia' emessi, che e' il comportamento atteso.
 */
function getSigningSecret(): string | null {
  const explicit = process.env.AUTH_SECRET;
  if (explicit && explicit.length > 0) return explicit;

  const password = process.env.PAGE_ACCESS_PASSWORD;
  if (password && password.length > 0) return `derived-from-password:${password}`;

  return null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

/** Confronto a tempo costante, per non far trapelare la firma un byte alla volta. */
function safeEquals(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  if (bufferA.length !== bufferB.length) return false;
  return timingSafeEqual(bufferA, bufferB);
}

export function createAuthToken(now: number = Date.now()): string | null {
  const secret = getSigningSecret();
  if (!secret) return null;

  const expiresAt = String(now + SESSION_DURATION_MS);
  return `${expiresAt}.${sign(expiresAt, secret)}`;
}

export function verifyAuthToken(token: string | undefined, now: number = Date.now()): boolean {
  if (!token) return false;

  const secret = getSigningSecret();
  if (!secret) return false;

  const separator = token.indexOf(".");
  if (separator <= 0) return false;

  const expiresAt = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  if (!safeEquals(signature, sign(expiresAt, secret))) return false;

  const expiry = Number(expiresAt);
  return Number.isFinite(expiry) && expiry > now;
}

/** Confronto a tempo costante fra la password ricevuta e quella configurata. */
export function passwordMatches(candidate: unknown, expected: string): boolean {
  if (typeof candidate !== "string") return false;
  return safeEquals(candidate, expected);
}
