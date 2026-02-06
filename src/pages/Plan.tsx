import React, { useState } from "react";
import { destinations } from "@/data/destinations";
import { GlassButton, GlassPanel } from "@/components/Glass";
import { MinimalStepper } from "@/components/MinimalStepper";
import { usePlan } from "@/utils/planStore";

const steps = ["Destination", "Dates", "Preferences", "Summary"];

export function Plan() {
  const { plan, setPlan } = usePlan();
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentDestination = destinations.find(
    (destination) => destination.id === plan.destinationId
  );

  const next = () => {
    if (current === 0 && !plan.destinationId) {
      setError("Select a destination to proceed.");
      return;
    }
    if (current === 1 && (!plan.dates || plan.travelers < 1)) {
      setError("Add dates and traveler count.");
      return;
    }
    setError(null);
    setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const back = () => {
    setError(null);
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  return (
    <main className="grain px-6 pb-20 pt-28 sm:px-12 lg:px-20">
      <div className="space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-[color:rgba(245,243,238,0.6)]">
              Booking funnel
            </p>
            <h1 className="mt-3 font-display text-4xl tracking-tightest sm:text-5xl">
              Plan your mission
            </h1>
          </div>
          <MinimalStepper steps={steps} current={current} />
        </div>

        {submitted ? (
          <GlassPanel className="p-10">
            <h2 className="font-display text-3xl tracking-tightest">
              Request received
            </h2>
            <p className="mt-4 text-sm text-[color:rgba(245,243,238,0.75)]">
              A Time Agent will confirm the portal window and send your itinerary
              within one hour.
            </p>
          </GlassPanel>
        ) : (
          <div className="space-y-6">
            {current === 0 && (
              <div className="grid gap-6 lg:grid-cols-3">
                {destinations.map((destination) => (
                  <button
                    key={destination.id}
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
                    className={`relative overflow-hidden rounded-3xl text-left ${
                      plan.destinationId === destination.id
                        ? "ring-2 ring-[color:rgba(67,215,255,0.6)]"
                        : ""
                    }`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${destination.galleryImagesPlaceholder[0]})`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[color:rgba(7,8,11,0.9)] via-[color:rgba(7,8,11,0.45)] to-[color:rgba(7,8,11,0.2)]" />
                    <div className="relative z-10 flex min-h-[260px] flex-col justify-end p-6">
                      <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                        {destination.risk}
                      </p>
                      <h3 className="mt-2 font-display text-2xl tracking-tightest">
                        {destination.title}
                      </h3>
                      <p className="mt-2 text-sm text-[color:rgba(245,243,238,0.7)]">
                        {destination.shortPitch}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {current === 1 && (
              <GlassPanel className="p-8">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                      Travel dates
                    </p>
                    <input
                      type="text"
                      placeholder="e.g. April 14-18, 2026"
                      value={plan.dates}
                      onChange={(event) =>
                        setPlan({ ...plan, dates: event.target.value })
                      }
                      className="mt-3 w-full rounded-full border border-[color:rgba(245,243,238,0.15)] bg-[color:rgba(7,8,11,0.45)] px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                      Travelers
                    </p>
                    <input
                      type="number"
                      min={1}
                      value={plan.travelers}
                      onChange={(event) =>
                        setPlan({
                          ...plan,
                          travelers: Number(event.target.value)
                        })
                      }
                      className="mt-3 w-full rounded-full border border-[color:rgba(245,243,238,0.15)] bg-[color:rgba(7,8,11,0.45)] px-4 py-3 text-sm"
                    />
                  </div>
                </div>
              </GlassPanel>
            )}

            {current === 2 && (
              <GlassPanel className="p-8">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                      Comfort ↔ Adventure
                    </p>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={plan.preferences.comfort}
                      onChange={(event) =>
                        setPlan({
                          ...plan,
                          preferences: {
                            ...plan.preferences,
                            comfort: Number(event.target.value)
                          }
                        })
                      }
                    />
                    <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                      Discretion
                    </p>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={plan.preferences.discretion}
                      onChange={(event) =>
                        setPlan({
                          ...plan,
                          preferences: {
                            ...plan.preferences,
                            discretion: Number(event.target.value)
                          }
                        })
                      }
                    />
                    <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                      Pace
                    </p>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={plan.preferences.pace}
                      onChange={(event) =>
                        setPlan({
                          ...plan,
                          preferences: {
                            ...plan.preferences,
                            pace: Number(event.target.value)
                          }
                        })
                      }
                    />
                  </div>
                  <div className="space-y-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                        Traveler type
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {(["Solo", "Couple", "Group"] as const).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              setPlan({
                                ...plan,
                                preferences: {
                                  ...plan.preferences,
                                  travelerType: option
                                }
                              })
                            }
                            className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] ${
                              plan.preferences.travelerType === option
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
                        value={plan.preferences.duration}
                        onChange={(event) =>
                          setPlan({
                            ...plan,
                            preferences: {
                              ...plan.preferences,
                              duration: event.target.value
                            }
                          })
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
                  </div>
                </div>
              </GlassPanel>
            )}

            {current === 3 && (
              <GlassPanel className="p-8">
                <h2 className="font-display text-2xl tracking-tightest">
                  Summary
                </h2>
                <div className="mt-6 grid gap-4 text-sm text-[color:rgba(245,243,238,0.8)]">
                  <p>
                    Destination: {currentDestination?.title ?? "Not selected"}
                  </p>
                  <p>Dates: {plan.dates || "Not set"}</p>
                  <p>Travelers: {plan.travelers}</p>
                  <p>Duration: {plan.preferences.duration}</p>
                </div>
                <div className="mt-8">
                  <GlassButton onClick={() => setSubmitted(true)}>
                    Request booking
                  </GlassButton>
                </div>
              </GlassPanel>
            )}

            {error && (
              <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={back}
                className="text-xs uppercase tracking-[0.3em] text-[color:rgba(245,243,238,0.6)]"
              >
                Back
              </button>
              <GlassButton onClick={next}>Next</GlassButton>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
