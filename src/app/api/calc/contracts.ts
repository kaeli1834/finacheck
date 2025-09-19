// schéma de validation pour les différentes étapes du formulaire
import { z } from "zod";

export const Step1 = z.object({
  isUE: z.boolean(),
  isAssimile: z.boolean().optional(),
});

// TODO: à compléter @kaeli1834
export const Step2 = z.object({
    inscriptions: z.array(z.object({
        anneeInscription: z.coerce.number().int().min(2000).max(2100),
        cursus: z.enum(["firstInscription", "sameInscription", "reorientation"]),
        creditsAcquis: z.coerce.number().int().min(0).max(100),
        creditsInscrits: z.coerce.number().int().min(0).max(100),
        allegement: z.boolean(),
    })),
});

// TODO : add others steps

// TODO: update the final schema according to the steps
export const FinalInputSchema = z.intersection(Step1, Step2)
    .superRefine((v, ctx) => {
        v.inscriptions.forEach(element => {
            if (element.cursus === "firstInscription") {
                if (element.creditsAcquis === undefined) {
                    ctx.addIssue({
                        code: "custom",
                        message: "Le champ creditsAcquis est requis pour les UE",
                    });
                }
            }
        });
    });

export type FinalInput = z.infer<typeof FinalInputSchema>;
