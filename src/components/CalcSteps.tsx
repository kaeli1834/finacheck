import { useFormContext } from "react-hook-form";

import HelpTooltip from "./HelpTooltip";
import RadioButtonGroup from "./form/RadioButtonGroup";
import FieldGroup from "./form/FieldGroup";
import AnneeCompactCard from "./parcours/AnneeCompactCard";
import ProgressSummary from "./parcours/ProgressSummary";

import { useParcours } from "@/hooks/useParcours";
import { useFieldWatch } from "@/hooks/useFieldWatch";
import {
  nationaliteOptions,
  assimileOptions,
} from "@/data/formOptions";

// 1. Check nationalité : UE ou HORS UE
export function StepNationalite() {
  const {
    formState: { errors },
  } = useFormContext();

  const nationalite = useFieldWatch("nationalite");

  return (
    <div className="space-y-6">
      <FieldGroup
        label="Quelle est votre nationalité ?"
        helpText="Cette information détermine les règles de finançabilité qui s'appliquent à votre situation"
      >
        <RadioButtonGroup
          name="nationalite"
          options={nationaliteOptions}
          layout="vertical"
        />
      </FieldGroup>

      {/* si HORS UE, check si assimilé */}
      {nationalite === "hors_ue" && (
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <FieldGroup
            label="Êtes-vous assimilé*e ?"
            helpText="Statut spécial pour certains étrangers qui bénéficient des mêmes conditions que les citoyens UE"
          >
            <RadioButtonGroup
              name="assimilé"
              options={assimileOptions}
              colorScheme="amber"
            />
          </FieldGroup>
        </div>
      )}

      {errors.nationalite && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-red-700 dark:text-red-400 text-sm">
            {errors.nationalite.message as string}
          </p>
        </div>
      )}
    </div>
  );
}

// Composant pour une année individuelle (maintenant compact)
function AnneeCard({ field, index }: { field: any; index: number }) {
  const { handleRemove, canRemove } = useParcours();

  return (
    <AnneeCompactCard
      field={field}
      index={index}
      canRemove={canRemove(index)}
      onRemove={() => handleRemove(index)}
    />
  );
}

// Composant pour l'état vide
function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="text-center py-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
      <div className="text-slate-400 dark:text-slate-500 mb-2">📚</div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
        Aucune année ajoutée
      </p>
      <button
        type="button"
        onClick={onAdd}
        className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
        Ajouter votre première année
      </button>
    </div>
  );
}

// Composant pour le bouton d'ajout
function AddButton({ onAdd }: { onAdd: () => void }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-400 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
    >
      <span className="text-lg">➕</span>
      Ajouter une année
    </button>
  );
}

// Composant principal du parcours académique
export function StepAca() {
  const {
    formState: { errors },
  } = useFormContext();

  const { fields, handleAdd, isEmpty } = useParcours();

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
          Parcours académique
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Remplissez chaque année pour calculer votre finançabilité
        </p>
      </div>

      {/* Progress Summary */}
      <ProgressSummary />

      <div className="space-y-4">
        {isEmpty ? (
          <EmptyState onAdd={handleAdd} />
        ) : (
          <>
            {fields.map((field, idx) => (
              <AnneeCard key={field.id} field={field} index={idx} />
            ))}
            <AddButton onAdd={handleAdd} />
          </>
        )}
      </div>

      {errors.parcoursAcademique && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <p className="text-red-700 dark:text-red-400 text-sm">
            {errors.parcoursAcademique.message as string}
          </p>
        </div>
      )}
    </div>
  );
}

export function StepAnnee() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label className="block text-sm font-medium">Année d'inscription</label>
      <input
        type="number"
        {...register("anneeInscription")}
        className="mt-1 w-full border rounded p-2"
      />
      {errors.anneeInscription && (
        <p className="text-red-600 text-sm">
          {errors.anneeInscription.message as string}
        </p>
      )}
    </div>
  );
}
