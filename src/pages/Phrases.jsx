import React from 'react';
import SectionHeader from '../components/shared/SectionHeader';
import PhraseCard from '../components/phrases/PhraseCard';
import { phrases } from '../lib/kannadaData';

export default function Phrases() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          title="Common Phrases"
          kannadaTitle="ಸಾಮಾನ್ಯ ವಾಕ್ಯಗಳು"
          subtitle="Essential Kannada phrases for everyday conversations. Listen, practice, and use them in real situations."
        />

        <div className="space-y-4">
          {phrases.map((phrase, index) => (
            <PhraseCard key={index} index={index} {...phrase} />
          ))}
        </div>
      </div>
    </div>
  );
}