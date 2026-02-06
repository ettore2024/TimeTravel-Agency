import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Home } from "@/pages/Home";
import { Destinations } from "@/pages/Destinations";
import { DestinationDetail } from "@/pages/DestinationDetail";
import { Plan } from "@/pages/Plan";
import { ChatAgentDrawer } from "@/components/ChatAgentDrawer";
import { SiteHeader } from "@/components/SiteHeader";
import { MotionProvider, useMotionSettings } from "@/utils/motionSettings";
import { PlanProvider } from "@/utils/planStore";

function PageTransitions({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { reduceMotion } = useMotionSettings();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
        exit={reduceMotion ? {} : { opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

function PortalWarp() {
  const location = useLocation();
  const { reduceMotion } = useMotionSettings();

  if (reduceMotion) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`warp-${location.pathname}`}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.6, 0], scale: [0.6, 1.4, 2] }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center"
      >
        <div className="h-64 w-64 rounded-full border border-[color:rgba(67,215,255,0.5)] shadow-glow" />
      </motion.div>
    </AnimatePresence>
  );
}

function AppRoutes() {
  return (
    <PageTransitions>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </PageTransitions>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MotionProvider>
        <PlanProvider>
          <SiteHeader />
          <PortalWarp />
          <AppRoutes />
          <ChatAgentDrawer />
        </PlanProvider>
      </MotionProvider>
    </BrowserRouter>
  );
}
