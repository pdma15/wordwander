import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AudioButton from '../shared/AudioButton';

export default function LetterCard({ letter, phonetic, example, meaning, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`relative group cursor-pointer rounded-xl border transition-all duration-500 overflow-hidden ${
        isExpanded
          ? 'bg-primary/10 border-primary/30 shadow-lg shadow-primary/10'
          : 'bg-card/60 border-border/30 hover:border-primary/20 hover:shadow-md hover:shadow-primary/5'
      }`}
    >
      <div className="p-4 text-center">
        {/* Main Letter */}
        <span className="font-kannada text-4xl sm:text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 block">
          {letter}
        </span>
        {/* Phonetic */}
        <span className="font-inter text-xs font-light text-muted-foreground mt-2 block tracking-wider uppercase">
          {phonetic}
        </span>
        
        {/* Audio Button */}
        <div className="mt-2 flex justify-center">
          <AudioButton text={letter} phonetic={phonetic} size="sm" />
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="px-4 pb-4 border-t border-border/20"
        >
          <div className="pt-3 text-center">
            <p className="font-kannada text-lg text-primary">{example}</p>
            <p className="font-inter text-xs text-muted-foreground mt-1">{meaning}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}