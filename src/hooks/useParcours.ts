import { useFieldArray, useFormContext } from "react-hook-form";
import type { StepAcaFormValues } from "@/types/parcours";
import { generateFieldId, createNewParcoursField } from "@/utils/parcoursUtils";

export function useParcours() {
  const { control } = useFormContext<StepAcaFormValues>();

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

  return {
    fields,
    handleAdd,
    handleRemove,
    canRemove,
    isEmpty: fields.length === 0,
  };
}