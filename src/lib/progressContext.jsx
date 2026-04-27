import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { vowels, consonants } from './kannadaData';

const TOTAL = vowels.length + consonants.length;
const STORAGE_KEY = 'ww_letter_progress';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const setStatus = useCallback((letter, status) => {
    setProgress(prev => {
      // toggle off if clicking the same status
      if (prev[letter] === status) {
        const next = { ...prev };
        delete next[letter];
        return next;
      }
      return { ...prev, [letter]: status };
    });
  }, []);

  const learned = Object.values(progress).filter(v => v === 'learned').length;
  const mastered = Object.values(progress).filter(v => v === 'mastered').length;
  const pct = Math.round(((learned + mastered) / TOTAL) * 100);

  return (
    <ProgressContext.Provider value={{ progress, setStatus, learned, mastered, total: TOTAL, pct }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);