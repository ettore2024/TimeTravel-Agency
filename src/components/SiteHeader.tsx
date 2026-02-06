import React from "react";
import { NavLink } from "react-router-dom";
import { SettingsMenu } from "./SettingsMenu";

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-4 sm:px-12">
      <NavLink
        to="/"
        className="font-display text-base uppercase tracking-[0.5em]"
      >
        TTA
      </NavLink>
      <div className="flex items-center gap-6">
        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.4em] sm:flex">
          <NavLink to="/destinations" className="text-[color:rgba(245,243,238,0.7)]">
            Destinations
          </NavLink>
          <NavLink to="/plan" className="text-[color:rgba(245,243,238,0.7)]">
            Plan
          </NavLink>
        </nav>
        <SettingsMenu />
      </div>
    </header>
  );
}
