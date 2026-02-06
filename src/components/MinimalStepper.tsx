import React from "react";

export function MinimalStepper({
  steps,
  current
}: {
  steps: string[];
  current: number;
}) {
  return (
    <div className="flex flex-wrap gap-4">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`flex items-center gap-3 rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] ${
            index === current
              ? "bg-[color:rgba(67,215,255,0.18)]"
              : "glass"
          }`}
        >
          <span className="text-[color:rgba(245,243,238,0.6)]">
            {index + 1}
          </span>
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}
