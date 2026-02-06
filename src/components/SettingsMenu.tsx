import React, { useState } from "react";
import { Settings } from "lucide-react";
import { useMotionSettings } from "@/utils/motionSettings";

export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const { reduceMotion, setReduceMotion } = useMotionSettings();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="glass rounded-full p-3"
      >
        <Settings size={16} />
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-[color:rgba(245,243,238,0.12)] bg-[color:rgba(7,8,11,0.85)] p-4 text-xs uppercase tracking-[0.25em]">
          <div className="flex items-center justify-between">
            <span>Reduce motion</span>
            <button
              type="button"
              onClick={() => setReduceMotion(!reduceMotion)}
              className={`h-6 w-12 rounded-full border border-[color:rgba(245,243,238,0.2)] px-1 transition ${
                reduceMotion
                  ? "bg-[color:rgba(67,215,255,0.25)]"
                  : "bg-[color:rgba(7,8,11,0.7)]"
              }`}
            >
              <span
                className={`block h-4 w-4 rounded-full bg-[color:rgba(245,243,238,0.85)] transition ${
                  reduceMotion ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
