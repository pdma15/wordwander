import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, RotateCcw, ArrowRight, Star, Shuffle, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/lib/languageContext';

export default function QuizResults({ score, total, onRetake, onNextSet, allMastered }) {
  const { language } = useLanguage();
  const [showNextPrompt, setShowNextPrompt] = useState(false);
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  const getMessage = () => {
    if (language === 'hi') {
      if (percentage === 100) return { text: 'परफेक्ट स्कोर!', sub: 'अद्भुत! आपने हर स्थिति में महारत हासिल की।' };
      if (percentage >= 80) return { text: 'शानदार!', sub: 'आपने परिदृश्य को आत्मविश्वास से नेविगेट किया।' };
      if (percentage >= 70) return { text: 'बहुत अच्छे!', sub: 'आप पास हो गए! सुधार के लिए अभ्यास जारी रखें।' };
      if (percentage >= 50) return { text: 'अच्छी कोशिश!', sub: 'लगभग पहुँच गए — वाक्यांश देखें और दोबारा कोशिश करें।' };
      return { text: 'सीखते रहें!', sub: 'सामान्य वाक्यांशों का अभ्यास करें और मजबूत होकर लौटें।' };
    }
    if (percentage === 100) return { text: 'Perfect Score!', sub: 'Flawless. You owned every situation.' };
    if (percentage >= 80) return { text: 'Excellent!', sub: 'You navigated the scenario with confidence.' };
    if (percentage >= 70) return { text: 'Great Job!', sub: 'You passed! Keep practicing to improve.' };
    if (percentage >= 50) return { text: 'Good Effort!', sub: 'Almost there — review the phrases and try again.' };
    return { text: 'Keep Learning!', sub: 'Practice the common phrases and come back stronger.' };
  };

  const msg = getMessage();

  // "All mastered" screen
  if (allMastered) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center"
      >
        <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 p-8 sm:p-10">
          <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 bg-primary/20">
            <Award className="w-12 h-12 text-primary" />
          </div>
          <h2 className="font-poppins text-3xl font-bold text-foreground mb-3">
            {language === 'hi' ? 'आपने सब कुछ सीख लिया!' : "You've Mastered It All!"}
          </h2>
          <p className="font-kannada text-xl text-primary mb-2">ನೀವು ಎಲ್ಲವನ್ನೂ ಕಲಿತಿರಿ!</p>
          <p className="font-inter text-muted-foreground mb-8 leading-relaxed">
            {language === 'hi'
              ? <>अविश्वसनीय काम — आपने हर क्विज़ परिदृश्य जीत लिया। बाज़ार से टैक्सी तक, रेस्तरां से बस तक, आप कन्नड़ एक स्थानीय की तरह बोलते हैं। आप अब सीखने वाले नहीं, बल्कि एक <span className="text-primary font-semibold">कन्नड़ वक्ता</span> हैं।</>
              : <>Incredible work — you've conquered every quiz scenario. From the market to the taxi, the restaurant to the bus, you speak Kannada like a local. You're no longer a learner, you're a <span className="text-primary font-semibold">Kannada speaker</span>.</>
            }
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={onRetake}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold"
            >
              <RotateCcw className="mr-2 w-4 h-4" />
              {language === 'hi' ? 'शुरू से फिर शुरू करें' : 'Start Over from the Beginning'}
            </Button>
            <Link to="/feedback" className="w-full">
              <Button variant="outline" className="w-full h-12 rounded-xl border-border/30 font-inter font-semibold">
                {language === 'hi' ? 'अपनी प्रतिक्रिया साझा करें' : 'Share Your Feedback'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // "Real run" next-scenario prompt
  if (showNextPrompt) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center"
      >
        <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 p-8 sm:p-10">
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-primary/15">
            <Shuffle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-poppins text-2xl font-bold text-foreground mb-3">
            {language === 'hi' ? 'असली परीक्षण के लिए तैयार?' : 'Ready for the Real Run?'}
          </h2>
          <p className="font-inter text-muted-foreground mb-8 leading-relaxed">
            {language === 'hi'
              ? 'उम्मीद है आपने यहाँ अच्छा अभ्यास किया! अब असली परीक्षण है — एक बिल्कुल नया परिदृश्य जो आपने अभी तक नहीं आज़माया। देखते हैं आपकी कन्नड़ आपको कहाँ तक ले जाती है!'
              : "We hope you exercised well here! Now it's the real run — a brand new scenario you haven't tried yet awaits you. Let's see how far your Kannada takes you!"
            }
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={onNextSet}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold group"
            >
              {language === 'hi' ? 'चलते हैं! →' : "Let's Go! →"}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to="/phrases" className="w-full">
              <Button variant="outline" className="w-full h-12 rounded-xl border-border/30 font-inter font-semibold">
                {language === 'hi' ? 'पहले वाक्यांश देखें' : 'Review Phrases First'}
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default results screen
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto text-center"
    >
      <div className="rounded-2xl bg-card/60 backdrop-blur-sm border border-border/30 p-8 sm:p-10">
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

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-inter text-sm text-muted-foreground">{language === 'hi' ? 'अंक' : 'Score'}</span>
            <span className="font-poppins text-2xl font-bold text-primary">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-3 bg-secondary" />
          <p className="font-inter text-xs text-muted-foreground mt-2">
            {language === 'hi'
              ? `${total} में से ${score} सही • पास: 70%`
              : `${score} out of ${total} correct • Pass threshold: 70%`
            }
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          {onNextSet && (
            <Button
              onClick={() => setShowNextPrompt(true)}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold group"
            >
              <Shuffle className="mr-2 w-4 h-4" />
              {language === 'hi' ? 'अगला परिदृश्य आज़माएं' : 'Try the Next Scenario'}
            </Button>
          )}
          <Button
            onClick={onRetake}
            variant="outline"
            className="w-full h-12 rounded-xl border-border/30 font-inter font-semibold"
          >
            <RotateCcw className="mr-2 w-4 h-4" />
            {language === 'hi' ? 'यह क्विज़ फिर से लें' : 'Retake This Quiz'}
          </Button>
          <Link to="/phrases" className="w-full">
            <Button variant="outline" className="w-full h-12 rounded-xl border-border/30 font-inter font-semibold">
              {language === 'hi' ? 'वाक्यांश देखें' : 'Review Phrases'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}