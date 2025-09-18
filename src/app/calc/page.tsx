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
import DebugPanel from "@/components/DebugPanel";
import { clear } from "console";

// Schéma de validation
const Schema = z.object({
  nationalite: z.enum(["ue", "hors_ue"]),
  assimilé: z.enum(["oui", "non"]).optional(),
  creditsAcquis: z.coerce.number().int().min(0).max(300),
  creditsEchecs: z.coerce.number().int().min(0).max(300),
  anneeInscription: z.coerce.number().int().min(2000).max(2100),
});
type FormData = z.infer<typeof Schema>;

// Type for API result
type CalcResult = {
  statut: string;
  ratio?: number;
};

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
      Object.keys(savedData).forEach((key) => {
        methods.setValue(key as keyof FormData, savedData[key]);
      });
    }
  }, [methods]);

  // Sauvegarde automatique des données
  useEffect(() => {
    const subscription = methods.watch((data) => {
      if (Object.keys(data).some((key) => data[key] !== undefined)) {
        console.log("Saving form data:", data);
        console.log("mode de storage", getStorageMode());
        saveFormData(data);
      }
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  const stepFields: Array<Array<keyof FormData>> = [
    // 1. Nationalité
    ["nationalite"],
    ["creditsAcquis"],
    ["creditsEchecs"],
    ["anneeInscription"],
  ];

  const handleNext = async () => {
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
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-violet-600 text-white rounded p-2 font-semibold hover:brightness-110"
                >
                  Suivant
                </button>
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
