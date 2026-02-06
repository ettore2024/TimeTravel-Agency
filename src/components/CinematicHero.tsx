import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { GlassButton } from "./Glass";

export function CinematicHero({
  title,
  subtitle,
  image,
  primaryAction,
  secondaryAction
}: {
  title: string;
  subtitle: string;
  image: string;
  primaryAction: { label: string; onClick?: () => void; href?: string };
  secondaryAction: { label: string; onClick?: () => void; href?: string };
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-cover bg-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[color:rgba(7,8,11,0.2)] via-[color:rgba(7,8,11,0.6)] to-[color:rgba(7,8,11,0.95)]" />
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-20 sm:px-12 lg:px-20">
        <div className="max-w-3xl space-y-6">
          <p className="text-xs uppercase tracking-[0.5em] text-[color:rgba(245,243,238,0.7)]">
            Temporal concierge
          </p>
          <h1 className="font-display text-5xl leading-[0.95] tracking-tightest sm:text-7xl">
            {title}
          </h1>
          <p className="max-w-xl text-lg text-[color:rgba(245,243,238,0.82)] sm:text-xl">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <GlassButton
              className="bg-[color:rgba(67,215,255,0.18)] text-[color:var(--text)]"
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </GlassButton>
            <GlassButton
              className="bg-[color:rgba(245,243,238,0.08)]"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </GlassButton>
          </div>
        </div>
      </div>
    </section>
  );
}
