import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AudioButton from '../shared/AudioButton';

export default function LetterCard({ letter, phonetic, sound, example, meaning, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`relative group cursor-pointer transition-all duration-500 overflow-hidden ${
        isExpanded ? 'shadow-lg shadow-amber-900/30' : 'hover:shadow-md hover:shadow-amber-900/20'
      }`}
      style={{
        background: isExpanded
          ? 'linear-gradient(135deg, #3d2b0e 0%, #2a1c08 100%)'
          : 'linear-gradient(135deg, #2e1f0a 0%, #1e1408 100%)',
        border: isExpanded ? '1px solid rgba(180,120,40,0.5)' : '1px solid rgba(140,90,30,0.25)',
        borderRadius: '4px',
      }}
    >
      {/* Ornate corner decorations */}
      <div className="absolute top-1 left-1 w-3 h-3 opacity-40" style={{ borderTop: '1.5px solid #c8942a', borderLeft: '1.5px solid #c8942a', borderRadius: '1px 0 0 0' }} />
      <div className="absolute top-1 right-1 w-3 h-3 opacity-40" style={{ borderTop: '1.5px solid #c8942a', borderRight: '1.5px solid #c8942a', borderRadius: '0 1px 0 0' }} />
      <div className="absolute bottom-1 left-1 w-3 h-3 opacity-40" style={{ borderBottom: '1.5px solid #c8942a', borderLeft: '1.5px solid #c8942a', borderRadius: '0 0 0 1px' }} />
      <div className="absolute bottom-1 right-1 w-3 h-3 opacity-40" style={{ borderBottom: '1.5px solid #c8942a', borderRight: '1.5px solid #c8942a', borderRadius: '0 0 1px 0' }} />

      <div className="p-4 text-center">
        {/* Main Letter */}
        <span
          className="font-kannada text-4xl sm:text-5xl font-bold block transition-colors duration-300"
          style={{ color: isExpanded ? '#f0c060' : '#e8b84b', textShadow: '0 2px 8px rgba(200,148,42,0.3)' }}
        >
          {letter}
        </span>

        {/* Phonetic */}
        <span className="font-inter text-xs tracking-widest uppercase block mt-1.5" style={{ color: '#a07840' }}>
          {phonetic}
        </span>

        {/* Divider */}
        <div className="my-2 mx-auto w-8 h-px" style={{ background: 'linear-gradient(to right, transparent, #7a5020, transparent)' }} />

        {/* Audio Button */}
        <div className="flex items-center justify-center mt-1">
          <AudioButton text={letter} sound={sound} phonetic={phonetic} size="sm" />
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="px-4 pb-4"
          style={{ borderTop: '1px solid rgba(140,90,30,0.3)' }}
        >
          <div className="pt-3 text-center">
            <p className="font-kannada text-lg" style={{ color: '#f0c060' }}>{example}</p>
            <p className="font-inter text-xs mt-1" style={{ color: '#906830' }}>{meaning}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}