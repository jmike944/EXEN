import type { Fact } from "@/lib/developments";

export function FactsBar({ facts }: { facts: Fact[] }) {
  return (
    <div className="facts-bar">
      {facts.map((f) => (
        <div className="f" key={`${f.n}-${f.l}`}>
          <div className="n">{f.n}</div>
          <div className="l">{f.l}</div>
        </div>
      ))}
    </div>
  );
}
