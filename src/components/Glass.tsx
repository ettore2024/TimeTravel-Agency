import React from "react";
import { motion } from "framer-motion";

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function GlassPanel({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cx("glass rounded-3xl", className)}>{children}</div>;
}

export function GlassButton({
  children,
  className,
  onClick,
  type = "button"
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      type={type}
      className={cx(
        "glass inline-flex items-center justify-center rounded-full px-6 py-3 text-xs uppercase tracking-[0.35em] text-bone",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
