"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Puzzle,
  Search,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { MissionRole, UserChoice } from "@/types/challenge";

interface SharedStepProps {
  choices: UserChoice;
  setChoices: (value: UserChoice) => void;
  nextStep: () => void;
}

interface MissionStepProps extends SharedStepProps {
  roles: MissionRole[];
}

export function MissionStep({ choices, setChoices, nextStep, roles }: MissionStepProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <span className="bg-brand-accent/20 text-brand-accent text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          Phase 1 · Modules 1 & 3
        </span>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Choose Your Mission</h2>
        <p className="text-gray-400">
          Who are you, and what real challenge do you want AI to help you with?
          Your answer shapes everything that follows.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">I am a...</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setChoices({ ...choices, role: role.id })}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                choices.role === role.id
                  ? "border-brand-accent bg-brand-accent/10"
                  : "border-brand-border bg-brand-card hover:border-gray-500"
              }`}
            >
              <span className="text-2xl">{role.icon}</span>
              <span className="font-medium text-left">{role.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
          My everyday challenge is...
        </h3>
        <textarea
          value={choices.challenge}
          onChange={(e) => setChoices({ ...choices, challenge: e.target.value })}
          placeholder="e.g. I spend too much time summarizing meeting notes and sending follow-up emails to my team after every project meeting."
          className="w-full h-32 bg-brand-card border border-brand-border rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-accent resize-none transition-colors"
        />
        <p className="text-xs text-gray-500 italic">
          Be specific — the more real your challenge, the more useful your agent will be.
        </p>
      </div>

      <button
        onClick={nextStep}
        disabled={!choices.role || !choices.challenge}
        className="flex items-center gap-3 bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95"
      >
        <Search size={18} />
        Analyse My Challenge
      </button>
    </div>
  );
}

export function BlueprintStep({ nextStep }: Pick<SharedStepProps, "nextStep">) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <span className="bg-brand-accent/20 text-brand-accent text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          Phase 2 · Modules 2 & 4
        </span>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">
          Build Your Agentic Blueprint
        </h2>
        <p className="text-gray-400">
          Based on your challenge, we need to decide: Is this a simple linear task, or does it
          require an autonomous Agent?
        </p>
      </div>

      <div className="bg-brand-accent/10 border border-brand-accent/30 p-6 rounded-2xl space-y-4 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Sparkles size={80} className="text-brand-accent" />
        </div>
        <div className="flex items-start gap-4">
          <div className="bg-brand-accent/20 p-2 rounded-lg">
            <Bot className="text-brand-accent" size={24} />
          </div>
          <div className="z-10">
            <h4 className="font-semibold italic text-brand-accent flex items-center gap-2">
              Analysis Complete
              <CheckCircle2 size={16} />
            </h4>
            <p className="text-gray-300 mt-1 max-w-xl">
              Your challenge involves semantic understanding, conditional logic, and external
              communication. This is{" "}
              <span className="text-white font-black underline decoration-2 decoration-brand-accent">
                85% AGENTIC
              </span>
              . It requires a system that can "Plan, Execute, and Verify".
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-brand-card border border-brand-border p-6 rounded-2xl space-y-4 hover:border-brand-accent/50 transition-colors group">
          <h3 className="font-bold flex items-center gap-2 text-lg">
            <Zap size={20} className="text-yellow-500 group-hover:scale-110 transition-transform" />
            Reasoning Strategy
          </h3>
          <p className="text-xs text-gray-500 font-mono">MODULE 2: CHAIN OF THOUGHT</p>
          <div className="space-y-2">
            {["Chain of Thought (CoT)", "ReAct (Reason + Act)", "Chain of Draft"].map((strategy) => (
              <label
                key={strategy}
                className="flex items-center gap-3 p-3 border border-brand-border rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
              >
                <input
                  type="radio"
                  name="strategy"
                  className="accent-brand-accent w-4 h-4"
                  defaultChecked={strategy.includes("ReAct")}
                />
                <span className="text-sm font-medium">{strategy}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-brand-card border border-brand-border p-6 rounded-2xl space-y-4 hover:border-brand-accent/50 transition-colors group">
          <h3 className="font-bold flex items-center gap-2 text-lg">
            <Puzzle size={20} className="text-brand-accent group-hover:scale-110 transition-transform" />
            Required Tools
          </h3>
          <p className="text-xs text-gray-500 font-mono">MODULE 3: FUNCTION CALLING</p>
          <div className="grid grid-cols-2 gap-2">
            {["Gmail API", "Calendar", "Web Search", "Python SDK", "SQL Bridge", "File System"].map(
              (tool) => (
                <label
                  key={tool}
                  className="flex items-center gap-3 p-2 border border-brand-border rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <input
                    type="checkbox"
                    className="accent-brand-accent rounded"
                    defaultChecked={["Gmail API", "Web Search"].includes(tool)}
                  />
                  <span className="text-xs font-medium">{tool}</span>
                </label>
              ),
            )}
          </div>
        </div>
      </div>

      <button
        onClick={nextStep}
        className="group flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-white px-8 py-4 rounded-xl font-bold transition-all w-full justify-center shadow-lg active:scale-95"
      >
        Continue to Prompting
        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

export function UpgradeStep({ choices, setChoices, nextStep }: SharedStepProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <span className="bg-brand-accent/20 text-brand-accent text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          Phase 3 · Module 2 Mastery
        </span>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold">The Prompt Upgrade</h2>
        <p className="text-gray-400">
          Great agents need great instructions. Let&apos;s upgrade your simple request into an
          Agentic Prompt with clear constraints and Personas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Your Starting Prompt
            </h3>
            <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-1 rounded">
              Vulnerable to misinterpretation
            </span>
          </div>
          <div className="bg-brand-bg border border-brand-border p-4 rounded-xl font-mono text-sm text-gray-400 italic">
            &quot;{choices.prompt}&quot;
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-green-500 flex items-center gap-2">
            <Sparkles size={16} />
            Upgraded Agentic Prompt
          </h3>
          <div className="relative group">
            <textarea
              value={
                choices.upgradedPrompt ||
                `ACT AS a Professional Administrative Agent.
