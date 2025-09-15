import { useFormContext } from "react-hook-form";

//1. Check nationalité : UE ou HORS UE
export function StepCredits() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();
  const nationalite = watch("nationalite");
  return (
    <div>
      <label className="block text-sm font-medium">
        Quelle est ta nationalité ?
      </label>
      <select
        {...register("nationalite")}
        className="mt-1 w-full border rounded p-2"
      >
        <option value="ue">UE</option>
        <option value="hors_ue">HORS UE</option>
      </select>
      {/* si HORS UE, ajout d'une autre question */}
      {nationalite === "hors_ue" && (
        <div>
          <label className="block text-sm font-medium">
            Es-tu assimilé*e ?
          </label>
          <select
            {...register("assimilé")}
            className="mt-1 w-full border rounded p-2"
          >
            <option value="oui">Oui</option>
            <option value="non">Non</option>
          </select>
        </div>
      )}
      {errors.nationalite && (
        <p className="text-red-600 text-sm">
          {errors.nationalite.message as string}
        </p>
      )}
    </div>
  );
}

export function StepEchecs() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label className="block text-sm font-medium">Crédits en échec</label>
      <input
        type="number"
        {...register("creditsEchecs")}
        className="mt-1 w-full border rounded p-2"
      />
      {errors.creditsEchecs && (
        <p className="text-red-600 text-sm">
          {errors.creditsEchecs.message as string}
        </p>
      )}
    </div>
  );
}

export function StepAnnee() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label className="block text-sm font-medium">Année d’inscription</label>
      <input
        type="number"
        {...register("anneeInscription")}
        className="mt-1 w-full border rounded p-2"
      />
      {errors.anneeInscription && (
        <p className="text-red-600 text-sm">
          {errors.anneeInscription.message as string}
        </p>
      )}
    </div>
  );
}
