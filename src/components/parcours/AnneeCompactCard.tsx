import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { ParcoursAcademiqueField } from "@/types/parcours";
import { validateParcoursField } from "@/utils/validation";
import { useParcoursFieldWatch } from "@/hooks/useFieldWatch";
import AnneeAcademique from "./AnneeAcademique";
import AnneeAutre from "./AnneeAutre";
import FieldGroup from "../form/FieldGroup";
import RadioButtonGroup from "../form/RadioButtonGroup";
import { typeAnneeOptions } from "@/data/formOptions";

interface AnneeCompactCardProps {
  field: ParcoursAcademiqueField;
  index: number;
  canRemove: boolean;
  onRemove: () => void;
}

export default function AnneeCompactCard({
  field,
  index,
  canRemove,
  onRemove,
}: AnneeCompactCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { watch } = useFormContext();
  const { typeAnnee } = useParcoursFieldWatch(index);

  // Validation en temps réel
  const currentFieldData: ParcoursAcademiqueField = {
    ...field,
    typeAnnee:
      watch(`parcoursAcademique.${index}.typeAnnee`) || field.typeAnnee,
    cursusType:
      watch(`parcoursAcademique.${index}.cursusType`) || field.cursusType,
    autreType:
      watch(`parcoursAcademique.${index}.autreType`) || field.autreType,
    continuationType:
      watch(`parcoursAcademique.${index}.continuationType`) ||
      field.continuationType,
    etablissement:
      watch(`parcoursAcademique.${index}.etablissement`) || field.etablissement,
    creditsAcquis:
      watch(`parcoursAcademique.${index}.creditsAcquis`) || field.creditsAcquis,
    creditsEchecs:
      watch(`parcoursAcademique.${index}.creditsEchecs`) || field.creditsEchecs,
    description:
      watch(`parcoursAcademique.${index}.description`) || field.description,
  };

  const validation = validateParcoursField(currentFieldData);

  const getCardStyle = () => {
    if (validation.isValid) {
      return "border-green-300 bg-green-50 dark:bg-green-900/10 dark:border-green-700";
    } else if (validation.completionRate > 0) {
      return "border-violet-400 bg-violet-50 dark:bg-violet-900/20 dark:border-violet-600";
    } else {
      return "border-slate-200 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700";
    }
  };

  const getTypeInfo = () => {
    if (!typeAnnee) return { icon: "❓", label: "Type non défini" };

    if (typeAnnee === "academique") {
      const cursusType = currentFieldData.cursusType;
      const cursusIcons = {
        premInscription: "🆕",
        sameInscription: "➡️",
        reorientation: "🔄",
        diplome: "🎓",
      };
      return {
        icon: cursusIcons[cursusType as keyof typeof cursusIcons] || "🎓",
        label: currentFieldData.etablissement || "Établissement non défini",
      };
    } else {
      const autreType = currentFieldData.autreType;
      const autreIcons = {
        academique_hors_fwb: "🌍",
        promotion_sociale: "📚",
        autre_activite: "💼",
      };
      return {
        icon: autreIcons[autreType as keyof typeof autreIcons] || "🔄",
        label:
          autreType === "academique_hors_fwb"
            ? currentFieldData.etablissement || "Établissement hors FWB"
            : currentFieldData.description || "Description manquante",
      };
    }
  };

  const typeInfo = getTypeInfo();

  if (isExpanded) {
    return (
      <div className={`rounded-lg p-4 border transition-all ${getCardStyle()}`}>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-slate-900 dark:text-slate-100">
            Année {field.annee}
          </h4>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-slate-500 hover:text-slate-700 text-sm p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
              title="Réduire"
            >
              🔼
            </button>
            {canRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="text-red-500 hover:text-red-700 text-sm p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                title="Supprimer cette année"
              >
                🗑️
              </button>
            )}
          </div>
        </div>

        {/* Sélection du type d'année */}
        <FieldGroup
          label="Type d'année"
          helpText="Indiquez si c'était une année académique ou autre chose"
          className="mb-4"
        >
          <RadioButtonGroup
            name={`parcoursAcademique.${index}.typeAnnee`}
            options={typeAnneeOptions}
            layout="grid"
            gridCols={2}
          />
        </FieldGroup>

        {/* Contenu conditionnel selon le type d'année */}
        {typeAnnee === "academique" ? (
          <AnneeAcademique index={index} fieldId={field.id} />
        ) : (
          <AnneeAutre index={index} />
        )}
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg p-3 border cursor-pointer transition-all hover:shadow-md ${getCardStyle()}`}
      onClick={() => setIsExpanded(true)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-xl">{typeInfo.icon}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm">
                {field.annee}
              </h4>
              {!validation.isValid && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                  <span className="text-xs text-violet-600 dark:text-violet-400">
                    {validation.missingFields.length} manquant
                    {validation.missingFields.length > 1 ? "s" : ""}
                  </span>
                </div>
              )}
              {validation.isValid && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-green-600 dark:text-green-400">
                    Complet
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 truncate">
              {typeInfo.label}
            </p>
            {typeAnnee === "academique" &&
              currentFieldData.creditsAcquis &&
              currentFieldData.creditsEchecs && (
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {currentFieldData.creditsAcquis}/
                  {currentFieldData.creditsEchecs} crédits
                </p>
              )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-2">
          {/* Barre de progression */}
          {!validation.isValid && (
            <div className="w-12 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 transition-all duration-300"
                style={{ width: `${validation.completionRate}%` }}
              />
            </div>
          )}

          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 p-1"
            title="Développer"
          >
            🔽
          </button>

          {canRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="text-red-400 hover:text-red-600 text-sm p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              title="Supprimer cette année"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {/* Affichage des champs manquants en mode compact */}
      {!validation.isValid && validation.missingFields.length > 0 && (
        <div className="mt-2 pt-2 border-t border-violet-200 dark:border-violet-800">
          <p className="text-xs text-violet-700 dark:text-violet-300">
            Manquant : {validation.missingFields.slice(0, 2).join(", ")}
            {validation.missingFields.length > 2 &&
              ` +${validation.missingFields.length - 2}`}
          </p>
        </div>
      )}
    </div>
  );
}
