/**
 * Banco central de imagens — CONTEÚDO PROVISÓRIO.
 *
 * Fotografias do Unsplash (licença Unsplash: uso gratuito, inclusive comercial),
 * escolhidas por não exibirem marcas ou rótulos de perfumes reais.
 * Para usar as fotos oficiais, coloque os arquivos em `public/images/`
 * e troque a URL pela rota local, ex.:  heroBottle: "/images/hero.jpg"
 *
 * Se uma URL externa deixar de responder, <SmartImage /> mostra um painel
 * neutro na paleta da marca. Verifique as URLs com `npm run check-images`.
 */
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

export const images = {
  // Destaques editoriais
  heroBottle: unsplash("photo-1705899844877-81bb0a0665c1", 1600), // frasco com rótulo em branco sobre pedra
  aboutHero: unsplash("photo-1611255550543-b5ecb01dfddc", 1800), // eucalipto

  // Frascos (sem marca)
  bottleSquareClear: unsplash("photo-1720423514789-15a33e59fc81"),
  bottleDropperShadow: unsplash("photo-1608571424266-edeb9bbefdec"),
  bottleOnStoneOutdoor: unsplash("photo-1594125311687-3b1b3eafa9f4"),
  bottleAmberSquare: unsplash("photo-1638295916768-459f6cf440bc"),
  bottleWithPebbles: unsplash("photo-1705899853374-d91c048b81d2"),
  bottleRoundSilk: unsplash("photo-1733660227163-01bc46e0d7d7"),
  bottleAmberSide: unsplash("photo-1733660227168-444e3c751a1e"),
  bottleDropperPlinth: unsplash("photo-1608571424237-381e6b43a2a7"),
  bottleDropperSmall: unsplash("photo-1608571424634-58ae03e6edcf"),
  bottleDropperLabel: unsplash("photo-1781344116880-029945a42b75"),
  bottleDropperTall: unsplash("photo-1608571702600-5a5419d31475"),
  handDropper: unsplash("photo-1515377905703-c4788e51af15"),

  // Natureza e texturas
  leaves: unsplash("photo-1501004318641-b39e6451bec6"),
  leaf: unsplash("photo-1518531933037-91b2f5f229cc"),
  eucalyptus: unsplash("photo-1780599895004-0112e637e243"),
  driedFlowers: unsplash("photo-1619422305894-dd096b3e6b98"),
  driedBouquet: unsplash("photo-1610790953079-aca4bf5a04b0"),
  citrus: unsplash("photo-1582287104445-6754664dbdb2"),
  wood: unsplash("photo-1611600700192-d87eaeed4f81"),
  stones: unsplash("photo-1622032064271-d14f21cffe84"),
  dunes: unsplash("photo-1488197047962-b48492212cda"),
  spices: unsplash("photo-1506368249639-73a05d6f6488"),
} as const;

export type ImageKey = keyof typeof images;
