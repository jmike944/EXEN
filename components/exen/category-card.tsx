"use client";

import { useRouter } from "next/navigation";
import type { CategoryMeta } from "@/lib/categories";

type Props = {
  category: CategoryMeta;
  count: number;
  onSelect?: (key: string) => void;
};

export function CategoryCard({ category, count, onSelect }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (onSelect) {
      onSelect(category.key);
      const target = document.getElementById("desarrollos");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`/#desarrollos`);
    }
  };

  return (
    <button type="button" className="cat-card" onClick={handleClick}>
      <div className="cat-card__media" aria-hidden="true" />
      <div className="n">
        {count} desarrollo{count !== 1 ? "s" : ""}
      </div>
      <h3>{category.label}</h3>
      <div className="count">{category.description}</div>
    </button>
  );
}
