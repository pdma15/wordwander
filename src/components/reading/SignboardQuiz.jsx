import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Check, X, ChevronRight, RotateCcw } from 'lucide-react';

const signboards = [
  {
    image: 'https://media.base44.com/images/public/69e0ad6ff5507c1eca24e4d4/7291ab6c2_download.jpg',
    question: 'What are the two places shown on this road signboard?',
    answers: ['bengaluru', 'tumakuru'],
    hint: 'Two city names — one with an arrow left, one with an arrow right',
    display: 'Bengaluru & Tumakuru',
  },
  {
    image: 'https://media.base44.com/images/public/69e0ad6ff5507c1eca24e4d4/2b8a70a4f_images-1.jpg',
    question: 'What place/market is shown on this signboard?',
    answers: ['krishna rajendra market', 'krishna rajendra marukate', 'krishna rajendra marukatte'],
    hint: 'A famous market in Bengaluru',
    display: 'Krishna Rajendra Market',
  },
  {
    image: 'https://media.base44.com/images/public/69e0ad6ff5507c1eca24e4d4/e0b08239b_images.png',
    question: 'What does the Kannada text on this sign say?',
    answers: ['praveshavilla', 'no entry', 'pravesavilla'],
    hint: 'It\'s a restriction sign — what does it mean in English?',
    display: 'Praveshavilla (No Entry)',
  },
];

export default function SignboardQuiz() {
  const [current, setCurrent] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showHint, setShowHint] = useState(false);

  const signboard = signboards[current];
  const isLast = current === signboards.length - 1;

  const checkAnswer = () => {
    const normalized = userAnswer.trim().toLowerCase().replace(/[^a-z ]/g, '');
    const match = signboard.answers.some(a => normalized === a.toLowerCase().replace(/[^a-z ]/g, ''));
    setIsCorrect(match);
    setShowResult(true);
    setScore(prev => ({ correct: prev.correct + (match ? 1 : 0), total: prev.total + 1 }));
  };

  const next = () => {
    setCurrent(c => c + 1);
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
  };

  const reset = () => {
    setCurrent(0);
    setUserAnswer('');
    setShowResult(false);
    setShowHint(false);
    setScore({ correct: 0, total: 0 });
  };

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-inter text-xs text-muted-foreground">{current + 1} of {signboards.length}</span>
        {score.total > 0 && (
          <Badge variant="outline" className="font-inter text-xs border-primary/30 text-primary">
            {score.correct}/{score.total} correct
          </Badge>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 p-6 sm:p-8"
        >
          {/* Signboard Image */}
          <div className="text-center mb-6">
            <p className="font-inter text-xs text-muted-foreground uppercase tracking-widest mb-4">
              Read the Kannada signboard
            </p>
            <img
              src={signboard.image}
              alt="Kannada signboard"
              className="mx-auto max-h-56 rounded-xl object-contain border border-border/20"
            />
          </div>

          {/* Question */}
          <p className="font-inter text-sm text-foreground/80 mb-4 text-center">{signboard.question}</p>

          {/* Input */}
          <div className="space-y-3">
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !showResult && userAnswer && checkAnswer()}
              placeholder="Type your answer in English..."
              className="text-base font-inter bg-secondary/30 border-border/30 focus:border-primary/50 rounded-xl h-12"
              disabled={showResult}
            />

            {!showResult ? (
              <div className="flex gap-3">
                <Button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold"
                >
                  Check Answer
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowHint(!showHint)}
                  className="h-11 px-4 rounded-xl border-border/30 font-inter text-sm text-muted-foreground"
                >
                  Hint
                </Button>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                <div className={`p-4 rounded-xl border ${
                  isCorrect ? 'bg-accent/10 border-accent/30 text-accent' : 'bg-destructive/10 border-destructive/30 text-destructive'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                    <span className="font-inter font-semibold">{isCorrect ? 'Correct!' : 'Not quite!'}</span>
                  </div>
                  <p className="font-inter text-sm opacity-80">Answer: <strong>{signboard.display}</strong></p>
                </div>
                <div className="flex gap-3">
                  {!isLast ? (
                    <Button onClick={next} className="flex-1 h-11 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold group">
                      Next <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  ) : (
                    <Button onClick={reset} variant="outline" className="flex-1 h-11 rounded-xl border-border/30 font-inter font-semibold">
                      <RotateCcw className="mr-2 w-4 h-4" /> Try Again
                    </Button>
                  )}
                </div>
              </motion.div>
            )}

            {showHint && !showResult && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-inter text-xs text-primary/70 text-center italic">
                💡 {signboard.hint}
              </motion.p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}