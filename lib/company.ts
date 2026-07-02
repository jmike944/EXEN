export const COMPANY = {
  name: "EXEN",
  tagline: "Inversiones que abren camino",
  phone: "+52 844 588 8866",
  phoneRaw: "528445888866",
  email: "info@exen.mx",
  wa: "528445888866",
  region: "Saltillo · Arteaga, Coahuila",
  socials: [
    "@topdesarrollos",
    "@sagondesarrollos",
    "@pezadesarrollos",
    "@pezainmobiliaria",
    "@privada.bosquesur",
    "@ronsesvalles.campestre",
  ],
} as const;

// Per-desarrollo WhatsApp numbers, sourced from the GoHighLevel phone system
// (each number is titled after its desarrollo there). wa.me format = E.164
// without the leading "+". Desarrollos without a dedicated GHL number fall
// back to COMPANY.wa via waNumberForDev().
export const DEV_WA: Record<string, string> = {
  ronsesvalles: "528443941140",
  "aura-place": "528443941065",
  "cumbres-de-arteaga": "528443941125",
  "privada-bosque-sur": "528443941135",
  // No dedicated GHL number yet (falls back to COMPANY.wa):
  // hacienda-el-milagro, la-joya-residencial, fuentes-de-arteaga
};

/** WhatsApp number for a desarrollo slug, falling back to the company number. */
export function waNumberForDev(slug?: string): string {
  return (slug && DEV_WA[slug]) || COMPANY.wa;
}

export function waLink(message: string): string {
  return `https://wa.me/${COMPANY.wa}?text=${encodeURIComponent(message)}`;
}

/** WhatsApp link to a desarrollo's own number (or the company number). */
export function waLinkForDev(slug: string | undefined, message: string): string {
  return `https://wa.me/${waNumberForDev(slug)}?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT_MESSAGE =
  "Hola EXEN, me gustaría recibir información sobre sus desarrollos.";

export function waDevMessage(devName: string): string {
  return `Hola EXEN, me interesa el desarrollo ${devName}. ¿Me pueden dar más información?`;
}
