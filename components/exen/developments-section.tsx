"use client";

import { useState } from "react";
import type { Dev } from "@/lib/developments";
import { DevCard } from "./dev-card";
import { Reveal } from "./reveal";

type Filter = "all" | "campestre" | "residencial" | "vertical";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "campestre", label: "Lotes Campestres" },
  { key: "residencial", label: "Residencial" },
  { key: "vertical", label: "Vertical" },
];

export function DevelopmentsSection({
  devs,
  initialFilter = "all",
}: {
  devs: Dev[];
  initialFilter?: Filter;
}) {
  const [filter, setFilter] = useState<Filter>(initialFilter);

  return (
    <section className="exen-section exen-section--soft" id="desarrollos">
      <div className="exen-container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <Reveal className="sec-head">
            <span className="eyebrow">Portafolio</span>
            <h2>Nuestros desarrollos</h2>
            <p>
              Explora cada proyecto, conoce sus amenidades y agenda una visita
              con nuestros asesores.
            </p>
          </Reveal>
          <Reveal delay={1} className="chips" style={{ marginBottom: ".4rem" }}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`chip${filter === f.key ? " is-active" : ""}`}
                onClick={() => setFilter(f.key)}
              >
                <span className="dot" />
                {f.label}
              </button>
            ))}
          </Reveal>
        </div>
        <div
          className="dev-grid"
          style={{ marginTop: "clamp(28px,3.5vw,48px)" }}
        >
          {devs.map((d, i) => {
            const hidden = filter !== "all" && d.cat !== filter;
            if (hidden) return null;
            return (
              <Reveal key={d.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <DevCard dev={d} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
