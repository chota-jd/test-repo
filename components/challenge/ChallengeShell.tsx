"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bot, Globe, Puzzle, Trophy, Zap } from "lucide-react";
import { ChallengeFooter } from "@/components/challenge/ChallengeFooter";
import { ChallengeHeader } from "@/components/challenge/ChallengeHeader";
import { StepNavigation } from "@/components/challenge/StepNavigation";
import {
  ActivateStep,
  BlueprintStep,
  MissionStep,
  ReportStep,
  UpgradeStep,
} from "@/components/challenge/StepPanels";
import { ActivityStep, MissionRole, StepInfo, UserChoice } from "@/types/challenge";

const STEPS: StepInfo[] = [
  { id: "mission", label: "Choose Mission", icon: <Globe size={16} /> },
  { id: "blueprint", label: "Build Blueprint", icon: <Puzzle size={16} /> },
  { id: "upgrade", label: "Test & Upgrade", icon: <Zap size={16} /> },
  { id: "activate", label: "Activate Agent", icon: <Bot size={16} /> },
  { id: "report", label: "Your Report", icon: <Trophy size={16} /> },
];

const ROLES: MissionRole[] = [
  { id: "educator", label: "Educator / Teacher", icon: "🎓" },
  { id: "pm", label: "Project Manager", icon: "📊" },
  { id: "parent", label: "Parent / Family", icon: "🏠" },
  { id: "pro", label: "Working Professional", icon: "💼" },
  { id: "student", label: "Student / Learner", icon: "📚" },
  { id: "entrepreneur", label: "Entrepreneur", icon: "🚀" },
];

const INITIAL_CHOICES: UserChoice = {
  role: null,
  challenge: "",
  isAgentic: null,
  blueprint: { tool: "", model: "gemma-4-31b-it-free", reasoning: "" },
  prompt: "Summarize the meeting notes and send emails.",
  upgradedPrompt: "",
  generatedOutput: "",
};

interface ChallengeShellProps {
  initialStep?: ActivityStep;
}

export function ChallengeShell({ initialStep = "mission" }: ChallengeShellProps) {
  const [currentStep, setCurrentStep] = useState<ActivityStep>(initialStep);
  const [choices, setChoices] = useState<UserChoice>(INITIAL_CHOICES);

  const stepIndex = useMemo(
    () => STEPS.findIndex((step) => step.id === currentStep),
    [currentStep],
  );

  const nextStep = () => {
    const nextIdx = stepIndex + 1;
    if (nextIdx < STEPS.length) {
      setCurrentStep(STEPS[nextIdx].id);
    }
  };

  const restartFlow = () => {
    setCurrentStep("mission");
    setChoices(INITIAL_CHOICES);
  };

  return (
    <div className="min-h-screen p-6 md:p-12 lg:p-16 max-w-6xl mx-auto flex flex-col items-center">
      <ChallengeHeader />

      <StepNavigation
        steps={STEPS}
        currentStep={currentStep}
        stepIndex={stepIndex}
        onSelectStep={setCurrentStep}
      />

      <div className="w-full bg-brand-card/30 backdrop-blur-xl border border-brand-border rounded-[3rem] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative overflow-hidden ring-1 ring-white/10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-accent/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            {currentStep === "mission" && (
              <MissionStep choices={choices} setChoices={setChoices} nextStep={nextStep} roles={ROLES} />
            )}
            {currentStep === "blueprint" && (
              <BlueprintStep choices={choices} setChoices={setChoices} nextStep={nextStep} />
            )}
            {currentStep === "upgrade" && (
              <UpgradeStep choices={choices} setChoices={setChoices} nextStep={nextStep} />
            )}
            {currentStep === "activate" && <ActivateStep choices={choices} nextStep={nextStep} />}
            {currentStep === "report" && <ReportStep choices={choices} restart={restartFlow} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <ChallengeFooter />
    </div>
  );
}
