import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const PAGES = [
  { label: 'Alphabet', path: '/alphabet', keywords: ['alphabet', 'letter', 'vowel', 'consonant', 'script'] },
  { label: 'Phrases', path: '/phrases', keywords: ['phrase', 'greet', 'speak', 'common', 'expression', 'conversation'] },
  { label: 'Reading', path: '/reading', keywords: ['reading', 'read', 'transliteration', 'signboard', 'sign'] },
  { label: 'Quiz', path: '/quiz', keywords: ['quiz', 'test', 'market', 'practice', 'challenge', 'assessment'] },
  { label: 'Feedback', path: '/feedback', keywords: ['feedback', 'review', 'rate', 'suggestion', 'improve'] },
  { label: 'Home', path: '/', keywords: ['home', 'start', 'main', 'landing'] },
];

const APP_CONTEXT = `You are the helpful assistant for "Word Wander" — an interactive Kannada language learning web app. Here is everything about the app:

PAGES & FEATURES:
1. Home (/) — Landing page with an overview of all features and a getting-started guide.
2. Alphabet (/alphabet) — Learn all 49 Kannada letters: 13 vowels (ಸ್ವರಗಳು) and 36 consonants (ವ್ಯಂಜನಗಳು). Tap any letter card to see its example word and meaning. Mark letters as "Learned" or "Mastered" to track progress.
3. Phrases (/phrases) — Common everyday Kannada phrases with Kannada script, phonetic pronunciation, English translation, and cultural context. Great for beginners wanting to speak right away.
4. Reading (/reading) — Two modes: (a) Transliteration exercises at Beginner / Intermediate / Advanced levels — read Kannada text and type the phonetic pronunciation; (b) Signboards Quiz — identify place names and text from real Bengaluru street signs.
5. Quiz (/quiz) — A market scenario quiz. You are placed in a Bengaluru market and must answer Kannada multiple-choice questions. Score 70%+ to pass. Tests practical conversation skills.
6. Feedback (/feedback) — A short feedback form to rate features and suggest improvements.

NAVIGATION:
- The navbar at the top shows links to all pages.
- Progress bar in the navbar shows how many letters the user has learned/mastered out of 49.

TIPS FOR USERS:
- Start with the Alphabet page to learn the script.
- Then try Phrases to pick up common greetings.
- Use the Reading page to practice recognising Kannada in the wild.
- Take the Quiz when you feel confident.
- Progress is saved locally in the browser.

Kannada (ಕನ್ನಡ) is one of India's oldest languages, spoken by 60M+ people, primarily in Karnataka. It has a rich literary history going back 2,500 years.

INSTRUCTIONS:
- Answer helpfully and concisely (1-3 sentences).
- If the user wants to navigate somewhere, include the page name clearly so the app can show a navigation button.
- Be warm and encouraging.
- If you mention a page, use its exact name: Home, Alphabet, Phrases, Reading, Quiz, or Feedback.`;

function detectNavIntent(text, llmResponse) {
  const combined = (text + ' ' + llmResponse).toLowerCase();
  for (const page of PAGES) {
    if (page.keywords.some(k => combined.includes(k))) {
      // Only suggest navigation if the message seems like a "go to" request
      const navWords = ['go', 'open', 'take me', 'navigate', 'visit', 'show me', 'direct', 'head to', 'start', 'try', 'let me see'];
      const isNav = navWords.some(w => text.toLowerCase().includes(w));
      if (isNav) return page;
    }
  }
  return null;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hi! 👋 I'm your Word Wander assistant. Ask me anything about Kannada or the app — I can also take you to any page!", nav: null }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { role: 'user', text, nav: null }]);
    setInput('');
    setLoading(true);

    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `${APP_CONTEXT}\n\nUser message: "${text}"\n\nRespond helpfully. If the user wants to navigate to a page, mention the page name.`,
      });

      const navPage = detectNavIntent(text, res);
      setMessages(prev => [...prev, { role: 'bot', text: res, nav: navPage }]);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I had trouble responding. Please try again!", nav: null }]);
    }
    setLoading(false);
  };

  const handleNav = (path) => {
    navigate(path);
    setOpen(false);
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
            style={{ maxHeight: '500px', background: 'hsl(240 6% 7%)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30" style={{ background: 'linear-gradient(135deg, #3d2b0e, #2a1c08)' }}>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-poppins text-sm font-semibold text-foreground">Word Wander Bot</p>
                <p className="font-inter text-xs text-primary/60">Your Kannada learning assistant</p>
              </div>
            </div>

            {/* Quick Nav Chips */}
            <div className="flex gap-2 px-3 pt-3 pb-1 overflow-x-auto scrollbar-none flex-nowrap">
              {PAGES.filter(p => p.path !== '/').map(p => (
                <button
                  key={p.path}
                  onClick={() => handleNav(p.path)}
                  className="shrink-0 text-xs font-inter px-3 py-1 rounded-full border border-primary/20 text-primary/70 hover:bg-primary/10 hover:text-primary transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-xl font-inter text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'text-primary-foreground rounded-br-sm'
                        : 'text-foreground border border-border/30 rounded-bl-sm'
                    }`}
                    style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #8a5c1a, #c8942a)' } : { background: 'hsl(240 6% 10%)' }}
                  >
                    {msg.text}
                  </div>
                  {/* Navigation button if detected */}
                  {msg.nav && (
                    <button
                      onClick={() => handleNav(msg.nav.path)}
                      className="mt-2 flex items-center gap-1.5 text-xs font-inter font-semibold px-3 py-1.5 rounded-lg border border-primary/40 text-primary hover:bg-primary/10 transition-all"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Take me to {msg.nav.label}
                    </button>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-xl border border-border/30 font-inter text-sm" style={{ background: 'hsl(240 6% 10%)' }}>
                    <span className="inline-flex gap-1 items-center">
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
                placeholder="Ask anything or say 'go to Phrases'..."
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