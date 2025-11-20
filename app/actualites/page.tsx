export default function ActualitesPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-10 md:px-0">
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
          Actualités & ressources
        </p>
        <h1 className="text-3xl font-semibold text-slate-50">
          Rester à jour sans s&apos;épuiser.
        </h1>
        <p className="text-sm md:text-base text-slate-300">
          Ici, l&apos;objectif sera de regrouper les informations utiles pour
          les entrepreneurs: actualités IA, ressources pratiques, subventions
          et dispositifs d&apos;accompagnement pertinents.
        </p>
      </section>

      <section className="space-y-3 text-sm text-slate-300">
        <p>
          L&apos;accent sera mis sur la clarté: peu d&apos;infos, mais bien filtrées,
          compréhensibles, et directement actionnables, sans jargon inutile.
        </p>
        <p>
          À terme, cette section pourra être alimentée par une veille IA
          automatisée, connectée aux outils et agents Parlios.
        </p>
      </section>
    </div>
  );
}
