import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../lib/languageContext';

export default function LanguageSplash() {
  const { chooseLanguage } = useLanguage();

  return (
    <div className="fixed inset-0 z-[200] bg-background flex items-center justify-center px-6">
      {/* Floating Kannada chars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['ಅ', 'ಕ', 'ನ', 'ಮ', 'ಹ', 'ಶ', 'ರ'].map((char, i) => (
          <motion.span
            key={i}
            className="absolute font-kannada text-primary/5 select-none"
            style={{ fontSize: `${60 + i * 20}px`, left: `${8 + i * 13}%`, top: `${10 + (i % 3) * 28}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.03, 0.07, 0.03] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center max-w-sm w-full"
      >
        {/* Logo */}
        <motion.span
          className="font-kannada text-8xl text-primary font-bold block mb-4 animate-glow-pulse"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          ಅ
        </motion.span>

        <h1 className="font-poppins text-3xl font-bold text-foreground mb-1">
          Word <span className="text-primary">Wander</span>
        </h1>
        <p className="font-kannada text-primary/50 text-base mb-10">ಕನ್ನಡ ಕಲಿಯಿರಿ</p>

        {/* Language prompt */}
        <p className="font-inter text-muted-foreground text-sm mb-2">Choose your language</p>
        <p className="font-inter text-muted-foreground text-sm mb-8">अपनी भाषा चुनें</p>

        <div className="flex gap-4">
          <button
            onClick={() => chooseLanguage('en')}
            className="flex-1 flex flex-col items-center gap-2 py-5 px-4 rounded-2xl border border-border/50 bg-card/60 hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 active:scale-95 select-none"
          >
            <span className="text-3xl">🇬🇧</span>
            <span className="font-poppins font-semibold text-foreground text-base">English</span>
            <span className="font-inter text-xs text-muted-foreground">English</span>
          </button>

          <button
            onClick={() => chooseLanguage('hi')}
            className="flex-1 flex flex-col items-center gap-2 py-5 px-4 rounded-2xl border border-border/50 bg-card/60 hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 active:scale-95 select-none"
          >
            <span className="text-3xl">🇮🇳</span>
            <span className="font-poppins font-semibold text-foreground text-base">हिंदी</span>
            <span className="font-inter text-xs text-muted-foreground">Hindi</span>
          </button>
        </div>

        <p className="font-inter text-xs text-muted-foreground/50 mt-8">
          You can change this later in Settings
          <br />आप इसे बाद में Settings में बदल सकते हैं
        </p>
      </motion.div>
    </div>
  );
}