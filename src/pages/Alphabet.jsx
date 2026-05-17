import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import LetterCard from '../components/alphabet/LetterCard';
import { vowels, consonants } from '../lib/kannadaData';

export default function Alphabet() {
  const [activeTab, setActiveTab] = useState('vowels');
  const data = activeTab === 'vowels' ? vowels : consonants;

  return (
    <div
      className="min-h-screen px-4 sm:px-6 lg:px-8 py-16"
      style={{ background: 'linear-gradient(180deg, #150e04 0%, #1c1408 60%, #150e04 100%)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header — palm-leaf manuscript style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {/* Top decorative rule */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to right, transparent, #8a6020)' }} />
            <span style={{ color: '#c8942a', fontSize: '20px' }}>✦</span>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: 'linear-gradient(to left, transparent, #8a6020)' }} />
          </div>

          <p className="font-kannada text-lg mb-2" style={{ color: '#c8942a', letterSpacing: '0.05em' }}>ಕನ್ನಡ ಅಕ್ಷರಗಳು</p>

          <h1
            className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
            style={{ color: '#f0c060', textShadow: '0 2px 20px rgba(200,148,42,0.25)' }}
          >
            Kannada Alphabet
          </h1>

          <p className="mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed" style={{ color: '#906830' }}>
            Tap a letter to reveal its example word and meaning.
          </p>

          {/* Bottom decorative rule */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(to right, transparent, #5a3e10)' }} />
            <div className="flex gap-1.5">
              <span style={{ color: '#6a4818', fontSize: '8px' }}>◆</span>
              <span style={{ color: '#8a6020', fontSize: '8px' }}>◆</span>
              <span style={{ color: '#6a4818', fontSize: '8px' }}>◆</span>
            </div>
            <div className="h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(to left, transparent, #5a3e10)' }} />
          </div>
        </motion.div>

        {/* Tab switcher — temple pillar style */}
        <div className="flex justify-center mb-10">
          <div
            className="flex p-1 gap-1 rounded-sm"
            style={{ background: '#1e1408', border: '1px solid #5a3e10' }}
          >
            {['vowels', 'consonants'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2.5 text-sm font-inter font-medium transition-all duration-300 rounded-sm"
                style={
                  activeTab === tab
                    ? { background: 'linear-gradient(135deg, #8a5c1a, #6a3e0c)', color: '#f5d98a', border: '1px solid #a07030' }
                    : { background: 'transparent', color: '#7a5428', border: '1px solid transparent' }
                }
              >
                {tab === 'vowels' ? (
                  <span>Vowels <span className="font-kannada opacity-60 text-xs ml-1">ಸ್ವರಗಳು</span></span>
                ) : (
                  <span>Consonants <span className="font-kannada opacity-60 text-xs ml-1">ವ್ಯಂಜನಗಳು</span></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Letter Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4"
        >
          {data.map((item, i) => (
            <LetterCard key={item.letter} index={i} {...item} />
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs"
          style={{ color: '#6a4818' }}
        >
          <span className="flex items-center gap-2">
            <span style={{ color: '#c8942a' }}>✦</span> Tap a card to see its example word and meaning
          </span>
        </motion.div>

        {/* Next Page Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12"
        >
          <Link to="/phrases">
            <div className="group flex items-center justify-between px-6 py-4 rounded-2xl border border-border/30 bg-card/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer">
              <div>
                <p className="font-inter text-xs text-muted-foreground mb-0.5">Ready for the next step?</p>
                <p className="font-poppins text-base font-semibold text-foreground group-hover:text-primary transition-colors">Head to Common Phrases →</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}