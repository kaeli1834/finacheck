export type ParcoursAcademiqueField = {
  id: string;
  annee: string;
  typeAnnee: "academique" | "autre";
  autreType?: "academique_hors_fwb" | "promotion_sociale" | "autre_activite";
  allegement: boolean;
  creditsAcquis: number | "";
  creditsEchecs: number | "";
  cursusType:
    | "premInscription"
    | "sameInscription"
    | "reorientation"
    | "diplome"
    | "";
  continuationType?: "bloc1" | "bloc2-3";
  isDiplome: boolean;
  description?: string;
  concoursType?: "oui" | "non";
  concoursOption?: "réussi" | "raté";
};

export type StepAcaFormValues = {
  parcoursAcademique: ParcoursAcademiqueField[];
};

export type CursusOption = {
  value: string;
  label: string;
  icon: string;
  description: string;
};

export type TypeAnneeOption = {
  value: "academique" | "autre";
  label: string;
  icon: string;
  description: string;
};

export type AutreTypeOption = {
  value: "academique_hors_fwb" | "promotion_sociale" | "autre_activite";
  label: string;
  icon: string;
  description: string;
};

export type ConcoursOption = {
  value: "oui" | "non";
  isPassed?: boolean;
  label: string;
  icon: string;
};

export type ContinuationOption = {
  value: "bloc1" | "bloc2-3";
  label: string;
  icon: string;
  description: string;
};

export type NationaliteOption = {
  value: "ue" | "hors_ue";
  label: string;
  icon: string;
  desc: string;
};

export type AssimileOption = {
  value: "oui" | "non";
  label: string;
  icon: string;
};