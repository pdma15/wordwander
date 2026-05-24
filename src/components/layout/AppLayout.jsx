import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import BottomTabBar from './BottomTabBar';
import MobileHeader from './MobileHeader';
import ChatBot from '../shared/ChatBot';

const pageVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

const pageTransition = { duration: 0.22, ease: 'easeInOut' };

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop top navbar */}
      <Navbar />

      {/* Mobile top header */}
      <MobileHeader />

      {/* Main content — pt accounts for both desktop navbar (pt-16) and mobile header (pt-14) + bottom tab bar */}
      <main className="pt-14 md:pt-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            // Extra bottom padding on mobile so content isn't hidden behind tab bar
            className="pb-20 md:pb-0"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile bottom tab bar */}
      <BottomTabBar />

      <ChatBot />
    </div>
  );
}