export type CategoryKey = "campestre" | "residencial" | "vertical";

export type CategoryMeta = {
  key: CategoryKey;
  label: string;
  short: string;
  description: string;
  image: string;
};

export const CATEGORIES: Record<CategoryKey, CategoryMeta> = {
  campestre: {
    key: "campestre",
    label: "Lotes Campestres",
    short: "Campestre",
    description:
      "Naturaleza, lago y casa club a minutos de la ciudad.",
    image: "/photos/cat-campestre.png",
  },
  residencial: {
    key: "residencial",
    label: "Terrenos / Residencial",
    short: "Residencial",
    description:
      "Terrenos y privadas listas para construir tu hogar.",
    image: "/photos/cat-residencial.jpg",
  },
  vertical: {
    key: "vertical",
    label: "Vertical",
    short: "Vertical",
    description: "Departamentos y plaza comercial en la ciudad.",
    image: "/photos/cat-vertical.png",
  },
};

export const CATEGORY_ORDER: CategoryKey[] = [
  "campestre",
  "residencial",
  "vertical",
];
