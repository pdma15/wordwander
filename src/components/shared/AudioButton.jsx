import React, { useState, useCallback } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function AudioButton({ text, size = 'sm', className = '' }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = useCallback(async () => {
    if (isPlaying) return;
    
    // Use browser TTS as primary
    if ('speechSynthesis' in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'kn-IN';
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [text, isPlaying]);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <button
      onClick={handleSpeak}
      disabled={isPlaying}
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