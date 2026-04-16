import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Send, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SectionHeader from '../components/shared/SectionHeader';
import StarRating from '../components/feedback/StarRating';

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    overall_rating: 0,
    difficulty: '',
    alphabet_rating: 0,
    phrases_rating: 0,
    voice_rating: 0,
    quiz_rating: 0,
    design_rating: 0,
    liked_most: '',
    improvements: '',
    learn_next: '',
    email: '',
    subscribe: false,
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.overall_rating === 0) return;
    setSubmitting(true);
    await base44.entities.Feedback.create(form);
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-accent/15 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-accent" />
          </div>
          <h2 className="font-poppins text-3xl font-bold text-foreground mb-3">
            Thank You!
          </h2>
          <p className="font-kannada text-primary/60 text-lg mb-2">ಧನ್ಯವಾದಗಳು</p>
          <p className="font-inter text-muted-foreground leading-relaxed">
            Your feedback helps us improve Word Wander and bring more languages to learners everywhere.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          title="Your Feedback"
          kannadaTitle="ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ"
          subtitle="Help us improve Word Wander. Your honest feedback guides our journey."
        />

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Overall Satisfaction */}
          <div className="rounded-2xl bg-card/60 border border-border/30 p-6">
            <h3 className="font-poppins text-lg font-semibold text-foreground mb-4">
              Overall Satisfaction
            </h3>
            <StarRating
              value={form.overall_rating}
              onChange={(v) => handleChange('overall_rating', v)}
              label="How satisfied are you with Word Wander?"
            />
          </div>

          {/* Difficulty */}
          <div className="rounded-2xl bg-card/60 border border-border/30 p-6">
            <h3 className="font-poppins text-lg font-semibold text-foreground mb-4">
              Difficulty Level
            </h3>
            <RadioGroup
              value={form.difficulty}
              onValueChange={(v) => handleChange('difficulty', v)}
              className="flex flex-col gap-3"
            >
              {[
                { value: 'too_easy', label: 'Too Easy' },
                { value: 'just_right', label: 'Just Right' },
                { value: 'too_difficult', label: 'Too Difficult' },
              ].map(opt => (
                <div key={opt.value} className="flex items-center gap-3">
                  <RadioGroupItem value={opt.value} id={opt.value} />
                  <Label htmlFor={opt.value} className="font-inter text-sm text-foreground/80 cursor-pointer">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Feature Ratings */}
          <div className="rounded-2xl bg-card/60 border border-border/30 p-6">
            <h3 className="font-poppins text-lg font-semibold text-foreground mb-6">
              Feature Ratings
            </h3>
            <div className="space-y-5">
              <StarRating value={form.alphabet_rating} onChange={(v) => handleChange('alphabet_rating', v)} label="Alphabet Lessons" />
              <StarRating value={form.phrases_rating} onChange={(v) => handleChange('phrases_rating', v)} label="Common Phrases" />
              <StarRating value={form.voice_rating} onChange={(v) => handleChange('voice_rating', v)} label="Voice Assistance" />
              <StarRating value={form.quiz_rating} onChange={(v) => handleChange('quiz_rating', v)} label="Quiz Interactivity" />
              <StarRating value={form.design_rating} onChange={(v) => handleChange('design_rating', v)} label="Dark Theme Design" />
            </div>
          </div>

          {/* Open Questions */}
          <div className="rounded-2xl bg-card/60 border border-border/30 p-6 space-y-5">
            <h3 className="font-poppins text-lg font-semibold text-foreground mb-2">
              Tell Us More
            </h3>
            <div>
              <Label className="font-inter text-sm text-foreground/80 mb-2 block">What did you like most?</Label>
              <Textarea
                value={form.liked_most}
                onChange={(e) => handleChange('liked_most', e.target.value)}
                className="bg-secondary/30 border-border/30 rounded-xl resize-none"
                rows={3}
              />
            </div>
            <div>
              <Label className="font-inter text-sm text-foreground/80 mb-2 block">What could be improved?</Label>
              <Textarea
                value={form.improvements}
                onChange={(e) => handleChange('improvements', e.target.value)}
                className="bg-secondary/30 border-border/30 rounded-xl resize-none"
                rows={3}
              />
            </div>
            <div>
              <Label className="font-inter text-sm text-foreground/80 mb-2 block">What would you like to learn next?</Label>
              <Textarea
                value={form.learn_next}
                onChange={(e) => handleChange('learn_next', e.target.value)}
                className="bg-secondary/30 border-border/30 rounded-xl resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* Optional */}
          <div className="rounded-2xl bg-card/60 border border-border/30 p-6 space-y-4">
            <h3 className="font-poppins text-lg font-semibold text-foreground mb-2">
              Optional
            </h3>
            <div>
              <Label className="font-inter text-sm text-foreground/80 mb-2 block">Email (for follow-up)</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your@email.com"
                className="bg-secondary/30 border-border/30 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                id="subscribe"
                checked={form.subscribe}
                onCheckedChange={(v) => handleChange('subscribe', v)}
              />
              <Label htmlFor="subscribe" className="font-inter text-sm text-muted-foreground cursor-pointer">
                Subscribe for updates on other languages
              </Label>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={form.overall_rating === 0 || submitting}
            className="w-full h-14 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-inter font-semibold text-base"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                <Send className="mr-2 w-5 h-5" />
                Submit Feedback
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}