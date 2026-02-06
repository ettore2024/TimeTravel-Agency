import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { destinations, featuredDestination } from "@/data/destinations";
import { EraRowCarousel } from "@/components/EraRowCarousel";
import { GlassPanel } from "@/components/Glass";
import { Reveal } from "@/components/Reveal";

const riskMap: Record<string, number> = {
  Low: 25,
  Medium: 55,
  High: 85
};

export function Destinations() {
  const [mood, setMood] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(80);

  const moods = Array.from(
    new Set(destinations.flatMap((destination) => destination.moodTags))
  );

  const filtered = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesMood = mood ? destination.moodTags.includes(mood) : true;
      const matchesIntensity = riskMap[destination.risk] <= intensity;
      return matchesMood && matchesIntensity;
    });
  }, [mood, intensity]);

  return (
    <main className="grain">
      <section className="relative min-h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featuredDestination.heroImagePlaceholder})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:rgba(7,8,11,0.2)] via-[color:rgba(7,8,11,0.6)] to-[color:rgba(7,8,11,0.95)]" />
        <div className="relative z-10 flex min-h-[70vh] flex-col justify-end px-6 pb-16 sm:px-12">
          <p className="text-xs uppercase tracking-[0.5em] text-[color:rgba(245,243,238,0.6)]">
            Featured era
          </p>
          <h1 className="mt-4 font-display text-5xl tracking-tightest sm:text-6xl">
            {featuredDestination.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[color:rgba(245,243,238,0.8)]">
            {featuredDestination.shortPitch}
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to={`/destination/${featuredDestination.id}`}
              className="glass rounded-full px-5 py-3 text-xs uppercase tracking-[0.3em]"
            >
              Explore
            </Link>
            <Link
              to="/plan"
              className="glass rounded-full px-5 py-3 text-xs uppercase tracking-[0.3em]"
            >
              Add to plan
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-8 px-6 py-16 sm:px-12 lg:px-20">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-3xl tracking-tightest">
              Cinematic catalog
            </h2>
            <div className="flex items-center gap-4">
              <GlassPanel className="px-4 py-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:rgba(245,243,238,0.6)]">
                  Mood
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setMood(null)}
                    className={`rounded-full px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] ${
                      mood === null
                        ? "bg-[color:rgba(67,215,255,0.2)]"
                        : "glass"
                    }`}
                  >
                    All
                  </button>
                  {moods.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setMood(tag)}
                      className={`rounded-full px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] ${
                        mood === tag
                          ? "bg-[color:rgba(67,215,255,0.2)]"
                          : "glass"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </GlassPanel>
              <GlassPanel className="px-4 py-3">
                <p className="text-xs uppercase tracking-[0.3em] text-[color:rgba(245,243,238,0.6)]">
                  Intensity
                </p>
                <div className="mt-3 w-40">
                  <input
                    type="range"
                    min={20}
                    max={90}
                    value={intensity}
                    onChange={(event) =>
                      setIntensity(Number(event.target.value))
                    }
                  />
                </div>
              </GlassPanel>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {filtered.map((destination) => (
            <motion.div
              key={destination.id}
              whileHover={{ scale: 1.01 }}
              className="group relative min-h-[360px] overflow-hidden rounded-3xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${destination.galleryImagesPlaceholder[1]})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:rgba(7,8,11,0.9)] via-[color:rgba(7,8,11,0.5)] to-[color:rgba(7,8,11,0.2)]" />
              <div className="relative z-10 flex h-full flex-col justify-end p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                  {destination.moodTags[0]}
                </p>
                <h3 className="mt-2 font-display text-2xl tracking-tightest">
                  {destination.title}
                </h3>
                <p className="mt-2 text-sm text-[color:rgba(245,243,238,0.7)]">
                  {destination.shortPitch}
                </p>
                <div className="mt-4 flex gap-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Link
                    to={`/destination/${destination.id}`}
                    className="glass rounded-full px-4 py-2 text-[0.6rem] uppercase tracking-[0.3em]"
                  >
                    Explore
                  </Link>
                  <Link
                    to="/plan"
                    className="glass rounded-full px-4 py-2 text-[0.6rem] uppercase tracking-[0.3em]"
                  >
                    Add to plan
                  </Link>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition duration-500 group-hover:border-[color:rgba(67,215,255,0.35)]" />
            </motion.div>
          ))}
        </div>

        <EraRowCarousel title="Immersion rows" items={destinations} />
      </section>
    </main>
  );
}
