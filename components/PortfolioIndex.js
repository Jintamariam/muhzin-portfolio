"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

/**
 * Plain scannable list of every project, filterable by category. Categories
 * are derived from the project data itself (not hardcoded), so adding a
 * project in a new category — e.g. "Wedding" or "Sports" — automatically
 * gets its own filter pill with no code changes.
 */
export default function PortfolioIndex({ projects }) {
  const [filter, setFilter] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(projects.map((p) => p.category))),
    [projects]
  );

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter]
  );

  return (
    <section className="max-w-4xl mx-auto px-6 md:px-10 pt-24 pb-28">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="font-mono font-semibold text-xs uppercase tracking-[0.2em] text-dim">Index</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`font-mono font-semibold text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 border transition-colors ${
              filter === "all"
                ? "border-signal text-signal"
                : "border-hairline text-dim hover:text-bone hover:border-bone"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono font-semibold text-[10px] uppercase tracking-[0.15em] px-3 py-1.5 border transition-colors ${
                filter === cat
                  ? "border-signal text-signal"
                  : "border-hairline text-dim hover:text-bone hover:border-bone"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <ul className="divide-y divide-hairline border-t border-b border-hairline">
        {filtered.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/portfolio/${p.slug}`}
              className="group flex items-baseline justify-between gap-4 py-4 hover:text-signal transition-colors"
            >
              <span className="font-display text-xl md:text-2xl text-bone group-hover:text-signal transition-colors">
                {p.title}
              </span>
              <span className="font-mono font-semibold text-[10px] uppercase tracking-[0.15em] text-dim shrink-0">
                {p.category} — {p.year}
              </span>
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-8 text-center text-dim font-mono font-semibold text-xs uppercase tracking-[0.15em]">
            Nothing here yet
          </li>
        )}
      </ul>
    </section>
  );
}
