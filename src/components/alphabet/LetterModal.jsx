import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { letterExamples } from '@/lib/letterExamples';

export default function LetterModal({ letter, phonetic, onClose }) {
  const examples = letterExamples[letter] || [];

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        {/* Modal box */}
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #2e1f0a 0%, #1a1006 100%)',
            border: '1px solid rgba(180,120,40,0.4)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 30px rgba(180,120,40,0.1)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4" style={{ borderBottom: '1px solid rgba(140,90,30,0.25)' }}>
            <div className="flex items-center gap-4">
              <span className="font-kannada text-5xl font-bold" style={{ color: '#f0c060', textShadow: '0 2px 16px rgba(200,148,42,0.6)' }}>
                {letter}
              </span>
              <div>
                <span className="font-inter text-xs tracking-widest uppercase block" style={{ color: '#a07840' }}>phonetic</span>
                <span className="font-inter text-lg font-semibold" style={{ color: '#e8b84b' }}>{phonetic}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(140,90,30,0.2)', color: '#a07840' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(180,120,40,0.35)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(140,90,30,0.2)'}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Examples */}
          <div className="px-6 py-5 space-y-4">
            <p className="font-inter text-xs uppercase tracking-widest" style={{ color: '#7a5828' }}>Examples</p>
            {examples.map((ex, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.1 }}
                className="flex items-center gap-4 rounded-xl p-3"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(140,90,30,0.18)' }}
              >
                {/* Image */}
                <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0" style={{ border: '1px solid rgba(180,120,40,0.25)' }}>
                  <img
                    src={`https://source.unsplash.com/80x80/?${encodeURIComponent(ex.imageQuery)}&sig=${i}`}
                    alt={ex.meaning}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={e => { e.target.src = `https://picsum.photos/seed/${encodeURIComponent(ex.word)}/80/80`; }}
                  />
                </div>
                {/* Text */}
                <div>
                  <p className="font-kannada text-xl font-bold" style={{ color: '#f0c060' }}>{ex.word}</p>
                  <p className="font-inter text-sm mt-0.5" style={{ color: '#9a7040' }}>{ex.meaning}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Ornate corner accents */}
          <div className="absolute top-2 left-2 w-4 h-4 opacity-40" style={{ borderTop: '1.5px solid #c8942a', borderLeft: '1.5px solid #c8942a', borderRadius: '1px 0 0 0' }} />
          <div className="absolute top-2 right-2 w-4 h-4 opacity-40" style={{ borderTop: '1.5px solid #c8942a', borderRight: '1.5px solid #c8942a', borderRadius: '0 1px 0 0' }} />
          <div className="absolute bottom-2 left-2 w-4 h-4 opacity-40" style={{ borderBottom: '1.5px solid #c8942a', borderLeft: '1.5px solid #c8942a', borderRadius: '0 0 0 1px' }} />
          <div className="absolute bottom-2 right-2 w-4 h-4 opacity-40" style={{ borderBottom: '1.5px solid #c8942a', borderRight: '1.5px solid #c8942a', borderRadius: '0 0 1px 0' }} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}