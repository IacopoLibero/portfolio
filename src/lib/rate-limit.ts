/**
 * Rate limiting per IP, in memoria.
 *
 * Nota sul serverless: su Vercel ogni istanza lambda ha la propria memoria, quindi
 * il contatore non e' condiviso fra istanze e in caso di scale-out il limite
 * effettivo si moltiplica per il numero di istanze attive. E' comunque sufficiente
 * a fermare l'abuso automatizzato da un singolo IP, che e' lo scenario realistico
 * per un form di contatto. Per un limite rigoroso serve uno store esterno (Redis).
 */

interface Bucket {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Secondi da attendere prima del prossimo tentativo (0 se consentito). */
  retryAfter: number;
}

export interface RateLimitOptions {
  /** Identificatore del limite, per non far collidere endpoint diversi. */
  name: string;
  /** Numero massimo di richieste consentite nella finestra. */
  limit: number;
  /** Ampiezza della finestra in millisecondi. */
  windowMs: number;
}

const buckets = new Map<string, Bucket>();

/** Oltre questa soglia si fa pulizia, cosi' la mappa non cresce all'infinito. */
const MAX_TRACKED_KEYS = 10_000;

function evictExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

/**
 * Estrae l'IP del client dagli header del proxy.
 *
 * Su Vercel `x-forwarded-for` e' impostato dalla piattaforma e il primo elemento
 * e' l'IP reale del client. In locale, dove nessun proxy scrive quell'header,
 * si ricade su un valore fisso: il limite diventa globale, il che va bene in dev.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function rateLimit(identifier: string, options: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const key = `${options.name}:${identifier}`;

  if (buckets.size > MAX_TRACKED_KEYS) {
    evictExpired(now);
  }

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (bucket.count >= options.limit) {
    return { allowed: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfter: 0 };
}