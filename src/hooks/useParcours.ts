import { useFieldArray, useFormContext } from "react-hook-form";
import type { StepAcaFormValues, ParcoursAcademiqueField } from "@/types/parcours";
import { generateFieldId, createNewParcoursField } from "@/utils/parcoursUtils";
import { validateParcoursField } from "@/utils/validation";

export function useParcours() {
  const { control, watch } = useFormContext<StepAcaFormValues>();

  const { fields, append, remove } = useFieldArray<StepAcaFormValues>({
    control,
    name: "parcoursAcademique",
  });

  const handleAdd = () => {
    const newField = createNewParcoursField(fields.length);
    append({
      ...newField,
      id: generateFieldId(fields.length),
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  const canRemove = (index: number) => {
    return fields.length > 1 && index === fields.length - 1;
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
    canRemove,
    isEmpty: fields.length === 0,
    getFieldValidation,
    getGlobalStats,
  };
}