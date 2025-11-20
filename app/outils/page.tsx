const TOOLS = [
  {
    id: "site-preview",
    name: "Site Preview IA",
    description:
      "Génère un hero de site et une structure de page à partir de quelques phrases.",
    status: "beta",
  },
  {
    id: "planner-ia",
    name: "Planner IA",
    description:
      "Propose une organisation de ta semaine en fonction de tes projets et priorités.",
    status: "soon",
  },
  {
    id: "inbox-ia",
    name: "Inbox IA",
    description:
      "Aide à traiter plus vite tes messages, mails et demandes en gardant ton style.",
    status: "soon",
  },
  {
    id: "content-lab",
    name: "Content Lab",
    description:
      "Idées et brouillons pour posts, emails, scripts vidéos et contenus.",
    status: "soon",
  },
];

export default function OutilsPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 md:px-0">
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
          Boîte à outils
        </p>
        <h1 className="text-3xl font-semibold text-slate-50">
          Les outils Parlios pour te faire gagner du temps.
        </h1>
        <p className="text-sm md:text-base text-slate-300">
          L&apos;objectif n&apos;est pas de te perdre dans un catalogue d&apos;apps, mais
          de te proposer quelques outils concrets, utiles, et simples à utiliser.
          Certains sont déjà accessibles, d&apos;autres arriveront au fur et à mesure.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {TOOLS.map((tool) => (
          <div
            key={tool.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-[0_0_24px_rgba(15,23,42,0.7)]"
          >
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-50">
                  {tool.name}
                </h2>
                <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-slate-400">
                  {tool.status}
                </span>
              </div>
              <p className="text-xs text-slate-300">{tool.description}</p>
            </div>
            <div className="mt-3">
              <button
                type="button"
                className="text-[0.7rem] font-semibold text-sky-400 hover:text-sky-300"
              >
                Ouvrir (bientôt)
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
