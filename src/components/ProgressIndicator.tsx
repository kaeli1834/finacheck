"use client";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export default function ProgressIndicator({ 
  currentStep, 
  totalSteps, 
  stepLabels = []
}: ProgressIndicatorProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Étape {currentStep + 1} sur {totalSteps}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-500">
          {Math.round(((currentStep + 1) / totalSteps) * 100)}%
        </span>
      </div>
      
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-4">
        <div 
          className="bg-violet-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`flex flex-col items-center text-xs transition-colors ${
              i <= currentStep 
                ? "text-violet-600 dark:text-violet-400" 
                : "text-slate-400 dark:text-slate-600"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-colors ${
                i < currentStep
                  ? "bg-violet-600 text-white"
                  : i === currentStep
                  ? "bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-400 border-2 border-violet-600"
                  : "bg-slate-200 dark:bg-slate-700 text-slate-400"
              }`}
            >
              {i < currentStep ? "✓" : i + 1}
            </div>
            {stepLabels[i] && (
              <span className="text-center max-w-16">
                {stepLabels[i]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}