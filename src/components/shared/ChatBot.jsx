import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const FAQ = [
  { q: 'how do i start', a: 'Go to the Alphabet page to learn Kannada vowels and consonants first, then move to Phrases!' },
  { q: 'how do i learn the alphabet', a: 'Visit the Alphabet page — tap any letter card to see its example word and meaning. You can mark letters as Learned or Mastered.' },
  { q: 'what is the quiz', a: 'The Quiz is a market scenario challenge where you practice real Kannada conversations. Try to score 70% or above to pass!' },
  { q: 'what are phrases', a: 'The Phrases page has common everyday Kannada phrases with phonetic guides and cultural context.' },
  { q: 'what is reading', a: 'The Reading page has transliteration exercises and a Signboards quiz where you identify Kannada text from real Bengaluru signs.' },
  { q: 'how do i track progress', a: 'Your progress is shown in the top navigation bar — it tracks how many letters you have Learned and Mastered.' },
  { q: 'what is kannada', a: 'Kannada (ಕನ್ನಡ) is one of the world\'s oldest living languages, spoken primarily in Karnataka, India. It has over 60 million speakers.' },
  { q: 'how many letters does kannada have', a: 'Kannada has 49 letters — 13 vowels (ಸ್ವರಗಳು) and 36 consonants (ವ್ಯಂಜನಗಳು).' },
  { q: 'what is word wander', a: 'Word Wander is an interactive app to learn Kannada through alphabet lessons, common phrases, reading exercises, and quizzes.' },
  { q: 'how do i give feedback', a: 'Click on the Feedback link in the navigation bar and fill out a short form. We appreciate your input!' },
];

function findAnswer(input) {
  const lower = input.toLowerCase().replace(/[^a-z0-9 ]/g, '');
  for (const item of FAQ) {
    if (lower.includes(item.q)) return item.a;
  }
  // keyword fallbacks
  if (lower.includes('alphabet') || lower.includes('letter')) return FAQ[1].a;
  if (lower.includes('quiz') || lower.includes('test')) return FAQ[2].a;
  if (lower.includes('phrase') || lower.includes('speak')) return FAQ[3].a;
  if (lower.includes('read') || lower.includes('sign')) return FAQ[4].a;
  if (lower.includes('progress') || lower.includes('track')) return FAQ[5].a;
  if (lower.includes('kannada')) return FAQ[6].a;
  if (lower.includes('letter') || lower.includes('how many')) return FAQ[7].a;
  if (lower.includes('feedback') || lower.includes('review')) return FAQ[8].a;
  return "I'm not sure about that! Try asking about the Alphabet, Phrases, Quiz, Reading, or how to get started. 😊";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! 👋 I\'m your Word Wander Q&A bot. Ask me anything about the app or Kannada learning!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    // Try local FAQ first
    const localAnswer = findAnswer(text);
    const isGeneric = localAnswer.startsWith("I'm not sure");

    if (!isGeneric) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'bot', text: localAnswer }]);
        setLoading(false);
      }, 400);
    } else {
      // Fall back to LLM for unknown questions
      try {
        const res = await base44.integrations.Core.InvokeLLM({
          prompt: `You are a helpful Q&A assistant for "Word Wander", a Kannada language learning app. The app has: an Alphabet page (vowels & consonants), a Phrases page (common Kannada phrases), a Reading page (transliteration exercises + Bengaluru signboard quiz), a Quiz page (market scenario quiz), and a Feedback page. Answer this user question concisely in 1-2 sentences: "${text}"`,
        });
        setMessages(prev => [...prev, { role: 'bot', text: res }]);
      } catch {
        setMessages(prev => [...prev, { role: 'bot', text: localAnswer }]);
      }
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110"
        style={{ background: 'linear-gradient(135deg, #c8942a, #8a5c1a)' }}
        aria-label="Open chatbot"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X className="w-6 h-6 text-white" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare className="w-6 h-6 text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl border border-border/40 shadow-2xl shadow-black/50 overflow-hidden flex flex-col"
            style={{ maxHeight: '480px', background: 'hsl(240 6% 7%)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30" style={{ background: 'linear-gradient(135deg, #3d2b0e, #2a1c08)' }}>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-poppins text-sm font-semibold text-foreground">Word Wander Bot</p>
                <p className="font-inter text-xs text-primary/60">Ask me anything!</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl font-inter text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'text-primary-foreground rounded-br-sm'
                        : 'text-foreground border border-border/30 rounded-bl-sm'
                    }`}
                    style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #8a5c1a, #c8942a)' } : { background: 'hsl(240 6% 10%)' }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-xl border border-border/30 font-inter text-sm" style={{ background: 'hsl(240 6% 10%)' }}>
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-border/30 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !loading && send()}
                placeholder="Ask a question..."
                disabled={loading}
                className="flex-1 bg-secondary/40 border border-border/30 rounded-xl px-3 py-2 font-inter text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #8a5c1a, #c8942a)' }}
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}