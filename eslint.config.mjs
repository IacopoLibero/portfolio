import next from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Flat config di ESLint (sostituisce .eslintrc.json).
 *
 * Il comando `next lint` e' stato rimosso in Next 16: si invoca ESLint
 * direttamente e la configurazione di Next arriva da eslint-config-next,
 * che dalla 16 esporta gia' array in formato flat.
 */
export default [
  {
    ignores: [
      ".next/**",
      "out/**",
      "node_modules/**",
      // Progetti demo statici e asset di terze parti: non sono codice sorgente
      // dell'applicazione e produrrebbero solo rumore.
      "public/**",
    ],
  },
  ...next,
  ...nextTypescript,
  {
    // src/once-ui e' la libreria di componenti che arriva col template Once UI,
    // non codice scritto per questo progetto. Le sue segnalazioni restano visibili
    // ma non bloccano il lint: correggerle significherebbe divergere dall'upstream.
    // Rimuovere questo blocco se la libreria viene adottata come codice proprio.
    name: "once-ui/vendored",
    files: ["src/once-ui/**"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/refs": "warn",
    },
  },
];
