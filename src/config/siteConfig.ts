/**
 * CONFIGURAÇÃO DO SITE — tudo aqui é PROVISÓRIO.
 * Substitua pelos dados oficiais da marca. Nenhum valor abaixo é real.
 */
export const siteConfig = {
  /** Nome provisório exibido como logotipo textual. */
  brandName: "ESSÊNCIA",
  tagline: "Fragrâncias inspiradas na natureza",
  description:
    "Fragrâncias inspiradas na natureza, em frascos minimalistas. Protótipo de loja — conteúdo demonstrativo.",

  /** Links externos (placeholders). Troque pelo perfil e contato oficiais. */
  instagramUrl: "https://www.instagram.com/",
  instagramHandle: "@suamarca",
  contactEmail: "contato@example.com",

  /** Informações legais/comerciais — preencher antes de publicar. */
  legal: {
    companyName: "[Razão social a definir]",
    cnpj: "[CNPJ a definir]",
    address: "[Endereço a definir]",
  },

  /** Valor (em centavos) acima do qual o frete padrão demonstrativo é grátis. */
  freeShippingThresholdCents: 39900,

  /** Quantidade máxima por item quando o estoque é maior. */
  maxPerItem: 10,
} as const;
