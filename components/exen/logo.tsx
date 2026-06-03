import Image from "next/image";

type Variant = "full" | "wordmark";

type Props = {
  className?: string;
  /** Pixel height of the rendered logo. Width is auto. */
  height?: number;
  priority?: boolean;
  /** "full" = wordmark + "Capital Inmobiliario" subtitle; "wordmark" = just EXEN. */
  variant?: Variant;
};

const SOURCES: Record<Variant, { src: string; w: number; h: number; alt: string }> = {
  full: {
    src: "/photos/exen-logo.png",
    w: 743,
    h: 242,
    alt: "EXEN — Capital Inmobiliario",
  },
  wordmark: {
    src: "/photos/exen-wordmark.png",
    w: 743,
    h: 143,
    alt: "EXEN",
  },
};

export function Logo({
  className,
  height = 44,
  priority,
  variant = "full",
}: Props) {
  const { src, w, h, alt } = SOURCES[variant];
  return (
    <Image
      src={src}
      alt={alt}
      width={Math.round(height * (w / h))}
      height={height}
      priority={priority}
      className={className}
      style={{ height, width: "auto" }}
    />
  );
}
