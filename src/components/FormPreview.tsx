import { FullWidthButton } from "@/components/Button";

export default function FormPreview() {
  return (
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
  );
}
