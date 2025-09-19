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
      {/* Double inscription */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register(`parcoursAcademique.${index}.isDoubleInscription`)}
          id={`double-inscription-${fieldId}`}
          className="h-4 w-4 text-violet-600 border-slate-300 rounded focus:ring-violet-500 dark:bg-slate-700 dark:border-slate-600 dark:focus:ring-violet-500"
        />
        <FieldGroup
          label="Je me suis inscrit·e en double inscription"
          helpText="Cochez si vous vous êtes inscrit·e à deux cursus cette année"
          className="flex-1"
        >
          <span></span>
        </FieldGroup>
      </div>
      <div>
        {/* Afficher message: cas particulier */}
        {watch(`parcoursAcademique.${index}.isDoubleInscription`) && (
          <div className="mt-2 text-sm text-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-800 rounded p-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-5 h-5 text-yellow-500">
                {/* Exclamation icon */}
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4a.75.75 0 001.5 0v-4zm-.75 7a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <strong>Cas particulier&nbsp;: double inscription</strong>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <span>
                  Votre situation nécessite un traitement personnalisé.
                </span>
              </li>
              <li>
                <span>
                  Contactez le secrétariat ou le service compétent de votre
                  établissement.
                </span>
              </li>
              <li>
                <span>
                  Le calcul proposé est une estimation simplifiée et peut ne pas
                  refléter la réalité.
                </span>
              </li>
              <li>
                <span>
                  Poursuivez le formulaire pour obtenir une estimation
                  indicative.
                </span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
