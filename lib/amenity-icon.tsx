import type { AmenityKey } from "./developments";
import {
  Building2,
  Car,
  Compass,
  Dog,
  DoorOpen,
  Dumbbell,
  Eye,
  Flame,
  Handshake,
  MapPin,
  MoveVertical,
  Route,
  ShieldCheck,
  Sprout,
  Store,
  Sun,
  Target,
  ToyBrick,
  TrendingUp,
  Trees,
  Waves,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const AMENITY_ICONS: Record<AmenityKey, LucideIcon> = {
  lake: Waves,
  clubhouse: Building2,
  grill: Flame,
  playground: ToyBrick,
  trees: Trees,
  gate: DoorOpen,
  road: Route,
  sun: Sun,
  pool: Waves,
  gym: Dumbbell,
  elevator: MoveVertical,
  shop: Store,
  garden: Sprout,
  building: Building2,
  dog: Dog,
  shield: ShieldCheck,
  bolt: Zap,
  water: Waves,
  trend: TrendingUp,
};

export function AmenityIcon({
  i,
  className,
}: {
  i: AmenityKey;
  className?: string;
}) {
  const Icon = AMENITY_ICONS[i] ?? Compass;
  return <Icon className={className} aria-hidden="true" />;
}

export const VALUE_ICONS = {
  trend: TrendingUp,
  handshake: Handshake,
  shield: ShieldCheck,
  compass: Compass,
  target: Target,
  eye: Eye,
  pin: MapPin,
  car: Car,
} as const;

export type ValueIconKey = keyof typeof VALUE_ICONS;
