// Pós-build: copia dist/index.html para cada rota conhecida (e para 404.html), para que hosts
// estáticos sem regra de rewrite (ex.: Render criado via API) respondam 200 ao recarregar /produtos etc.
// shortcut: rotas de produto vêm dos slugs em products.ts; com catálogo vindo de API, troque por uma regra de rewrite no host.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";

const dist = new URL("../dist/", import.meta.url);
const slugs = [...readFileSync(new URL("../src/data/products.ts", import.meta.url), "utf8").matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
const routes = ["produtos", "carrinho", "checkout", "sobre", "politicas", ...slugs.map((s) => `produto/${s}`)];

const index = new URL("index.html", dist);
for (const route of routes) {
  mkdirSync(new URL(`${route}/`, dist), { recursive: true });
  copyFileSync(index, new URL(`${route}/index.html`, dist));
}
copyFileSync(index, new URL("404.html", dist));
console.log(`spa-routes: ${routes.length} rotas + 404.html`);
