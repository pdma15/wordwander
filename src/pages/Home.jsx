import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Languages, BookOpen, GraduationCap, BarChart3, MessageSquare, X, AlertCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage, t } from '../lib/languageContext';

const featureKeys = [
  { icon: Languages, titleKey: 'feat_alphabet_title', descKey: 'feat_alphabet_desc', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: BookOpen, titleKey: 'feat_phrases_title', descKey: 'feat_phrases_desc', color: 'text-accent', bg: 'bg-accent/10' },
  { icon: GraduationCap, titleKey: 'feat_quiz_title', descKey: 'feat_quiz_desc', color: 'text-accent', bg: 'bg-accent/10' },
  { icon: BarChart3, titleKey: 'feat_progress_title', descKey: 'feat_progress_desc', color: 'text-primary', bg: 'bg-primary/10' },
  { icon: MessageSquare, titleKey: 'feat_chatbot_title', descKey: 'feat_chatbot_desc', color: 'text-accent', bg: 'bg-accent/10' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const { language } = useLanguage();
  const [dismissedDisclaimer, setDismissedDisclaimer] = useState(() =>
    sessionStorage.getItem('disclaimer_dismissed') === 'true'
  );
  const [dismissedLangTip, setDismissedLangTip] = useState(() =>
    sessionStorage.getItem('lang_tip_dismissed') === 'true'
  );

  const handleDismiss = () => {
    sessionStorage.setItem('disclaimer_dismissed', 'true');
    setDismissedDisclaimer(true);
  };

  const handleDismissLangTip = () => {
    sessionStorage.setItem('lang_tip_dismissed', 'true');
    setDismissedLangTip(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://media.base44.com/images/public/69e0ad6ff5507c1eca24e4d4/1da86afe9_generated_c2a89a00.png"
            alt="Ancient Kannada stone carving"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        {/* Floating Kannada Characters */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['ಅ', 'ಕ', 'ನ', 'ಮ', 'ಹ', 'ಶ', 'ರ'].map((char, i) => (
            <motion.span
              key={i}
              className="absolute font-kannada text-primary/5 select-none"
              style={{
                fontSize: `${60 + i * 20}px`,
                left: `${10 + i * 13}%`,
                top: `${15 + (i % 3) * 25}%`,
              }}
              animate={{ y: [0, -15, 0], opacity: [0.03, 0.08, 0.03] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="font-kannada text-7xl sm:text-8xl lg:text-9xl text-primary font-bold block animate-glow-pulse">
              ಅ
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-kannada text-primary/60 text-lg mb-2"
          >
            ಕನ್ನಡ ಕಲಿಯಿರಿ
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-poppins text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground tracking-tight"
          >
            Word <span className="text-primary">Wander</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-6 text-muted-foreground font-inter text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {t(language, 'hero_subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/alphabet">
              <Button size="lg" className="text-base font-inter font-semibold px-8 py-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 group">
                {t(language, 'start_learning')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/quiz">
              <Button size="lg" variant="outline" className="text-base font-inter font-semibold px-8 py-6 rounded-xl border-border/50 hover:bg-secondary">
                {t(language, 'try_quiz')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <AnimatePresence>
        {!dismissedDisclaimer && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative mx-4 sm:mx-6 lg:mx-8 mt-6 rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-sm px-5 py-4 flex items-start gap-4"
          >
            <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="font-inter text-sm text-muted-foreground leading-relaxed flex-1">
              {language === 'hi'
                ? <>यदि आपको इस वेबसाइट पर कोई समस्या या प्रश्न आया है, तो कृपया उसे <a href="https://forms.gle/T4dBmTAaZmW7GTZJ8" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 font-medium">Google Forms रिव्यू</a> में पोस्ट करें — डेवलपर इसे ज़रूर देखेगा।</>
                : <>If you have encountered any problems or have any queries while using this website, please post them in the <a href="https://forms.gle/T4dBmTAaZmW7GTZJ8" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-primary/80 font-medium">Google Forms review</a> — the developer will look into it.</>
              }
            </p>
            <button
              onClick={handleDismiss}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language Settings Tip */}
      <AnimatePresence>
        {!dismissedLangTip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative mx-4 sm:mx-6 lg:mx-8 mt-3 rounded-2xl border border-accent/30 bg-accent/5 backdrop-blur-sm px-5 py-4 flex items-start gap-4"
          >
            <Settings className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <p className="font-inter text-sm text-muted-foreground leading-relaxed flex-1">
              {language === 'hi'
                ? <>अपनी भाषा बदलनी है? <strong className="text-foreground">सेटिंग्स</strong> पर जाएं — नेविगेशन बार में <Settings className="inline w-3.5 h-3.5 text-accent mx-0.5" /> गियर आइकन पर क्लिक करें।</>
                : <>Need to change your language preference? Head to <strong className="text-foreground">Settings</strong> — look for the <Settings className="inline w-3.5 h-3.5 text-accent mx-0.5" /> gear icon in the navigation bar.</>
              }
            </p>
            <button
              onClick={handleDismissLangTip}
              className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://media.base44.com/images/public/69e0ad6ff5507c1eca24e4d4/e6e9166da_generated_86d90e3e.png"
            alt="Traditional brass lamp"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/90" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-kannada text-primary/60 text-lg mb-2">ವೈಶಿಷ್ಟ್ಯಗಳು</p>
            <span className="inline-block font-inter text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 border border-primary/30 text-primary/80 bg-primary/10">
              {t(language, 'features_label')}
            </span>
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-foreground">
              {t(language, 'features_title')}
            </h2>
            <div className="mt-4 mx-auto w-24 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featureKeys.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-poppins text-lg font-semibold text-foreground mb-2">{t(language, feature.titleKey)}</h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed">{t(language, feature.descKey)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-kannada text-5xl text-primary/30 block mb-4">ಪ್ರಾರಂಭಿಸಿ</span>
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t(language, 'cta_title')}
            </h2>
            <p className="text-muted-foreground font-inter text-lg mb-10 leading-relaxed">
              {t(language, 'cta_subtitle')}
            </p>
            <Link to="/alphabet">
              <Button size="lg" className="text-base font-inter font-semibold px-10 py-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 group">
                {t(language, 'start_alphabet')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Cultural Footer */}
      <section className="border-t border-border/30 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="font-kannada text-primary text-lg font-bold">ಕ</span>
            </div>
            <span className="font-poppins font-bold text-foreground">
              Word <span className="text-primary">Wander</span>
            </span>
          </div>
          <p className="font-inter text-sm text-muted-foreground">
            {t(language, 'footer_tagline')}
          </p>
          <p className="font-kannada text-primary/40 text-xl">
            ಕನ್ನಡ ಕಲಿಯಿರಿ • ಸಂಸ್ಕೃತಿ ಉಳಿಸಿ
          </p>
        </div>
      </section>
    </div>
  );
}