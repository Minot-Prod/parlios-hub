"use client";

import * as React from "react";

type MissionCategory = "create" | "media" | "code" | "content" | "other";

type Mission = {
  id: string;
  label: string;
  category: MissionCategory;
};

const MISSIONS: Mission[] = [
  { id: "create-website", category: "create", label: "Créer un site web" },
  { id: "create-app", category: "create", label: "Créer une application" },
  { id: "create-image", category: "media", label: "Générer une image" },
  { id: "create-video", category: "media", label: "Générer une vidéo" },
  { id: "create-presentation", category: "content", label: "Créer une présentation" },
  { id: "code", category: "code", label: "Écrire / améliorer du code" },
  { id: "brainstorm", category: "other", label: "Brainstorm / coaching Parlios" }
];

export default function HubPage() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const selectedMission = React.useMemo(
    () => MISSIONS.find((m) => m.id === selectedId) ?? null,
    [selectedId]
  );

  return (
    <div className="relative min-h-screen bg-zinc-50 text-zinc-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-zinc-50 to-zinc-100" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <header className="text-center space-y-2">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-500">
            Parlios · Hub IA
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Parle au cœur de Parlios.
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto">
            Fenêtre centrale du système : explique ce que tu veux créer ou optimiser.
            Parlios t&apos;accompagne et te propose le meilleur plan.
          </p>
        </header>

        <section className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-zinc-200 bg-white shadow-lg shadow-zinc-200/80 overflow-hidden">
            <div className="px-5 py-3 border-b border-zinc-200 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-zinc-500">
                  Parlios · Core Chat
                </p>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Prêt
              </span>
            </div>

            <div className="px-5 py-4 space-y-3 min-h-[220px]">
              {selectedMission && (
                <div className="rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs sm:text-sm text-zinc-900 space-y-1.5">
                  <p className="text-[11px] uppercase tracking-wide text-amber-700">
                    Mode sélectionné
                  </p>
                  <p className="font-medium">{selectedMission.label}</p>
                  <p className="text-[11px] text-zinc-700">
                    Décris ton besoin dans le champ ci-dessous, Parlios adaptera ses questions
                    et son plan en partant de ce mode.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-zinc-200 px-4 py-3 sm:px-5 sm:py-4">
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <textarea
                  className="min-h-[80px] max-h-[180px] resize-y rounded-2xl bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  placeholder='Ex : "Crée un site simple pour mon projet IA avec une page d’accueil et une page contact."'
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] text-zinc-500">
                    Plus tard, cette zone sera branchée à ton orchestrateur d&apos;agents Parlios.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-amber-500 text-zinc-900 hover:bg-amber-400 transition border border-amber-600/50"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="text-center space-y-1">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-zinc-500">
              Raccourcis
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {MISSIONS.map((mission) => {
              const isActive = mission.id === selectedId;
              return (
                <button
                  key={mission.id}
                  type="button"
                  onClick={() =>
                    setSelectedId((prev) =>
                      prev === mission.id ? null : mission.id
                    )
                  }
                  className={[
                    "inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs sm:text-sm transition",
                    isActive
                      ? "border-amber-500 bg-amber-100 text-amber-900"
                      : "border-zinc-300 bg-white text-zinc-800 hover:border-amber-400 hover:bg-amber-50"
                  ].join(" ")}
                >
                  {mission.label}
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-center text-zinc-500">
            Tu peux aussi simplement écrire ton idée dans le champ de chat, comme sur Kimi ou Skywork.
          </p>
        </section>

        <footer className="pt-4 pb-6 text-center text-[11px] text-zinc-500">
          Parlios — optimise ton temps, libère ton potentiel.
        </footer>
      </div>
    </div>
  );
}
