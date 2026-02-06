import { motion } from "framer-motion";
import React from "react";

export function TimelineMoments({
  moments
}: {
  moments: { title: string; image: string; description: string }[];
}) {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl tracking-tightest sm:text-4xl">
          Signature moments
        </h2>
        <p className="text-xs uppercase tracking-[0.4em] text-[color:rgba(245,243,238,0.6)]">
          Guided sequence
        </p>
      </div>
      <div className="space-y-8">
        {moments.map((moment, index) => (
          <motion.div
            key={moment.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="grid gap-6 lg:grid-cols-[1.2fr_1fr]"
          >
            <div className="relative min-h-[240px] overflow-hidden rounded-3xl">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${moment.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:rgba(7,8,11,0.85)] via-[color:rgba(7,8,11,0.2)] to-[color:rgba(7,8,11,0)]" />
            </div>
            <div className="glass rounded-3xl p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                Moment {index + 1}
              </p>
              <h3 className="mt-3 font-display text-2xl tracking-tightest">
                {moment.title}
              </h3>
              <p className="mt-3 text-sm text-[color:rgba(245,243,238,0.78)] sm:text-base">
                {moment.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
