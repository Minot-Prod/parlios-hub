"use client";

import * as React from "react";

type MissionCategory =
  | "create"
  | "media"
  | "code"
  | "content"
  | "optimize"
  | "analyze"
  | "other";

type Mission = {
  id: string;
  label: string;
  category: MissionCategory;
  description: string;
};

const MISSIONS: Mission[] = [
  {
    id: "create-website",
    category: "create",
    label: "Créer un site web",
    description: "Landing page, site vitrine, page perso ou projet complet."
  },
  {
    id: "create-app",
    category: "create",
    label: "Créer une application",
    description: "Outil interne, mini SaaS, dashboard, app métier…"
  },
  {
    id: "create-shop",
    category: "create",
    label: "Créer une boutique / offre",
    description: "Page d’offre, bundle, tunnel simple pour vendre."
  },
  {
    id: "create-image",
    category: "media",
    label: "Générer une image",
    description: "Prompts pour Midjourney, DALL·E, Ideogram, etc."
  },
  {
    id: "create-video",
    category: "media",
    label: "Générer une vidéo",
    description: "Script, storyboard, prompts pour vidéo IA."
  },
  {
    id: "create-presentation",
    category: "content",
    label: "Créer une présentation",
    description: "Pitch deck, slides, plan de conférence ou atelier."
  },
  {
    id: "create-thread",
    category: "content",
    label: "Créer un contenu long",
    description: "Article, newsletter, carrousel, thread…"
  },
  {
    id: "social-posts",
    category: "content",
    label: "Posts réseaux sociaux",
    description: "Idées, calendrier, posts prêts à publier."
  },
  {
    id: "code",
    category: "code",
    label: "Écrire / améliorer du code",
    description: "Snippets, refactor, debug, bonnes pratiques."
  },
  {
    id: "api-integration",
    category: "code",
    label: "Connecter une API",
    description: "Spécifier, tester et documenter une intégration."
  },
  {
    id: "automation",
    category: "optimize",
    label: "Automatiser un workflow",
    description: "Relier tes outils, réduire les clics, sécuriser les étapes."
  },
  {
    id: "optimize-business",
    category: "optimize",
    label: "Optimiser un process business",
    description: "Onboarding, suivi client, vente, support…"
  },
  {
    id: "analyze-site",
    category: "analyze",
    label: "Analyser un site / funnel",
    description: "Clarté, message, conversion, améliorations concrètes."
  },
  {
    id: "analyze-data",
    category: "analyze",
    label: "Analyser des données / résultats",
    description: "Tableaux, export, feedback chiffré, décisions."
  },
  {
    id: "brainstorm",
    category: "other",
    label: "Brainstormer une idée",
    description: "Explorer des pistes, trouver des angles, prioriser."
  },
  {
    id: "coach",
    category: "other",
    label: "Parler / coaching Parlios",
    description: "Clarifier ta situation, tes choix, tes priorités."
  }
];

