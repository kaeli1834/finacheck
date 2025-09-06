export const metadata = {
  title: "Mentions légales | FinaCheck",
  description:
    "Éditeur, hébergeur, propriété intellectuelle et responsabilité.",
};

import Link from "next/link";

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 prose prose-slate dark:prose-invert">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-600 transition"
        >
          ← Retour
        </Link>
      </div>
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold mb-2">Mentions légales</h1>
        <p className="text-slate-500 dark:text-slate-400 text-base">
          Informations légales et contacts pour FinaCheck.
        </p>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Éditeur du site</h2>
        <ul className="list-none pl-0 space-y-1">
          <li>
            <strong>FinaCheck</strong> — Édité par <strong>Kaeli1834</strong>
          </li>
          <li>
            Contact :{" "}
            <a
              href="mailto:contact@getkaeli.com"
              className="text-blue-600 underline"
            >
              <strong>contact@getkaeli.com</strong>
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Hébergeur</h2>
        <ul className="list-none pl-0 space-y-1">
          <li>
            <strong>Vercel Inc.</strong> — 440 N Barranca Ave #4133, Covina, CA
            91723, USA.
          </li>
          <li>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              vercel.com
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Propriété intellectuelle</h2>
        <p>
          Les contenus du site (textes, UI, marque <strong>FinaCheck</strong>)
          sont protégés. Les règles de finançabilité sont publiques ;
          l’implémentation de calcul (moteur serveur) reste propriétaire.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Responsabilité</h2>
        <p>
          Le résultat fourni est <strong>indicatif</strong>. Référez-vous
          toujours à votre établissement pour toute décision officielle.
          L’éditeur ne saurait être tenu responsable d’un usage inapproprié.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Liens externes</h2>
        <p>
          Les liens vers des sites tiers (paiement, documentation) n’engagent
          pas la responsabilité de l’éditeur.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Contact</h2>
        <p>
          Pour signaler un contenu ou poser une question :{" "}
          <a
            href="mailto:contact@getkaeli.com"
            className="text-blue-600 underline"
          >
            <strong>contact@getkaeli.com</strong>
          </a>
          .
        </p>
      </section>
    </main>
  );
}
