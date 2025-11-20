"use client";

import * as React from "react";

export default function LivePreviewPage() {
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = await fetch("/api/flows?flowId=site_preview_v1");
        if (!res.ok) return;

        const json = await res.json();
        setData(json?.flow ?? json?.data ?? json);
      } catch {}
    };

    bootstrap();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
        <p className="animate-pulse text-slate-400">Chargement du site...</p>
      </div>
    );
  }

  const accentColor = data.accentColor || "#22c55e";

  const title =
    data?.hero?.title ??
    data?.title ??
    "Titre de ton site";

  const subtitle =
    data?.hero?.subtitle ??
    data?.subtitle ??
    "Explique en une phrase la promesse principale.";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative w-full min-h-[75vh] flex items-center justify-center px-6 py-20">

        {data.heroImageUrl && (
          <div className="absolute inset-0 opacity-[0.35]">
            <img
              src={data.heroImageUrl}
              alt="Hero AI"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/70 to-transparent" />
          </div>
        )}

        <div className="relative max-w-3xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            {title}
          </h1>

          <p className="text-lg text-slate-300">
            {subtitle}
          </p>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              className="rounded-full px-6 py-3 text-sm font-semibold text-slate-950"
              style={{ backgroundColor: accentColor }}
            >
              Continuer
            </button>

            <button className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-slate-100 bg-slate-900/80">
              En savoir plus
            </button>
          </div>
        </div>

      </section>
    </div>
  );
}
