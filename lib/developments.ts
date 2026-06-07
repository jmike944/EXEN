import type { CategoryKey } from "./categories";
import { DEV_OPTIONS } from "./dev-options";

export type AmenityKey =
  | "lake"
  | "clubhouse"
  | "grill"
  | "playground"
  | "trees"
  | "gate"
  | "road"
  | "sun"
  | "pool"
  | "gym"
  | "elevator"
  | "shop"
  | "garden"
  | "building"
  | "dog"
  | "shield"
  | "bolt"
  | "water"
  | "trend";

export type Fact = { n: string; l: string };
export type Amenity = { i: AmenityKey; t: string };
export type Distance = { p: string; t: string };

export type Dev = {
  slug: string;
  name: string;
  cat: CategoryKey;
  status: string;
  tagline: string;
  location: string;
  short: string;
  overview: string[];
  facts: Fact[] | null;
  cardFacts: string[];
  amenities: Amenity[];
  distances: Distance[];
  map: string;
  ig: string;
  image: string;
  gallery: string[];
};

export const DEVS: Dev[] = [
  {
    slug: "ronsesvalles",
    name: "Ronsesvalles",
    cat: "campestre",
    status: "En venta",
    tagline: "Lotes campestres frente al lago",
    location: "Los Lirios, Coahuila",
    short:
      "Fraccionamiento residencial de lotes campestres con lago artificial y casa club, rodeado de naturaleza.",
    overview: [
      "Ronsesvalles es un fraccionamiento residencial de lotes campestres ubicado en Los Lirios, Coahuila — un refugio natural pensado para construir la casa de campo de tu familia y disfrutar de fines de semana al aire libre.",
      "Con 38 lotes desde 2,000 m², amplias áreas verdes y amenidades diseñadas para la convivencia, Ronsesvalles ofrece el equilibrio perfecto entre privacidad, naturaleza y cercanía a la ciudad.",
    ],
    facts: [
      { n: "38", l: "Lotes disponibles" },
      { n: "2,000 m²", l: "Superficie desde" },
      { n: "32 min", l: "desde Arteaga" },
      { n: "40 min", l: "desde Saltillo" },
    ],
    cardFacts: ["38 lotes", "Desde 2,000 m²", "Casa club"],
    amenities: [
      { i: "lake", t: "Lago artificial" },
      { i: "clubhouse", t: "Casa club" },
      { i: "grill", t: "Palapas con asador" },
      { i: "playground", t: "Áreas de juego infantiles" },
      { i: "trees", t: "Amplias áreas verdes" },
      { i: "gate", t: "Acceso controlado" },
      { i: "road", t: "Calles urbanizadas" },
      { i: "sun", t: "Senderos campestres" },
    ],
    distances: [
      { p: "Arteaga, Coah.", t: "32 min" },
      { p: "Saltillo, Coah.", t: "40 min" },
      { p: "Los Lirios (centro)", t: "8 min" },
    ],
    map: "Los Lirios, Arteaga, Coahuila",
    ig: "@ronsesvalles.campestre",
    image: "/photos/ronsesvalles-hero-v2.png",
    gallery: [
      "/photos/ronsesvalles-4.jpg",
      "/photos/ronsesvalles-5.jpg",
      "/photos/ronsesvalles-6.png",
      "/photos/ronsesvalles-new-01.png",
      "/photos/ronsesvalles-new-02.png",
      "/photos/ronsesvalles-new-03.png",
      "/photos/ronsesvalles-new-04.png",
    ],
  },
  {
    slug: "aura-place",
    name: "Aura Place",
    cat: "vertical",
    status: "Preventa",
    tagline: "Vida vertical con plaza comercial",
    location: "Saltillo, Coahuila",
    short:
      "Desarrollo vertical de 87 departamentos en torres de 6 y 10 niveles, con amenidades y locales comerciales.",
    overview: [
      "Aura Place es un desarrollo vertical que redefine la vida urbana en Saltillo. Sus torres de 6 y 10 niveles albergan 87 departamentos diseñados para quienes buscan comodidad, ubicación y plusvalía.",
      "Con amenidades de primer nivel y locales comerciales en renta en planta baja, Aura Place integra hogar, servicios y comunidad en un mismo lugar.",
    ],
    facts: [
      { n: "87", l: "Departamentos" },
      { n: "6 y 10", l: "Niveles" },
      { n: "2", l: "Torres" },
      { n: "PB", l: "Locales comerciales" },
    ],
    cardFacts: ["87 deptos", "6 y 10 niveles", "Plaza comercial"],
    amenities: [
      { i: "pool", t: "Alberca" },
      { i: "gym", t: "Gimnasio" },
      { i: "elevator", t: "Elevador" },
      { i: "shop", t: "Locales comerciales" },
      { i: "gate", t: "Acceso controlado 24/7" },
      { i: "garden", t: "Roof garden" },
      { i: "building", t: "Lobby de recepción" },
      { i: "dog", t: "Pet friendly" },
    ],
    distances: [
      { p: "Norte de Saltillo", t: "a solicitud" },
      { p: "Ubicación Privilegiada", t: "a solicitud" },
    ],
    map: "Saltillo, Coahuila",
    ig: "@sagondesarrollos",
    image: "/photos/aura-place-hero.png",
    gallery: [
      "/photos/aura-place-1.png",
      "/photos/aura-place-2.png",
      "/photos/aura-place-3.png",
      "/photos/aura-place-4.png",
    ],
  },
  {
    slug: "hacienda-el-milagro",
    name: "Hacienda El Milagro",
    cat: "residencial",
    status: "En venta",
    tagline: "Terrenos y casas residenciales",
    location: "Arteaga, Coahuila",
    short:
      "Terrenos y casas residenciales en una de las zonas de mayor crecimiento y plusvalía de Arteaga.",
    overview: [
      "Hacienda El Milagro ofrece terrenos y casas residenciales en Arteaga, Coahuila, una zona consolidada con servicios, accesos y plusvalía comprobada — ideal para construir tu hogar o invertir a largo plazo.",
    ],
    facts: null,
    cardFacts: ["Terrenos y casas", "Plusvalía", "Arteaga"],
    amenities: [
      { i: "gate", t: "Acceso controlado" },
      { i: "road", t: "Calles urbanizadas" },
      { i: "bolt", t: "Servicios municipales" },
      { i: "trees", t: "Áreas verdes" },
      { i: "water", t: "Red hidráulica" },
      { i: "trend", t: "Plusvalía comprobada" },
    ],
    distances: [
      { p: "Arteaga (centro)", t: "a solicitud" },
      { p: "Saltillo, Coah.", t: "a solicitud" },
    ],
    map: "Arteaga, Coahuila",
    ig: "@topdesarrollos",
    image: "/photos/hacienda-el-milagro-hero.png",
    gallery: [
      "/photos/hacienda-el-milagro-new-02.png",
      "/photos/hacienda-el-milagro-new-03.png",
      "/photos/hacienda-el-milagro-new-04.png",
      "/photos/hacienda-el-milagro-new-05.png",
      "/photos/hacienda-el-milagro-new-06.png",
      "/photos/hacienda-el-milagro-new-07.png",
      "/photos/hacienda-el-milagro-new-08.png",
      "/photos/hacienda-el-milagro-new-09.png",
      "/photos/hacienda-el-milagro-new-10.png",
      "/photos/hacienda-el-milagro-new-11.png",
      "/photos/hacienda-el-milagro-new-12.png",
      "/photos/hacienda-el-milagro-new-13.jpg",
      "/photos/hacienda-el-milagro-new-14.jpg",
      "/photos/hacienda-el-milagro-new-15.jpg",
      "/photos/hacienda-el-milagro-new-16.jpg",
      "/photos/hacienda-el-milagro-new-17.jpg",
      "/photos/hacienda-el-milagro-new-18.jpg",
      "/photos/hacienda-el-milagro-new-19.jpg",
      "/photos/hacienda-el-milagro-new-20.jpg",
      "/photos/hacienda-el-milagro-new-21.jpg",
      "/photos/hacienda-el-milagro-new-22.jpg",
      "/photos/hacienda-el-milagro-new-23.png",
    ],
  },
  {
    slug: "cumbres-de-arteaga",
    name: "Cumbres de Arteaga",
    cat: "residencial",
    status: "En venta",
    tagline: "Terrenos residenciales",
    location: "Arteaga, Coahuila",
    short:
      "Lotes residenciales con vistas a la sierra, en el entorno natural privilegiado de Arteaga.",
    overview: [
      "Cumbres de Arteaga reúne la tranquilidad de la montaña con la comodidad de la ciudad. Sus terrenos residenciales son ideales para quienes buscan un entorno natural, aire limpio y una sólida oportunidad de inversión.",
    ],
    facts: null,
    cardFacts: ["Terrenos", "Vista a la sierra", "Arteaga"],
    amenities: [
      { i: "trees", t: "Entorno natural" },
      { i: "gate", t: "Acceso controlado" },
      { i: "road", t: "Vialidades internas" },
      { i: "sun", t: "Vistas a la sierra" },
      { i: "bolt", t: "Servicios" },
      { i: "trend", t: "Alta plusvalía" },
    ],
    distances: [
      { p: "Arteaga (centro)", t: "a solicitud" },
      { p: "Saltillo, Coah.", t: "a solicitud" },
    ],
    map: "Arteaga, Coahuila",
    ig: "@pezadesarrollos",
    image: "/photos/cumbres-de-arteaga-hero.jpg",
    gallery: [
      "/photos/cumbres-de-arteaga-1.jpg",
      "/photos/cumbres-de-arteaga-2.jpg",
    ],
  },
  {
    slug: "privada-bosque-sur",
    name: "Privada Bosque Sur",
    cat: "residencial",
    status: "En venta",
    tagline: "Servicios incluidos",
    location: "Saltillo, Coahuila",
    short:
      "Desarrollo residencial con áreas verdes y servicios incluidos, en zona de crecimiento al sur de Saltillo.",
    overview: [
      "Privada Bosque Sur es un desarrollo residencial que combina comunidad, áreas verdes y servicios incluidos. Una opción ideal para familias que buscan tranquilidad y plusvalía en el sur de Saltillo.",
    ],
    facts: null,
    cardFacts: ["Servicios incluidos", "Terrenos", "Saltillo"],
    amenities: [
      { i: "gate", t: "Acceso controlado" },
      { i: "garden", t: "Áreas verdes" },
      { i: "playground", t: "Juegos infantiles" },
      { i: "road", t: "Vialidades internas" },
      { i: "bolt", t: "Servicios incluidos" },
      { i: "trend", t: "Plusvalía" },
    ],
    distances: [{ p: "Saltillo (centro)", t: "a solicitud" }],
    map: "Saltillo, Coahuila",
    ig: "@privada.bosquesur",
    image: "/photos/privada-bosque-sur-hero.jpg",
    gallery: [
      "/photos/privada-bosque-sur-1.jpg",
      "/photos/privada-bosque-sur-2.jpg",
      "/photos/privada-bosque-sur-3.jpg",
    ],
  },
  {
    slug: "la-joya-residencial",
    name: "La Joya Residencial I y II",
    cat: "residencial",
    status: "En venta",
    tagline: "Terrenos residenciales",
    location: "Saltillo, Coahuila",
    short:
      "Dos etapas de terrenos residenciales con infraestructura completa y servicios, en zona de plusvalía.",
    overview: [
      "La Joya Residencial, en sus etapas I y II, ofrece terrenos residenciales con infraestructura completa, listos para construir. Una inversión sólida en una de las zonas con mayor crecimiento de la región.",
    ],
    facts: null,
    cardFacts: ["Etapas I y II", "Listo para construir", "Saltillo"],
    amenities: [
      { i: "road", t: "Calles pavimentadas" },
      { i: "bolt", t: "Electrificación" },
      { i: "water", t: "Agua y drenaje" },
      { i: "gate", t: "Acceso controlado" },
      { i: "garden", t: "Áreas verdes" },
      { i: "trend", t: "Plusvalía comprobada" },
    ],
    distances: [{ p: "Saltillo (centro)", t: "a solicitud" }],
    map: "Saltillo, Coahuila",
    ig: "@pezainmobiliaria",
    image: "/photos/la-joya-residencial-hero.jpg",
    gallery: [
      "/photos/la-joya-residencial-1.jpg",
      "/photos/la-joya-residencial-2.jpg",
      "/photos/la-joya-residencial-3.jpg",
    ],
  },
  {
    slug: "fuentes-de-arteaga",
    name: "Fuentes de Arteaga",
    cat: "residencial",
    status: "En venta",
    tagline: "Terrenos residenciales",
    location: "Arteaga, Coahuila",
    short:
      "Terrenos residenciales en Arteaga, el 'Pueblo Mágico' de la sierra, con clima privilegiado.",
    overview: [
      "Fuentes de Arteaga ofrece terrenos residenciales en el corazón del Pueblo Mágico de Arteaga, reconocido por su clima fresco y entorno natural. Una oportunidad para vivir o invertir en un destino con identidad.",
    ],
    facts: null,
    cardFacts: ["Terrenos", "Pueblo Mágico", "Clima de sierra"],
    amenities: [
      { i: "trees", t: "Entorno natural" },
      { i: "sun", t: "Clima fresco" },
      { i: "road", t: "Vialidades" },
      { i: "bolt", t: "Servicios" },
      { i: "gate", t: "Acceso controlado" },
      { i: "trend", t: "Plusvalía" },
    ],
    distances: [
      { p: "Arteaga (centro)", t: "a solicitud" },
      { p: "Saltillo, Coah.", t: "a solicitud" },
    ],
    map: "Arteaga, Coahuila",
    ig: "@pezainmobiliaria",
    image: "/photos/fuentes-de-arteaga-hero.png",
    gallery: ["/photos/fuentes-de-arteaga-1.jpg"],
  },
];

// Guard against DEV_OPTIONS drifting from DEVS. Runs only on the server
// (this module is no longer imported by client components).
if (
  DEV_OPTIONS.length !== DEVS.length ||
  DEV_OPTIONS.some((o, i) => o.slug !== DEVS[i].slug || o.name !== DEVS[i].name)
) {
  throw new Error(
    "DEV_OPTIONS in lib/dev-options.ts is out of sync with DEVS in lib/developments.ts"
  );
}

export const DEV_BY_SLUG: Record<string, Dev> = Object.fromEntries(
  DEVS.map((d) => [d.slug, d])
);

export function devsByCategory(cat: string): Dev[] {
  if (cat === "all") return DEVS;
  return DEVS.filter((d) => d.cat === cat);
}

export function categoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {
    campestre: 0,
    residencial: 0,
    vertical: 0,
  };
  for (const d of DEVS) counts[d.cat]++;
  return counts;
}
