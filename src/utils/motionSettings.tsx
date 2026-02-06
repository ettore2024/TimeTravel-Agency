import React, { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

const MotionContext = createContext<
  { reduceMotion: boolean; setReduceMotion: (value: boolean) => void } | undefined
>(undefined);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reduceMotion, setReduceMotion] = useLocalStorage<boolean>(
    "ttr-reduce-motion",
    false
  );

  return (
    <MotionContext.Provider value={{ reduceMotion, setReduceMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionSettings() {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error("useMotionSettings must be used within MotionProvider");
  }
  return ctx;
}
