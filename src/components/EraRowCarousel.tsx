import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { Destination } from "@/data/destinations";

export function EraRowCarousel({
  title,
  items
}: {
  title: string;
  items: Destination[];
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-2xl tracking-tightest sm:text-3xl">
          {title}
        </h3>
        <p className="text-xs uppercase tracking-[0.4em] text-[color:rgba(245,243,238,0.6)]">
          Curated three
        </p>
      </div>
      <div className="scrollbar-hide flex gap-6 overflow-x-auto pb-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -6 }}
            className="relative min-w-[280px] overflow-hidden rounded-3xl sm:min-w-[380px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.galleryImagesPlaceholder[0]})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:rgba(7,8,11,0.9)] via-[color:rgba(7,8,11,0.45)] to-[color:rgba(7,8,11,0.2)]" />
            <div className="relative z-10 flex h-[320px] flex-col justify-end p-6">
              <p className="text-xs uppercase tracking-[0.35em] text-[color:rgba(245,243,238,0.6)]">
                {item.moodTags[0]}
              </p>
              <h4 className="mt-2 font-display text-2xl tracking-tightest">
                {item.title}
              </h4>
              <div className="mt-4 flex gap-3">
                <Link
                  to={`/destination/${item.id}`}
                  className="glass rounded-full px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em]"
                >
                  Explore
                </Link>
                <Link
                  to={`/plan`}
                  className="glass rounded-full px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em]"
                >
                  Add to plan
                </Link>
              </div>
            </div>
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent"
              whileHover={{ borderColor: "rgba(67, 215, 255, 0.35)" }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
