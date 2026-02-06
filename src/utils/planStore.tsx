import React, { createContext, useContext } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type PlanPreferences = {
  comfort: number;
  discretion: number;
  pace: number;
  travelerType: "Solo" | "Couple" | "Group";
  duration: string;
};

export type PlanState = {
  destinationId: string | null;
  dates: string;
  travelers: number;
  preferences: PlanPreferences;
};

const defaultPlan: PlanState = {
  destinationId: null,
  dates: "",
  travelers: 2,
  preferences: {
    comfort: 70,
    discretion: 60,
    pace: 55,
    travelerType: "Couple",
    duration: "4 nights"
  }
};

type PlanContextValue = {
  plan: PlanState;
  setPlan: React.Dispatch<React.SetStateAction<PlanState>>;
};

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useLocalStorage<PlanState>("ttr-plan", defaultPlan);
  return (
    <PlanContext.Provider value={{ plan, setPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used within PlanProvider");
  }
  return ctx;
}
