import { useFormContext } from "react-hook-form";
import RadioButtonGroup from "../form/RadioButtonGroup";
import FieldGroup from "../form/FieldGroup";
import CreditFields from "../form/CreditFields";
import { autreTypeOptions } from "@/data/formOptions";
import HelpTooltip from "../HelpTooltip";

interface AnneeAutreProps {
  index: number;
}

export default function AnneeAutre({ index }: AnneeAutreProps) {
  const { register, watch } = useFormContext();
  const currentAutreType = watch(`parcoursAcademique.${index}.autreType`);

  return (
    <div className="space-y-4">
      {/* Sélection du sous-type d'autre */}
      <FieldGroup
        label="Type d'activité"
        helpText="Précisez le type d'activité que vous avez exercé cette année"
      >
        <RadioButtonGroup
          name={`parcoursAcademique.${index}.autreType`}
          options={autreTypeOptions}
          colorScheme="orange"
        />
      </FieldGroup>

      {/* Champs conditionnels selon le type d'autre */}
      {currentAutreType === "academique_hors_fwb" && (
        <div className="space-y-3">
          <FieldGroup
            label="Concours"
            helpText="Précisez si vous avez passé un concours cette année"
          >
            <RadioButtonGroup
              name={`parcoursAcademique.${index}.concoursType`}
              options={[
                { value: "oui", label: "Oui", icon: "" },
                { value: "non", label: "Non", icon: "" },
              ]}
              colorScheme="blue"
            />
            {watch(`parcoursAcademique.${index}.concoursType`) === "oui" && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <FieldGroup
                  label="Avez-vous réussi ?"
                  helpText="Indiquez si vous avez réussi le concours"
                >
                  <RadioButtonGroup
                    name={`parcoursAcademique.${index}.concoursOption`}
                    options={[
                      { value: "réussi", label: "Concours réussi", icon: "" },
                      { value: "raté", label: "Concours raté", icon: "" },
                    ]}
                    colorScheme="blue"
                  />
                </FieldGroup>
              </div>
            )}
          </FieldGroup>
        </div>
      )}
    </div>
  );
}
