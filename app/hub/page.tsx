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
    <div className="relative min-h-screen text-neutral-50 overflow-hidden">
      {/* Background hero Parlios */}
      <div
        className="absolute inset-0 bg-neutral-950"
        style={{
          backgroundImage: "url('/parlios-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />
      {/* léger voile pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/95" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/parlios-logo.png"
            alt="Parlios Logo"
            className="h-16 sm:h-20 w-auto drop-shadow-[0_0_30px_rgba(255,80,0,0.75)]"
          />
        </div>

        {/* Header simple */}
        <header className="text-center space-y-2">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-neutral-300">
            HUB IA · PARLIOS
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Parle au cœur de Parlios.
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto">
            Décris ce que tu veux créer ou optimiser. Parlios t&apos;aide à gagner du temps,
            structurer tes idées et passer à l&apos;action.
          </p>
        </header>

        {/* Fenêtre de chat centrale */}
        <section className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950/70 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">
            <div className="px-5 py-3 border-b border-neutral-800 flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-neutral-400">
                  PARLIOS · CORE CHAT
                </p>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-900/30 text-emerald-300 border border-emerald-500/40">
                Prêt
              </span>
            </div>

            <div className="px-5 py-4 space-y-3 min-h-[220px]">
              <div className="rounded-2xl bg-neutral-900/80 border border-neutral-700 px-4 py-3 text-sm text-neutral-50">
                Bienvenue sur Parlios · Hub IA. Tu peux simplement expliquer ton besoin,
                ou sélectionner un raccourci en dessous. L&apos;objectif : aller vite,
                sans interface compliquée.
              </div>

              {selectedMission && (
                <div className="rounded-2xl border border-orange-500/70 bg-orange-900/20 px-4 py-3 text-xs sm:text-sm text-neutral-50 space-y-1.5">
                  <p className="text-[11px] uppercase tracking-wide text-orange-300">
                    Mode sélectionné
                  </p>
                  <p className="font-medium">{selectedMission.label}</p>
                  <p className="text-[11px] text-neutral-200">
                    Décris plus précisément ce que tu veux faire dans le champ ci-dessous.
                    Parlios adaptera ses questions et son plan à partir de ce mode.
                  </p>
                </div>
              )}
            </div>

            {/* Zone de saisie large */}
            <div className="border-t border-neutral-800 px-4 py-3 sm:px-5 sm:py-4">
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <textarea
                  className="min-h-[80px] max-h-[180px] resize-y rounded-2xl bg-neutral-900 border border-neutral-700 px-3 py-2.5 text-sm text-neutral-50 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                  placeholder='Ex : "Crée un site simple pour mon projet IA avec une page d’accueil et une page contact."'
                />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[11px] text-neutral-400">
                    Plus tard, ce chat sera relié à ton orchestrateur d&apos;agents Parlios.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-orange-500 text-neutral-950 hover:bg-orange-400 transition border border-orange-600/60"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Raccourcis compacts type Skywork/Kimi */}
        <section className="space-y-3">
          <div className="text-center space-y-1">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-neutral-400">
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
                      ? "border-orange-500 bg-orange-500/20 text-orange-100"
                      : "border-neutral-700 bg-neutral-900/80 text-neutral-100 hover:border-orange-400 hover:bg-orange-500/10"
                  ].join(" ")}
                >
                  {mission.label}
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-center text-neutral-400">
            Les raccourcis t&apos;aident à cadrer rapidement ta demande. Mais tu peux aussi
            simplement taper ce que tu veux, comme sur Kimi ou Skywork.
          </p>
        </section>

        <footer className="pt-4 pb-6 text-center text-[11px] text-neutral-500">
          Parlios · Optimise ton temps, libère ton potentiel.
        </footer>
      </div>
    </div>
  );
}
