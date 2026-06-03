"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";

const OPTIONS = [
  { value: "light", Icon: Sun, label: "Tema claro" },
  { value: "system", Icon: Monitor, label: "Sistema" },
  { value: "dark", Icon: Moon, label: "Tema oscuro" },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div
      className="theme-seg"
      role="radiogroup"
      aria-label="Tema"
      data-active={mounted ? theme ?? "system" : "system"}
    >
      {OPTIONS.map(({ value, Icon, label }) => {
        const active = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            className={`theme-seg__btn${active ? " is-active" : ""}`}
            onClick={() => setTheme(value)}
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
}
