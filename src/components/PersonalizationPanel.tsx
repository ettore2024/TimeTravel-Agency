import React from "react";
import { GlassButton, GlassPanel } from "./Glass";

export type PersonalizationValues = {
  comfort: number;
  discretion: number;
  pace: number;
  travelerType: "Solo" | "Couple" | "Group";
  duration: string;
};

export function PersonalizationPanel({
  values,
  onChange,
  onGenerate
}: {
  values: PersonalizationValues;
  onChange: (next: PersonalizationValues) => void;
  onGenerate: () => void;
}) {
  return (
    <GlassPanel className="p-8 sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
            Personalize your mission
          </p>
          <h3 className="mt-3 font-display text-3xl tracking-tightest">
            Calibrate your timeline
          </h3>
        </div>
        <GlassButton
          className="bg-[color:rgba(67,215,255,0.2)]"
          onClick={onGenerate}
        >
          Generate my mission plan
        </GlassButton>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
              Comfort ↔ Adventure
            </p>
            <input
              type="range"
              min={0}
              max={100}
              value={values.comfort}
              onChange={(event) =>
                onChange({ ...values, comfort: Number(event.target.value) })
              }
              className="mt-3"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
              Discretion
            </p>
            <input
              type="range"
              min={0}
              max={100}
              value={values.discretion}
              onChange={(event) =>
                onChange({ ...values, discretion: Number(event.target.value) })
              }
              className="mt-3"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
              Pace
            </p>
            <input
              type="range"
              min={0}
              max={100}
              value={values.pace}
              onChange={(event) =>
                onChange({ ...values, pace: Number(event.target.value) })
              }
              className="mt-3"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
              Travel format
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {(["Solo", "Couple", "Group"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange({ ...values, travelerType: option })}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
                    values.travelerType === option
                      ? "bg-[color:rgba(67,215,255,0.2)]"
                      : "glass"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
              Duration
            </p>
            <select
              value={values.duration}
              onChange={(event) =>
                onChange({ ...values, duration: event.target.value })
              }
              className="mt-3 w-full rounded-full border border-[color:rgba(245,243,238,0.15)] bg-[color:rgba(7,8,11,0.45)] px-4 py-3 text-sm"
            >
              {["3 nights", "4 nights", "5 nights", "7 nights"].map(
                (duration) => (
                  <option key={duration} value={duration} className="text-ink">
                    {duration}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="glass rounded-2xl p-4 text-xs uppercase tracking-[0.3em] text-[color:rgba(245,243,238,0.6)]">
            Calibration adjusts audio ambience + safety protocol.
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
