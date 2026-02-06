import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CinematicHero } from "@/components/CinematicHero";
import { PortalCard } from "@/components/PortalCard";
import { destinations } from "@/data/destinations";
import { GlassPanel } from "@/components/Glass";
import { Reveal } from "@/components/Reveal";

const faqItems = [
  {
    q: "Is the experience safe?",
    a: "Every portal is wrapped in layered protocol, temporal shielding, and a live concierge line."
  },
  {
    q: "Can I customize the journey?",
    a: "Yes. Every itinerary is tuned to your comfort, discretion, and pace settings."
  },
  {
    q: "How discreet is the technology?",
    a: "Invisible. All interface surfaces are hidden behind local-era aesthetics."
  }
];

export function Home() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <main className="grain">
      <CinematicHero
        title="TimeTravel Agency"
        subtitle="Live an era. Not a brochure."
        image={destinations[0].heroImagePlaceholder}
        primaryAction={{ label: "Enter the eras", onClick: () => navigate("/destinations") }}
        secondaryAction={{ label: "Talk to your Time Agent", onClick: () => navigate("/plan") }}
      />

      <section className="space-y-8 px-6 py-20 sm:px-12 lg:px-20">
        <Reveal>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl tracking-tightest sm:text-4xl">
              Choose your portal
            </h2>
            <p className="text-xs uppercase tracking-[0.4em] text-[color:rgba(245,243,238,0.6)]">
              Cinematic intake
            </p>
          </div>
        </Reveal>
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="w-[90vw] flex-shrink-0 snap-center lg:w-[70vw]"
            >
              <PortalCard
                title={destination.title}
                promise={destination.shortPitch}
                chips={[destination.risk, destination.comfort, destination.recommendedDuration]}
                image={destination.heroImagePlaceholder}
                href={`/destination/${destination.id}`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-10 px-6 pb-20 sm:px-12 lg:px-20">
        <Reveal>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl tracking-tightest sm:text-4xl">
              How it feels
            </h2>
            <p className="text-xs uppercase tracking-[0.4em] text-[color:rgba(245,243,238,0.6)]">
              Emotional pillars
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Wonder",
              copy: "You arrive before history is history. Every breath feels newly invented."
            },
            {
              title: "Safety",
              copy: "Silence, shielding, and a concierge in your ear, always."
            },
            {
              title: "Customization",
              copy: "Your pulse sets the pace. Your curiosity sets the depth."
            }
          ].map((pillar) => (
            <GlassPanel key={pillar.title} className="p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                {pillar.title}
              </p>
              <p className="mt-4 text-sm text-[color:rgba(245,243,238,0.8)]">
                {pillar.copy}
              </p>
            </GlassPanel>
          ))}
        </div>
      </section>

      <section className="space-y-8 px-6 pb-24 sm:px-12 lg:px-20">
        <Reveal>
          <div className="flex items-center justify-between">
            <h2 className="font-display text-3xl tracking-tightest sm:text-4xl">
              Minimal FAQ
            </h2>
            <p className="text-xs uppercase tracking-[0.4em] text-[color:rgba(245,243,238,0.6)]">
              Trust signals
            </p>
          </div>
        </Reveal>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={item.q} className="glass rounded-2xl p-5">
              <button
                type="button"
                onClick={() => setOpen(open === index ? null : index)}
                className="flex w-full items-center justify-between text-left text-sm uppercase tracking-[0.3em]"
              >
                <span>{item.q}</span>
                <span className="text-[color:rgba(245,243,238,0.6)]">
                  {open === index ? "-" : "+"}
                </span>
              </button>
              {open === index && (
                <p className="mt-3 text-sm text-[color:rgba(245,243,238,0.7)]">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs uppercase tracking-[0.4em] text-[color:rgba(245,243,238,0.5)]">
          Trust protocols audited by the Temporal Ethics Council.
        </p>
      </section>
    </main>
  );
}
