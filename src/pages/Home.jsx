import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Languages, BookOpen, GraduationCap, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Languages,
    title: 'Learn the Alphabet',
    description: 'Master Kannada vowels and consonants with interactive pronunciation guides.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: BookOpen,
    title: 'Common Phrases',
    description: 'Essential everyday phrases with audio playback and cultural context.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: GraduationCap,
    title: 'Market Scenario Quiz',
    description: 'Test your skills in a realistic Kannada market conversation.',
    color: 'text-accent',
    bg: 'bg-accent/10',
  },
  {
    icon: BarChart3,
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed progress tracking.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
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
            Journey through the beauty of Kannada — one of the world's oldest living languages. 
            Learn to read, speak, and connect through step-by-step lessons and immersive experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/alphabet">
              <Button size="lg" className="text-base font-inter font-semibold px-8 py-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 group">
                Start Learning Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/quiz">
              <Button size="lg" variant="outline" className="text-base font-inter font-semibold px-8 py-6 rounded-xl border-border/50 hover:bg-secondary">
                Try the Quiz
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

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
              Features We Provide
            </span>
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-foreground">
              Everything You Need to Learn Kannada
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
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-poppins text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
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
              Begin Your Kannada Journey Today
            </h2>
            <p className="text-muted-foreground font-inter text-lg mb-10 leading-relaxed">
              From the ancient scripts carved in Hampi's stones to modern everyday conversations — 
              discover the richness of Karnataka's language and culture.
            </p>
            <Link to="/alphabet">
              <Button size="lg" className="text-base font-inter font-semibold px-10 py-6 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 group">
                Start with the Alphabet
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
            Preserving and teaching regional Indian languages, one word at a time.
          </p>
          <p className="font-kannada text-primary/40 text-xl">
            ಕನ್ನಡ ಕಲಿಯಿರಿ • ಸಂಸ್ಕೃತಿ ಉಳಿಸಿ
          </p>
        </div>
      </section>
    </div>
  );
}