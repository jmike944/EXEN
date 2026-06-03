import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import type { Dev } from "@/lib/developments";
import { CATEGORIES } from "@/lib/categories";
import { waLink, waDevMessage } from "@/lib/company";
import { WhatsAppIcon } from "./whatsapp-icon";

export function DevCard({ dev }: { dev: Dev }) {
  const href = `/desarrollos/${dev.slug}`;
  return (
    <article className="dev-card" data-cat={dev.cat}>
      <Link className="dev-card__media" href={href} aria-label={dev.name}>
        <span className="dev-card__tag">{CATEGORIES[dev.cat].short}</span>
        <Image
          src={dev.image}
          alt={dev.name}
          fill
          sizes="(max-width: 620px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="dev-card__img"
        />
      </Link>
      <div className="dev-card__body">
        <div className="dev-card__loc">
          <MapPin /> {dev.location}
        </div>
        <h3>
          <Link href={href}>{dev.name}</Link>
        </h3>
        <p className="dev-card__desc">{dev.short}</p>
        <div className="dev-card__facts">
          {dev.cardFacts.map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>
        <div className="dev-card__foot">
          <Link className="link-arrow" href={href}>
            Conocer más <ArrowRight />
          </Link>
          <a
            className="dev-card__wa"
            href={waLink(waDevMessage(dev.name))}
            target="_blank"
            rel="noopener"
            aria-label={`WhatsApp ${dev.name}`}
          >
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </article>
  );
}
