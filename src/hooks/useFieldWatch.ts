import { useFormContext } from "react-hook-form";

export function useFieldWatch(fieldName: string) {
  const { watch } = useFormContext();
  return watch(fieldName);
}

export function useParcoursFieldWatch(index: number) {
  const { watch } = useFormContext();
  
  const typeAnnee = watch(`parcoursAcademique.${index}.typeAnnee`);
  const cursusType = watch(`parcoursAcademique.${index}.cursusType`);
  const autreType = watch(`parcoursAcademique.${index}.autreType`);
  const continuationType = watch(`parcoursAcademique.${index}.continuationType`);

  return {
    typeAnnee,
    cursusType,
    autreType,
    continuationType,
  };
}