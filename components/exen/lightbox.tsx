"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxItem = {
  src: string;
  alt: string;
  caption?: string;
};

type LightboxProps = {
  items: LightboxItem[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange?: (i: number) => void;
};

export function Lightbox({
  items,
  index,
  open,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const total = items.length;
  const hasMany = total > 1;
  const item = items[index];

  // Lock body scroll while open.
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Keyboard: Esc closes, arrows navigate.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!hasMany || !onIndexChange) return;
      if (e.key === "ArrowRight") onIndexChange((index + 1) % total);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hasMany, index, total, onIndexChange, onClose]);

  if (!open || !item) return null;

  const goNext = () => onIndexChange?.((index + 1) % total);
  const goPrev = () => onIndexChange?.((index - 1 + total) % total);

  // Portal to <body> so the fixed overlay isn't trapped by a transformed
  // ancestor (e.g. the Reveal wrapper's transform creates a containing block).
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="lightbox"
      onClick={onClose}
    >
      <button
        type="button"
        className="lightbox__close"
        aria-label="Cerrar"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      {hasMany ? (
        <div className="lightbox__counter">
          {index + 1} / {total}
        </div>
      ) : null}

      {hasMany ? (
        <>
          <button
            type="button"
            aria-label="Anterior"
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            <ChevronRight size={24} />
          </button>
        </>
      ) : null}

      {/* Plain <img> so its rendered bounds match its natural aspect ratio.
          Clicks on the image itself stop propagation; the surrounding overlay
          bubbles to onClose. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        className="lightbox__img"
        onClick={(e) => e.stopPropagation()}
      />

      {item.caption ? (
        <div className="lightbox__caption" onClick={(e) => e.stopPropagation()}>
          {item.caption}
        </div>
      ) : null}
    </div>,
    document.body,
  );
}

/** Hook to drive a Lightbox from a grid of triggers. */
export function useLightbox(items: LightboxItem[]) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const openAt = React.useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);
  const close = React.useCallback(() => setOpen(false), []);
  return {
    open,
    index,
    openAt,
    close,
    bind: { items, index, open, onClose: close, onIndexChange: setIndex },
  };
}
