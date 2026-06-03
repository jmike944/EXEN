export const COMPANY = {
  name: "EXEN",
  tagline: "Inversiones que abren camino",
  phone: "+52 844 588 8866",
  phoneRaw: "528445888866",
  email: "info@exen.mx",
  wa: "528445888866",
  region: "Saltillo · Arteaga, Coahuila",
  socials: [
    "@tera_desarrollos",
    "@topdesarrollos",
    "@sagondesarrollos",
    "@pezadesarrollos",
    "@privada.bosquesur",
    "@ronsesvalles.campestre",
  ],
} as const;

export function waLink(message: string): string {
  return `https://wa.me/${COMPANY.wa}?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT_MESSAGE =
  "Hola EXEN, me gustaría recibir información sobre sus desarrollos.";

export function waDevMessage(devName: string): string {
  return `Hola EXEN, me interesa el desarrollo ${devName}. ¿Me pueden dar más información?`;
}
