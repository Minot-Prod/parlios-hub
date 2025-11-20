"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-black text-white">
      {/* Image de fond pleine page */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-parlios.png)" }}
      />
      {/* Overlay pour lisibilité */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 flex flex-col gap-10">
        <div className="space-y-5 max-w-2xl">
          <h1 className="text-5xl sm:text-6xl font-semibold leading-tight">
            Parlios
          </h1>
          <p className="text-2xl sm:text-3xl font-medium">
            Reprenez le contrôle de votre temps.
          </p>
          <p className="text-sm sm:text-base text-zinc-100/90 max-w-xl">
            La plateforme IA qui simplifie votre quotidien d&apos;entrepreneur :
            moins de charge mentale, plus de clarté, et des outils qui
            travaillent vraiment pour vous.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/hub"
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium bg-white text-black hover:bg-zinc-100 transition border border-white/10"
          >
            Découvrir Parlios
          </Link>
          <Link
            href="/outils"
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium bg-transparent text-white border border-white/40 hover:bg-white/10 transition"
          >
            Tester les outils gratuits
          </Link>
        </div>
      </div>
    </div>
  );
}
