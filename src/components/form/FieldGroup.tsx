import HelpTooltip from "../HelpTooltip";

interface FieldGroupProps {
  label: string;
  helpText?: string;
  helpPosition?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  className?: string;
}

export default function FieldGroup({
  label,
  helpText,
  helpPosition = "right",
  children,
  className = "",
}: FieldGroupProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
        {helpText && (
          <HelpTooltip content={helpText} position={helpPosition}>
            <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-xs text-slate-600 dark:text-slate-400 hover:bg-violet-200 dark:hover:bg-violet-800 transition-colors">
              ?
            </div>
          </HelpTooltip>
        )}
      </div>
      {children}
    </div>
  );
}