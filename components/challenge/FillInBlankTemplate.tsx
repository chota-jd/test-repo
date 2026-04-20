"use client";

import { useMemo, useState } from "react";

type BlankSlot = "first" | "second";

export function FillInBlankTemplate() {
  const templateAnswers = useMemo(() => ["YOUR GOAL", "Keep it concise"], []);
  const [draggingAnswer, setDraggingAnswer] = useState<string | null>(null);
  const [filledBlanks, setFilledBlanks] = useState<Record<BlankSlot, string>>({
    first: "",
    second: "",
  });
  const [builderTitle, setBuilderTitle] = useState("My onboarding assistant prompt");
  const [builderTemplate, setBuilderTemplate] = useState(
    "As an AI assistant, first define [blank1], then respond with [blank2].",
  );
  const [builderAnswers, setBuilderAnswers] = useState<Record<BlankSlot, string>>({
    first: "the user goal clearly",
    second: "a concise 3-step action plan",
  });
  const [builderDraggingAnswer, setBuilderDraggingAnswer] = useState<string | null>(null);
  const [builderFilledBlanks, setBuilderFilledBlanks] = useState<Record<BlankSlot, string>>({
    first: "",
    second: "",
  });

  const usedAnswers = useMemo(
    () => new Set([filledBlanks.first, filledBlanks.second].filter(Boolean)),
    [filledBlanks.first, filledBlanks.second],
  );

  const handleDropAnswer = (slot: BlankSlot) => {
    if (!draggingAnswer) return;

    setFilledBlanks((prev) => {
      const next = { ...prev };

      if (next.first === draggingAnswer) next.first = "";
      if (next.second === draggingAnswer) next.second = "";

      next[slot] = draggingAnswer;
      return next;
    });

    setDraggingAnswer(null);
  };

  const clearSlot = (slot: "first" | "second") => {
    setFilledBlanks((prev) => ({ ...prev, [slot]: "" }));
  };

  const builderUsedAnswers = useMemo(
    () => new Set([builderFilledBlanks.first, builderFilledBlanks.second].filter(Boolean)),
    [builderFilledBlanks.first, builderFilledBlanks.second],
  );

  const builderAnswerPool = useMemo(
    () => [builderAnswers.first.trim(), builderAnswers.second.trim()].filter(Boolean),
    [builderAnswers.first, builderAnswers.second],
  );

  const handleBuilderDropAnswer = (slot: BlankSlot) => {
    if (!builderDraggingAnswer) return;

    setBuilderFilledBlanks((prev) => {
      const next = { ...prev };

      if (next.first === builderDraggingAnswer) next.first = "";
      if (next.second === builderDraggingAnswer) next.second = "";

      next[slot] = builderDraggingAnswer;
      return next;
    });

    setBuilderDraggingAnswer(null);
  };

  const clearBuilderSlot = (slot: BlankSlot) => {
    setBuilderFilledBlanks((prev) => ({ ...prev, [slot]: "" }));
  };

  const resetBuilderPractice = () => {
    setBuilderFilledBlanks({ first: "", second: "" });
    setBuilderDraggingAnswer(null);
  };

  const templateSegments = useMemo(() => {
    const normalized = builderTemplate || "[blank1] [blank2]";
    const parts = normalized.split(/\[blank1\]|\[blank2\]/g);
    const markers = [...normalized.matchAll(/\[(blank1|blank2)\]/g)].map((match) => match[1]);

    return { parts, markers };
  }, [builderTemplate]);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
        Fill-in-Blank Template (Drag &amp; Drop)
      </h3>
      <p className="text-sm text-gray-400">
        Drag an answer chip into each blank to complete the prompt instruction.
      </p>

      <div className="bg-brand-card border border-brand-border rounded-xl p-4 md:p-5 space-y-4">
        <p className="text-sm md:text-base leading-relaxed">
          <span className="text-gray-300">Rule:</span> You must define{" "}
          <span
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDropAnswer("first")}
            className="inline-flex min-w-[140px] mx-1 px-3 py-1 rounded-lg border border-dashed border-brand-accent/70 bg-brand-bg align-middle justify-center text-sm font-semibold"
          >
            {filledBlanks.first || "____ Blank 1 ____"}
          </span>
          and set constraints like{" "}
          <span
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDropAnswer("second")}
            className="inline-flex min-w-[170px] mx-1 px-3 py-1 rounded-lg border border-dashed border-brand-accent/70 bg-brand-bg align-middle justify-center text-sm font-semibold"
          >
            {filledBlanks.second || "____ Blank 2 ____"}
          </span>
          .
        </p>

        <div className="flex flex-wrap gap-3">
          {templateAnswers.map((answer) => {
            const isUsed = usedAnswers.has(answer);

            return (
              <button
                key={answer}
                type="button"
                draggable={!isUsed}
                onDragStart={() => setDraggingAnswer(answer)}
                onDragEnd={() => setDraggingAnswer(null)}
                className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                  isUsed
                    ? "border-green-500/40 text-green-400 bg-green-500/10 cursor-not-allowed"
                    : "border-brand-border bg-brand-bg hover:border-brand-accent cursor-grab"
                }`}
                aria-label={`Drag answer ${answer}`}
              >
                {answer}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => clearSlot("first")}
            className="text-xs px-2 py-1 rounded border border-brand-border hover:border-gray-500"
          >
            Clear Blank 1
          </button>
          <button
            type="button"
            onClick={() => clearSlot("second")}
            className="text-xs px-2 py-1 rounded border border-brand-border hover:border-gray-500"
          >
            Clear Blank 2
          </button>
        </div>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-xl p-4 md:p-5 space-y-4">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Active Learning Builder
          </h4>
          <p className="text-sm text-gray-400">
            Create your own template and practice by dragging your custom answers into blanks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gray-500">Template Name</label>
            <input
              type="text"
              value={builderTitle}
              onChange={(e) => setBuilderTitle(e.target.value)}
              className="w-full bg-brand-bg border border-brand-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent"
              placeholder="e.g. Customer support assistant"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Answer for Blank 1
            </label>
            <input
              type="text"
              value={builderAnswers.first}
              onChange={(e) =>
                setBuilderAnswers((prev) => ({ ...prev, first: e.target.value }))
              }
              className="w-full bg-brand-bg border border-brand-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Template Text (use [blank1] and [blank2])
            </label>
            <textarea
              value={builderTemplate}
              onChange={(e) => setBuilderTemplate(e.target.value)}
              className="w-full h-24 bg-brand-bg border border-brand-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent resize-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gray-500">
              Answer for Blank 2
            </label>
            <input
              type="text"
              value={builderAnswers.second}
              onChange={(e) =>
                setBuilderAnswers((prev) => ({ ...prev, second: e.target.value }))
              }
              className="w-full bg-brand-bg border border-brand-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-accent"
            />
          </div>
        </div>

        <div className="rounded-lg border border-brand-border bg-brand-bg p-4 space-y-3">
          <p className="text-xs uppercase tracking-wider text-gray-500">{builderTitle || "Custom template"}</p>
          <p className="text-sm md:text-base leading-relaxed">
            {templateSegments.parts.map((part, idx) => {
              const marker = templateSegments.markers[idx];
              const slot: BlankSlot | null =
                marker === "blank1" ? "first" : marker === "blank2" ? "second" : null;

              return (
                <span key={`${part}-${idx}`}>
                  {part}
                  {slot && (
                    <span
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleBuilderDropAnswer(slot)}
                      className="inline-flex min-w-[150px] mx-1 px-3 py-1 rounded-lg border border-dashed border-brand-accent/70 bg-brand-card align-middle justify-center text-sm font-semibold"
                    >
                      {builderFilledBlanks[slot] || `____ ${slot === "first" ? "Blank 1" : "Blank 2"} ____`}
                    </span>
                  )}
                </span>
              );
            })}
          </p>

          <div className="flex flex-wrap gap-3">
            {builderAnswerPool.map((answer) => {
              const isUsed = builderUsedAnswers.has(answer);

              return (
                <button
                  key={answer}
                  type="button"
                  draggable={!isUsed}
                  onDragStart={() => setBuilderDraggingAnswer(answer)}
                  onDragEnd={() => setBuilderDraggingAnswer(null)}
                  className={`px-3 py-2 rounded-lg text-sm border transition-colors ${
                    isUsed
                      ? "border-green-500/40 text-green-400 bg-green-500/10 cursor-not-allowed"
                      : "border-brand-border bg-brand-card hover:border-brand-accent cursor-grab"
                  }`}
                >
                  {answer}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => clearBuilderSlot("first")}
              className="text-xs px-2 py-1 rounded border border-brand-border hover:border-gray-500"
            >
              Clear Blank 1
            </button>
            <button
              type="button"
              onClick={() => clearBuilderSlot("second")}
              className="text-xs px-2 py-1 rounded border border-brand-border hover:border-gray-500"
            >
              Clear Blank 2
            </button>
            <button
              type="button"
              onClick={resetBuilderPractice}
              className="text-xs px-2 py-1 rounded border border-brand-border hover:border-gray-500"
            >
              Reset Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
