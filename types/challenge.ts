import { ReactNode } from "react";

export type ActivityStep =
  | "mission"
  | "blueprint"
  | "upgrade"
  | "activate"
  | "report";

export interface MissionRole {
  id: string;
  label: string;
  icon: string;
}

export interface StepInfo {
  id: ActivityStep;
  label: string;
  icon: ReactNode;
}

export interface UserChoice {
  role: string | null;
  challenge: string;
  isAgentic: boolean | null;
  blueprint: {
    tool: string;
    model: string;
    reasoning: string;
  };
  prompt: string;
  upgradedPrompt: string;
}
