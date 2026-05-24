import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Sun, Moon, Settings } from 'lucide-react';
import { useTheme } from '../../lib/themeContext';

const rootPaths = ['/', '/alphabet', '/phrases', '/quiz', '/feedback', '/reading'];

const pageTitles = {
  '/': 'Word Wander',
  '/alphabet': 'Alphabet',
  '/phrases': 'Phrases',
  '/reading': 'Reading',
  '/quiz': 'Quiz',
  '/feedback': 'Feedback',
  '/settings': 'Settings',
};

export default function MobileHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();

  const isRoot = rootPaths.includes(location.pathname);
  const title = pageTitles[location.pathname] || 'Word Wander';

  return (
    <header
      className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 flex items-center justify-between px-4 h-14"
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="w-10">
        {!isRoot && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-primary font-inter text-sm font-medium select-none"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
        )}
      </div>

      <span className="font-poppins font-bold text-foreground text-base tracking-tight">
        {title === 'Word Wander' ? (
          <>Word <span className="text-primary">Wander</span></>
        ) : title}
      </span>

      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="text-muted-foreground select-none"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <Link to="/settings" className="text-muted-foreground select-none">
          <Settings className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
}