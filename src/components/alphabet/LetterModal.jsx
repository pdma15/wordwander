import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { letterExamples } from '@/lib/letterExamples';
import { base44 } from '@/api/base44Client';

export default function LetterModal({ letter, phonetic, onClose }) {
  const examples = letterExamples[letter] || [];
  const [images, setImages] = useState([null, null, null]);
  const [loading, setLoading] = useState([true, true, true]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    // Generate all 3 images in parallel when modal opens
    examples.forEach((ex, i) => {
      base44.integrations.Core.GenerateImage({
        prompt: `Simple clean illustration of ${ex.meaning}, colorful, flat design, white background, no text`,
      }).then(res => {
        setImages(prev => { const next = [...prev]; next[i] = res.url; return next; });
        setLoading(prev => { const next = [...prev]; next[i] = false; return next; });
      }).catch(() => {
        setLoading(prev => { const next = [...prev]; next[i] = false; return next; });
      });
    });
  }, [letter]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #2e1f0a 0%, #1a1006 100%)',
          border: '1px solid rgba(200,148,42,0.35)',
          boxShadow: '0 30px 70px rgba(0,0,0,0.7), 0 0 40px rgba(180,120,40,0.08)',
        }}
      >
        {/* Corner accents */}
        <div className="absolute top-2 left-2 w-4 h-4" style={{ borderTop: '1.5px solid #c8942a', borderLeft: '1.5px solid #c8942a', opacity: 0.5 }} />
        <div className="absolute top-2 right-2 w-4 h-4" style={{ borderTop: '1.5px solid #c8942a', borderRight: '1.5px solid #c8942a', opacity: 0.5 }} />
        <div className="absolute bottom-2 left-2 w-4 h-4" style={{ borderBottom: '1.5px solid #c8942a', borderLeft: '1.5px solid #c8942a', opacity: 0.5 }} />
        <div className="absolute bottom-2 right-2 w-4 h-4" style={{ borderBottom: '1.5px solid #c8942a', borderRight: '1.5px solid #c8942a', opacity: 0.5 }} />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(140,90,30,0.25)' }}>
          <div className="flex items-center gap-4">
            <span
              className="font-kannada font-bold"
              style={{ fontSize: '3.5rem', lineHeight: 1, color: '#f0c060', textShadow: '0 2px 20px rgba(200,148,42,0.55)' }}
            >
              {letter}
            </span>
            <div>
              <span className="font-inter text-[10px] tracking-widest uppercase block mb-0.5" style={{ color: '#7a5828' }}>phonetic</span>
              <span className="font-inter text-xl font-semibold" style={{ color: '#e8b84b' }}>{phonetic}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(140,90,30,0.2)', color: '#a07840' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Examples */}
        <div className="px-6 py-5 space-y-3">
          <p className="font-inter text-[10px] uppercase tracking-widest mb-4" style={{ color: '#6a4820' }}>Examples</p>
          {examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 + 0.1 }}
              className="flex items-center gap-4 rounded-xl p-3"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(140,90,30,0.2)' }}
            >
              {/* Image */}
              <div
                className="w-14 h-14 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                style={{ border: '1px solid rgba(180,120,40,0.3)', background: 'rgba(0,0,0,0.2)' }}
              >
                {loading[i] ? (
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#c8942a' }} />
                ) : images[i] ? (
                  <img src={images[i]} alt={ex.meaning} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-kannada text-lg" style={{ color: '#c8942a' }}>{ex.word[0]}</span>
                )}
              </div>
              {/* Text */}
              <div>
                <p className="font-kannada text-xl font-bold" style={{ color: '#f0c060' }}>{ex.word}</p>
                <p className="font-inter text-sm mt-0.5" style={{ color: '#9a7040' }}>{ex.meaning}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}