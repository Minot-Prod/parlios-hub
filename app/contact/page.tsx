export default function ContactPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 md:px-0">
      <section className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">
          Contact
        </p>
        <h1 className="text-3xl font-semibold text-slate-50">
          Entrer en contact avec Parlios.
        </h1>
        <p className="text-sm md:text-base text-slate-300">
          Une adresse simple, sans tunnel compliqué. Cette page pourra proposer
          un formulaire ou rediriger vers les canaux de contact actifs
          (email, communauté, etc.).
        </p>
      </section>

      <section className="space-y-3 text-sm text-slate-300">
        <p>
          Pour l&apos;instant, le plus simple est de définir ici un canal
          privilégié (email ou réseau principal) et de clarifier ce pour quoi
          les gens peuvent te contacter: questions, retours sur Parlios,
          collaborations, etc.
        </p>
      </section>
    </div>
  );
}
