import React, { useState, useCallback } from 'react';
import { Volume2, Loader2 } from 'lucide-react';

// 'sound' = the text TTS will actually speak (phonetically crafted for accuracy)
// 'phonetic' = display-only transliteration shown to the user
export default function AudioButton({ text, sound, phonetic, size = 'sm', className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = useCallback(() => {
    if (isPlaying || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    setIsPlaying(true);

    const voices = window.speechSynthesis.getVoices();
    const kannadaVoice = voices.find(v => v.lang === 'kn-IN' || v.lang.startsWith('kn'));

    const utterance = new SpeechSynthesisUtterance();
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    if (kannadaVoice) {
      // Native Kannada voice — speak the actual Kannada script
      utterance.text = text;
      utterance.voice = kannadaVoice;
      utterance.lang = 'kn-IN';
    } else {
      // No Kannada voice — use 'sound' (crafted phonetic) or fallback to phonetic
      utterance.text = sound || phonetic || text;
      utterance.lang = 'en-IN';
    }

    window.speechSynthesis.speak(utterance);
  }, [text, sound, phonetic, isPlaying]);

  const sizeClasses = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12' };
  const iconSizes = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };

  return (
    <button
      onClick={handleSpeak}
      disabled={isPlaying}
      title={`Hear: ${phonetic || sound || text}`}
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