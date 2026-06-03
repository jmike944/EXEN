import type { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function ValueCard({ icon: Icon, title, description }: Props) {
  return (
    <div className="value-card">
      <div className="ico">
        <Icon />
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}
