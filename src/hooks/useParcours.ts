import { useFieldArray, useFormContext } from "react-hook-form";
import { useState } from "react";
import type { StepAcaFormValues, ParcoursAcademiqueField } from "@/types/parcours";
import { generateFieldId, createNewParcoursField } from "@/utils/parcoursUtils";
import { validateParcoursField } from "@/utils/validation";

export function useParcours() {
  const { control, watch } = useFormContext<StepAcaFormValues>();
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);

  const { fields, append, remove } = useFieldArray<StepAcaFormValues>({
    control,
    name: "parcoursAcademique",
  });

  // Vérifie s'il y a une "Première inscription" dans le parcours
  const hasPremiereInscription = () => {
    return fields.some((_, index) => {
      const fieldData = watch(`parcoursAcademique.${index}`) as ParcoursAcademiqueField;
      return fieldData?.cursusType === "premInscription";
    });
  };

  const handleAdd = () => {
    // Bloquer l'ajout si "Première inscription" est sélectionnée
    if (hasPremiereInscription()) {
      return;
    }

    const newField = createNewParcoursField(fields.length);
    append({
      ...newField,
      id: generateFieldId(fields.length),
    });

    // Ouvrir automatiquement la nouvelle carte (sera à l'index fields.length)
    setExpandedCardIndex(fields.length);
  };

  const handleRemove = (index: number) => {
   // supprimer la carte et les datas de la dernière carte (seule carte supprimable)
    console.log("handleRemove called with index:", index, "fields.length:", fields.length);
    
    if (fields.length === 0) {
      console.log("Cannot remove: array is already empty");
      return;
    }
    if (index !== fields.length - 1) {
      console.log("Cannot remove: index is not last element");
      return;
    }

    const indexToRemove = fields.length - 1;
    console.log("Removing index:", indexToRemove);
    
    // Utiliser remove avec l'index correct
    remove(indexToRemove);
    
    console.log("After removal, fields.length should be:", fields.length - 1);
    
    // Si la carte supprimée était ouverte, fermer l'expansion
    if (expandedCardIndex === indexToRemove) {
      setExpandedCardIndex(null);
    } else if (expandedCardIndex && expandedCardIndex > indexToRemove) {
      // Ajuster l'index d'expansion si nécessaire
      setExpandedCardIndex(expandedCardIndex - 1);
    }
    
  };

  // Vérifier si l'ajout est autorisé
  const canAdd = () => {
    return !hasPremiereInscription();
  };

  // Gestion de l'expansion des cartes
  const toggleCard = (index: number) => {
    console.log(`Toggle card ${index}, current expanded: ${expandedCardIndex}`);
    const newExpandedIndex = expandedCardIndex === index ? null : index;
    console.log(`Setting expanded index to: ${newExpandedIndex}`);
    setExpandedCardIndex(newExpandedIndex);
  };

  const isCardExpanded = (index: number) => {
    return expandedCardIndex === index;
  };

  // Vérifier si les conditions pour passer à l'étape suivante sont remplies
  const canProceedToNext = () => {
    // Il faut au moins une première inscription pour pouvoir continuer
    return hasPremiereInscription() && fields.length > 0;
  };

  // Validation de tous les champs
  const getFieldValidation = (index: number): ReturnType<typeof validateParcoursField> => {
    const fieldData = watch(`parcoursAcademique.${index}`) as ParcoursAcademiqueField;
    if (!fieldData) return { isValid: false, missingFields: [], completionRate: 0 };
    return validateParcoursField(fieldData);
  };

  // Statistiques globales
  const getGlobalStats = () => {
    const validations = fields.map((_, index) => getFieldValidation(index));
    const validCount = validations.filter(v => v.isValid).length;
    const totalCount = fields.length;
    const averageCompletion = totalCount > 0 
      ? validations.reduce((sum, v) => sum + v.completionRate, 0) / totalCount
      : 0;

    return {
      validCount,
      totalCount,
      averageCompletion,
      allValid: validCount === totalCount && totalCount > 0,
    };
  };

  return {
    fields,
    handleAdd,
    handleRemove,
    canAdd,
    isEmpty: fields.length === 0,
    getFieldValidation,
    getGlobalStats,
    hasPremiereInscription,
    // Gestion de l'expansion
    toggleCard,
    isCardExpanded,
    expandedCardIndex,
    // Validation pour l'étape suivante
    canProceedToNext,
  };
}