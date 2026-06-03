import { waLink, WA_DEFAULT_MESSAGE } from "@/lib/company";
import { WhatsAppIcon } from "./whatsapp-icon";

export function WhatsAppFloat({ message }: { message?: string }) {
  const href = waLink(message ?? WA_DEFAULT_MESSAGE);
  return (
    <a
      className="wa-float"
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}
