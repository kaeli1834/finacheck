import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  PrimaryButton,
  OutlineButton,
  FullWidthButton,
} from "@/components/Button";

export default function Home() {
  return (
    <main className="min-h-[100svh] bg-gradient-to-b from-white to-slate-50 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      <Navbar
        displayShorts={true}
        displayCalcButton={true}
        displayTipButton={true}
      />
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24 grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
              Vérifie ta <span className="text-violet-600">finançabilité</span>{" "}
              en 2 minutes.
            </h1>
            <p className="mt-4 text-base/7 sm:text-lg text-slate-600 dark:text-slate-300">
              Un outil gratuit et anonyme pour les étudiant·e·s en Belgique.
              Remplis un court formulaire, nous appliquons l’algorithme, et tu
              obtiens immédiatement ton statut indicatif.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <PrimaryButton href="/calc">Commencer maintenant</PrimaryButton>
              <OutlineButton href="#comment-ca-marche">
                Voir comment ça marche
              </OutlineButton>
            </div>
            <div className="mt-5 text-xs text-slate-500">
              * Résultat indicatif – renseigne-toi toujours auprès de ton
              établissement pour confirmation officielle.
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">
                    Crédits acquis
                  </span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">
                    Crédits en échec
                  </span>
                  <span className="font-semibold">15</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300">
                    Année d’inscription
                  </span>
                  <span className="font-semibold">2025</span>
                </div>
                <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800" />
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Résultat
                  </p>
                  <p className="mt-1 text-lg font-bold">Finançable</p>
                  <p className="text-xs text-slate-500">Ratio estimé 0,75</p>
                </div>
              </div>
              <FullWidthButton href="/calc">Faire mon calcul →</FullWidthButton>
            </div>
          </div>
        </div>
      </section>

      {/* Points clés */}
      <section
        id="comment-ca-marche"
        className="border-t border-slate-200 dark:border-slate-800"
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Comment ça marche ?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "1. Tu remplis le formulaire",
                desc: "Quelques champs clairs (crédits, année, etc.). Validation immédiate, aide contextuelle.",
              },
              {
                title: "2. On calcule côté serveur",
                desc: "L’algorithme tourne sur notre API. Tes données ne sont pas stockées pour le MVP (Minimum Viable Product - version actuelle).",
              },
              {
                title: "3. Tu obtiens ton statut",
                desc: "Un résultat indicatif + explications. Tu peux le partager ou recommencer.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-6 shadow-sm"
              >
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Confiance & confidentialité */}
      <section className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-16 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Pensé pour les étudiant·e·s, avec confidentialité.
            </h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Aucune création de compte requise.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Pas de stockage des saisies (MVP).
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Transparence : règles publiques citées ; moteur de calcul privé
                (serveur).
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              <OutlineButton href="/privacy" className="px-4 py-2">
                Politique de confidentialité
              </OutlineButton>
              <OutlineButton href="/mentions-legales" className="px-4 py-2">
                Mentions légales
              </OutlineButton>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-violet-600/10 to-fuchsia-500/10 p-6">
            <div className="rounded-2xl bg-white dark:bg-slate-950 p-6 ring-1 ring-slate-200/70 dark:ring-slate-800">
              <h3 className="text-lg font-semibold">Soutenir le projet ☕️</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Tu trouves l’outil utile ? Tu peux contribuer à son hébergement
                et son amélioration.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <PrimaryButton href="/tip" className="px-4 py-2">
                  Soutenir maintenant
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="border-t border-slate-200 dark:border-slate-800"
      >
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold">FAQ</h2>
          <div className="mt-8 grid gap-4">
            {[
              {
                q: "Le résultat est-il officiel ?",
                a: "Non. Le statut affiché est indicatif. Réfère-toi toujours à ton établissement pour la décision officielle.",
              },
              {
                q: "Mes données sont-elles enregistrées ?",
                a: "Pour le MVP, non. Nous n’enregistrons pas tes saisies. Des statistiques anonymisées pourront être activées plus tard (opt‑in).",
              },
              {
                q: "Combien ça coûte ?",
                a: "L’outil est gratuit. Tu peux soutenir le projet via une contribution volontaire.",
              },
              {
                q: "Puis-je installer l’application ?",
                a: "Oui, ajoute‑la à ton écran d’accueil. Elle fonctionne comme une PWA.",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 p-5"
              >
                <summary className="cursor-pointer list-none font-medium">
                  <span className="group-open:hidden">{item.q}</span>
                  <span className="hidden group-open:inline">{item.q}</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} FinaCheck — getkaeli.com</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:opacity-80">
              Confidentialité
            </Link>
            <Link href="/mentions-legales" className="hover:opacity-80">
              Mentions légales
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
