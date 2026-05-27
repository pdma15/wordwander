import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '../components/shared/SectionHeader';
import PhraseCard from '../components/phrases/PhraseCard';
import { phrases } from '../lib/kannadaData';
import { useLanguage, t } from '../lib/languageContext';

export default function Phrases() {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          title={t(language, 'phrases_title')}
          kannadaTitle="ಸಾಮಾನ್ಯ ವಾಕ್ಯಗಳು"
          subtitle={t(language, 'phrases_subtitle')}
        />

        <div className="space-y-4">
          {phrases.map((phrase, index) => (
            <PhraseCard key={index} index={index} {...phrase} />
          ))}
        </div>

        {/* Next Page Banner */}
        <Link to="/reading" className="block mt-10">
          <div className="group flex items-center justify-between px-6 py-4 rounded-2xl border border-border/30 bg-card/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer">
            <div>
              <p className="font-inter text-xs text-muted-foreground mb-0.5">{t(language, 'phrases_next_label')}</p>
              <p className="font-poppins text-base font-semibold text-foreground group-hover:text-primary transition-colors">{t(language, 'phrases_next_cta')}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </Link>
      </div>
    </div>
  );
}