import React, { useState, useCallback } from 'react';
import { Volume2, Loader2 } from 'lucide-react';

export default function AudioButton({ text, phonetic, size = 'sm', className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = useCallback(() => {
    if (isPlaying || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech first
    window.speechSynthesis.cancel();

    setIsPlaying(true);

    const speak = (speakText, lang) => {
      const utterance = new SpeechSynthesisUtterance(speakText);
      utterance.lang = lang;
      utterance.rate = 0.75;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    };

    // Check if a Kannada voice is available
    const voices = window.speechSynthesis.getVoices();
    const kannadaVoice = voices.find(v => v.lang === 'kn-IN' || v.lang.startsWith('kn'));

    if (kannadaVoice) {
      // Native Kannada voice available — use it
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = kannadaVoice;
      utterance.lang = 'kn-IN';
      utterance.rate = 0.75;
      utterance.volume = 1;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else if (phonetic) {
      // No Kannada voice — speak the English phonetic instead
      speak(phonetic, 'en-IN');
    } else {
      // Last resort: try speaking the Kannada text anyway
      speak(text, 'kn-IN');
    }
  }, [text, phonetic, isPlaying]);

  const sizeClasses = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' };
  const iconSizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };

  return (
    <button
      onClick={handleSpeak}
      disabled={isPlaying}
      title={phonetic ? `Hear: ${phonetic}` : 'Play pronunciation'}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-300 ${
        isPlaying
          ? 'bg-accent/20 text-accent animate-pulse'
          : 'bg-primary/10 text-primary hover:bg-primary/20 hover:scale-110'
      } ${className}`}
    >
      {isPlaying ? (
        <Loader2 className={`${iconSizes[size]} animate-spin`} />
      ) : (
        <Volume2 className={iconSizes[size]} />
      )}
    </button>
  );
}