import { useFormContext } from "react-hook-form";
import RadioButtonGroup from "../form/RadioButtonGroup";
import FieldGroup from "../form/FieldGroup";
import CreditFields from "../form/CreditFields";
import { cursusOptions, continuationOptions } from "@/data/formOptions";

interface AnneeAcademiqueProps {
  index: number;
  fieldId: string;
}

export default function AnneeAcademique({
  index,
  fieldId,
}: AnneeAcademiqueProps) {
  const { register, watch } = useFormContext();
  const currentCursusType = watch(`parcoursAcademique.${index}.cursusType`);

  return (
    <div className="space-y-4">
      {/* Type de cursus académique */}
      <FieldGroup
        label="Type de cursus"
        helpText="Choisissez le type qui correspond à votre situation pour cette année académique"
      >
        <RadioButtonGroup
          name={`parcoursAcademique.${index}.cursusType`}
          options={cursusOptions}
          layout="grid"
          gridCols={2}
        />
      </FieldGroup>

      {/* Sous-options pour Continuation */}
      {currentCursusType === "sameInscription" && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <FieldGroup
            label="Type de continuation"
            helpText="Précisez si c'est un Bloc 1 ou une poursuite de cursus"
          >
            <RadioButtonGroup
              name={`parcoursAcademique.${index}.continuationType`}
              options={continuationOptions}
              colorScheme="blue"
            />
          </FieldGroup>
        </div>
      )}

      {/* Crédits */}
      <CreditFields namePrefix={`parcoursAcademique.${index}`} />

      {/* Allégement */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register(`parcoursAcademique.${index}.allegement`)}
          id={`allegement-${fieldId}`}
          className="h-4 w-4 text-violet-600 border-slate-300 rounded focus:ring-violet-500 dark:bg-slate-700 dark:border-slate-600 dark:focus:ring-violet-500"
        />
        <FieldGroup
          label="J'ai bénéficié d'un allégement de mon PAE"
          helpText="Cochez si vous avez bénéficié d'un allégement de votre PAE cette année"
          className="flex-1"
        >
          <span></span>
        </FieldGroup>
      </div>
    </div>
  );
}
