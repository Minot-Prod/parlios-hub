"use client";

import * as React from "react";

type AvatarParliosProps = {
  thinking?: boolean;
};

const AvatarParlios: React.FC<AvatarParliosProps> = ({ thinking = false }) => {
  return (
    <div className="w-full md:w-80 rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-2xl px-5 py-6 flex flex-col gap-4 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
      <header className="space-y-1">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-sky-400">
          Avatar Parlios
        </p>
        <p className="text-xs text-slate-400">
          Entité semi-organique · énergie + flux lumineux. Représente le coeur du Hub.
        </p>
      </header>

      <div className="relative mt-2 flex items-center justify-center">
        {/* Halo externe */}
        <div className="absolute h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />

        {/* Aura latérale */}
        <div className="absolute h-56 w-56 rounded-full bg-gradient-to-tr from-sky-500/20 via-emerald-400/10 to-violet-500/20 blur-2xl" />

        {/* Corps principal */}
        <div
          className={
            "relative h-56 w-28 rounded-[999px] bg-gradient-to-b from-sky-400 via-emerald-300 to-violet-400 shadow-[0_0_40px_rgba(56,189,248,0.7)] " +
            (thinking
              ? "opacity-100 shadow-[0_0_70px_rgba(56,189,248,1)]"
              : "opacity-90")
          }
        >
          {/* Colonne d'énergie centrale */}
          <div className="absolute inset-x-[22%] top-[10%] bottom-[10%] rounded-[999px] bg-gradient-to-b from-slate-50/80 via-cyan-200/80 to-emerald-200/40 blur-[1px]" />

          {/* Flux horizontaux */}
          <div className="absolute left-[10%] right-[10%] top-[26%] h-[1px] bg-gradient-to-r from-transparent via-sky-200/80 to-transparent opacity-80" />
          <div className="absolute left-[6%] right-[6%] top-[45%] h-[1px] bg-gradient-to-r from-transparent via-emerald-200/70 to-transparent opacity-80" />
          <div className="absolute left-[14%] right-[14%] top-[64%] h-[1px] bg-gradient-to-r from-transparent via-violet-200/70 to-transparent opacity-80" />

          {/* Coeur lumineux */}
          <div
            className={
              "absolute left-1/2 top-[30%] h-10 w-10 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_40px_rgba(125,211,252,1)] " +
              (thinking ? "animate-pulse" : "")
            }
          />

          {/* Tête / noyau supérieur */}
          <div className="absolute left-1/2 -top-5 h-10 w-10 -translate-x-1/2 rounded-3xl bg-gradient-to-tr from-sky-500 via-emerald-400 to-violet-500 shadow-[0_0_28px_rgba(56,189,248,0.9)]" />
        </div>

        {/* Particules d'énergie autour de l'avatar */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-1 left-6 h-2 w-2 rounded-full bg-sky-300/80 blur-[1px] animate-pulse" />
          <div className="absolute top-6 -right-1 h-2 w-2 rounded-full bg-emerald-300/80 blur-[1px] animate-pulse" />
          <div className="absolute bottom-3 left-3 h-2 w-2 rounded-full bg-violet-300/80 blur-[1px] animate-pulse" />
        </div>
      </div>

      <footer className="text-[0.65rem] text-slate-400 space-y-1">
        <p>
          Quand tu discutes dans la fenêtre centrale, c&apos;est cet avatar qui
          incarne la réponse de tout le système Parlios.
        </p>
        <p className="text-sky-300">
          Quand il brille fort, la fourmilière d&apos;agents travaille en
          intensif derrière toi.
        </p>
      </footer>
    </div>
  );
};

export default AvatarParlios;
