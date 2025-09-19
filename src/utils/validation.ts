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

  if (field.typeAnnee === "autre") {
    // Validation pour type "Autre"
    requiredCount++;
    if (!field.autreType) {
      missingFields.push("Type d'activité");
    } else {
      filledCount++;

      // Check si choisi entre 3 options proposées
      const validAutreTypes = ["academique_hors_fwb", "promotion_sociale", "autre_activite"];
      if (!validAutreTypes.includes(field.autreType)) {
        missingFields.push("Type d'activité valide");
      }
    }

    // Si Année aca hors FWB : check si Concours, si Oui, Check si Réussi ou non
    if (field.autreType === "academique_hors_fwb") {
      requiredCount++;
      if (!field.concoursType) {
        missingFields.push("Information sur le concours");
      } else {
        filledCount++;

        if (field.concoursType === "oui") {
          requiredCount++;
          if (!field.concoursOption) {
            missingFields.push("Résultat du concours");
          } else {
            filledCount++;
          }
        }
      }
    }
    // Pour promotion_sociale et autre_activite, pas de vérifications supplémentaires

  } else if (field.typeAnnee === "academique") {
    // Validation pour type "Académique" selon le schéma

    // Check si un des 4 types est sélectionné
    const validCursusTypes = ["premInscription", "sameInscription", "reorientation", "diplome"];
    if (!field.cursusType) {
      missingFields.push("Type de cursus");
    } else if (!validCursusTypes.includes(field.cursusType)) {
      missingFields.push("Type de cursus valide");
    } else {
      filledCount++;

      // Si Continuation : check si type de continuation
      if (field.cursusType === "sameInscription") {
        requiredCount++;
        if (!field.continuationType) {
          missingFields.push("Type de continuation");
        } else {
          filledCount++;
        }
      }
    }

    // Check si crédits acquis et inscrits ok
    const creditFields = [
      { key: "creditsAcquis", label: "Crédits acquis" },
      { key: "creditsEchecs", label: "Crédits inscrits" },
    ];

    requiredCount += creditFields.length;

    creditFields.forEach(({ key, label }) => {
      const value = field[key as keyof ParcoursAcademiqueField];
      if (value === "" || value === null || value === undefined) {
        missingFields.push(label);
      } else if (typeof value === "number" && (value < 0 || value > 180)) {
        missingFields.push(`${label} (valeur valide entre 0 et 180)`);
      } else {
        filledCount++;
      }
    });
  }

  const completionRate = requiredCount > 0 ? (filledCount / requiredCount) * 100 : 0;
  const isValid = missingFields.length === 0;
  const isComplete = isValid && completionRate === 100;

  // Mettre à jour le champ isComplete dans l'objet field
  field.isComplete = isComplete;
  
  return {
    isValid,
    missingFields,
    completionRate,
  };
}