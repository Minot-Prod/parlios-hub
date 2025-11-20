export default function CommunautePage() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-10 md:px-0">
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
          Communauté
        </p>
        <h1 className="text-3xl font-semibold text-slate-50">
          Parlios comme maison des entrepreneurs.
        </h1>
        <p className="text-sm md:text-base text-slate-300">
          L&apos;objectif n&apos;est pas seulement d&apos;avoir un bon outil, mais de
          rassembler des personnes qui partagent les mêmes questions: comment
          avancer, se structurer et tenir sur la durée avec l&apos;IA comme
          alliée.
        </p>
      </section>

      <section className="space-y-3 text-sm text-slate-300">
        <p>
          À terme, cette page donnera accès aux espaces d&apos;échanges: serveur
          communautaire, sessions partagées, projets collectifs et autres
          initiatives qui émergeront autour de Parlios.
        </p>
        <p>
          L&apos;idée est simple: que personne ne construise seul, face à son
          écran, sans feedback ni soutien. Parlios veut être un endroit où
          l&apos;on peut poser ses questions, partager ses avancées et se sentir
          légitime dans son parcours.
        </p>
      </section>
    </div>
  );
}
