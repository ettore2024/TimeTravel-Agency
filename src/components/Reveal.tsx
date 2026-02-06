import { motion } from "framer-motion";
import React from "react";
import { useMotionSettings } from "@/utils/motionSettings";

export function Reveal({
  children,
  delay = 0
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { reduceMotion } = useMotionSettings();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
