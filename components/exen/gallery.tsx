"use client";

import Image from "next/image";
import { Expand } from "lucide-react";
import { Lightbox, useLightbox, type LightboxItem } from "./lightbox";

/**
 * Desarrollo photo mosaic. Each tile opens the image in a fullscreen lightbox
 * (click, or keyboard arrows to navigate once open). Preserves the existing
 * .gallery / .gallery__slot mosaic layout (first tile wide+tall, 4th wide).
 */
export function Gallery({
  images,
  devName,
}: {
  images: string[];
  devName: string;
}) {
  const items: LightboxItem[] = images.map((src, i) => ({
    src,
    alt: `${devName} — galería ${i + 1}`,
    caption: `${devName} — ${i + 1} de ${images.length}`,
  }));
  const lb = useLightbox(items);

  return (
    <>
      <div className="gallery">
        {items.map((it, i) => {
          const cls = ["gallery__slot", "gallery__slot--btn"];
          if (i === 0) cls.push("g-wide", "g-tall");
          if (i === 3) cls.push("g-wide");
          return (
            <button
              key={it.src}
              type="button"
              className={cls.join(" ")}
              onClick={() => lb.openAt(i)}
              aria-label={`Ampliar ${it.alt}`}
            >
              <Image
                src={it.src}
                alt={it.alt}
                fill
                sizes="(max-width: 620px) 100vw, (max-width: 1024px) 50vw, 25vw"
                style={{ objectFit: "cover" }}
              />
              <span className="gallery__hint" aria-hidden="true">
                <Expand size={14} /> Ver
              </span>
            </button>
          );
        })}
      </div>
      <Lightbox {...lb.bind} />
    </>
  );
}
