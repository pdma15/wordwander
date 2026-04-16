import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check, X, ArrowRight, RotateCcw, ChevronRight } from 'lucide-react';
import SectionHeader from '../components/shared/SectionHeader';
import AudioButton from '../components/shared/AudioButton';
import { readingExercises } from '../lib/kannadaData';

export default function Reading() {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const level = readingExercises[selectedLevel];
  const exercise = level.exercises[currentExercise];

  const checkAnswer = () => {
    const normalized = userAnswer.trim().toLowerCase();
    const correct = exercise.phonetic.toLowerCase();
    const match = normalized === correct || normalized.replace(/[^a-z]/g, '') === correct.replace(/[^a-z]/g, '');
    setIsCorrect(match);
    setShowResult(true);
    setScore(prev => ({ correct: prev.correct + (match ? 1 : 0), total: prev.total + 1 }));
  };

  const nextExercise = () => {
    setShowResult(false);
    setUserAnswer('');
    if (currentExercise < level.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    }
  };

  const resetLevel = () => {
    setCurrentExercise(0);
    setUserAnswer('');
    setShowResult(false);
    setScore({ correct: 0, total: 0 });
  };

  const isLastExercise = currentExercise === level.exercises.length - 1;

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          title="Reading Exercise"
          kannadaTitle="ಓದುವ ಅಭ್ಯಾಸ"
          subtitle="Read Kannada text and type the phonetic transliteration. Build your reading skills step by step."
        />

        {/* Level Selector */}
        <div className="flex gap-3 justify-center mb-10">
          {readingExercises.map((lvl, i) => (
            <button
              key={i}
              onClick={() => { setSelectedLevel(i); resetLevel(); }}
              className={`px-5 py-2.5 rounded-xl font-inter text-sm font-medium transition-all duration-300 border ${
                selectedLevel === i
                  ? 'bg-primary/15 text-primary border-primary/30'
                  : 'bg-card/60 text-muted-foreground border-border/30 hover:border-primary/20'
              }`}
            >
              Level {lvl.level} — {lvl.label}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="font-inter text-xs text-muted-foreground">
              {currentExercise + 1} of {level.exercises.length}
            </span>
          </div>
          {score.total > 0 && (
            <Badge variant="outline" className="font-inter text-xs border-primary/30 text-primary">
              {score.correct}/{score.total} correct
            </Badge>
          )}
        </div>

        {/* Exercise Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedLevel}-${currentExercise}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 p-8 sm:p-10"
          >
            {/* Kannada Text to Read */}
            <div className="text-center mb-8">
              <p className="font-inter text-xs text-muted-foreground uppercase tracking-widest mb-4">
                Read this aloud
              </p>
              <div className="flex items-center justify-center gap-4">
                <h2 className="font-kannada text-4xl sm:text-5xl font-bold text-foreground leading-relaxed">
                  {exercise.kannada}
                </h2>
                <AudioButton text={exercise.kannada} size="lg" />
              </div>
              <p className="font-inter text-sm text-muted-foreground mt-4">
                "{exercise.english}"
              </p>
            </div>

            {/* Input */}
            <div className="space-y-4">
              <label className="font-inter text-sm text-muted-foreground block">
                Type the phonetic transliteration:
              </label>
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !showResult && userAnswer && checkAnswer()}
                placeholder={`e.g. "${level.exercises[0].phonetic.split(' ')[0]}..."`}
                className="text-lg font-inter bg-secondary/30 border-border/30 focus:border-primary/50 rounded-xl h-14"
                disabled={showResult}
              />

              {!showResult ? (
                <Button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold"
                >
                  Check Answer
                </Button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Result */}
                  <div className={`p-4 rounded-xl border ${
                    isCorrect
                      ? 'bg-accent/10 border-accent/30 text-accent'
                      : 'bg-destructive/10 border-destructive/30 text-destructive'
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                      <span className="font-inter font-semibold">
                        {isCorrect ? 'Excellent!' : 'Not quite right'}
                      </span>
                    </div>
                    <p className="font-inter text-sm opacity-80">
                      Correct answer: <strong>{exercise.phonetic}</strong>
                    </p>
                  </div>

                  {/* Next / Retry */}
                  <div className="flex gap-3">
                    {!isLastExercise ? (
                      <Button
                        onClick={nextExercise}
                        className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold group"
                      >
                        Next Exercise
                        <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    ) : (
                      <Button
                        onClick={resetLevel}
                        variant="outline"
                        className="flex-1 h-12 rounded-xl border-border/30 font-inter font-semibold"
                      >
                        <RotateCcw className="mr-2 w-4 h-4" />
                        Restart Level
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}