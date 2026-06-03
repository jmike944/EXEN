"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as keyof React.JSX.IntrinsicElements;
  const classes = ["reveal", delay ? `d${delay}` : "", seen ? "in" : "", className]
    .filter(Boolean)
    .join(" ");

  // @ts-expect-error generic ref polymorphism
  return <Tag ref={ref} className={classes} style={style}>{children}</Tag>;
}