YOUR GOAL is to streamline team communication post-meetings.
STEPS:
1. Search the latest notes for "Action Items".
2. Cross-reference with the team directory for emails.
3. DRAFT (do not send) a summary email to all participants.
CONSTRAINTS: Be concise. Use bullet points. If unsure of an owner, mark as [PENDING].`
              }
              onChange={(e) => setChoices({ ...choices, upgradedPrompt: e.target.value })}
              className="w-full h-48 bg-brand-card border-2 border-brand-accent/50 rounded-xl p-6 text-white text-sm font-mono focus:outline-none focus:border-brand-accent shadow-[0_0_15px_rgba(79,70,229,0.1)] resize-none"
            />
            <div className="absolute top-2 right-2 text-[10px] bg-brand-accent text-white px-2 py-1 rounded uppercase font-bold animate-pulse">
              Live Editing
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={nextStep}
        className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accent-hover text-white px-8 py-4 rounded-xl font-bold transition-all w-full justify-center shadow-lg active:scale-95"
      >
        Test This Prompt
        <ArrowRight size={18} className="ml-2" />
      </button>
    </div>
  );
}

export function ActivateStep({ nextStep }: Pick<SharedStepProps, "nextStep">) {
  return (
    <div className="space-y-10 py-4">
      <div className="text-center space-y-4">
        <div className="inline-block p-4 bg-brand-accent/20 rounded-full mb-4 animate-bounce">
          <Bot size={64} className="text-brand-accent" />
        </div>
        <h2 className="text-4xl font-black">Activating Your Agent...</h2>
        <p className="text-gray-400 max-w-md mx-auto italic">
          &quot;I&apos;m now reading the meeting notes... identifying action items... matching
          emails... drafting response...&quot;
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
            <CheckCircle2 size={16} />
          </div>
          <div className="flex-1 h-2 bg-brand-border rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
              className="h-full bg-green-500 shadow-[0_0_10px_#22c55e]"
            />
          </div>
          <span className="text-xs font-mono text-green-500">100%</span>
        </div>

        <div className="bg-brand-bg rounded-2xl p-6 border border-brand-border font-mono text-xs overflow-hidden h-40 relative">
          <div className="absolute inset-0 bg-linear-to-t from-brand-bg via-transparent to-transparent pointer-events-none z-10" />
          <div className="space-y-1 animate-pulse">
            <p className="text-brand-accent">[SYSTEM] Fetching context from Module 4...</p>
            <p className="text-gray-500">[LOG] Task initialized: post-meeting-sync</p>
            <p className="text-gray-500">[LOG] Tool Call: fetchNotes() -&gt; SUCCESS</p>
            <p className="text-gray-500">[LOG] Strategy: ReAct loop start</p>
            <p className="text-gray-500">[LOG] Reasoning: Extracting table from markdown...</p>
            <p className="text-yellow-500">
              [WARN] Semantic ambiguity detected. Self-correcting...
            </p>
            <p className="text-gray-500">[LOG] Tool Call: draftEmail() -&gt; COMPLETED</p>
            <p className="text-white font-bold">[READY] Output generated via Gemini-2.0-Flash</p>
          </div>
        </div>
      </div>

      <button
        onClick={nextStep}
        className="max-w-md mx-auto flex items-center gap-2 bg-linear-to-r from-brand-accent to-purple-600 hover:scale-105 text-white px-8 py-5 rounded-2xl font-black text-xl transition-all w-full justify-center shadow-2xl active:scale-95 border border-white/20"
      >
        Get Your AI Director Report
        <Trophy size={24} className="ml-2" />
      </button>
    </div>
  );
}

interface ReportStepProps {
  choices: UserChoice;
  restart: () => void;
}

export function ReportStep({ choices, restart }: ReportStepProps) {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-black tracking-tight">Mission Accomplished!</h2>
        <p className="text-gray-400">
          You&apos;ve successfully designed, prompted, and activated an Agentic AI solution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Agent Complexity", value: "High", color: "text-brand-accent" },
          { label: "Time Saved / Week", value: "4.5 Hours", color: "text-green-500" },
          {
            label: "Course Progress",
            value: "Modules 1-4 Complete",
            color: "text-yellow-500",
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-brand-card border border-brand-border p-6 rounded-2xl text-center space-y-1">
            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">
              {stat.label}
            </p>
            <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white text-brand-bg rounded-4xl p-10 space-y-8 relative shadow-2xl">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-2xl font-black uppercase">AI Director Report</h3>
            <p className="text-xs font-bold text-gray-400">REFERENCE ID: AGENT-00129-PX</p>
          </div>
          <div className="bg-brand-bg text-white p-3 rounded-xl">
            <GraduationCap size={32} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-l-4 border-brand-accent pl-6">
            <p className="text-sm font-bold uppercase text-gray-400 mb-1">Challenge Summary</p>
            <p className="text-lg font-medium">Automate post-meeting workflows for a {choices.role} role.</p>
          </div>

          <div className="grid grid-cols-2 gap-8 outline-1 outline-gray-100 p-6 rounded-2xl">
            <div>
              <h5 className="text-[10px] font-bold uppercase mb-2">Technical Engine</h5>
              <p className="text-sm">Model: Gemini Ultra (Reasoning)</p>
              <p className="text-sm">Loop: ReAct Architecture</p>
            </div>
            <div>
              <h5 className="text-[10px] font-bold uppercase mb-2">Capabilities</h5>
              <p className="text-sm italic">Multi-tool orchestration</p>
              <p className="text-sm italic">Ambiguity resolution</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase">Certified Agentic Visionary</p>
            <p className="text-xl font-serif italic">AI Director Academy</p>
          </div>
          <div className="bg-brand-bg text-white px-4 py-2 rounded-lg text-xs font-bold font-mono">
            VERIFIED-LP-2026
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() => window.print()}
          className="flex-1 bg-brand-card hover:bg-white/10 border border-brand-border text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          Download PDF Report
        </button>
        <button
          onClick={restart}
          className="flex-1 bg-brand-accent hover:bg-brand-accent-hover text-white px-6 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
        >
          Start New Mission
        </button>
      </div>
    </div>
  );
}
