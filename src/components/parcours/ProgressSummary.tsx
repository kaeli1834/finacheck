import { useParcours } from "@/hooks/useParcours";

export default function ProgressSummary() {
  const { getGlobalStats, isEmpty } = useParcours();

  if (isEmpty) return null;

  const stats = getGlobalStats();

  return (
    <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Progression :
            </span>
            <span className={`text-sm font-semibold ${
              stats.allValid 
                ? "text-green-600 dark:text-green-400"
                : "text-violet-600 dark:text-violet-400"
            }`}>
              {stats.validCount}/{stats.totalCount} complètes
            </span>
          </div>
          
          {stats.allValid && (
            <div className="flex items-center gap-1">
              <span className="text-green-500">✅</span>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                Toutes les années sont complètes !
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                stats.allValid
                  ? "bg-green-500"
                  : "bg-violet-500"
              }`}
              style={{ width: `${stats.averageCompletion}%` }}
            />
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {Math.round(stats.averageCompletion)}%
          </span>
        </div>
      </div>
    </div>
  );
}