export default function HubPage() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const selectedMission = React.useMemo(
    () => MISSIONS.find((m) => m.id === selectedId) ?? null,
    [selectedId]
  );

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
      {/* Background léger type "ville vivante" */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
        <div className="absolute bottom-0 inset-x-0 h-40 flex gap-2 px-6">
          {Array.from({ length: 28 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-slate-800/40 rounded-t-md animate-pulse"
              style={{
                height: `${20 + ((i * 13) % 60)}%`,
                animationDelay: `${i * 110}ms`
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0">
          {Array.from({ length: 45 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-300/70 animate-[ping_4s_linear_infinite]"
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 19) % 100}%`,
                animationDelay: `${i * 80}ms`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        <header className="text-center space-y-3">
          <p className="text-xs font-semibold tracking-[0.35em] uppercase text-cyan-300">
            Parlios · Hub IA
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Parle au cœur de Parlios.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Fenêtre centrale du système : ici tu expliques ce que tu veux
            créer, optimiser ou comprendre. Parlios réfléchit avec toi,
            puis te propose le meilleur chemin.
          </p>
        </header>

        <section className="max-w-3xl mx-auto">
          <div className="rounded-3xl border border-slate-700/70 bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-800/80 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  Parlios · Core Chat
                </p>
                <p className="text-xs text-slate-400">
                  Interface principale · Mémoire & projets bientôt synchronisés.
                </p>
              </div>
              <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40">
                Prêt
              </span>
            </div>

            <div className="px-5 py-4 space-y-3">
              <div className="rounded-2xl bg-slate-800/80 px-4 py-3 text-sm text-slate-100">
                Bienvenue sur Parlios · Hub IA. Décris ce que tu veux
                accomplir, ou choisis une option en dessous pour lancer
                un mode guidé (site web, app, vidéo, image, présentation…).
              </div>

              {selectedMission && (
                <div className="rounded-2xl border border-cyan-400/60 bg-cyan-500/5 px-4 py-3 text-xs sm:text-sm text-slate-100 space-y-1.5">
                  <p className="text-[11px] uppercase tracking-wide text-cyan-300">
                    Mode sélectionné
                  </p>
                  <p className="font-medium">{selectedMission.label}</p>
                  <p className="text-slate-200 text-xs sm:text-[13px]">
                    {selectedMission.description}
                  </p>
                  <p className="text-[11px] text-slate-300 pt-1">
                    Tu peux préciser ton besoin directement dans la zone
                    de chat en dessous, Parlios adaptera les questions
                    et le plan à partir de ce mode.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-slate-800/80 px-4 py-3 sm:px-5 sm:py-4">
              <form
                className="flex flex-col sm:flex-row gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="flex-1 rounded-xl bg-slate-900/80 border border-slate-700/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-400/60"
                  placeholder='Ex : "Crée un site pour mon projet IA, simple mais pro."'
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition"
                >
                  Envoyer
                </button>
              </form>
              <p className="mt-1.5 text-[11px] text-slate-500">
                Cette zone sera branchée sur ton vrai chat Parlios plus tard
                (API / agents). Pour l’instant, c’est une interface de démo.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <div className="text-center space-y-1">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-slate-400">
              Choisis une option
            </p>
            <h2 className="text-lg sm:text-xl font-semibold">
              Tu peux tout faire depuis le Hub.
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mx-auto">
              Création, média, code, business, optimisation… Choisis une carte,
              Parlios adaptera les questions et le plan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
                    "group text-left rounded-2xl border px-3.5 py-3.5 sm:px-4 sm:py-4 transition shadow-sm backdrop-blur-md",
                    isActive
                      ? "border-cyan-400/80 bg-cyan-500/10 shadow-cyan-500/30"
                      : "border-slate-700/70 bg-slate-900/70 hover:border-cyan-400/60 hover:bg-slate-900"
                  ].join(" ")}
                >
                  <div className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium text-slate-50">
                      {mission.label}
                    </p>
                    <p className="text-xs sm:text-[13px] text-slate-300">
                      {mission.description}
                    </p>
                    <span className="mt-1 text-[10px] uppercase tracking-wide text-cyan-300">
                      {mission.category === "create"
                        ? "Création"
                        : mission.category === "media"
                        ? "Média"
                        : mission.category === "code"
                        ? "Code"
                        : mission.category === "content"
                        ? "Contenu"
                        : mission.category === "optimize"
                        ? "Optimisation"
                        : mission.category === "analyze"
                        ? "Analyse"
                        : "Autre"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-center text-slate-500">
            Tu peux soit cliquer sur une carte, soit ignorer ces options
            et simplement parler dans la fenêtre de chat. Le Hub reste ton
            point d’entrée unique.
          </p>
        </section>

        <footer className="pt-4 pb-6 text-center text-[11px] text-slate-500">
          Parlios est une maison, un compagnon, un mouvement. Le Hub est
          la pièce centrale où tes projets prennent forme.
        </footer>
      </div>
    </div>
  );
}
