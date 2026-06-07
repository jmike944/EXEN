"use client";

import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, CATEGORY_ORDER } from "@/lib/categories";
import { Reveal } from "./reveal";

export function CategoriesSection({
  counts,
}: {
  counts: Record<string, number>;
}) {
  return (
    <section className="exen-section" id="categorias">
      <div className="exen-container">
        <Reveal className="sec-head">
          <span className="eyebrow">Líneas de negocio</span>
          <h2>Tres formas de invertir y vivir</h2>
          <p>
            Desde lotes campestres frente al lago hasta vida vertical en la
            ciudad — cada categoría está pensada para un estilo de vida y un
            horizonte de inversión distinto.
          </p>
        </Reveal>
        <div
          className="cat-grid"
          style={{ marginTop: "clamp(32px,4vw,56px)" }}
        >
          {CATEGORY_ORDER.map((key, i) => {
            const cat = CATEGORIES[key];
            const count = counts[key];
            return (
              <Reveal key={key} delay={(i + 1) as 1 | 2 | 3}>
                <Link className="cat-card" href="/#desarrollos">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="cat-card__img"
                  />
                  <div className="n">
                    {count} desarrollo{count !== 1 ? "s" : ""}
                  </div>
                  <h3>{cat.label}</h3>
                  <div className="count">{cat.description}</div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
