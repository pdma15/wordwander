import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, RotateCcw, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuizResults({ score, total, onRetake }) {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  const getMessage = () => {
    if (percentage === 100) return { text: 'Perfect Score!', sub: 'You\'re a Kannada market expert!' };
    if (percentage >= 80) return { text: 'Excellent!', sub: 'You navigated the market with confidence.' };
    if (percentage >= 70) return { text: 'Great Job!', sub: 'You passed! Keep practicing to improve.' };
    if (percentage >= 50) return { text: 'Good Effort!', sub: 'Almost there — review the phrases and try again.' };
    return { text: 'Keep Learning!', sub: 'Practice the common phrases and come back stronger.' };
  };

  const msg = getMessage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto text-center"
    >
      <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 p-8 sm:p-10">
        {/* Icon */}
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
          passed ? 'bg-primary/15' : 'bg-muted'
        }`}>
          {passed ? (
            <Trophy className="w-10 h-10 text-primary" />
          ) : (
            <Star className="w-10 h-10 text-muted-foreground" />
          )}
        </div>

        <h2 className="font-poppins text-3xl font-bold text-foreground mb-2">{msg.text}</h2>
        <p className="font-inter text-muted-foreground mb-8">{msg.sub}</p>

        {/* Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-inter text-sm text-muted-foreground">Score</span>
            <span className="font-poppins text-2xl font-bold text-primary">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-3 bg-secondary" />
          <p className="font-inter text-xs text-muted-foreground mt-2">
            {score} out of {total} correct • Pass threshold: 70%
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-8">
          <Button
            onClick={onRetake}
            className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold"
          >
            <RotateCcw className="mr-2 w-4 h-4" />
            Retake Quiz
          </Button>
          <Link to="/phrases" className="w-full">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl border-border/30 font-inter font-semibold"
            >
              Review Phrases
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}