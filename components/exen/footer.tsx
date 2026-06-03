import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { COMPANY } from "@/lib/company";
import { DEVS } from "@/lib/developments";
import { InstagramIcon } from "./instagram-icon";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="exen-container">
        <div className="footer__top">
          <div>
            <span className="wm">{COMPANY.name}</span>
            <div className="tl">{COMPANY.tagline}</div>
            <p className="about">
              Firma de comercialización y desarrollo inmobiliario en Saltillo y
              Arteaga, Coahuila.
            </p>
          </div>
          <div>
            <h5>Desarrollos</h5>
            <ul>
              {DEVS.slice(0, 6).map((d) => (
                <li key={d.slug}>
                  <Link href={`/desarrollos/${d.slug}`}>{d.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Explorar</h5>
            <ul>
              <li>
                <Link href="/#nosotros">Nosotros</Link>
              </li>
              <li>
                <Link href="/#inversion">Inversión</Link>
              </li>
              <li>
                <Link href="/#ubicacion">Ubicación</Link>
              </li>
              <li>
                <Link href="/#contacto">Contacto</Link>
              </li>
            </ul>
          </div>
          <div>
            <h5>Contacto</h5>
            <div className="fc">
              <Phone aria-hidden="true" />
              <a href={`tel:${COMPANY.phoneRaw}`}>{COMPANY.phone}</a>
            </div>
            <div className="fc">
              <Mail aria-hidden="true" />
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            </div>
            <div className="fc">
              <MapPin aria-hidden="true" />
              <span>{COMPANY.region}</span>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {year} EXEN. Todos los derechos reservados.</p>
          <div className="footer__socials">
            {COMPANY.socials.slice(0, 4).map((s) => (
              <a
                key={s}
                href={`https://instagram.com/${s.replace("@", "")}`}
                target="_blank"
                rel="noopener"
                aria-label={s}
              >
                <InstagramIcon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
