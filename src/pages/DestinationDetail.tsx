import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { destinations } from "@/data/destinations";
import { TimelineMoments } from "@/components/TimelineMoments";
import { GlassButton, GlassPanel } from "@/components/Glass";
import { PersonalizationPanel } from "@/components/PersonalizationPanel";
import { MissionPlanCard } from "@/components/MissionPlanCard";
import { usePlan } from "@/utils/planStore";

export function DestinationDetail() {
  const { id } = useParams();
  const destination = destinations.find((item) => item.id === id);
  const navigate = useNavigate();
  const { plan, setPlan } = usePlan();
  const [checklist, setChecklist] = useState<string[]>([]);
  const [showPlan, setShowPlan] = useState(false);

  const moments = useMemo(() => {
    if (!destination) return [];
    return destination.strongHighlights.map((highlight, index) => ({
      title: highlight,
      description:
        "Your concierge orchestrates this moment with minimal footprint and maximum awe.",
      image:
        destination.galleryImagesPlaceholder[index %
          destination.galleryImagesPlaceholder.length]
    }));
  }, [destination]);

  if (!destination) {
    return (
      <main className="grid min-h-screen place-items-center">
        <p>Destination not found.</p>
      </main>
    );
  }

  return (
    <main className="grain">
      <section className="relative min-h-[90vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.heroImagePlaceholder})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:rgba(7,8,11,0.2)] via-[color:rgba(7,8,11,0.55)] to-[color:rgba(7,8,11,0.95)]" />
        <div className="sticky top-0 z-20 flex items-center justify-between bg-[color:rgba(7,8,11,0.55)] px-6 py-4 backdrop-blur-xl sm:px-12">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs uppercase tracking-[0.35em]"
          >
            Back
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                setPlan({
                  ...plan,
                  destinationId: destination.id,
                  preferences: {
                    ...plan.preferences,
                    duration: destination.recommendedDuration
                  }
                })
              }
              className="glass rounded-full px-4 py-2 text-[0.6rem] uppercase tracking-[0.3em]"
            >
              Add to plan
            </button>
            <button
              type="button"
              onClick={() => navigate("/plan")}
              className="glass rounded-full px-4 py-2 text-[0.6rem] uppercase tracking-[0.3em]"
            >
              Talk to Agent
            </button>
          </div>
        </div>
        <div className="relative z-10 flex min-h-[90vh] flex-col justify-end px-6 pb-20 sm:px-12">
          <p className="text-xs uppercase tracking-[0.5em] text-[color:rgba(245,243,238,0.6)]">
            {destination.audioAmbienceLabel}
          </p>
          <h1 className="mt-4 font-display text-5xl tracking-tightest sm:text-6xl">
            {destination.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[color:rgba(245,243,238,0.78)]">
            {destination.shortPitch}
          </p>
          <div className="mt-6 flex gap-3">
            {[destination.risk, destination.comfort, destination.recommendedDuration].map(
              (chip) => (
                <span
                  key={chip}
                  className="glass rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] text-[color:rgba(245,243,238,0.7)]"
                >
                  {chip}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      <section className="space-y-14 px-6 py-20 sm:px-12 lg:px-20">
        <TimelineMoments moments={moments} />

        <div className="grid gap-8 lg:grid-cols-2">
          <GlassPanel className="p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
              What you'll feel
            </p>
            <ul className="mt-4 space-y-3 text-sm text-[color:rgba(245,243,238,0.8)]">
              <li>Heightened senses, tuned by our temporal audio mix.</li>
              <li>Presence without intrusion. You are a whisper in history.</li>
              <li>A deep calm from knowing the exit is always nearby.</li>
            </ul>
          </GlassPanel>
          <div className="grid gap-4">
            {[
              "Temporal shielding active",
              "On-site specialist guide",
              "Live biometric monitoring"
            ].map((item) => (
              <GlassPanel key={item} className="p-5">
                <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                  Safety & protocol
                </p>
                <p className="mt-2 text-sm">{item}</p>
              </GlassPanel>
            ))}
          </div>
        </div>

        <GlassPanel className="p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
            Packing checklist
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {["Temporal suit", "Discretion cloak", "Adaptive boots", "Archive journal"].map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setChecklist((prev) =>
                      prev.includes(item)
                        ? prev.filter((value) => value !== item)
                        : [...prev, item]
                    )
                  }
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm ${
                    checklist.includes(item)
                      ? "bg-[color:rgba(67,215,255,0.2)]"
                      : "glass"
                  }`}
                >
                  {item}
                  <span className="text-xs uppercase tracking-[0.3em] text-[color:rgba(245,243,238,0.6)]">
                    {checklist.includes(item) ? "Packed" : "Add"}
                  </span>
                </button>
              )
            )}
          </div>
        </GlassPanel>

        <PersonalizationPanel
          values={plan.preferences}
          onChange={(next) => setPlan({ ...plan, preferences: next })}
          onGenerate={() => {
            setShowPlan(true);
            setPlan({
              ...plan,
              destinationId: destination.id,
              preferences: {
                ...plan.preferences,
                duration: destination.recommendedDuration
              }
            });
          }}
        />

        {showPlan && (
          <MissionPlanCard
            itinerary={[
              {
                time: "Morning",
                detail: `Guided arrival and atmospheric calibration in ${destination.title}.`
              },
              {
                time: "Afternoon",
                detail: "Signature moment immersion with concierge escort."
              },
              {
                time: "Night",
                detail: "Private exit window with audio ambience handoff."
              }
            ]}
            equipment={["Temporal suit", "Locale translator", "Signal beacon"]}
            cautions={[
              `Maintain discretion level ${Math.round(plan.preferences.discretion / 10)}.`,
              "Follow guide on any timeline deviations."
            ]}
            onContinue={() => navigate("/plan")}
          />
        )}
      </section>
    </main>
  );
}
