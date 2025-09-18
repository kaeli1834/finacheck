import { useFormContext } from "react-hook-form";
import FieldGroup from "./FieldGroup";

interface CreditFieldsProps {
  namePrefix: string;
  colorScheme?: "violet" | "orange";
}

export default function CreditFields({ 
  namePrefix, 
  colorScheme = "violet" 
}: CreditFieldsProps) {
  const { register } = useFormContext();
  
  const focusRing = colorScheme === "orange" 
    ? "focus:ring-orange-500 focus:border-orange-500"
    : "focus:ring-violet-500 focus:border-violet-500";

  return (
    <div className="grid grid-cols-2 gap-3">
      <FieldGroup
        label="Crédits acquis"
        helpText="Nombre de crédits que vous avez réussis cette année"
        helpPosition="top"
      >
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Crédits acquis
          </label>
          <div className="w-4 h-4 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center text-xs text-green-700 dark:text-green-300 hover:bg-green-300 dark:hover:bg-green-700 transition-colors">
            ✓
          </div>
        </div>
        <input
          type="number"
          {...register(`${namePrefix}.creditsAcquis`)}
          className={`w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg ${focusRing} dark:bg-slate-800 dark:text-slate-100 transition-colors`}
          placeholder="60"
          min="0"
          max="300"
        />
      </FieldGroup>

      <FieldGroup
        label="Crédits inscrits"
        helpText="Nombre total de crédits auxquels vous étiez inscrit cette année"
        helpPosition="top"
      >
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Crédits inscrits
          </label>
          <div className="w-4 h-4 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-xs text-blue-700 dark:text-blue-300 hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors">
            📝
          </div>
        </div>
        <input
          type="number"
          {...register(`${namePrefix}.creditsEchecs`)}
          className={`w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg ${focusRing} dark:bg-slate-800 dark:text-slate-100 transition-colors`}
          placeholder="60"
          min="0"
          max="300"
        />
      </FieldGroup>
    </div>
  );
}