import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Eye,
  Handshake,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Target,
  TrendingUp,
  Car,
  Trees,
} from "lucide-react";
import { DEVS, categoryCounts } from "@/lib/developments";
import { COMPANY, waLink, WA_DEFAULT_MESSAGE } from "@/lib/company";
import { Reveal } from "@/components/exen/reveal";
import { CategoriesSection } from "@/components/exen/categories-section";
import { DevelopmentsSection } from "@/components/exen/developments-section";
import { ValueCard } from "@/components/exen/value-card";
import { LeadForm } from "@/components/exen/lead-form";
import { WhatsAppIcon } from "@/components/exen/whatsapp-icon";

const VALUE_PROPS = [
  {
    icon: TrendingUp,
    title: "Plusvalía comprobada",
    description: "Invertimos en zonas con crecimiento sostenido y demanda real.",
  },
  {
    icon: Handshake,
    title: "Asesoría integral",
    description:
      "Te acompañamos en todo el proceso, de la elección a la escrituración.",
  },
  {
    icon: ShieldCheck,
    title: "Solidez y transparencia",
    description: "Respaldo institucional y claridad en cada operación.",
  },
  {
    icon: Compass,
    title: "Visión de largo plazo",
    description:
      "Estructuramos cada proyecto pensando en tu patrimonio futuro.",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero__media">
          <Image
            src="/photos/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero__overlay" aria-hidden="true" />
        <div className="exen-container hero__inner">
          <span className="eyebrow hero__eyebrow">
            Portafolio de Desarrollos · 2026
          </span>
          <h1>
            Inversiones que
            <br />
            abren camino
          </h1>
          <p className="hero__sub">
            Firma especializada en comercialización y desarrollo de proyectos
            inmobiliarios en Saltillo y Arteaga, Coahuila. Identificamos y
            estructuramos oportunidades de alto valor en zonas con plusvalía
            comprobada.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--light btn--lg" href="#desarrollos">
              Ver desarrollos
            </Link>
            <a
              className="btn btn--wa btn--lg"
              href={waLink(WA_DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <div className="n">7</div>
              <div className="l">Desarrollos en comercialización</div>
            </div>
            <div className="hero__stat">
              <div className="n">3</div>
              <div className="l">Categorías de inversión</div>
            </div>
            <div className="hero__stat">
              <div className="n">Saltillo · Arteaga</div>
              <div className="l">Coahuila, México</div>
            </div>
          </div>
        </div>
      </section>

      <CategoriesSection counts={categoryCounts()} />

      <DevelopmentsSection devs={DEVS} />

      {/* NOSOTROS */}
      <section className="exen-section" id="nosotros">
        <div className="exen-container split">
          <Reveal className="split__media">
            <Image
              src="/photos/about.jpg"
              alt="EXEN — desarrollo en la sierra de Arteaga"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </Reveal>
          <Reveal delay={1}>
            <span className="eyebrow">¿Quiénes somos?</span>
            <h2
              style={{
                fontSize: "clamp(1.9rem,3.4vw,2.8rem)",
                marginTop: ".6rem",
              }}
            >
              Solidez comercial y visión de largo plazo
            </h2>
            <p style={{ color: "var(--c-muted)", marginTop: "1.1rem" }}>
              Nos dedicamos a identificar, estructurar y promover oportunidades
              de inversión de alto valor en zonas con crecimiento y plusvalía
              comprobada. Brindamos asesoría integral a inversionistas,
              familias y desarrolladores.
            </p>
            <div className="mv-grid">
              <div className="mv-card">
                <h4>
                  <Target /> Misión
                </h4>
                <p>
                  Identificar, desarrollar y comercializar oportunidades
                  inmobiliarias de alto valor, generando soluciones rentables
                  para inversionistas, desarrolladores y clientes finales.
                </p>
              </div>
              <div className="mv-card">
                <h4>
                  <Eye /> Visión
                </h4>
                <p>
                  Consolidarnos como el grupo inmobiliario líder en México,
                  distinguido por nuestra solidez institucional, expansión
                  sostenible y creación de valor patrimonial.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INVERSIÓN */}
      <section className="exen-section exen-section--navy" id="inversion">
        <div className="exen-container">
          <Reveal className="sec-head sec-head--center">
            <span className="eyebrow eyebrow--center">
              Por qué invertir con EXEN
            </span>
            <h2>Patrimonio que crece contigo</h2>
            <p>
              Combinamos conocimiento profundo del mercado con un enfoque
              estratégico, financiero y patrimonial.
            </p>
          </Reveal>
          <div
            className="value-grid"
            style={{ marginTop: "clamp(32px,4vw,56px)" }}
          >
            {VALUE_PROPS.map((v, i) => (
              <Reveal key={v.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <ValueCard {...v} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* UBICACIÓN */}
      <section className="exen-section" id="ubicacion">
        <div className="exen-container map-wrap">
          <Reveal>
            <span className="eyebrow">Ubicación</span>
            <h2
              style={{
                fontSize: "clamp(1.9rem,3.4vw,2.8rem)",
                marginTop: ".6rem",
              }}
            >
              Coahuila, en el corazón del noreste
            </h2>
            <p style={{ color: "var(--c-muted)", marginTop: "1.1rem" }}>
              Nuestros desarrollos se ubican en Saltillo y Arteaga — dos de las
              zonas con mayor crecimiento, seguridad y plusvalía de la región,
              a minutos de la sierra y de la ciudad.
            </p>
            <div className="dist-list">
              <div className="d">
                <span className="ico">
                  <MapPin />
                </span>
                <span className="place">Saltillo, Coahuila</span>
                <span className="time">4 desarrollos</span>
              </div>
              <div className="d">
                <span className="ico">
                  <Trees />
                </span>
                <span className="place">Arteaga · Pueblo Mágico</span>
                <span className="time">3 desarrollos</span>
              </div>
              <div className="d">
                <span className="ico">
                  <Car />
                </span>
                <span className="place">Los Lirios · zona campestre</span>
                <span className="time">32 min</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={1} className="map-frame">
            <iframe
              title="Mapa Saltillo y Arteaga"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Arteaga,+Coahuila,+Mexico&z=10&output=embed"
            />
          </Reveal>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="exen-section exen-section--navy" id="contacto">
        <div className="exen-container contact-grid">
          <Reveal>
            <span className="eyebrow">Contacto</span>
            <h2
              style={{
                fontSize: "clamp(1.9rem,3.4vw,2.8rem)",
                marginTop: ".6rem",
                color: "#fff",
              }}
            >
              Hablemos de tu próxima inversión
            </h2>
            <p
              style={{
                color: "var(--c-on-navy-mut)",
                marginTop: "1rem",
                maxWidth: "42ch",
              }}
            >
              Déjanos tus datos y un asesor te contactará. También puedes
              escribirnos por WhatsApp o llamarnos directamente.
            </p>
            <div className="contact-info" style={{ marginTop: "1.6rem" }}>
              <div className="ci">
                <span className="ico">
                  <Phone />
                </span>
                <div>
                  <div className="k">Teléfono</div>
                  <a className="v" href={`tel:${COMPANY.phoneRaw}`}>
                    {COMPANY.phone}
                  </a>
                </div>
              </div>
              <div className="ci">
                <span className="ico">
                  <Mail />
                </span>
                <div>
                  <div className="k">Correo</div>
                  <a className="v" href={`mailto:${COMPANY.email}`}>
                    {COMPANY.email}
                  </a>
                </div>
              </div>
              <div className="ci">
                <span className="ico">
                  <WhatsAppIcon />
                </span>
                <div>
                  <div className="k">WhatsApp</div>
                  <a
                    className="v"
                    href={waLink(WA_DEFAULT_MESSAGE)}
                    target="_blank"
                    rel="noopener"
                  >
                    Iniciar conversación
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1} className="form-card">
            <h3>Solicita información</h3>
            <p className="lead">Respuesta el mismo día hábil.</p>
            <LeadForm source="home" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
