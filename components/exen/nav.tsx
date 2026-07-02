"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { COMPANY, waLink, WA_DEFAULT_MESSAGE } from "@/lib/company";
import { Logo } from "./logo";

type NavLink = { href: string; label: string };

const HOME_LINKS: NavLink[] = [
  { href: "/#desarrollos", label: "Desarrollos" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#inversion", label: "Inversión" },
  { href: "/#ubicacion", label: "Ubicación" },
];

const DEV_LINKS: NavLink[] = [
  { href: "/#desarrollos", label: "Desarrollos" },
  { href: "#amenidades", label: "Amenidades" },
  { href: "#ubicacion", label: "Ubicación" },
];

export function Nav() {
  const pathname = usePathname();
  const variant = pathname?.startsWith("/desarrollos/") ? "dev" : "home";
  const [solid, setSolid] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const links = variant === "dev" ? DEV_LINKS : HOME_LINKS;
  // Single contact affordance: scroll to the contact form at the bottom of the
  // page (this page's on desarrollos, home's otherwise).
  const contactoHref = variant === "dev" ? "#contacto" : "/#contacto";

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <header className={`nav${solid ? " is-solid" : ""}`}>
        <div className="exen-container nav__inner">
          <Link className="nav__brand" href="/" aria-label={`${COMPANY.name} — Inicio`}>
            <Logo className="nav__logo" height={28} priority variant="wordmark" />
          </Link>
          <nav className="nav__links" aria-label="Principal">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="nav__cta">
            <a href={contactoHref} className="btn btn--light btn--desktop">
              Contáctanos
            </a>
            <button
              type="button"
              className="nav__burger"
              aria-label="Menú"
              onClick={() => setDrawerOpen(true)}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div className="drawer">
          <div
            className="drawer__scrim"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div className="drawer__panel">
            <button
              type="button"
              className="drawer__close"
              aria-label="Cerrar"
              onClick={() => setDrawerOpen(false)}
            >
              <X size={24} />
            </button>
            <Logo className="drawer__logo" height={48} />
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="dl"
                onClick={() => setDrawerOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={contactoHref}
              className="dl"
              onClick={() => setDrawerOpen(false)}
            >
              Contacto
            </a>
            <a
              className="btn btn--navy"
              style={{ marginTop: ".6rem" }}
              href={waLink(WA_DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener"
              onClick={() => setDrawerOpen(false)}
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
