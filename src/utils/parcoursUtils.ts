import type { ParcoursAcademiqueField } from "@/types/parcours";

export function getNextAcademicYear(index: number): string {
  const now = new Date();
  const currentYear = now.getMonth() < 7 ? now.getFullYear() : now.getFullYear();
  const start = currentYear - index - 1;
  const end = start + 1;
  return `${start}-${end}`;
}

export function createNewParcoursField(fieldsLength: number): Omit<ParcoursAcademiqueField, "id"> {
  return {
    annee: getNextAcademicYear(fieldsLength),
    typeAnnee: "academique",
    autreType: undefined,
    allegement: false,
    creditsAcquis: "",
    creditsEchecs: "",
    cursusType: "",
    isDiplome: false,
    description: "",
  };
}

export function generateFieldId(fieldsLength: number): string {
  return `${Date.now()}-${fieldsLength}`;
}