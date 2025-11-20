"use client";

import * as React from "react";

const CLUSTERS = [
  { id: "studio", label: "Studio Sites", hint: "Preview, sections, hero IA" },
  { id: "sync", label: "Sync Sales", hint: "Argumentaires & scripts" },
  { id: "ops", label: "Ops & Log", hint: "Workflows, logs, CI/CD" },
  { id: "content", label: "Content Lab", hint: "Posts, emails, vidéos" },
  { id: "research", label: "Veille IA", hint: "Outils & tendances" },
  { id: "planner", label: "Planner", hint: "Semaine & priorités" },
];

type AgentDotProps = {
  active?: boolean;
};

function AgentDot({ active }: AgentDotProps) {
  return (
    <span
      className={
        "h-1.5 w-1.5 rounded-full " +
        (active
          ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]"
          : "bg-sky-400/70")
      }
    />
  );
}

export default function ParliosCity() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CLUSTERS.length);
    }, 900);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="w-full md:w-72 rounded-3xl border border-slate-800 bg-slate-950/85 backdrop-blur-2xl px-4 py-4 flex flex-col gap-4 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
      <div>
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-400">
          Ville d&apos;agents
        </p>
        <p className="text-xs text-slate-400">
          Chaque quartier = une mini-équipe d&apos;agents Parlios qui tourne derrière.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {CLUSTERS.map((cluster, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={cluster.id}
              className={
                "relative rounded-2xl border px-3 py-2.5 transition-all duration-200 " +
                (isActive
                  ? "border-sky-400/80 bg-gradient-to-br from-slate-900 via-slate-900 to-sky-900/50 shadow-[0_0_24px_rgba(56,189,248,0.6)]"
                  : "border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900/70 hover:border-slate-600")
              }
            >
              {/* Halo animé */}
              {isActive && (
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-sky-500/10 blur-xl" />
              )}

              <div className="relative flex items-center gap-2">
                <div className="h-7 w-7 rounded-xl bg-gradient-to-tr from-sky-500 via-emerald-400 to-violet-500 flex items-center justify-center text-[0.6rem] font-semibold text-slate-950 shadow-[0_0_12px_rgba(56,189,248,0.9)]">
                  AI
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.7rem] font-semibold text-slate-50">
                    {cluster.label}
                  </span>
                  <span className="text-[0.6rem] text-slate-400">
                    {cluster.hint}
                  </span>
                </div>
              </div>

              {/* Rangée d'avatars-agents */}
              <div className="relative mt-2 flex items-center gap-1.5">
                <AgentDot active={isActive} />
                <AgentDot active={false} />
                <AgentDot active={false} />
                <AgentDot active={isActive} />
                <AgentDot active={false} />
                <AgentDot active={false} />
              </div>

              <div className="relative mt-1 flex items-center justify-between text-[0.6rem] text-slate-500">
                <span>
                  {isActive ? "Quartier en activité" : "Agents en veille"}
                </span>
                <span className="text-slate-500/80">x{index + 12} agents</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-[0.65rem] text-slate-500">
        La ville n&apos;est qu&apos;une vue simplifiée. En dessous, tu peux
        connecter autant d&apos;agents réels que tu veux (Studio, Sync, Planner, etc.).
      </div>
    </div>
  );
}
