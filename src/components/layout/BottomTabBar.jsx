import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Languages, BookOpen, GraduationCap, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/alphabet', label: 'Alphabet', icon: Languages },
  { path: '/phrases', label: 'Phrases', icon: BookOpen },
  { path: '/quiz', label: 'Quiz', icon: GraduationCap },
  { path: '/feedback', label: 'Feedback', icon: MessageSquare },
];

export default function BottomTabBar() {
  const location = useLocation();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border/50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-stretch">
        {tabs.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 select-none relative"
            >
              {isActive && (
                <motion.div
                  layoutId="tab-active"
                  className="absolute inset-x-2 top-0 h-0.5 rounded-full bg-primary"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                />
              )}
              <Icon
                className={`w-5 h-5 transition-colors select-none ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
              />
              <span
                className={`font-inter text-[10px] font-medium transition-colors select-none ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}