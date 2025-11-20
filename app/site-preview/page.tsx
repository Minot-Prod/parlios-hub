"use client";

import { useState } from "react";

type SitePreviewInputs = {
  brand_name: string;
  business_description: string;
  primary_offer: string;
  target_audience: string;
  industry: string;
  site_goal: string;
  vibe: string;
  hero_style: string;
  logo_description?: string;
};

type SitePreviewResponse = {
  status: string;
  hero: {
    title: string;
    subtitle: string;
    cta_main: string;
    cta_secondary: string;
    visual_style: string;
  };
  palette: {
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    background_color: string;
    text_color: string;
  };
  meta: {
    brand_name: string;
    target_audience: string;
    site_goal: string;
    vibe: string;
  };
};

const defaultInputs: SitePreviewInputs = {
  brand_name: "Parlios",
  business_description: "J’aide les entrepreneurs à gagner du temps grâce à l’IA.",
  primary_offer: "Outils IA simples pour entrepreneurs",
  target_audience: "Nouveaux entrepreneurs francophones qui veulent gagner du temps",
  industry: "coaching",
  site_goal: "présenter_un_service",
  vibe: "premium",
  hero_style: "fond_dégradé"
};

export default function SitePreviewPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SitePreviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/site-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: defaultInputs })
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Erreur API");
      }

      const json = (await res.json()) as SitePreviewResponse;
      setData(json);
    } catch (e: any) {
      setError(e?.message ?? "Erreur inconnue");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-2">Site Preview – Prototype</h1>
      <p className="text-sm text-neutral-400 mb-6">
        Cette page utilise le flow <code>site_preview_v1</code> et l’endpoint <code>/api/site-preview</code>.
      </p>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm disabled:opacity-60"
      >
        {loading ? "Génération en cours..." : "Générer un aperçu avec les valeurs par défaut"}
      </button>

      {error && (
        <div className="mt-4 text-sm text-red-400">
          Erreur : {error}
        </div>
      )}

      {data && (
        <section className="mt-8 space-y-6">
          <div className="border border-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Hero générée</h2>
            <div className="rounded-lg p-6" style={{ background: data.palette.background_color, color: data.palette.text_color }}>
              <h3 className="text-2xl font-bold mb-2">{data.hero.title}</h3>
              <p className="mb-4 text-sm">{data.hero.subtitle}</p>
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 rounded-md text-sm"
                  style={{ background: data.palette.primary_color, color: data.palette.text_color }}
                >
                  {data.hero.cta_main}
                </button>
                <button
                  className="px-4 py-2 rounded-md border text-sm"
                  style={{ borderColor: data.palette.accent_color, color: data.palette.text_color }}
                >
                  {data.hero.cta_secondary}
                </button>
              </div>
              <p className="mt-4 text-xs opacity-70">
                Style visuel suggéré : {data.hero.visual_style}
              </p>
            </div>
          </div>

          <div className="border border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">Palette</h2>
            <div className="flex gap-3 flex-wrap">
              {Object.entries(data.palette).map(([key, value]) => (
                <div key={key} className="flex flex-col items-start text-xs">
                  <div
                    className="w-14 h-8 rounded-md border border-neutral-700 mb-1"
                    style={{ background: value }}
                  />
                  <span className="text-neutral-400">{key}</span>
                  <span className="font-mono text-[10px]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-neutral-800 rounded-xl p-6 text-sm">
            <h2 className="text-lg font-semibold mb-2">Meta</h2>
            <p><span className="text-neutral-400">Marque :</span> {data.meta.brand_name}</p>
            <p><span className="text-neutral-400">Audience :</span> {data.meta.target_audience}</p>
            <p><span className="text-neutral-400">Objectif :</span> {data.meta.site_goal}</p>
            <p><span className="text-neutral-400">Vibe :</span> {data.meta.vibe}</p>
          </div>
        </section>
      )}
    </main>
  );
}
