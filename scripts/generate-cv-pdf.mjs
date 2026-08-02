#!/usr/bin/env node
/**
 * Rigenera i PDF del CV a partire da public/cv/cv_iacopo.html.
 *
 *   npm run cv:pdf
 *
 * Avvia un server statico temporaneo su public/, stampa la pagina con Chromium
 * headless in A4 e salva un PDF per lingua in public/cv/.
 * Non servono dipendenze npm: solo Node e un binario Chromium/Chrome installato.
 *
 * Il layout di stampa (formato, zoom, selettore di lingua nascosto) vive tutto
 * nel blocco @media print di public/cv/style.css: qui non si duplica nulla.
 */

import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdtemp, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const CV_PAGE = 'cv/cv_iacopo.html';

/** Una voce per ogni PDF da produrre. */
const TARGETS = [
  { lang: 'it', output: 'cv/CV_Iacopo_Libero_Bernabei_IT.pdf' },
  { lang: 'en', output: 'cv/CV_Iacopo_Libero_Bernabei_EN.pdf' },
];

/** Numero di pagine atteso: se cambia, il CV non sta piu' in un foglio. */
const EXPECTED_PAGES = 1;

const CHROMIUM_CANDIDATES = [
  process.env.CHROMIUM_BIN,
  'chromium',
  'chromium-browser',
  'google-chrome-stable',
  'google-chrome',
  'chrome',
].filter(Boolean);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
};

function log(message) {
  process.stdout.write(`${message}\n`);
}

/**
 * La pagina parte sempre in italiano e cambia lingua solo tramite il <select>.
 * Invece di creare varianti del file su disco, iniettiamo al volo la chiamata a
 * translateContent() nella risposta del server per la lingua richiesta.
 */
function injectLanguage(html, lang) {
  if (lang === 'it') return html;

  const snippet =
    `<script>document.addEventListener("DOMContentLoaded",` +
    `function(){translateContent(${JSON.stringify(lang)})});</script>`;

  if (!html.includes('</body>')) {
    throw new Error(`${CV_PAGE}: manca il tag </body>, impossibile forzare la lingua`);
  }
  return html.replace('</body>', `    ${snippet}\n</body>`);
}

/** Server statico minimale su public/, con iniezione della lingua per la pagina CV. */
function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost');
      const relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
      const filePath = path.join(PUBLIC_DIR, relative);

      // Difesa contro path traversal: resta dentro public/
      if (!filePath.startsWith(PUBLIC_DIR + path.sep)) {
        res.writeHead(403).end('Forbidden');
        return;
      }

      let body = await readFile(filePath);
      if (relative === CV_PAGE) {
        body = Buffer.from(injectLanguage(body.toString('utf8'), url.searchParams.get('lang') || 'it'));
      }

      res.writeHead(200, {
        'Content-Type': MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(body);
    } catch (error) {
      const status = error.code === 'ENOENT' ? 404 : 500;
      res.writeHead(status).end(String(error.message));
    }
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    // porta 0 = il sistema ne assegna una libera, niente conflitti con `npm run dev`
    server.listen(0, '127.0.0.1', () => resolve({ server, port: server.address().port }));
  });
}

function run(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
    });
    child.on('error', (error) => resolve({ ok: false, stderr: error.message }));
    child.on('close', (code) => resolve({ ok: code === 0, stderr }));
  });
}

async function resolveChromium() {
  for (const candidate of CHROMIUM_CANDIDATES) {
    const { ok } = await run(candidate, ['--version']);
    if (ok) return candidate;
  }
  throw new Error(
    'Nessun binario Chromium trovato. Installa chromium o google-chrome, ' +
      'oppure indica il percorso con CHROMIUM_BIN=/percorso/al/binario',
  );
}

/** Conta le pagine di un PDF: usa pdfinfo se c'e', altrimenti legge il /Count del catalogo. */
async function countPages(pdfPath) {
  const buffer = await readFile(pdfPath);
  const text = buffer.toString('latin1');

  const counts = [...text.matchAll(/\/Type\s*\/Pages[\s\S]{0,200}?\/Count\s+(\d+)/g)].map((m) =>
    Number(m[1]),
  );
  if (counts.length > 0) return Math.max(...counts);

  const pages = text.match(/\/Type\s*\/Page[^s]/g);
  return pages ? pages.length : null;
}

async function main() {
  const chromium = await resolveChromium();
  log(`Chromium: ${chromium}`);

  const { server, port } = await startServer();
  const profileDir = await mkdtemp(path.join(tmpdir(), 'cv-pdf-'));
  const warnings = [];

  try {
    for (const { lang, output } of TARGETS) {
      const outputPath = path.join(PUBLIC_DIR, output);
      const tempPdf = path.join(profileDir, `${lang}.pdf`);
      const pageUrl = `http://127.0.0.1:${port}/${CV_PAGE}?lang=${lang}`;

      const { ok, stderr } = await run(chromium, [
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--no-pdf-header-footer',
        `--user-data-dir=${profileDir}`,
        '--virtual-time-budget=10000',
        `--print-to-pdf=${tempPdf}`,
        pageUrl,
      ]);

      if (!ok) throw new Error(`Chromium ha fallito la stampa (${lang}):\n${stderr}`);

      await stat(tempPdf); // errore chiaro se il file non e' stato prodotto
      const pages = await countPages(tempPdf);

      if (pages !== null && pages !== EXPECTED_PAGES) {
        warnings.push(
          `${output}: ${pages} pagine invece di ${EXPECTED_PAGES}. ` +
            'Il contenuto e\' cresciuto: accorcia il testo oppure abbassa --print-zoom ' +
            'nel blocco @media print di public/cv/style.css.',
        );
      }

      await writeFile(outputPath, await readFile(tempPdf));
      const { size } = await stat(outputPath);
      log(`  ${output}  ${pages ?? '?'} pag.  ${(size / 1024 / 1024).toFixed(1)} MB`);
    }
  } finally {
    server.close();
    await rm(profileDir, { recursive: true, force: true });
  }

  if (warnings.length > 0) {
    warnings.forEach((warning) => process.stderr.write(`\nATTENZIONE  ${warning}\n`));
    process.exitCode = 1;
    return;
  }

  log('\nPDF rigenerati.');
}

main().catch((error) => {
  process.stderr.write(`\nERRORE  ${error.message}\n`);
  process.exitCode = 1;
});
