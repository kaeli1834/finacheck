// Test simple pour vérifier que nos validations fonctionnent
// Utilise Node.js pour exécuter ce fichier
// commande : node test-validation.js
// Ce fichier peut être supprimé après les tests

import { validateParcoursField } from './src/utils/validation.ts';

// Test cas "Autre" - academique_hors_fwb avec concours réussi
const testFieldAutre1 = {
  id: "test-1",
  annee: "2023-2024",
  typeAnnee: "autre",
  autreType: "academique_hors_fwb",
  concoursType: "oui",
  concoursOption: "réussi",
  allegement: false,
  creditsAcquis: "",
  creditsEchecs: "",
  cursusType: "premInscription",
  isDiplome: false
};

// Test cas "Autre" - promotion_sociale (doit être valide sans concours)
const testFieldAutre2 = {
  id: "test-2",
  annee: "2023-2024",
  typeAnnee: "autre",
  autreType: "promotion_sociale",
  allegement: false,
  creditsAcquis: "",
  creditsEchecs: "",
  cursusType: "premInscription",
  isDiplome: false
};

// Test cas "Académique" - continuation avec bloc1
const testFieldAcademique1 = {
  id: "test-3",
  annee: "2023-2024",
  typeAnnee: "academique",
  cursusType: "sameInscription",
  continuationType: "bloc1",
  creditsAcquis: 45,
  creditsEchecs: 60,
  allegement: false,
  isDiplome: false
};

// Test cas "Académique" - première inscription
const testFieldAcademique2 = {
  id: "test-4",
  annee: "2023-2024",
  typeAnnee: "academique",
  cursusType: "premInscription",
  creditsAcquis: 60,
  creditsEchecs: 60,
  allegement: false,
  isDiplome: false
};

console.log("Test validations:");
console.log("1. Autre - académique hors FWB avec concours réussi:", validateParcoursField(testFieldAutre1));
console.log("2. Autre - promotion sociale:", validateParcoursField(testFieldAutre2));
console.log("3. Académique - continuation bloc1:", validateParcoursField(testFieldAcademique1));
console.log("4. Académique - première inscription:", validateParcoursField(testFieldAcademique2));