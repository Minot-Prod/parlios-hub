"use client";

import * as React from "react";

type FlowRendererProps = {
  className?: string;
  [key: string]: any;
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

const steps = [
  { id: 1, label: "Structure" },
  { id: 2, label: "Identité" },
  { id: 3, label: "Preview" },
];

const FlowRenderer: React.FC<FlowRendererProps> = ({ className, ...props }) => {
  const [activeStep, setActiveStep] = React.useState<number>(1);
  const [title, setTitle] = React.useState<string>("Titre de ton site");
  const [subtitle, setSubtitle] = React.useState<string>(
    "Explique en une phrase la promesse principale."
  );
  const [accentColor, setAccentColor] = React.useState<string>("#22c55e");
  const [primaryGoal, setPrimaryGoal] = React.useState<string>("landing_simple");
  const [heroImageUrl, setHeroImageUrl] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [saveStatus, setSaveStatus] = React.useState<SaveStatus>("idle");

  React.useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        const res = await fetch("/api/flows?flowId=site_preview_v1");
        if (!res.ok) return;
        const json: any = await res.json();

        const flow = (json?.flow ?? json?.data ?? json) as any;
        if (!flow || cancelled) return;

        if (typeof flow.heroTitle === "string") {
          setTitle(flow.heroTitle);
        } else if (typeof flow.title === "string") {
          setTitle(flow.title);
        }

        if (typeof flow.heroSubtitle === "string") {
          setSubtitle(flow.heroSubtitle);
        } else if (typeof flow.subtitle === "string") {
          setSubtitle(flow.subtitle);
        }

        if (typeof flow.accentColor === "string") {
          setAccentColor(flow.accentColor);
        }

        if (typeof flow.primaryGoal === "string") {
          setPrimaryGoal(flow.primaryGoal);
        }

        if (typeof flow.heroImageUrl === "string") {
          setHeroImageUrl(flow.heroImageUrl);
        }
      } catch {
      }
    };

    bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  const goNext = () => {
    setActiveStep((prev) => (prev < steps.length ? prev + 1 : prev));
  };

  const goPrev = () => {
    setActiveStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleGenerateHero = async () => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/site-preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flowId: "site_preview_v1",
          hero: {
            title,
            subtitle,
            accentColor,
            primaryGoal,
          },
          meta: {
            source: "site-preview/flow",
            activeStep,
          },
        }),
      });

      if (res.ok) {
        const data: any = await res.json();
        const hero = data?.hero ?? data;

        if (typeof hero?.title === "string") {
          setTitle(hero.title);
        }
        if (typeof hero?.subtitle === "string") {
          setSubtitle(hero.subtitle);
        }
        if (typeof hero?.accentColor === "string") {
          setAccentColor(hero.accentColor);
        }
        if (typeof hero?.imageUrl === "string") {
          setHeroImageUrl(hero.imageUrl);
        }
      }

      setActiveStep(3);
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async () => {
    setSaveStatus("saving");

    try {
      const res = await fetch("/api/flows?flowId=site_preview_v1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flowId: "site_preview_v1",
          hero: {
            title,
            subtitle,
            accentColor,
            imageUrl: heroImageUrl,
          },
          primaryGoal,
          lastStep: activeStep,
        }),
      });

      if (!res.ok) {
        throw new Error("Save failed");
      }

      setSaveStatus("saved");
      setTimeout(() => {
        setSaveStatus("idle");
      }, 2000);
    } catch {
      setSaveStatus("error");
      setTimeout(() => {
        setSaveStatus("idle");
      }, 3000);
    }
  };

  const renderStepContent = () => {
    if (activeStep === 1) {
      return (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Step 1 · Structure
          </h3>
          <p className="text-sm text-slate-300">
            On définit la structure de base de ton site. Rien de figé, juste un cadre
            pour la suite.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPrimaryGoal("landing_simple")}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                primaryGoal === "landing_simple"
                  ? "border-sky-400 bg-sky-500/10 text-sky-100"
                  : "border-slate-700 bg-slate-900/60 text-slate-200 hover:border-slate-500 hover:bg-slate-900"
              }`}
            >
              <span className="font-medium">Landing simple</span>
              <span className="text-xs text-slate-400">Hero + sections</span>
            </button>
            <button
              type="button"
              onClick={() => setPrimaryGoal("story_onepage")}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                primaryGoal === "story_onepage"
                  ? "border-sky-400 bg-sky-500/10 text-sky-100"
                  : "border-slate-800 bg-slate-950/60 text-slate-200 hover:border-slate-500 hover:bg-slate-900"
              }`}
            >
              <span className="font-medium">One-page story</span>
              <span className="text-xs text-slate-400">Narratif, scroll linéaire</span>
            </button>
          </div>
        </div>
      );
    }

    if (activeStep === 2) {
      return (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Step 2 · Identité
          </h3>
          <p className="text-sm text-slate-300">
            Donne à l&apos;IA les infos minimales pour générer un hero crédible.
          </p>

          <div className="space-y-3">
            <label className="block text-xs font-medium text-slate-300">
              Titre principal
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                placeholder="Ex: Planifie ta semaine avec une IA concrète"
              />
            </label>

            <label className="block text-xs font-medium text-slate-300">
              Sous-titre
              <textarea
                value={subtitle}
                onChange={(event) => setSubtitle(event.target.value)}
                rows={3}
                className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none"
                placeholder="Ex: Explique en une phrase à qui s&apos;adresse l&apos;outil et ce qu&apos;il débloque."
              />
            </label>

            <label className="flex items-center justify-between gap-4 text-xs font-medium text-slate-300">
              Couleur d&apos;accent
              <div className="flex items-center gap-2">
                <div
                  className="h-6 w-6 rounded-full border border-slate-700"
                  style={{ backgroundColor: accentColor }}
                />
                <input
                  type="color"
                  value={accentColor}
                  onChange={(event) => setAccentColor(event.target.value)}
                  className="h-8 w-16 cursor-pointer rounded-md border border-slate-700 bg-slate-900/70"
                />
              </div>
            </label>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Step 3 · Preview
        </h3>
        <p className="text-sm text-slate-300">
          Tu vois à droite le hero généré à partir des infos ci-dessus. Quand l&apos;API
          sera branchée, ce bloc restera identique: seule la source des données changera.
        </p>
        <p className="text-xs text-slate-500">
          Actuellement, le rendu est robuste: layout local, mais on consomme l&apos;API
          dès qu&apos;elle est dispo pour enrichir le hero (image, palette, etc.).
        </p>
      </div>
    );
  };

  let saveLabel = "Sauvegarder";
  if (saveStatus === "saving") saveLabel = "Sauvegarde...";
  if (saveStatus === "saved") saveLabel = "Sauvegardé ✓";
  if (saveStatus === "error") saveLabel = "Erreur de sauvegarde";

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        {saveStatus === "saving" && (
          <div className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs shadow-xl">
            Sauvegarde en cours...
          </div>
        )}
        {saveStatus === "saved" && (
          <div className="bg-emerald-500 border border-emerald-400 text-slate-900 px-3 py-1.5 rounded-lg text-xs shadow-xl">
            Sauvegardé ✓
          </div>
        )}
        {saveStatus === "error" && (
          <div className="bg-red-500 border border-red-400 text-slate-900 px-3 py-1.5 rounded-lg text-xs shadow-xl">
            Erreur de sauvegarde
          </div>
        )}
      </div>

      <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-slate-950/60 backdrop-blur-xl">
          <div className="flex items-stretch justify-between border-b border-slate-800 px-6 py-4 md:px-8">
            <div className="space-y-1">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-sky-400">
                Parlios · Site Preview
              </p>
              <h1 className="text-lg md:text-xl font-semibold text-slate-50">
                Flow builder <span className="text-xs font-normal text-slate-400">v1 · Stable</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className="rounded-full border border-slate-600 bg-slate-900/80 px-4 py-1.5 text-xs font-medium text-slate-100 hover:border-sky-400 hover:text-sky-100 hover:bg-slate-900 transition disabled:opacity-60"
              >
                {saveLabel}
              </button>
              <button
                type="button"
                onClick={() => (window.location.href = "/site-preview/live")}
                className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400 transition"
              >
                Publier
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <section className="p-6 md:p-8 space-y-6">
              <nav className="flex items-center gap-3 text-xs font-medium text-slate-300">
                {steps.map((step) => {
                  const isActive = step.id === activeStep;
                  const isDone = step.id < activeStep;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setActiveStep(step.id)}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition ${
                        isActive
                          ? "border-sky-400 bg-sky-500/10 text-sky-100"
                          : isDone
                          ? "border-emerald-500/70 bg-emerald-500/5 text-emerald-200"
                          : "border-slate-700 bg-slate-900/70 text-slate-400 hover:border-slate-500"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[0.7rem] ${
                          isDone
                            ? "bg-emerald-500 text-slate-950"
                            : isActive
                            ? "bg-sky-500 text-slate-950"
                            : "bg-slate-800 text-slate-300"
                        }`}
                      >
                        {isDone ? "✓" : step.id}
                      </span>
                      <span>{step.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="border border-slate-800/80 bg-slate-950/40 rounded-2xl p-4 md:p-5 space-y-6">
                {renderStepContent()}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col gap-1 text-[0.7rem] text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.8)]" />
                      <span>Build opérationnel · Tailwind chargé</span>
                    </div>
                    <div>
                      <span className="text-slate-500">
                        Flow ID: <span className="text-slate-300">site_preview_v1</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goPrev}
                      disabled={activeStep === 1}
                      className="rounded-full border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-500 disabled:opacity-40 disabled:hover:border-slate-700"
                    >
                      Précédent
                    </button>
                    {activeStep < steps.length && (
                      <button
                        type="button"
                        onClick={goNext}
                        className="rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-white transition"
                      >
                        Continuer
                      </button>
                    )}
                    {activeStep === 2 && (
                      <button
                        type="button"
                        onClick={handleGenerateHero}
                        disabled={isSubmitting}
                        className="rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold text-slate-950 hover:bg-sky-400 transition disabled:opacity-50"
                      >
                        {isSubmitting ? "Génération..." : "Générer le hero IA"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <aside className="p-6 md:p-8 bg-gradient-to-b from-slate-900 to-slate-950">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-[0.24em]">
                  Live preview
                </p>
                <span className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-[0.65rem] font-medium text-slate-400">
                  {heroImageUrl ? "API · IA Hero" : "Mock · Local data"}
                </span>
              </div>

              <div className="relative rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5 shadow-lg shadow-slate-950/70 overflow-hidden">
                {heroImageUrl && (
                  <div className="absolute inset-0 opacity-[0.18]">
                    <div className="absolute inset-4 overflow-hidden rounded-3xl">
                      <img
                        src={heroImageUrl}
                        alt="Hero IA"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/60 to-transparent" />
                  </div>
                )}

                <div
                  className="pointer-events-none absolute inset-x-[-40%] top-[-40%] h-48 opacity-40 blur-3xl"
                  style={{
                    backgroundImage: `radial-gradient(circle at 0 0, ${accentColor}, transparent 55%), radial-gradient(circle at 100% 0, #0ea5e9, transparent 55%)`,
                  }}
                />
                <div className="relative space-y-4">
                  <div className="flex items-center gap-2 text-[0.7rem] text-slate-300">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    <span>Hero preview</span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-semibold text-slate-50 leading-snug">
                    {title || "Titre de ton site"}
                  </h2>
                  <p className="text-sm text-slate-200/90">
                    {subtitle ||
                      "Ajoute une phrase claire sur ce que Parlios débloque pour ta cible."}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      className="rounded-full px-4 py-2 text-xs font-semibold text-slate-950"
                      style={{ backgroundColor: accentColor }}
                    >
                      Call-to-action principal
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-slate-600 px-4 py-2 text-xs font-semibold text-slate-100 bg-slate-900/80"
                    >
                      Secondaire
                    </button>
                  </div>

                  <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/80 px-3 py-2 text-[0.7rem] text-slate-400 flex items-center justify-between">
                    <span>
                      Layout généré par l&apos;IA (bientôt branché sur /api/site-preview)
                    </span>
                    <span className="text-[0.65rem] text-slate-500">
                      v1 · Local + API-safe
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowRenderer;
