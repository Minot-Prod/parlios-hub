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
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = (localStorage.getItem("parlios-theme") as "light" | "dark" | null) ?? "dark";
    setTheme(saved);
    document.documentElement.classList.toggle("dark", saved === "dark");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        localStorage.setItem("parlios-theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
      }
      return next;
    });
  };

  const selectedMission = React.useMemo(
    () => MISSIONS.find((m) => m.id === selectedId) ?? null,
    [selectedId]
  );

  const isDark = theme === "dark";

  return (
    <div
      className={
        "relative min-h-screen transition-colors duration-300 " +
        (isDark ? "bg-slate-950 text-slate-50" : "bg-zinc-50 text-zinc-900")
      }
    >
      {/* Fond léger */}
      <div className="pointer-events-none absolute inset-0">
        {isDark ? (
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-white via-zinc-50 to-zinc-100" />
        )}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Barre top avec switch */}
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className={
              "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition " +
              (isDark
                ? "border-slate-600 bg-slate-900/70 text-slate-100 hover:bg-slate-800"
                : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100")
            }
          >
            <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
            <span>{isDark ? "Mode clair" : "Mode sombre"}</span>
          </button>
        </div>

        {/* Header */}
        <header className="text-center space-y-2">
          <p
            className={
              "text-[11px] font-semibold tracking-[0.25em] uppercase " +
              (isDark ? "text-slate-400" : "text-zinc-500")
            }
          >
            Parlios · Hub IA
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Parle au cœur de Parlios.
          </h1>
          <p
            className={
              "text-sm sm:text-base max-w-2xl mx-auto " +
              (isDark ? "text-slate-300" : "text-zinc-600")
            }
          >
            Tu peux tout faire depuis ici : sites, applis, images, vidéos, présentations,
            plans d&apos;action… Décris ton besoin ou choisis un raccourci.
          </p>
        </header>

        {/* Chat central */}
        <section className="max-w-3xl mx-auto">
          <div
            className={
              "rounded-3xl border shadow-xl overflow-hidden backdrop-blur " +
              (isDark
                ? "border-slate-700 bg-slate-950/80 shadow-black/60"
                : "border-zinc-200 bg-white shadow-zinc-300/60")
            }
          >
            <div
              className={
                "px-5 py-3 border-b flex items-center justify-between gap-3 " +
                (isDark ? "border-slate-800" : "border-zinc-200")
              }
            >
              <div>
                <p
                  className={
                    "text-[11px] font-medium tracking-[0.18em] uppercase " +
                    (isDark ? "text-slate-400" : "text-zinc-500")
                  }
                >
                  Parlios · Core Chat
                </p>
              </div>
              <span
                className={
                  "text-[10px] px-2 py-1 rounded-full border " +
                  (isDark
                    ? "bg-emerald-900/30 text-emerald-300 border-emerald-500/50"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200")
                }
              >
                Prêt
              </span>
            </div>

            <div className="px-5 py-4 space-y-3 min-h-[220px]">
              {selectedMission && (
                <div
                  className={
                    "rounded-2xl px-4 py-3 text-xs sm:text-sm space-y-1.5 border " +
                    (isDark
                      ? "border-orange-500/70 bg-orange-900/20 text-amber-50"
                      : "border-orange-300 bg-orange-50 text-amber-900")
                  }
                >
                  <p
                    className={
                      "text-[11px] uppercase tracking-wide " +
                      (isDark ? "text-orange-200" : "text-orange-700")
                    }
                  >
                    Mode sélectionné
                  </p>
                  <p className="font-medium">{selectedMission.label}</p>
                  <p
                    className={
                      "text-[11px] " +
                      (isDark ? "text-amber-100/80" : "text-amber-900/80")
                    }
                  >
                    Décris ce que tu veux faire dans le champ ci-dessous. Parlios adaptera ses
                    questions et son plan à ce mode.
                  </p>
                </div>
              )}
            </div>

            <div
              className={
                "border-t px-4 py-3 sm:px-5 sm:py-4 " +
                (isDark ? "border-slate-800" : "border-zinc-200")
              }
            >
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => e.preventDefault()}
              >
                <textarea
                  className={
                    "min-h-[80px] max-h-[180px] resize-y rounded-2xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 border " +
                    (isDark
                      ? "bg-slate-950 border-slate-700 text-slate-50 placeholder:text-slate-500"
                      : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400")
                  }
                  placeholder='Ex : "Crée un site simple pour mon projet IA avec une page d’accueil et une page contact."'
                />
                <div className="flex items-center justify-between gap-3">
                  <p
                    className={
                      "text-[11px] " +
                      (isDark ? "text-slate-400" : "text-zinc-500")
                    }
                  >
                    Plus tard, ce chat sera relié à ton orchestrateur d&apos;agents Parlios.
                  </p>
                  <button
                    type="submit"
                    className={
                      "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium border transition " +
                      (isDark
                        ? "bg-orange-500 text-slate-950 border-orange-600 hover:bg-orange-400"
                        : "bg-orange-500 text-white border-orange-600 hover:bg-orange-400")
                    }
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Raccourcis */}
        <section className="space-y-3">
          <div className="text-center space-y-1">
            <p
              className={
                "text-[11px] font-semibold tracking-[0.25em] uppercase " +
                (isDark ? "text-slate-400" : "text-zinc-500")
              }
            >
              Raccourcis
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {MISSIONS.map((mission) => {
              const isActive = mission.id === selectedId;
              const base =
                "inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs sm:text-sm transition";
              if (isDark) {
                return (
                  <button
                    key={mission.id}
                    type="button"
                    onClick={() =>
                      setSelectedId((prev) =>
                        prev === mission.id ? null : mission.id
                      )
                    }
                    className={
                      base +
                      " " +
                      (isActive
                        ? "border-orange-400 bg-orange-500/20 text-orange-100"
                        : "border-slate-700 bg-slate-900/80 text-slate-100 hover:border-orange-400 hover:bg-orange-500/10")
                    }
                  >
                    {mission.label}
                  </button>
                );
              }
              return (
                <button
                  key={mission.id}
                  type="button"
                  onClick={() =>
                    setSelectedId((prev) =>
                      prev === mission.id ? null : mission.id
                    )
                  }
                  className={
                    base +
                    " " +
                    (isActive
                      ? "border-orange-500 bg-orange-100 text-orange-900"
                      : "border-zinc-300 bg-white text-zinc-800 hover:border-orange-400 hover:bg-orange-50")
                  }
                >
                  {mission.label}
                </button>
              );
            })}
          </div>

          <p
            className={
              "text-[11px] text-center " +
              (isDark ? "text-slate-400" : "text-zinc-500")
            }
          >
            Tu peux utiliser les raccourcis ou simplement écrire ton idée comme sur Kimi ou Skywork.
          </p>
        </section>

        <footer
          className={
            "pt-4 pb-6 text-center text-[11px] " +
            (isDark ? "text-slate-500" : "text-zinc-500")
          }
        >
          Parlios — optimise ton temps, libère ton potentiel.
        </footer>
      </div>
    </div>
  );
}
