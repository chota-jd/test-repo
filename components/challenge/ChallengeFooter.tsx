import { Code2, Rocket, Users } from "lucide-react";

export function ChallengeFooter() {
  return (
    <footer className="mt-20 text-center text-gray-500 space-y-4">
      <div className="flex items-center justify-center gap-6 opacity-40">
        <Code2 size={20} />
        <Rocket size={20} />
        <Users size={20} />
      </div>
      <p className="text-xs uppercase tracking-[0.3em] font-bold">
        © 2026 Agentic AI Course · Learning Experience Lab
      </p>
    </footer>
  );
}
