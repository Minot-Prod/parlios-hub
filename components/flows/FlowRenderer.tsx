"use client";

import { useEffect, useState } from "react";

type FlowInput = {
  id: string;
  type: string;
  label: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string; helper_text?: string }[];
  max_length?: number;
  maps_to_variable?: string | null;
};

type FlowStep = {
  id: string;
  title: string;
  subtitle?: string;
  component_type: string;
  inputs?: FlowInput[];
  summary_fields?: string[];
};

type FlowDefinition = {
  id: string;
  name: string;
  steps: FlowStep[];
};

export default function FlowRenderer({ flowId }: { flowId: string }) {
  const [flow, setFlow] = useState<FlowDefinition | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [values, setValues] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/flows?flowId=" + flowId);
        const json = await res.json();
        setFlow(json);
      } catch {
        setError("Erreur lors du chargement du flow.");
      }
    }
    load();
  }, [flowId]);

  function getFieldKey(input: FlowInput) {
    return input.maps_to_variable && input.maps_to_variable.length > 0
      ? input.maps_to_variable
      : input.id;
  }

  function updateValue(input: FlowInput, value: any) {
    const key = getFieldKey(input);
    setValues((prev) => ({
      ...prev,
      [key]: value
    }));
  }

  function goNext() {
    if (!flow) return;
    if (stepIndex < flow.steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  }

  function goPrev() {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  }

  async function generatePreview() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/site-preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputs: values })
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Erreur API");
      }

      const json = await res.json();
      setResult(json);
    } catch (e: any) {
      setError(e?.message ?? "Erreur inconnue pendant la génération.");
    } finally {
      setLoading(false);
    }
  }

  if (!flow) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-950 to-zinc-900">
        <p className="text-sm text-neutral-400">Chargement du flow Parlios Studio…</p>
      </div>
    );
  }

  const step = flow.steps[stepIndex];

  function renderInput(input: FlowInput) {
    const key = getFieldKey(input);
    const value = values[key] ?? "";

    if (input.type === "textarea") {
      return (
        <div key={input.id} className="space-y-2">
          <label className="text-xs font-medium text-neutral-200 uppercase tracking-[0.16em]">
            {input.label}
          </label>
          {input.description && (
            <p className="text-xs text-neutral-500">{input.description}</p>
          )}
          <textarea
            className="bg-neutral-950/70 border border-neutral-800 rounded-xl px-3 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 min-h-[80px]"
            placeholder={input.placeholder}
            maxLength={input.max_length}
            value={value}
            onChange={(e) => updateValue(input, e.target.value)}
          />
        </div>
      );
    }

    if (input.type === "select") {
      return (
        <div key={input.id} className="space-y-2">
          <label className="text-xs font-medium text-neutral-200 uppercase tracking-[0.16em]">
            {input.label}
          </label>
          {input.description && (
            <p className="text-xs text-neutral-500">{input.description}</p>
          )}
          <select
            className="bg-neutral-950/70 border border-neutral-800 rounded-xl px-3 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
            value={value || ""}
            onChange={(e) => updateValue(input, e.target.value)}
          >
            <option value="">Choisir…</option>
            {input.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (input.type === "select_cards" || input.type === "select_cards_multi") {
      const isMulti = input.type === "select_cards_multi";
      const currentValue = value ?? (isMulti ? [] : "");

      function toggleOption(optValue: string) {
        if (!isMulti) {
          updateValue(input, optValue);
          return;
        }
        const arr = Array.isArray(currentValue) ? currentValue : [];
        if (arr.includes(optValue)) {
          updateValue(
            input,
            arr.filter((v: string) => v !== optValue)
          );
        } else {
          updateValue(input, [...arr, optValue]);
        }
      }

      return (
        <div key={input.id} className="space-y-2">
          <label className="text-xs font-medium text-neutral-200 uppercase tracking-[0.16em]">
            {input.label}
          </label>
          {input.description && (
            <p className="text-xs text-neutral-500 mb-1">
              {input.description}
            </p>
          )}
          <div className="grid gap-3 md:grid-cols-2">
            {input.options?.map((opt) => {
              const active = isMulti
                ? currentValue.includes(opt.value)
                : currentValue === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => toggleOption(opt.value)}
                  className={`text-left rounded-xl px-3 py-3 text-sm border transition ${
                    active
                      ? "border-cyan-400 bg-cyan-500/10"
                      : "border-neutral-800 bg-neutral-950/70 hover:border-neutral-600 hover:bg-neutral-900"
                  }`}
                >
                  <div className="font-medium text-neutral-50">
                    {opt.label}
                  </div>
                  {opt.helper_text && (
                    <div className="text-xs text-neutral-400 mt-1">
                      {opt.helper_text}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div key={input.id} className="space-y-2">
        <label className="text-xs font-medium text-neutral-200 uppercase tracking-[0.16em]">
          {input.label}
        </label>
        {input.description && (
          <p className="text-xs text-neutral-500">{input.description}</p>
        )}
        <input
          className="bg-neutral-950/70 border border-neutral-800 rounded-xl px-3 py-2 w-full text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400"
          placeholder={input.placeholder}
          maxLength={input.max_length}
          value={value}
          onChange={(e) => updateValue(input, e.target.value)}
        />
      </div>
    );
  }

  function renderLeftPanel() {
    const step = flow!.steps[stepIndex];

    if (step.component_type === "summary_step") {
      const fields = step.summary_fields ?? [];
      return (
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-50 mb-1">
              {step.title}
            </h1>
            {step.subtitle && (
              <p className="text-sm text-neutral-400">{step.subtitle}</p>
            )}
          </div>

          <div className="space-y-2 bg-neutral-950/70 border border-neutral-800 rounded-2xl p-4 text-xs">
            {fields.map((fieldKey) => (
              <div
                key={fieldKey}
                className="flex justify-between gap-3 border-b border-neutral-900 last:border-b-0 py-1"
              >
                <span className="text-neutral-500">{fieldKey}</span>
                <span className="text-neutral-100 max-w-[55%] text-right">
                  {values[fieldKey] ?? "—"}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={generatePreview}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-medium text-white shadow-lg disabled:opacity-60"
          >
            {loading ? "Génération…" : "Générer l’aperçu"}
          </button>
        </div>
      );
    }

    if (step.component_type === "preview_step") {
      return (
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-neutral-50 mb-1">
            {step.title}
          </h1>
          {step.subtitle && (
            <p className="text-sm text-neutral-400">{step.subtitle}</p>
          )}
          <p className="text-xs text-neutral-500">
            L’aperçu généré s’affiche dans le panneau de droite.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-50 mb-1">
            {step.title}
          </h1>
          {step.subtitle && (
            <p className="text-sm text-neutral-400">{step.subtitle}</p>
          )}
        </div>
        <div className="space-y-4">
          {step.inputs?.map((input) => renderInput(input))}
        </div>
      </div>
    );
  }

  function renderRightPanel() {
    if (!result) {
      return (
        <div className="h-full flex items-center justify-center text-sm text-neutral-500">
          Remplis le flow à gauche puis génère un aperçu pour voir le résultat ici.
        </div>
      );
    }

    const hero = result.hero;
    const palette = result.palette;
    const meta = result.meta;

    if (!hero || !palette) {
      return (
        <pre className="bg-neutral-950/80 rounded-2xl p-4 text-xs overflow-auto h-full border border-neutral-800">
          {JSON.stringify(result, null, 2)}
        </pre>
      );
    }

    return (
      <div className="flex flex-col gap-4 h-full">
        <div
          className="rounded-2xl p-6 border border-neutral-800 shadow-[0_18px_45px_rgba(0,0,0,0.9)]"
          style={{
            background: palette.background_color || "#020617",
            color: palette.text_color || "#F9FAFB"
          }}
        >
          <div className="text-xs uppercase tracking-[0.16em] mb-3 text-neutral-300 flex items-center gap-2">
            <span className="inline-flex h-1.5 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
            Aperçu Hero
          </div>
          <h2 className="text-2xl font-semibold mb-2">{hero.title}</h2>
          <p className="text-sm opacity-80 mb-5">{hero.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-neutral-950"
            >
              {hero.cta_main}
            </button>
            <button
              className="px-4 py-2 rounded-lg text-sm border bg-transparent"
              style={{
                borderColor: palette.accent_color || "#FACC15",
                color: palette.text_color || "#F9FAFB"
              }}
            >
              {hero.cta_secondary}
            </button>
          </div>
          <p className="mt-4 text-[11px] opacity-60">
            Style visuel suggéré : {hero.visual_style}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-[11px] bg-neutral-950/80 border border-neutral-800 rounded-2xl p-4">
          <div className="space-y-1">
            <div className="text-neutral-500">Marque</div>
            <div className="text-neutral-100">{meta?.brand_name}</div>
          </div>
          <div className="space-y-1">
            <div className="text-neutral-500">Objectif</div>
            <div className="text-neutral-100">{meta?.site_goal}</div>
          </div>
          <div className="space-y-1">
            <div className="text-neutral-500">Vibe</div>
            <div className="text-neutral-100">{meta?.vibe}</div>
          </div>
          <div className="space-y-1">
            <div className="text-neutral-500">Audience</div>
            <div className="text-neutral-100 line-clamp-2">
              {meta?.target_audience}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-zinc-900 text-neutral-50">
      <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 flex items-center justify-center text-xs font-bold">
              P
            </div>
            <div>
              <div className="flex items-center gap-2 text-[10px] text-neutral-400 uppercase tracking-[0.16em]">
                <span className="text-cyan-400">Parlios Studio</span>
                <span>·</span>
                <span>Site Preview v1</span>
              </div>
              <p className="text-sm text-neutral-300">
                Configure une Hero en quelques choix, sans écrire un prompt.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span className="px-2 py-1 rounded-full border border-neutral-800 bg-neutral-950/60">
              Étape {stepIndex + 1} / {flow.steps.length}
            </span>
          </div>
        </header>

        {error && (
          <div className="text-xs text-red-300 bg-red-950/50 border border-red-800 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6 items-start">
          <section className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.95)]">
            {renderLeftPanel()}

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-neutral-900 text-xs">
              <button
                onClick={goPrev}
                disabled={stepIndex === 0}
                className="px-3 py-1.5 rounded-lg border border-neutral-800 text-neutral-300 disabled:opacity-40 hover:border-neutral-600 hover:bg-neutral-900"
              >
                Étape précédente
              </button>

              <span className="text-neutral-500">
                Flow : <span className="text-neutral-300">{flow.name}</span>
              </span>

              <button
                onClick={goNext}
                disabled={stepIndex >= flow.steps.length - 1}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-500"
              >
                Étape suivante
              </button>
            </div>
          </section>

          <aside className="bg-neutral-950/80 border border-neutral-800 rounded-2xl p-5 min-h-[260px] shadow-[0_30px_80px_rgba(0,0,0,0.95)]">
            {renderRightPanel()}
          </aside>
        </div>
      </div>
    </div>
  );
}
