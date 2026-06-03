import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Calendar,
  Handshake,
  Mail,
  Phone,
  ShieldCheck,
  TrendingUp,
  Car,
} from "lucide-react";
import { InstagramIcon } from "@/components/exen/instagram-icon";
import { DEVS, DEV_BY_SLUG } from "@/lib/developments";
import { CATEGORIES } from "@/lib/categories";
import { COMPANY, waLink, waDevMessage } from "@/lib/company";
import { Reveal } from "@/components/exen/reveal";
import { FactsBar } from "@/components/exen/facts-bar";
import { AmenityIcon } from "@/lib/amenity-icon";
import { ValueCard } from "@/components/exen/value-card";
import { DevCard } from "@/components/exen/dev-card";
import { LeadForm } from "@/components/exen/lead-form";
import { ScheduleDialog } from "@/components/exen/schedule-dialog";
import { WhatsAppIcon } from "@/components/exen/whatsapp-icon";

export function generateStaticParams() {
  return DEVS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(
  props: PageProps<"/desarrollos/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const dev = DEV_BY_SLUG[slug];
  if (!dev) return { title: "Desarrollo no encontrado — EXEN" };
  return {
    title: `${dev.name} — EXEN`,
    description: `${dev.tagline}. ${dev.short}`,
  };
}

const INVESTMENT_VALUES = [
  {
    icon: TrendingUp,
    title: "Plusvalía",
    description: "Zona con crecimiento y demanda sostenida.",
  },
  {
    icon: ShieldCheck,
    title: "Respaldo EXEN",
    description: "Solidez institucional y transparencia.",
  },
  {
    icon: Handshake,
    title: "Asesoría integral",
    description: "Acompañamiento de principio a fin.",
  },
];

export default async function DevPage(
  props: PageProps<"/desarrollos/[slug]">
) {
  const { slug } = await props.params;
  const dev = DEV_BY_SLUG[slug];
  if (!dev) notFound();

  const otherDevs = DEVS.filter((d) => d.slug !== dev.slug).slice(0, 5);
  const waMsg = waDevMessage(dev.name);

  return (
    <main>
      {/* HERO */}
      <section className="hero hero--dev">
        <div className="hero__media">
          <Image
            src={dev.image}
            alt={dev.name}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero__overlay" aria-hidden="true" />
        <div className="exen-container hero__inner">
          <span className="eyebrow hero__eyebrow">
            {CATEGORIES[dev.cat].label} · {dev.status}
          </span>
          <h1>{dev.name}</h1>
          <p className="hero__sub">
            {dev.tagline}. {dev.short}
          </p>
          <div className="hero__actions">
            <ScheduleDialog
              preselectDev={dev.slug}
              trigger={
                <button type="button" className="btn btn--light btn--lg">
                  Agenda una visita
                </button>
              }
            />
            <a
              className="btn btn--wa btn--lg"
              href={waLink(waMsg)}
              target="_blank"
              rel="noopener"
            >
              WhatsApp
            </a>
          </div>
          {dev.facts && dev.facts.length > 0 ? (
            <div className="hero__stats">
              {dev.facts.slice(0, 4).map((f) => (
                <div className="hero__stat" key={`${f.n}-${f.l}`}>
                  <div className="n">{f.n}</div>
                  <div className="l">{f.l}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="exen-section" id="overview">
        <div className="exen-container split">
          <Reveal>
            <span className="eyebrow">{dev.tagline}</span>
            <h2
              style={{
                fontSize: "clamp(1.9rem,3.4vw,2.8rem)",
                marginTop: ".6rem",
              }}
            >
              {dev.name}
            </h2>
            <div
              style={{
                marginTop: "1.1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                color: "var(--c-muted)",
              }}
            >
              {dev.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="hero__actions" style={{ marginTop: "1.8rem" }}>
              <ScheduleDialog
                preselectDev={dev.slug}
                trigger={
                  <button type="button" className="btn btn--primary">
                    Quiero más información
                  </button>
                }
              />
              <a
                className="link-arrow"
                style={{ alignSelf: "center" }}
                href={`https://instagram.com/${dev.ig.replace("@", "")}`}
                target="_blank"
                rel="noopener"
              >
                <InstagramIcon /> {dev.ig}
              </a>
            </div>
          </Reveal>
          <Reveal delay={1} className="split__media split__media--wide">
            {dev.gallery[0] ? (
              <Image
                src={dev.gallery[0]}
                alt={`${dev.name} — render`}
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            ) : null}
          </Reveal>
        </div>
      </section>

      {/* FACTS */}
      {dev.facts && dev.facts.length > 0 ? (
        <section style={{ paddingBottom: "clamp(20px,3vw,40px)" }}>
          <div className="exen-container">
            <Reveal>
              <FactsBar facts={dev.facts} />
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* AMENITIES */}
      <section className="exen-section exen-section--soft" id="amenidades">
        <div className="exen-container">
          <Reveal className="sec-head">
            <span className="eyebrow">Amenidades</span>
            <h2>Pensado para disfrutarse</h2>
            <p>
              Espacios y servicios diseñados para la convivencia, la seguridad y
              el bienestar de tu familia.
            </p>
          </Reveal>
          <div
            className="amenity-grid"
            style={{ marginTop: "clamp(28px,3.5vw,48px)" }}
          >
            {dev.amenities.map((a, i) => (
              <Reveal
                key={a.t}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className="amenity"
              >
                <span className="ico">
                  <AmenityIcon i={a.i} />
                </span>
                <span>{a.t}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      {dev.gallery.length > 0 ? (
        <section className="exen-section" id="galeria">
          <div className="exen-container">
            <Reveal className="sec-head">
              <span className="eyebrow">Galería</span>
              <h2>Conoce el proyecto</h2>
              <p>Renders y vistas del desarrollo.</p>
            </Reveal>
            <Reveal
              delay={1}
              className="gallery"
              style={{ marginTop: "clamp(28px,3.5vw,48px)" }}
            >
              {dev.gallery.slice(0, 6).map((src, i) => {
                const cls = ["gallery__slot"];
                if (i === 0) cls.push("g-wide", "g-tall");
                if (i === 3) cls.push("g-wide");
                return (
                  <div key={src} className={cls.join(" ")}>
                    <Image
                      src={src}
                      alt={`${dev.name} — galería ${i + 1}`}
                      fill
                      sizes="(max-width: 620px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                );
              })}
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* UBICACIÓN */}
      <section className="exen-section exen-section--soft" id="ubicacion">
        <div className="exen-container map-wrap">
          <Reveal>
            <span className="eyebrow">Ubicación</span>
            <h2
              style={{
                fontSize: "clamp(1.9rem,3.4vw,2.8rem)",
                marginTop: ".6rem",
              }}
            >
              {dev.location}
            </h2>
            <p style={{ color: "var(--c-muted)", marginTop: "1.1rem" }}>
              Ubicado en {dev.location}, en una de las zonas de mayor
              crecimiento y plusvalía de la región. Consulta accesos y
              distancias con tu asesor.
            </p>
            <div className="dist-list">
              {dev.distances.map((x) => (
                <div className="d" key={x.p}>
                  <span className="ico">
                    <Car />
                  </span>
                  <span className="place">{x.p}</span>
                  <span className="time">{x.t}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={1} className="map-frame">
            <iframe
              title={`Mapa ${dev.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                dev.map
              )}&z=12&output=embed`}
            />
          </Reveal>
        </div>
      </section>

      {/* INVESTMENT */}
      <section className="exen-section exen-section--navy">
        <div className="exen-container">
          <Reveal className="sec-head sec-head--center">
            <span className="eyebrow eyebrow--center">Inversión</span>
            <h2>Una decisión patrimonial</h2>
            <p>
              Respaldo EXEN: zonas con plusvalía comprobada, asesoría integral
              y transparencia en cada paso.
            </p>
          </Reveal>
          <div
            className="value-grid value-grid--three"
            style={{ marginTop: "clamp(32px,4vw,56px)" }}
          >
            {INVESTMENT_VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i + 1) as 1 | 2 | 3}>
                <ValueCard {...v} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        className="exen-section exen-section--navy"
        id="contacto"
        style={{ paddingTop: 0 }}
      >
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
              ¿Te interesa {dev.name}?
            </h2>
            <p
              style={{
                color: "var(--c-on-navy-mut)",
                marginTop: "1rem",
                maxWidth: "42ch",
              }}
            >
              Déjanos tus datos y un asesor te dará información, precios y
              disponibilidad. También puedes escribirnos directo.
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
                  <Calendar />
                </span>
                <div>
                  <div className="k">Visitas</div>
                  <ScheduleDialog
                    preselectDev={dev.slug}
                    trigger={
                      <button
                        type="button"
                        className="v"
                        style={{
                          background: "none",
                          border: 0,
                          padding: 0,
                          color: "#fff",
                          fontSize: "1.05rem",
                          fontWeight: 500,
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                      >
                        Agenda una visita guiada
                      </button>
                    }
                  />
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
                    href={waLink(waMsg)}
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
            <p className="lead">
              Información de {dev.name} — respuesta el mismo día hábil.
            </p>
            <LeadForm preselectDev={dev.slug} source={dev.slug} />
          </Reveal>
        </div>
      </section>

      {/* CROSS-SELL */}
      <section className="exen-section">
        <div className="exen-container">
          <Reveal className="sec-head">
            <span className="eyebrow">Sigue explorando</span>
            <h2>Otros desarrollos EXEN</h2>
          </Reveal>
          <Reveal
            delay={1}
            className="cross-scroll"
            style={{ marginTop: "clamp(28px,3.5vw,48px)" }}
          >
            {otherDevs.map((d) => (
              <DevCard key={d.slug} dev={d} />
            ))}
          </Reveal>
        </div>
      </section>

      <div className="exen-container" style={{ paddingBlock: "1rem" }}>
        <Link className="link-arrow" href="/#desarrollos">
          ← Ver todos los desarrollos
        </Link>
      </div>
    </main>
  );
}
