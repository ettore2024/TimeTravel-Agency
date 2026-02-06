import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { GlassButton } from "./Glass";

export function PortalCard({
  title,
  promise,
  chips,
  image,
  href
}: {
  title: string;
  promise: string;
  chips: string[];
  image: string;
  href: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="group relative overflow-hidden rounded-[2.5rem]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:rgba(7,8,11,0.05)] via-[color:rgba(7,8,11,0.5)] to-[color:rgba(7,8,11,0.92)]" />
      <div className="relative z-10 flex h-[70vh] flex-col justify-between p-8 sm:p-12">
        <div className="flex items-center gap-3">
          {chips.map((chip) => (
            <span
              key={chip}
              className="glass rounded-full px-4 py-1 text-xs uppercase tracking-[0.3em] text-[color:rgba(245,243,238,0.75)]"
            >
              {chip}
            </span>
          ))}
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-4xl tracking-tightest sm:text-5xl">
              {title}
            </h3>
            <p className="mt-2 max-w-xl text-base text-[color:rgba(245,243,238,0.78)] sm:text-lg">
              {promise}
            </p>
          </div>
          <Link to={href}>
            <GlassButton className="bg-[color:rgba(67,215,255,0.22)]">
              Enter portal
            </GlassButton>
          </Link>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] border border-transparent transition-colors duration-700 group-hover:border-[color:rgba(67,215,255,0.35)]" />
    </motion.div>
  );
}
