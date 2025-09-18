import type { 
  CursusOption, 
  TypeAnneeOption, 
  AutreTypeOption, 
  ContinuationOption,
  NationaliteOption,
  AssimileOption
} from "@/types/parcours";

export const nationaliteOptions: NationaliteOption[] = [
  {
    value: "ue",
    label: "Union Européenne",
    icon: "🇪🇺",
    desc: "Citoyen d'un pays de l'UE",
  },
  {
    value: "hors_ue",
    label: "Hors Union Européenne",
    icon: "🌍",
    desc: "Citoyen d'un pays hors UE",
  },
];

export const assimileOptions: AssimileOption[] = [
  { value: "oui", label: "Oui, je suis assimilé*e", icon: "✅" },
  { value: "non", label: "Non, je ne suis pas assimilé*e", icon: "❌" },
];

export const typeAnneeOptions: TypeAnneeOption[] = [
  {
    value: "academique",
    label: "Année académique",
    icon: "🎓",
    description: "Haute École ou Université",
  },
  {
    value: "autre",
    label: "Autre",
    icon: "🔄",
    description: "Promotion sociale, travail, autre formation",
  },
];

export const cursusOptions: CursusOption[] = [
  {
    value: "premInscription",
    label: "Première inscription",
    icon: "🆕",
    description: "Première inscription dans l'enseignement supérieur",
  },
  {
    value: "sameInscription",
    label: "Continuation",
    icon: "➡️",
    description: "Poursuite d'un cursus déjà entamé",
  },
  {
    value: "reorientation",
    label: "Réorientation",
    icon: "🔄",
    description: "Changement de cursus",
  },
  {
    value: "diplome",
    label: "Diplômé",
    icon: "🎓",
    description: "Année de diplôme",
  },
];

export const continuationOptions: ContinuationOption[] = [
  {
    value: "bloc1",
    label: "Bloc 1",
    description: "Première année de bachelier",
  },
  {
    value: "bloc2-3",
    label: "Bloc 2/3 - Poursuite de cursus",
    description: "Deuxième, troisième année ou master",
  },
];

export const autreTypeOptions: AutreTypeOption[] = [
  {
    value: "academique_hors_fwb",
    label: "Année académique hors FWB",
    icon: "🌍",
    description: "France, Flandre, autre région/pays",
  },
  {
    value: "promotion_sociale",
    label: "Promotion Sociale",
    icon: "📚",
    description: "Formation en promotion sociale",
  },
  {
    value: "autre_activite",
    label: "Autre activité",
    icon: "💼",
    description: "Travail, formation professionnelle, autre",
  },
];