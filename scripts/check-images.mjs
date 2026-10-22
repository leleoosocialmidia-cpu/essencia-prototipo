// Verifica se todas as URLs de imagem declaradas em src/data/images.ts respondem (status 200).
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/data/images.ts", import.meta.url), "utf8");
const ids = source.match(/photo-[\w-]+/g) ?? [];
const locals = source.match(/"\/images\/[^"]+"/g) ?? [];
if (locals.length) console.log("imagens locais (não verificadas aqui):", locals.join(", "));
const urls = [...new Set(ids)].map((id) => `https://images.unsplash.com/${id}?w=200&q=50`);

let failed = 0;
await Promise.all(
  urls.map(async (url) => {
    try {
      const res = await fetch(url, { method: "GET" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      console.log("ok  ", url);
    } catch (err) {
      failed++;
      console.log("FAIL", url, String(err));
    }
  }),
);
console.log(`\n${urls.length - failed}/${urls.length} imagens disponíveis`);
process.exit(failed ? 1 : 0);
