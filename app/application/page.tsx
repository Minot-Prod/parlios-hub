export default function ApplicationParliosPage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-10 md:px-0">
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
          Application Parlios
        </p>
        <h1 className="text-3xl font-semibold text-slate-50">
          Le Hub IA au centre de tout.
        </h1>
        <p className="text-sm md:text-base text-slate-300">
          L&apos;application Parlios, c&apos;est la partie &quot;cerveau&quot; du projet:
          un chat central, des agents qui travaillent en coulisse et des outils
          connectés à ton quotidien.
        </p>
      </section>

      <section className="space-y-4 text-sm text-slate-300">
        <p>
          Depuis le Hub, tu peux discuter avec une IA qui comprend le contexte
          de tes projets, t&apos;aide à structurer tes idées et te propose des
          actions concrètes. Derrière, des agents Parlios spécialisés se
          chargent des différentes tâches: contenu, organisation, ventes,
          veille, etc.
        </p>
        <p>
          La page d&apos;accueil que tu vois actuellement avec la fenêtre de chat
          est une première version de ce Hub. Le but est de le faire évoluer
          progressivement, sans perdre la simplicité qui fait la force de
          Parlios.
        </p>
      </section>
    </div>
  );
}
