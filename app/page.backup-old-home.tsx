"use client";

import * as React from "react";
import ParliosChatShell from "../components/ParliosChatShell";
import ParliosSwarm from "../components/agents/ParliosSwarm";
import AvatarParlios from "../components/agents/AvatarParlios";

export default function Page() {
  const [thinking, setThinking] = React.useState(false);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
      {/* Fourmilière d'agents en arrière-plan */}
      <ParliosSwarm activePulse={thinking} />

      {/* Gradient global doux */}
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen">
        <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-sky-500/30 blur-3xl" />
        <div className="absolute -bottom-52 -right-10 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl" />
      </div>

      {/* Contenu principal */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10 md:flex-row md:items-center">
        {/* Colonne gauche : titre + fenêtre de chat */}
        <section className="flex-[1.3] flex flex-col gap-6">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
              PARLIOS · HUB IA
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">
              Parle au coeur de Parlios.
            </h1>
            <p className="text-sm md:text-base text-slate-300 max-w-xl">
              Fenêtre centrale du système : comme un ChatGPT, mais connectée à
              ta future ville d&apos;agents, tes outils et tes projets. En
              arrière-plan, la fourmilière Parlios vit en continu.
            </p>
          </header>

          <ParliosChatShell onThinkingChange={setThinking} />
        </section>

        {/* Colonne droite : grand avatar Parlios debout */}
        <aside className="flex-[0.9] w-full md:w-auto flex justify-center md:justify-end">
          <AvatarParlios thinking={thinking} />
        </aside>
      </main>
    </div>
  );
}
