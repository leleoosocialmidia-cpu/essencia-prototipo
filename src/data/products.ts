/**
 * CATÁLOGO — DADOS DEMONSTRATIVOS.
 * Nomes, preços, volumes, notas e estoques são fictícios e não representam
 * produtos reais. Edite apenas este arquivo para alterar o catálogo.
 * Preços em CENTAVOS (18990 = R$ 189,90).
 */
import { images, type ImageKey } from "./images";

export type FamilyId = "amadeirada" | "citrica" | "floral" | "oriental";

export interface Family {
  id: FamilyId;
  name: string;
  description: string;
  image: ImageKey;
}

/** Famílias olfativas (exemplos editáveis). */
export const families: Family[] = [
  {
    id: "amadeirada",
    name: "Amadeiradas",
    description: "Secas, quentes e envolventes, como madeira ao fim da tarde.",
    image: "wood",
  },
  {
    id: "citrica",
    name: "Cítricas",
    description: "Luminosas e frescas, com a vivacidade de cascas recém-abertas.",
    image: "citrus",
  },
  {
    id: "floral",
    name: "Florais",
    description: "Delicadas e expansivas, entre pétalas e folhas úmidas.",
    image: "driedBouquet",
  },
  {
    id: "oriental",
    name: "Orientais",
    description: "Densas e acolhedoras, com especiarias e resinas.",
    image: "spices",
  },
];

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  priceCents: number;
  volumeMl: number;
  family: FamilyId;
  notes: { top: string[]; heart: string[]; base: string[] };
  images: ImageKey[];
  stock: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "p01",
    slug: "brisa-botanica",
    name: "Brisa Botânica",
    shortDescription: "Verde e aéreo, como folhas ao vento da manhã.",
    description:
      "Uma composição leve que evoca jardins abertos e o frescor das primeiras horas do dia. Pensada para o uso diário, com uma trilha discreta e luminosa.",
    priceCents: 18990,
    volumeMl: 50,
    family: "citrica",
    notes: { top: ["Bergamota", "Folha de figo"], heart: ["Chá verde", "Neroli"], base: ["Almíscar branco"] },
    images: ["bottleSquareClear", "leaves", "citrus"],
    stock: 12,
    featured: true,
  },
  {
    id: "p02",
    slug: "terra-serena",
    name: "Terra Serena",
    shortDescription: "Amadeirado e terroso, calmo como o chão da floresta.",
    description:
      "Uma fragrância de presença tranquila, que remete à terra úmida e a madeiras secas. Encorpada sem ser pesada, ideal para fins de tarde.",
    priceCents: 22990,
    volumeMl: 50,
    family: "amadeirada",
    notes: { top: ["Cardamomo"], heart: ["Vetiver", "Cedro"], base: ["Sândalo", "Musgo"] },
    images: ["bottleDropperShadow", "wood", "bottleDropperPlinth"],
    stock: 8,
    featured: true,
  },
  {
    id: "p03",
    slug: "jardim-silvestre",
    name: "Jardim Silvestre",
    shortDescription: "Floral verde, entre pétalas e caules recém-colhidos.",
    description:
      "Flores do campo e folhagens compõem um buquê natural e despretensioso. Uma fragrância delicada, com frescor vegetal.",
    priceCents: 19990,
    volumeMl: 50,
    family: "floral",
    notes: { top: ["Pera", "Folhas verdes"], heart: ["Jasmim", "Rosa"], base: ["Âmbar suave"] },
    images: ["bottleOnStoneOutdoor", "driedFlowers", "bottleDropperTall"],
    stock: 5,
    featured: true,
  },
  {
    id: "p04",
    slug: "ambar-do-entardecer",
    name: "Âmbar do Entardecer",
    shortDescription: "Quente e resinoso, com especiarias douradas.",
    description:
      "Uma fragrância envolvente que mistura resinas e especiarias em um acorde dourado. Indicada para noites e estações mais frias.",
    priceCents: 26990,
    volumeMl: 75,
    family: "oriental",
    notes: { top: ["Pimenta rosa"], heart: ["Canela", "Benjoim"], base: ["Baunilha", "Âmbar"] },
    images: ["bottleAmberSquare", "bottleAmberSide", "spices"],
    stock: 3,
    featured: true,
  },
  {
    id: "p05",
    slug: "pedra-e-sal",
    name: "Pedra & Sal",
    shortDescription: "Mineral e limpo, como rochas tocadas pelo mar.",
    description:
      "Notas minerais e salinas criam uma sensação de pele limpa após um mergulho. Uma assinatura fresca e minimalista.",
    priceCents: 17990,
    volumeMl: 30,
    family: "citrica",
    notes: { top: ["Limão", "Sal marinho"], heart: ["Alecrim"], base: ["Madeira flutuante"] },
    images: ["bottleWithPebbles", "stones", "dunes"],
    stock: 15,
  },
  {
    id: "p06",
    slug: "musgo-e-cedro",
    name: "Musgo & Cedro",
    shortDescription: "Sombra verde e madeira, profundo e sereno.",
    description:
      "Inspirada em trilhas sombreadas, combina musgo e cedro em uma fragrância profunda e silenciosa.",
    priceCents: 24990,
    volumeMl: 100,
    family: "amadeirada",
    notes: { top: ["Gálbano"], heart: ["Musgo de carvalho", "Cipreste"], base: ["Cedro", "Patchouli"] },
    images: ["bottleRoundSilk", "leaf"],
    stock: 0, // demonstra o estado "indisponível"
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getFamily = (id: FamilyId) => families.find((f) => f.id === id)!;
/** URL da imagem; `width` reduz a resolução quando a origem aceita o parâmetro `w=` (Unsplash). */
export const imageUrl = (key: ImageKey, width?: number) => (width ? images[key].replace(/w=\d+/, `w=${width}`) : images[key]);
