import { Sparkles } from "lucide-react";

export function ChallengeHeader() {
  return (
    <header className="text-center space-y-6 mb-16 relative">
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
        <Sparkles size={120} className="text-brand-accent" />
      </div>
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-linear-to-b from-white to-gray-600 bg-clip-text text-transparent">
        AI Director Challenge
      </h1>
      <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
        Apply everything from all 4 modules in one guided journey. You will
        classify a real task, build an agent blueprint, upgrade your prompts,
        and earn your AI Director report.
      </p>
    </header>
  );
}
