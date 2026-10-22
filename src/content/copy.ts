/**
 * TEXTOS EDITORIAIS — CONTEÚDO PROVISÓRIO E CONCEITUAL.
 * Nenhum texto aqui descreve fatos reais da marca (ingredientes, origem,
 * processos ou história). Substitua pelos textos oficiais.
 */
import type { ImageKey } from "../data/images";

export const homeCopy = {
  hero: {
    eyebrow: "Perfumaria inspirada na natureza",
    title: "O perfume do que é essencial",
    subtitle: "Fragrâncias que traduzem paisagens, texturas e silêncios em memórias olfativas.",
    primaryCta: "Descobrir fragrâncias",
    secondaryCta: "Conheça a essência",
    image: "heroBottle" as ImageKey,
    imageAlt: "Frasco de perfume de vidro sobre superfície clara, com luz natural",
  },
  featured: {
    eyebrow: "Coleção em destaque",
    title: "Composições para habitar o dia",
  },
  sensorial: {
    eyebrow: "Experiência sensorial",
    title: "Toda fragrância começa em uma paisagem",
    blocks: [
      {
        image: "leaves" as ImageKey,
        alt: "Folhas verdes iluminadas pelo sol",
        title: "Matérias-primas",
        text: "Folhas, cascas, flores e madeiras: um vocabulário natural que inspira cada composição.",
      },
      {
        image: "stones" as ImageKey,
        alt: "Seixos lisos em tons de cinza e areia",
        title: "Texturas",
        text: "O frio da pedra, o calor da madeira, a maciez de uma pétala — sensações que também se sentem pelo olfato.",
      },
      {
        image: "handDropper" as ImageKey,
        alt: "Mãos segurando um pequeno frasco âmbar com conta-gotas",
        title: "Tempo",
        text: "Uma fragrância se transforma na pele ao longo das horas, revelando camadas aos poucos.",
      },
    ],
  },
  discovery: {
    eyebrow: "Famílias olfativas",
    title: "Encontre a sua nota",
  },
};

export const aboutCopy = {
  hero: { image: "aboutHero" as ImageKey, alt: "Ramos de eucalipto sobre fundo claro" },
  eyebrow: "Sobre",
  title: "Uma perfumaria guiada pelos sentidos",
  intro:
    "Acreditamos que uma fragrância é uma forma de atenção: ao entorno, ao tempo e ao próprio corpo. Este espaço apresenta o universo da marca de maneira conceitual.",
  sections: [
    {
      title: "Natureza como linguagem",
      text: "Paisagens, estações e materiais naturais inspiram composições que buscam equilíbrio entre frescor, calor e profundidade.",
      image: "leaf" as ImageKey,
      alt: "Detalhe de uma folha verde",
    },
    {
      title: "Menos, porém melhor",
      text: "Frascos simples, rótulos discretos e fragrâncias pensadas para acompanhar a rotina — sem excessos.",
      image: "bottleDropperPlinth" as ImageKey,
      alt: "Frasco âmbar minimalista sobre base clara, com sombras de folhas",
    },
    {
      title: "Uma experiência para descobrir",
      text: "Cada fragrância convida a uma pausa: aplicar, respirar e perceber como ela muda ao longo do dia.",
      image: "wood" as ImageKey,
      alt: "Textura de madeira natural",
    },
  ],
  note: "Texto conceitual provisório. A história, os valores e os compromissos oficiais da marca serão inseridos aqui.",
};
