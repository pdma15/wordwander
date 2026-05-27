import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Volume2 } from 'lucide-react';
import AudioButton from '../shared/AudioButton';

export default function QuizScenarioCard({ scenario, selectedOption, onSelect, showResult, language }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 p-6 sm:p-8"
    >
      {/* Scenario Header */}
      <div className="mb-8">
        <h3 className="font-poppins text-xl sm:text-2xl font-bold text-foreground mb-3">
          {language === 'hi' ? (scenario.title_hi || scenario.title) : scenario.title}
        </h3>
        <p className="font-inter text-muted-foreground leading-relaxed">
          {language === 'hi' ? (scenario.prompt_hi || scenario.prompt) : scenario.prompt}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {scenario.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = option.correct;
          const showFeedback = showResult && isSelected;

          let borderColor = 'border-border/30 hover:border-primary/30';
          let bgColor = 'bg-secondary/20';
          if (showResult) {
            if (isSelected && isCorrect) {
              borderColor = 'border-accent/50';
              bgColor = 'bg-accent/10';
            } else if (isSelected && !isCorrect) {
              borderColor = 'border-destructive/50';
              bgColor = 'bg-destructive/10';
            } else if (isCorrect) {
              borderColor = 'border-accent/30';
              bgColor = 'bg-accent/5';
            }
          } else if (isSelected) {
            borderColor = 'border-primary/50';
            bgColor = 'bg-primary/10';
          }

          return (
            <button
              key={index}
              onClick={() => !showResult && onSelect(index)}
              disabled={showResult}
              className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-300 ${borderColor} ${bgColor}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <span className="font-kannada text-xl sm:text-2xl font-semibold text-foreground block">
                    {option.text}
                  </span>
                  <span className="font-inter text-sm text-muted-foreground mt-1 block">
                    {option.phonetic}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <AudioButton text={option.text} phonetic={option.phonetic} size="sm" />
                  {showResult && isSelected && (
                    isCorrect ? (
                      <Check className="w-5 h-5 text-accent" />
                    ) : (
                      <X className="w-5 h-5 text-destructive" />
                    )
                  )}
                </div>
              </div>

              {/* Feedback */}
              {showFeedback && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className={`mt-3 pt-3 border-t font-inter text-sm leading-relaxed ${
                    isCorrect ? 'border-accent/20 text-accent' : 'border-destructive/20 text-destructive'
                  }`}
                >
                  {language === 'hi' ? (option.feedback_hi || option.feedback) : option.feedback}
                </motion.p>
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}