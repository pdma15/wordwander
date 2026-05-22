import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ArrowRight, Shuffle } from 'lucide-react';
import SectionHeader from '../components/shared/SectionHeader';
import QuizScenarioCard from '../components/quiz/QuizScenarioCard';
import QuizResults from '../components/quiz/QuizResults';
import { allQuizSets } from '../lib/kannadaData';

function pickFromRemaining(completedIds) {
  const remaining = allQuizSets.filter(s => !completedIds.includes(s.id));
  if (remaining.length === 0) return null;
  return remaining[Math.floor(Math.random() * remaining.length)];
}

export default function Quiz() {
  const [completedIds, setCompletedIds] = useState([]);
  const [quizSet, setQuizSet] = useState(() => pickFromRemaining([]));
  const [started, setStarted] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const scenarios = quizSet ? quizSet.scenarios : [];
  const allDone = completed && completedIds.length >= allQuizSets.length;

  const handleSelect = (index) => setSelectedOption(index);

  const handleSubmit = () => {
    if (selectedOption === null) return;
    const isCorrect = scenarios[currentScenario].options[selectedOption].correct;
    if (isCorrect) setScore(prev => prev + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      const newCompleted = [...completedIds, quizSet.id];
      setCompletedIds(newCompleted);
      setCompleted(true);
    }
  };

  // Retake the same quiz
  const handleRetake = () => {
    setStarted(true);
    setCurrentScenario(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  // Move on to a new quiz set (excluding all already completed)
  const handleNextSet = () => {
    const newCompleted = completedIds.includes(quizSet.id)
      ? completedIds
      : [...completedIds, quizSet.id];
    const next = pickFromRemaining(newCompleted);
    setCompletedIds(newCompleted);
    setQuizSet(next);
    setStarted(false);
    setCurrentScenario(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const remainingCount = allQuizSets.length - completedIds.length;
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <SectionHeader title="Quiz Complete!" kannadaTitle="ಪರೀಕ್ಷೆ ಮುಗಿಯಿತು" />
          <QuizResults
            score={score}
            total={scenarios.length}
            onRetake={handleRetake}
            onNextSet={remainingCount > 0 ? handleNextSet : null}
            allMastered={remainingCount === 0}
          />
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            title={quizSet.title}
            kannadaTitle={quizSet.kannadaTitle}
            subtitle={quizSet.subtitle}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden border border-border/30"
          >
            <div className="relative h-48 sm:h-64 overflow-hidden">
              <img
                src={quizSet.image}
                alt={quizSet.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary/80 text-primary-foreground font-inter text-xs flex items-center gap-1">
                  <Shuffle className="w-3 h-3" /> Random Scenario
                </Badge>
              </div>
            </div>

            <div className="bg-card/60 p-6 sm:p-8">
              <h3 className="font-poppins text-lg font-semibold text-foreground mb-3">
                {quizSet.title} Quiz
              </h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-2">
                You'll face {scenarios.length} scenarios. Choose the best Kannada response for each situation.
              </p>
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="outline" className="border-primary/30 text-primary font-inter text-xs">
                  {scenarios.length} Scenarios
                </Badge>
                <Badge variant="outline" className="border-accent/30 text-accent font-inter text-xs">
                  Pass: 70%
                </Badge>
                {completedIds.length > 0 && (
                  <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground font-inter text-xs">
                    {completedIds.length}/{allQuizSets.length} done
                  </Badge>
                )}
              </div>
              <Button
                onClick={() => setStarted(true)}
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold group"
              >
                {quizSet.ctaLabel}
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
              Scenario {currentScenario + 1}/{scenarios.length}
            </Badge>
            <span className="font-inter text-xs text-muted-foreground">
              Score: {score}/{currentScenario + (showResult ? 1 : 0)}
            </span>
          </div>
          <div className="flex gap-1.5">
            {scenarios.map((_, i) => (
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
            scenario={scenarios[currentScenario]}
            selectedOption={selectedOption}
            onSelect={handleSelect}
            showResult={showResult}
          />
        </AnimatePresence>

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
              {currentScenario < scenarios.length - 1 ? 'Next Scenario' : 'See Results'}
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>

        <Link to="/feedback" className="block mt-6">
          <div className="group flex items-center justify-between px-6 py-4 rounded-2xl border border-border/30 bg-card/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer">
            <div>
              <p className="font-inter text-xs text-muted-foreground mb-0.5">How was your experience?</p>
              <p className="font-poppins text-base font-semibold text-foreground group-hover:text-primary transition-colors">Share your Feedback →</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </Link>
      </div>
    </div>
  );
}