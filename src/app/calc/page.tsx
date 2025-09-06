"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import Navbar from "@/components/Navbar";

// Schéma de validation
const Schema = z.object({
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(Schema) });

  const [result, setResult] = useState<CalcResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/calc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.ok) {
        setResult(json.result as CalcResult);
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
      <main className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4">Calcul de finançabilité</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Crédits acquis</label>
            <input
              type="number"
              {...register("creditsAcquis")}
              className="mt-1 w-full border rounded p-2"
            />
            {errors.creditsAcquis && (
              <p className="text-red-600 text-sm">
                {errors.creditsAcquis.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Crédits en échec
            </label>
            <input
              type="number"
              {...register("creditsEchecs")}
              className="mt-1 w-full border rounded p-2"
            />
            {errors.creditsEchecs && (
              <p className="text-red-600 text-sm">
                {errors.creditsEchecs.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Année d’inscription
            </label>
            <input
              type="number"
              {...register("anneeInscription")}
              className="mt-1 w-full border rounded p-2"
            />
            {errors.anneeInscription && (
              <p className="text-red-600 text-sm">
                {errors.anneeInscription.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-violet-600 text-white rounded p-2 font-semibold hover:brightness-110"
          >
            {isSubmitting ? "Calcul en cours..." : "Calculer"}
          </button>
        </form>

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
