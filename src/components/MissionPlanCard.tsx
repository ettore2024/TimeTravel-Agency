import React from "react";
import { GlassButton, GlassPanel } from "./Glass";

export function MissionPlanCard({
  itinerary,
  equipment,
  cautions,
  onContinue
}: {
  itinerary: { time: string; detail: string }[];
  equipment: string[];
  cautions: string[];
  onContinue: () => void;
}) {
  return (
    <GlassPanel className="p-8 sm:p-10">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
            Mission plan
          </p>
          <h3 className="mt-3 font-display text-3xl tracking-tightest">
            Your itinerary, pre-immersed
          </h3>
        </div>
        <GlassButton onClick={onContinue}>Continue to booking</GlassButton>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:rgba(245,243,238,0.6)]">
            Itinerary
          </p>
          <div className="mt-4 space-y-3 text-sm">
            {itinerary.map((item) => (
              <div key={item.time}>
                <p className="text-[color:rgba(245,243,238,0.65)]">
                  {item.time}
                </p>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:rgba(245,243,238,0.6)]">
            Equipment
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {equipment.map((item) => (
              <li key={item} className="text-[color:rgba(245,243,238,0.8)]">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-[color:rgba(245,243,238,0.6)]">
            Caution notes
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {cautions.map((item) => (
              <li key={item} className="text-[color:rgba(245,243,238,0.8)]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GlassPanel>
  );
}
