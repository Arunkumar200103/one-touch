"use client";

import { useRef, useState } from "react";

const trendingSearches = [
  "AC Repair", "Home Cleaning", "Wedding Photographer", "Interior Designer",
  "Catering Service", "Yoga Classes", "Plumber", "Electrician",
];

const tagMeta: Record<string, { icon: string; color: string; bg: string; border: string }> = {
  "AC Repair":            { icon: "❄️", color: "#0369a1", bg: "#f0f9ff", border: "#bae6fd" },
  "Home Cleaning":        { icon: "🧹", color: "#0f766e", bg: "#f0fdfa", border: "#99f6e4" },
  "Wedding Photographer": { icon: "📷", color: "#be185d", bg: "#fdf2f8", border: "#f9a8d4" },
  "Interior Designer":    { icon: "🛋️", color: "#b45309", bg: "#fffbeb", border: "#fcd34d" },
  "Catering Service":     { icon: "🍽️", color: "#7c3aed", bg: "#f5f3ff", border: "#c4b5fd" },
  "Yoga Classes":         { icon: "🧘", color: "#059669", bg: "#ecfdf5", border: "#6ee7b7" },
  "Plumber":              { icon: "🔧", color: "#1d4ed8", bg: "#eff6ff", border: "#93c5fd" },
  "Electrician":          { icon: "⚡", color: "#d97706", bg: "#fff7ed", border: "#fbbf24" },
};

export function TrendingSection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative bg-white border-y border-gray-100 overflow-hidden">

      {/* Top shimmer line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

      {/* Subtle noise grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* ═══════════════════════════════════
            DESKTOP  (md+)
        ═══════════════════════════════════ */}
        <div className="hidden md:flex items-center gap-0 px-8 py-5">

          {/* Left: label */}
          <div className="shrink-0 flex items-center gap-3 pr-7 border-r border-gray-200">
            <div className="relative w-9 h-9 rounded-xl bg-gray-950 flex items-center justify-center shadow-md shadow-black/20">
              <span className="text-base leading-none">🔥</span>
              <span className="absolute inset-0 rounded-xl border border-orange-400/50 animate-ping opacity-40" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-black tracking-[0.22em] uppercase text-gray-800 leading-none">
                Trending
              </span>
              <span className="text-[9px] font-medium text-gray-400 tracking-wide leading-none">
                Right now
              </span>
            </div>
          </div>

          {/* Center: tags */}
          <div className="flex-1 flex flex-wrap items-center gap-2 px-7">
            {trendingSearches.map((s, i) => {
              const m = tagMeta[s];
              const on = active === s;
              return (
                <button
                  key={s}
                  onClick={() => setActive(on ? null : s)}
                  className="group relative flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-semibold border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background:   on ? m.color : m.bg,
                    borderColor:  on ? m.color : m.border,
                    color:        on ? "#fff"  : m.color,
                    boxShadow:    on ? `0 6px 18px -3px ${m.color}50` : undefined,
                  }}
                >
                  <span className="text-[12px] leading-none transition-transform duration-200 group-hover:scale-125 group-hover:rotate-6">
                    {m.icon}
                  </span>
                  {s}
                  {on && (
                    <svg className="w-3 h-3 ml-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {/* Hover shimmer */}
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20" />
                </button>
              );
            })}
          </div>

          {/* Right: live indicator */}
          <div className="shrink-0 flex items-center gap-2 pl-7 border-l border-gray-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
              Live
            </span>
          </div>
        </div>


        {/* ═══════════════════════════════════
            MOBILE  (< md)
        ═══════════════════════════════════ */}
        <div className="md:hidden px-4 py-4">

          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gray-950 flex items-center justify-center shadow-md shadow-black/20">
                <span className="text-xs leading-none">🔥</span>
              </div>
              <div>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase text-gray-800">
                  Trending
                </span>
                <span className="text-gray-300 mx-1.5">·</span>
                <span className="text-[10px] font-medium text-gray-400">Right now</span>
              </div>
            </div>

            {/* Live pill */}
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">Live</span>
            </div>
          </div>

          {/* Horizontally scrollable strip */}
          <div className="relative">
            <div
              className="-mx-4 px-4 overflow-x-auto flex gap-2 pb-1 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
            >
              {trendingSearches.map((s) => {
                const m = tagMeta[s];
                const on = active === s;
                return (
                  <button
                    key={s}
                    onClick={() => setActive(on ? null : s)}
                    className="snap-start shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-semibold border transition-all duration-200 active:scale-95"
                    style={{
                      background:  on ? m.color : m.bg,
                      borderColor: on ? m.color : m.border,
                      color:       on ? "#fff"  : m.color,
                      boxShadow:   on ? `0 4px 14px -2px ${m.color}45` : undefined,
                    }}
                  >
                    <span className="text-[12px] leading-none">{m.icon}</span>
                    <span className="whitespace-nowrap">{s}</span>
                    {on && (
                      <svg className="w-3 h-3 ml-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right fade mask */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent" />
          </div>

        </div>
      </div>

      {/* Bottom shimmer line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

    </section>
  );
}