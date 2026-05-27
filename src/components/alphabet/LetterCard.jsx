import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LetterModal from './LetterModal';

export default function LetterCard({ letter, phonetic, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <LetterModal letter={letter} phonetic={phonetic} onClose={() => setShowModal(false)} />
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.02 }}
        onClick={() => setShowModal(true)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative cursor-pointer hover:shadow-md hover:shadow-amber-900/20 transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, #2e1f0a 0%, #1e1408 100%)',
          border: isHovered ? '1px solid rgba(180,120,40,0.5)' : '1px solid rgba(140,90,30,0.25)',
          borderRadius: '4px',
        }}
      >
        {/* Ornate corner decorations */}
        <div className="absolute top-1 left-1 w-3 h-3 opacity-40" style={{ borderTop: '1.5px solid #c8942a', borderLeft: '1.5px solid #c8942a', borderRadius: '1px 0 0 0' }} />
        <div className="absolute top-1 right-1 w-3 h-3 opacity-40" style={{ borderTop: '1.5px solid #c8942a', borderRight: '1.5px solid #c8942a', borderRadius: '0 1px 0 0' }} />
        <div className="absolute bottom-1 left-1 w-3 h-3 opacity-40" style={{ borderBottom: '1.5px solid #c8942a', borderLeft: '1.5px solid #c8942a', borderRadius: '0 0 0 1px' }} />
        <div className="absolute bottom-1 right-1 w-3 h-3 opacity-40" style={{ borderBottom: '1.5px solid #c8942a', borderRight: '1.5px solid #c8942a', borderRadius: '0 0 1px 0' }} />

        <div className="p-4 text-center">
          {/* Main Letter with brush-sweep reveal */}
          <span className="relative inline-block">
            <span className="font-kannada text-4xl sm:text-5xl font-bold block" style={{ color: '#5a3a10' }}>
              {letter}
            </span>
            <motion.span
              className="font-kannada text-4xl sm:text-5xl font-bold block absolute inset-0"
              animate={{ clipPath: isHovered ? 'inset(0% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)' }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              style={{ color: '#e8b84b', textShadow: '0 2px 12px rgba(200,148,42,0.5)' }}
            >
              {letter}
            </motion.span>
          </span>

          {/* Phonetic */}
          <span className="font-inter text-xs tracking-widest uppercase block mt-1.5" style={{ color: '#a07840' }}>
            {phonetic}
          </span>

          {/* Divider */}
          <div className="my-2 mx-auto w-8 h-px" style={{ background: 'linear-gradient(to right, transparent, #7a5020, transparent)' }} />
        </div>
      </motion.div>
    </>
  );
}