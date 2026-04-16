import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import SectionHeader from '../components/shared/SectionHeader';
import QuizScenarioCard from '../components/quiz/QuizScenarioCard';
import QuizResults from '../components/quiz/QuizResults';
import { quizScenarios } from '../lib/kannadaData';

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const isCorrect = quizScenarios[currentScenario].options[selectedOption].correct;
    if (isCorrect) setScore(prev => prev + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentScenario < quizScenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRetake = () => {
    setStarted(true);
    setCurrentScenario(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            title="Quiz Complete!"
            kannadaTitle="ಪರೀಕ್ಷೆ ಮುಗಿಯಿತು"
          />
          <QuizResults score={score} total={quizScenarios.length} onRetake={handleRetake} />
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            title="The Grand Bazaar"
            kannadaTitle="ದೊಡ್ಡ ಮಾರುಕಟ್ಟೆ"
            subtitle="Test your Kannada skills in a realistic market scenario. Navigate conversations with shopkeepers, negotiate prices, and find your way around."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden border border-border/30"
          >
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <img
                src="https://media.base44.com/images/public/69e0ad6ff5507c1eca24e4d4/209b6b353_generated_55967778.png"
                alt="Traditional Indian market bazaar"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
            </div>

            <div className="bg-card/60 p-6 sm:p-8">
              <h3 className="font-poppins text-lg font-semibold text-foreground mb-3">
                Market Scenario Quiz
              </h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-2">
                You'll face {quizScenarios.length} scenarios — from greeting shopkeepers to negotiating prices. 
                Choose the best Kannada response for each situation.
              </p>
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="outline" className="border-primary/30 text-primary font-inter text-xs">
                  {quizScenarios.length} Scenarios
                </Badge>
                <Badge variant="outline" className="border-accent/30 text-accent font-inter text-xs">
                  Pass: 70%
                </Badge>
              </div>
              <Button
                onClick={() => setStarted(true)}
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold group"
              >
                Enter the Market
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-primary/30 text-primary font-inter text-xs">
              Scenario {currentScenario + 1}/{quizScenarios.length}
            </Badge>
            <span className="font-inter text-xs text-muted-foreground">
              Score: {score}/{currentScenario + (showResult ? 1 : 0)}
            </span>
          </div>
          {/* Progress dots */}
          <div className="flex gap-1.5">
            {quizScenarios.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentScenario ? 'bg-primary' : i < currentScenario ? 'bg-primary/40' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <QuizScenarioCard
            key={currentScenario}
            scenario={quizScenarios[currentScenario]}
            selectedOption={selectedOption}
            onSelect={handleSelect}
            showResult={showResult}
          />
        </AnimatePresence>

        {/* Action Button */}
        <div className="mt-6">
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold"
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold group"
            >
              {currentScenario < quizScenarios.length - 1 ? 'Next Scenario' : 'See Results'}
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}