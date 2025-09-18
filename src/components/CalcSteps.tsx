import { useFormContext, useFieldArray } from "react-hook-form";

//1. Check nationalité : UE ou HORS UE
export function StepNationalite() {
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
      {/* si HORS UE, check si assimilé */}
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

type ParcoursAcademiqueField = {
  id: string;
  annee: string;
  premInscription: boolean;
  sameInscription: boolean;
  reorientation: boolean;
  allegement: boolean;
  creditsAcquis: string;
  creditsEchecs: string;
  etablissement?: string;
  cursusType?: "premInscription" | "sameInscription" | "reorientation";
};

type StepAcaFormValues = {
  parcoursAcademique: ParcoursAcademiqueField[];
};

export function StepAca() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<StepAcaFormValues>();

  const { fields, append, remove } = useFieldArray<StepAcaFormValues>({
    control,
    name: "parcoursAcademique",
  });

  // Helper to get next academic year string
  function getNextAcademicYear(index: number) {
    const now = new Date();
    // If before August, academic year is previous year - current year
    const currentYear =
      now.getMonth() < 7 ? now.getFullYear() : now.getFullYear();
    const start = currentYear - index - 1;
    const end = start + 1;
    return `${start}-${end}`;
  }

  const handleAdd = () => {
    append({
      id: `${Date.now()}-${fields.length}`,
      annee: getNextAcademicYear(fields.length),
      premInscription: false,
      sameInscription: false,
      reorientation: false,
      allegement: false,
      creditsAcquis: "",
      creditsEchecs: "",
    });
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Parcours académique
      </label>
      <div className="">
        <table className="w-full min-w-max border mb-2 text-xs">
          <thead>
            <tr>
              <th
                className="border px-1 py-1 text-xs"
                style={{ width: "80px" }}
              >
                Année
              </th>
              <th>
                {/* check si same inscription, reorientation */}
                <span className="px-1 py-1 text-xs">Cursus</span>
              </th>
              <th
                className="border px-1 py-1 text-xs"
                style={{ width: "100px" }}
              >
                Crédits acquis
              </th>
              <th
                className="border px-1 py-1 text-xs"
                style={{ width: "100px" }}
              >
                Crédits Inscrits
              </th>
              <th className="border px-1 py-1 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, idx) => (
              <tr key={field.id}>
                <td className="border px-1 py-1">
                  <input
                    type="text"
                    {...register(`parcoursAcademique.${idx}.annee`)}
                    className="w-full rounded p-1 text-xs"
                    value={field.annee}
                    readOnly
                  />
                </td>
                <td className="border px-1 py-1">
                  {/* Radio buttons for cursus type */}
                  <label className="px-1 py-1 text-xs">
                    <input
                      type="radio"
                      {...register(`parcoursAcademique.${idx}.cursusType`)}
                      value="premInscription"
                      className="mr-1"
                    />
                    Première inscription
                  </label>
                  <span className="mx-2">|</span>
                  <label className="px-1 py-1 text-xs">
                    <input
                      type="radio"
                      {...register(`parcoursAcademique.${idx}.cursusType`)}
                      value="sameInscription"
                      className="mr-1"
                    />
                    Continuation
                    <span
                      className="ml-1 cursor-pointer"
                      title="Si vous continuez dans le même cursus que l'année académique précédente, cochez cette case. 
                  Si vous avez changé de cursus ou de formation, laissez-la décochée."
                    >
                      {/* TODO: add icon here */}?
                    </span>
                  </label>
                  <span className="mx-2">|</span>
                  <label className="px-1 py-1 text-xs">
                    <input
                      type="radio"
                      {...register(`parcoursAcademique.${idx}.cursusType`)}
                      value="reorientation"
                      className="mr-1"
                    />
                    Réorientation
                  </label>
                </td>
                <td className="border px-1 py-1">
                  <input
                    type="text"
                    {...register(`parcoursAcademique.${idx}.etablissement`)}
                    className="w-full border rounded p-1 text-xs"
                  />
                </td>
                <td className="border px-1 py-1">
                  <input
                    type="number"
                    {...register(`parcoursAcademique.${idx}.creditsEchecs`)}
                    className="w-full border rounded p-1 text-xs"
                  />
                </td>
                <td className="border px-1 py-1">
                  <button
                    type="button"
                    onClick={() => remove(idx)}
                    className="text-red-600 text-xs"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
      >
        Ajouter une ligne
      </button>
      {errors.parcoursAcademique && (
        <p className="text-red-600 text-sm mt-2">
          {errors.parcoursAcademique.message as string}
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
