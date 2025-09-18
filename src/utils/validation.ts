import type { ParcoursAcademiqueField } from "@/types/parcours";

export interface ValidationResult {
  isValid: boolean;
  missingFields: string[];
  completionRate: number;
}

export function validateParcoursField(field: ParcoursAcademiqueField): ValidationResult {
  const missingFields: string[] = [];
  let requiredCount = 0;
  let filledCount = 0;

  // Champs toujours requis
  requiredCount += 2; // typeAnnee + année (déjà remplie automatiquement)
  if (field.typeAnnee) filledCount++;

  if (field.typeAnnee === "academique") {
    // Champs requis pour année académique
    const academicRequiredFields = [
      { key: "cursusType", label: "Type de cursus" },
      { key: "etablissement", label: "Établissement" },
      { key: "creditsAcquis", label: "Crédits acquis" },
      { key: "creditsEchecs", label: "Crédits inscrits" },
    ];

    requiredCount += academicRequiredFields.length;

    academicRequiredFields.forEach(({ key, label }) => {
      const value = field[key as keyof ParcoursAcademiqueField];
      if (!value || value === "") {
        missingFields.push(label);
      } else {
        filledCount++;
      }
    });

    // Si continuation, vérifier le type de continuation
    if (field.cursusType === "sameInscription") {
      requiredCount++;
      if (!field.continuationType) {
        missingFields.push("Type de continuation");
      } else {
        filledCount++;
      }
    }
  } else if (field.typeAnnee === "autre") {
    // Champs requis pour autre type d'année
    requiredCount++;
    if (!field.autreType) {
      missingFields.push("Type d'activité");
    } else {
      filledCount++;
    }

    if (field.autreType === "academique_hors_fwb") {
      const hfwbRequiredFields = [
       {key: "concoursOption", label: "Concours"},
      ];

      requiredCount += hfwbRequiredFields.length;

      hfwbRequiredFields.forEach(({ key, label }) => {
        const value = field[key as keyof ParcoursAcademiqueField];
        if (!value || value === "") {
          missingFields.push(label);
        } else {
          filledCount++;
        }
      });
    } else if (field.autreType === "promotion_sociale" || field.autreType === "autre_activite") {
      requiredCount++;
      if (!field.description || field.description.trim() === "") {
        missingFields.push("Description");
      } else {
        filledCount++;
      }
    }
  }

  const completionRate = requiredCount > 0 ? (filledCount / requiredCount) * 100 : 0;
  const isValid = missingFields.length === 0;

  return {
    isValid,
    missingFields,
    completionRate,
  };
}