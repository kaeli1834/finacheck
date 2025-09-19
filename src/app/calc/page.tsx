"use client";

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import { StepNationalite, StepAca } from "@/components/CalcSteps";
import { canUseCookies } from "@/lib/cookies";
import {
  saveFormData,
  loadFormData,
  clearFormData,
  getStorageMode,
} from "@/lib/clientStorage";
import StorageModeWarning from "@/components/StorageModeWarning";
import ProgressIndicator from "@/components/ProgressIndicator";
import { ParcoursAcademiqueField } from "@/types/parcours";
import { validateParcoursField } from "@/utils/validation";

// TODO: Définir le schéma Zod pour le formulaire
const Schema = z.object({
  // Ajoutez ici les champs attendus dans votre formulaire
  // Exemple :
  nationalite: z.string(),
  parcoursAcademique: z.array(
    z.object({
      cursusType: z.string(),
      // Ajoutez les autres champs nécessaires ici
    })
  ),
  // Ajoutez les autres champs du formulaire ici
});

// Type for API result
type CalcResult = {
  statut: string;
  ratio?: number;
};

// Composant pour le bouton Suivant avec validation conditionnelle
function NextButton({
  currentStep,
  onNext,
  methods,
}: {
  currentStep: number;
  onNext: () => void;
  methods: import("react-hook-form").UseFormReturn<z.input<typeof Schema>>;
}) {
  // Pour l'étape 1 (parcours académique), vérifier qu'il y a une première inscription + formulaire complet
  const isDisabled =
    currentStep === 1 &&
    (() => {
      const parcoursData = methods.watch(
        "parcoursAcademique"
      ) as ParcoursAcademiqueField[];
      const hasPremiereInscription = parcoursData?.some(
        (parcours) => parcours?.cursusType === "premInscription"
      );
      return (
        !hasPremiereInscription ||
        !parcoursData ||
        parcoursData.length === 0 ||
        (() => {
          // Vérifier que le formulaire est complet
          // TODO: rajouter isComplete dans validateParcoursField @Copilot
          return !parcoursData?.every((parcours) => parcours?.isComplete);
        })()
      );
    })();

  return (
    <button
      type="button"
      onClick={onNext}
      disabled={isDisabled}
      className={`flex-1 rounded p-2 font-semibold transition-all ${
        isDisabled
          ? "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
          : "bg-violet-600 text-white hover:brightness-110"
      }`}
      title={
        isDisabled
          ? "Ajoutez au moins une année avec 'Première inscription' pour continuer"
          : "Passer à l'étape suivante"
      }
    >
      Suivant
    </button>
  );
}

// Liste des champs à valider pour chaque étape du formulaire
const stepFields: Array<keyof z.infer<typeof Schema>> = [
  "nationalite",
  "parcoursAcademique",
  // Ajoutez ici les autres champs pour les étapes suivantes, par exemple:
  // "credits",
  // "annee",
];

export default function CalcPage() {
  const methods = useForm<z.input<typeof Schema>>({
    resolver: zodResolver(Schema),
  });
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Chargement des données sauvegardées
  useEffect(() => {
    const savedData = loadFormData();
    if (savedData) {
      (Object.keys(savedData) as Array<keyof typeof Schema.shape>).forEach(
        (key) => {
          methods.setValue(
            key,
            savedData[key] as z.infer<typeof Schema>[typeof key]
          );
        }
      );
    }
  }, [methods]);

  // Sauvegarde automatique des données
  useEffect(() => {
    const subscription = methods.watch((data) => {
      if (
        (Object.keys(data) as Array<keyof typeof data>).some(
          (key) => data[key] !== undefined
        )
      ) {
        console.log("Saving form data:", data);
        console.log("mode de storage", getStorageMode());
        saveFormData(data);
      }
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const handleNext = async () => {
    // Pour l'étape 1 (parcours académique), vérifier qu'il y a une première inscription
    if (step === 1) {
      const parcoursData = methods.watch(
        "parcoursAcademique"
      ) as ParcoursAcademiqueField[];
      const hasPremiereInscription = parcoursData?.some(
        (parcours) => parcours?.cursusType === "premInscription"
      );

      if (
        !hasPremiereInscription ||
        !parcoursData ||
        parcoursData.length === 0
      ) {
        // Ne pas permettre de passer à l'étape suivante
        return;
      }
    }

    const valid = await methods.trigger(stepFields[step]);
    if (valid) setStep((s) => s + 1);
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const onSubmit = async (data: FormData) => {
    setResult(null);
    setError(null);

    const useCookies = canUseCookies();

    try {
      const res = await fetch("/api/calc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Cookie-Consent": useCookies ? "accepted" : "declined",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) {
        setResult(json.result as CalcResult);
        // Nettoyage des données après calcul réussi
        clearFormData();
      } else {
        setError(json.error || "Erreur inconnue");
      }
    } catch {
      setError("Impossible de contacter le serveur.");
    }
  };

  return (
    <>
      <Navbar
        displayShorts={false}
        displayCalcButton={false}
        displayTipButton={true}
      />
      <main className="mx-auto max-w-2xl p-6">
        <h1 className="text-3xl font-extrabold mb-4 text-white drop-shadow-sm">
          Vérifie ta <span className="text-violet-600">finançabilité</span>
        </h1>
        <StorageModeWarning />

        <ProgressIndicator
          currentStep={step}
          totalSteps={4}
          stepLabels={["Nationalité", "Parcours", "Crédits", "Année"]}
        />

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(
              onSubmit as (data: unknown) => Promise<void>
            )}
            className="space-y-4 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-xl p-6"
          >
            <div className="min-h-[400px] transition-all duration-300 ease-in-out">
              {step === 0 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <StepNationalite />
                </div>
              )}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                  <StepAca />
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-6">
              {step > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded p-2 font-semibold hover:brightness-105"
                >
                  Précédent
                </button>
              )}
              {step < 3 && (
                <NextButton
                  currentStep={step}
                  onNext={handleNext}
                  methods={methods}
                />
              )}
              {step === 3 && (
                <button
                  type="submit"
                  disabled={methods.formState.isSubmitting}
                  className="flex-1 bg-violet-600 text-white rounded p-2 font-semibold hover:brightness-110"
                >
                  {methods.formState.isSubmitting
                    ? "Calcul en cours..."
                    : "Calculer"}
                </button>
              )}
            </div>
          </form>
        </FormProvider>
        {/* Résultats */}
        {result && (
          <div className="mt-6 p-4 rounded-xl border bg-slate-50 dark:bg-slate-800">
            <p className="text-sm uppercase text-slate-500">Résultat</p>
            <p className="text-lg font-bold mt-1">{result.statut}</p>
            {result.ratio !== undefined && (
              <p className="text-sm text-slate-600">
                Ratio estimé: {result.ratio}
              </p>
            )}
          </div>
        )}
        {error && (
          <div className="mt-6 p-4 rounded-xl border bg-red-50 text-red-700">
            {error}
          </div>
        )}
      </main>
    </>
  );
}
