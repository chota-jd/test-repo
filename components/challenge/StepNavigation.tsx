"use client";

import { ActivityStep, StepInfo } from "@/types/challenge";

interface StepNavigationProps {
  steps: StepInfo[];
  currentStep: ActivityStep;
  stepIndex: number;
  onSelectStep: (step: ActivityStep) => void;
}

export function StepNavigation({
  steps,
  currentStep,
  stepIndex,
  onSelectStep,
}: StepNavigationProps) {
  return (
    <nav className="flex items-center gap-2 mb-16 bg-white/5 p-2 rounded-2xl border border-white/10 overflow-x-auto max-w-full backdrop-blur-md sticky top-6 z-50">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <button
            onClick={() => idx <= stepIndex && onSelectStep(step.id)}
            disabled={idx > stepIndex}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${
              currentStep === step.id
                ? "bg-brand-accent step-shadow text-white scale-105"
                : "text-gray-500 hover:text-gray-300 disabled:opacity-40"
            }`}
          >
            <span className={currentStep === step.id ? "animate-pulse" : ""}>
              {step.icon}
            </span>
            <span className="text-xs md:text-sm font-black uppercase tracking-widest">
              {step.label}
            </span>
          </button>
          {idx < steps.length - 1 && (
            <div className="w-8 h-[2px] bg-white/5 mx-2 rounded-full" />
          )}
        </div>
      ))}
    </nav>
  );
}
