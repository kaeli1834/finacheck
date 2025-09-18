import { useFormContext } from "react-hook-form";

interface Option {
  value: string;
  label: string;
  icon: string;
  description?: string;
  desc?: string; // Pour compatibilité
}

interface RadioButtonGroupProps {
  name: string;
  options: Option[];
  selectedValue?: string;
  colorScheme?: "violet" | "blue" | "orange" | "amber";
  layout?: "grid" | "vertical";
  gridCols?: number;
}

export default function RadioButtonGroup({
  name,
  options,
  selectedValue,
  colorScheme = "violet",
  layout = "vertical",
  gridCols = 2,
}: RadioButtonGroupProps) {
  const { register, watch } = useFormContext();
  const currentValue = watch(name) || selectedValue;

  const colorClasses = {
    violet: {
      selected: "border-violet-500 bg-violet-50 dark:bg-violet-900/20",
      hover: "border-slate-300 dark:border-slate-500",
    },
    blue: {
      selected: "border-blue-500 bg-blue-100 dark:bg-blue-800/30",
      hover: "border-blue-300 dark:border-blue-600",
    },
    orange: {
      selected: "border-orange-500 bg-orange-50 dark:bg-orange-900/20",
      hover: "border-slate-300 dark:border-slate-500",
    },
    amber: {
      selected: "border-amber-500 bg-amber-100 dark:bg-amber-800/30",
      hover: "border-amber-300 dark:border-amber-600",
    },
  };

  const containerClass = layout === "grid" 
    ? `grid gap-2 grid-cols-${gridCols}` 
    : "space-y-2";

  return (
    <div className={containerClass}>
      {options.map((option) => {
        const isSelected = currentValue === option.value;
        const colors = colorClasses[colorScheme];
        
        return (
          <label
            key={option.value}
            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
              isSelected
                ? colors.selected
                : `border-slate-200 dark:border-slate-600 hover:${colors.hover}`
            }`}
          >
            <input
              type="radio"
              {...register(name)}
              value={option.value}
              className="sr-only"
            />
            <span className="text-lg mr-3">{option.icon}</span>
            <div>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {option.label}
              </span>
              {(option.description || option.desc) && (
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {option.description || option.desc}
                </div>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}