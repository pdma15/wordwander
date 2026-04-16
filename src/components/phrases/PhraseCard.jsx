import React from 'react';
import { motion } from 'framer-motion';
import AudioButton from '../shared/AudioButton';

export default function PhraseCard({ kannada, phonetic, english, context, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative p-5 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          {/* Kannada Text */}
          <h3 className="font-kannada text-2xl sm:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {kannada}
          </h3>

          {/* Phonetic */}
          <p className="font-inter text-sm text-primary/70 mt-1.5 tracking-wide">
            {phonetic}
          </p>

          {/* English */}
          <p className="font-inter text-base text-foreground/80 mt-1 font-medium">
            {english}
          </p>

          {/* Context */}
          <p className="font-inter text-xs text-muted-foreground mt-3 leading-relaxed border-l-2 border-primary/20 pl-3">
            {context}
          </p>
        </div>

        {/* Audio */}
        <AudioButton text={kannada} size="md" className="flex-shrink-0 mt-1" />
      </div>
    </motion.div>
  );
}