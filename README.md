# ESSÊNCIA — protótipo de e-commerce de fragrâncias

Protótipo funcional de loja virtual para uma marca de perfumaria natural.
**“ESSÊNCIA” é um nome provisório.** Produtos, preços, textos, links e dados legais são demonstrativos.

## Como executar

Requisitos: Node.js 20+ (testado com Node 24).

```bash
npm install        # instala as dependências
npm run dev        # servidor local em http://localhost:5173
npm run build      # checagem de tipos + build de produção em dist/
npm run preview    # serve o build de produção localmente
npm test           # testes unitários (carrinho, catálogo, validações)
npm run check-images  # confere se todas as URLs de imagem respondem
```

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · React Router 7 · Lucide React · Context API + LocalStorage (carrinho) · Vitest.

## Rotas

| Rota | Página |
|---|---|
| `/` | Início (hero, destaques, seção sensorial, famílias olfativas) |
| `/produtos` | Catálogo / landing page para o link da bio do Instagram |
| `/produto/:slug` | Página do produto |
| `/carrinho` | Sacola |
| `/checkout` | Checkout demonstrativo em 3 etapas |
| `/sobre` | Página editorial da marca |
| `/politicas` | Envio, trocas e privacidade (textos provisórios) |
| qualquer outra | Página 404 |

Filtros do catálogo ficam na URL (`/produtos?familia=citrica&ordem=preco-asc&q=brisa`), então sobrevivem a recarregar a página e podem ser usados em links de campanhas ou stories.

## Estrutura

```
src/
  config/siteConfig.ts   nome da marca, Instagram, e-mail, dados legais, frete grátis
  styles/theme.css       paleta de cores, fontes e raio dos cantos (tokens do Tailwind)
  data/products.ts       produtos e famílias olfativas
  data/images.ts         todas as URLs de imagens em um só lugar
  content/copy.ts        textos editoriais da Início e da Sobre
  services/checkout.ts   frete, formas de pagamento e envio do pedido (pontos de integração)
  context/CartContext.tsx  estado global do carrinho + persistência
  lib/                   carrinho, catálogo, dinheiro, validações (+ testes)
  components/            Header, Footer, ProductCard, SmartImage, QuantitySelector, Field, Toast…
  pages/                 uma página por rota
```

## Como personalizar

| O que trocar | Onde |
|---|---|
| Nome da marca, slogan, Instagram, e-mail, CNPJ, endereço | `src/config/siteConfig.ts` |
| Logotipo | `src/components/Header.tsx` (trocar o texto do `<Link>` por um `<img>`) e `public/favicon.svg` |
| Cores, fontes e cantos | `src/styles/theme.css` (e o `<link>` do Google Fonts em `index.html`) |
| Fotografias | coloque os arquivos em `public/images/` e aponte as chaves em `src/data/images.ts` para `/images/arquivo.jpg` |
| Produtos (nome, preço, volume, notas, estoque, destaque, imagens) | `src/data/products.ts` — preços em centavos (`18990` = R$ 189,90) |
| Famílias olfativas | `families` em `src/data/products.ts` |
| Textos da Início e da Sobre | `src/content/copy.ts` |
| Políticas | `src/pages/Policies.tsx` |
| Título/descrição para compartilhamento | `index.html` (padrões) e `usePageMeta` em cada página |

## Decisões tomadas

- **Paleta**: off-white (`ivory`), creme, areia, sálvia, oliva (cor de ação) e marrom-terra; texto em tom quase preto quente. Contraste dos textos dentro do nível AA.
- **Tipografia**: Cormorant Garamond (títulos) + Jost (textos).
- **Valores monetários** sempre em centavos inteiros; formatação com `Intl.NumberFormat("pt-BR")`.
- **Estoque**: quantidade por item limitada ao estoque e a `maxPerItem` (10). “Musgo & Cedro” tem estoque zero para demonstrar o estado indisponível.
- **Carrinho** salvo em `localStorage` (chave `essencia:cart:v1`), sincronizado entre abas; dados corrompidos são ignorados.
- **Imagens**: fotos do Unsplash escolhidas por não exibirem marcas ou rótulos reais. Se alguma URL cair, `SmartImage` mostra um painel neutro na paleta da marca.
- **Instagram**: `/produtos` mostra os produtos logo no início, com busca, filtros, preço e botão “Adicionar” no próprio card; no celular aparece um atalho fixo “Ver sacola” assim que há itens.
- **Hospedagem SPA**: `public/_redirects` (Netlify) e `vercel.json` (Vercel) já redirecionam todas as rotas para `index.html`. Para hosts sem regra de rewrite (como o Render), `scripts/spa-routes.mjs` roda após o build e cria uma cópia de `index.html` para cada rota e produto, além de `404.html`. Ao adicionar produtos, basta rodar o build de novo.

## Publicação (Render)

O site está publicado como *Static Site* no Render, ligado à branch `main` deste repositório, com deploy automático a cada push.
Build: `npm ci && npm run build` · Diretório publicado: `dist`.

## O que é apenas demonstrativo

- Produtos, preços, notas olfativas, estoque e imagens.
- Opções de frete e prazos (`getShippingOptions`).
- Formas de pagamento: nenhuma cobrança acontece e **nenhum dado de cartão é solicitado**.
- `submitOrder` não envia nada; apenas gera um código fictício e mostra a tela “Pedido de demonstração”.
- Links de Instagram/e-mail, dados legais e textos de políticas.

## O que falta para virar uma loja real

1. **Backend / plataforma de pedidos** (ou uma plataforma headless) para criar pedidos, controlar estoque real e emitir notificações por e-mail.
2. **Pagamento** com provedor confiável (Pix, cartão, boleto) usando o checkout/SDK do próprio provedor; chaves secretas somente no servidor. Ponto de integração: `submitOrder` em `src/services/checkout.ts`.
3. **Frete** via API (Correios, Melhor Envio, transportadora) e preenchimento de endereço por CEP. Ponto de integração: `getShippingOptions`.
4. **Catálogo gerenciável** (CMS ou painel administrativo) no lugar de `products.ts`.
5. **Conteúdo oficial**: nome, logotipo, fotografias, textos, preços.
6. **Jurídico**: CNPJ, endereço, políticas de privacidade (LGPD), trocas e devoluções (CDC), termos de uso e banner de cookies, se houver rastreamento.
7. **Operação**: domínio, hospedagem, HTTPS, analytics, pixel/catálogo do Instagram (se desejado), e-mail transacional.
8. **SEO avançado**: pré-renderização/SSR das páginas de produto, sitemap e dados estruturados (`Product`).
