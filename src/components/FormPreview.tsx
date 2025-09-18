import { FullWidthButton } from "@/components/Button";

type YearData = {
  year: number;
  creditsEnrolled: number;
  creditsPassed: number;
};

const previewYears: YearData[] = [
  { year: 1, creditsEnrolled: 60, creditsPassed: 60 },
  { year: 2, creditsEnrolled: 60, creditsPassed: 60 },
  { year: 3, creditsEnrolled: 60, creditsPassed: 60 },
];

type FormPreviewProps = {
  years?: YearData[];
};

export default function FormPreview({
  years = previewYears,
}: FormPreviewProps) {
  const totalEnrolled = years.reduce((sum, y) => sum + y.creditsEnrolled, 0);
  const totalPassed = years.reduce((sum, y) => sum + y.creditsPassed, 0);
  const ratio = totalEnrolled > 0 ? totalPassed / totalEnrolled : 0;
  const isFinancable = ratio >= 0.75;

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="h-3 w-3 rounded-full bg-rose-400" />
        <div className="h-3 w-3 rounded-full bg-amber-400" />
        <div className="h-3 w-3 rounded-full bg-emerald-400" />
      </div>
      <div className="mt-4 space-y-3 text-sm">
        {years.map((y) => (
          <div
            key={y.year}
            className="flex flex-col border-b border-dashed border-slate-200 dark:border-slate-800 pb-2 mb-2 last:border-b-0 last:pb-0 last:mb-0"
          >
            <div className="flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">
                Année {y.year}
              </span>
              <span className="font-semibold">
                {y.creditsPassed}/{y.creditsEnrolled} crédits réussis
              </span>
            </div>
          </div>
        ))}
        <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800" />
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Résultat global
          </p>
          <p className="mt-1 text-lg font-bold">
            {isFinancable ? "Finançable" : "Non finançable"}
          </p>
        </div>
      </div>
      <FullWidthButton href="/calc">Faire mon calcul →</FullWidthButton>
    </div>
  );
}
