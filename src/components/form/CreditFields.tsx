import { useFormContext } from "react-hook-form";
import FieldGroup from "./FieldGroup";

interface CreditFieldsProps {
  namePrefix: string;
  colorScheme?: "violet" | "orange";
}

export default function CreditFields({
  namePrefix,
  colorScheme = "violet",
}: CreditFieldsProps) {
  const { register } = useFormContext();

  const focusRing =
    colorScheme === "orange"
      ? "focus:ring-orange-500 focus:border-orange-500"
      : "focus:ring-violet-500 focus:border-violet-500";

  return (
    <div className="grid grid-cols-2 gap-3">
      <FieldGroup
        label="Crédits acquis"
        helpText="Nombre de crédits que vous avez réussis cette année"
        helpPosition="top"
      >
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
