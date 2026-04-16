import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({ title, kannadaTitle, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      {kannadaTitle && (
        <p className="font-kannada text-primary/60 text-lg mb-2">{kannadaTitle}</p>
      )}
      <h1 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 text-muted-foreground font-inter text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-6 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </motion.div>
  );
}