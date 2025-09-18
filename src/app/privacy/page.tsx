import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité | FinaCheck",
  description:
    "Informations sur la collecte, l’usage et la protection de vos données par FinaCheck.",
};

const sections = [
  { id: "qui-sommes-nous", label: "Qui sommes-nous ?" },
  { id: "donnees-traitees", label: "Quelles données traitons-nous ?" },
  { id: "finalites", label: "Finalités et base légale" },
  { id: "conservation", label: "Conservation" },
  { id: "partage", label: "Partage" },
  { id: "vos-droits", label: "Vos droits" },
  { id: "hebergement", label: "Hébergement" },
  { id: "cookies", label: "Cookies" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 prose prose-slate dark:prose-invert">
      <Link
        href="/"
        className="inline-block mb-4 px-4 py-2 rounded bg-slate-100 dark:bg-slate-800 text-sm text-gray-700 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
      >
        ← Retour
      </Link>
      <h1 className="mb-2">Politique de confidentialité</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        <em>Dernière mise à jour : 06/09/2025</em>
      </p>

      {/* Sommaire */}
      <nav
        aria-label="Sommaire"
        className="mb-8 border rounded bg-slate-50 dark:bg-slate-900 p-4"
      >
        <strong className="block mb-2">Sommaire</strong>
        <ul className="list-disc pl-5 space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="hover:underline text-blue-600 dark:text-blue-400"
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <section id="qui-sommes-nous" className="mb-8 scroll-mt-24">
        <h2>Qui sommes-nous&nbsp;?</h2>
        <p>
          <strong>FinaCheck</strong> est un service créé par une ancienne
          étudiante, désireuse d’aider les autres étudiants à mieux comprendre
          leur situation de finançabilité.
          <br />
          Contact:{" "}
          <a
            href="mailto:contact@getkaeli.com"
            className="underline text-blue-600 dark:text-blue-400"
          >
            contact@getkaeli.com
          </a>
          .
        </p>
      </section>

      <section id="donnees-traitees" className="mb-8 scroll-mt-24">
        <h2>Quelles données traitons-nous&nbsp;?</h2>
        <ul>
          <li>
            Données saisies dans le formulaire (ex. crédits acquis/échoués,
            année).
          </li>
          <li>
            Données techniques minimales (logs serveur non identifiants,
            nécessaires à la sécurité).
          </li>
          <li>
            Si vous cliquez sur “Soutenir” : traitement par le prestataire de
            paiement (ex. Ko-fi). Nous ne recevons pas vos coordonnées
            bancaires.
          </li>
        </ul>
      </section>

      <section id="finalites" className="mb-8 scroll-mt-24">
        <h2>Finalités et base légale</h2>
        <ul>
          <li>
            <strong>Fournir le service</strong> (afficher un résultat indicatif
            de finançabilité) — exécution d’un service demandé (art. 6-1-b
            RGPD).
          </li>
        </ul>
      </section>

      <section id="conservation" className="mb-8 scroll-mt-24">
        <h2>Conservation</h2>
        <p>
          Pour le MVP, <strong>nous ne stockons pas vos saisies</strong>. Des
          statistiques anonymisées pourront être activées ultérieurement
          (opt-in).
        </p>
      </section>

      <section id="partage" className="mb-8 scroll-mt-24">
        <h2>Partage</h2>
        <p>
          Les données peuvent transiter chez nos sous-traitants techniques
          (hébergement, anti-abus, paiement) selon le strict nécessaire.
        </p>
      </section>

      <section id="vos-droits" className="mb-8 scroll-mt-24">
        <h2>Vos droits</h2>
        <p>
          Vous disposez des droits d’accès, rectification, effacement,
          limitation, opposition et portabilité (RGPD). Pour exercer:{" "}
          <a
            href="mailto:rgpd@getkaeli.com"
            className="underline text-blue-600 dark:text-blue-400"
          >
            rgpd@getkaeli.com
          </a>
          .
        </p>
      </section>

      <section id="hebergement" className="mb-8 scroll-mt-24">
        <h2>Hébergement</h2>
        <p>
          Service hébergé chez <strong>Vercel</strong> (Vercel Inc.). Des
          transferts hors UE peuvent avoir lieu avec des garanties adéquates.
        </p>
      </section>

      <section id="cookies" className="mb-8 scroll-mt-24">
        <h2>Cookies</h2>
        <p>
          <strong>Cookie technique essentiel :</strong> Un cookie nommé "calc" 
          est utilisé pour sauvegarder temporairement vos saisies pendant le 
          processus de calcul. Ce cookie :
        </p>
        <ul>
          <li>Est chiffré et sécurisé (AES-256-GCM)</li>
          <li>Expire automatiquement après 1 heure</li>
          <li>Est supprimé après le calcul</li>
          <li>Ne contient aucune donnée personnelle identifiante</li>
          <li>Est nécessaire au bon fonctionnement du service</li>
        </ul>
        <p>
          <strong>Cookies non essentiels :</strong> Aucun cookie de tracking, 
          publicité ou mesure d'audience n'est utilisé actuellement. Si cela 
          devait changer, un bandeau de consentement sera proposé.
        </p>
        <p>
          <strong>Votre choix :</strong> Vous pouvez refuser le cookie technique, 
          mais le service ne pourra alors pas fonctionner correctement.
        </p>
      </section>

      <section id="contact" className="mb-8 scroll-mt-24">
        <h2>Contact</h2>
        <p>
          Pour toute question:{" "}
          <a
            href="mailto:contact@getkaeli.com"
            className="underline text-blue-600 dark:text-blue-400"
          >
            contact@getkaeli.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
