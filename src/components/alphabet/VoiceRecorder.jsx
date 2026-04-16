import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Trash2 } from 'lucide-react';

// Stores one recording per letter key in localStorage (as base64)
export default function VoiceRecorder({ letterKey }) {
  const [hasRecording, setHasRecording] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const audioRef = useRef(null);
  const storageKey = `voice_${letterKey}`;

  useEffect(() => {
    setHasRecording(!!localStorage.getItem(storageKey));
  }, [storageKey]);

  const startRecording = async (e) => {
    e.stopPropagation();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunks.current = [];
    mediaRecorder.current = new MediaRecorder(stream);
    mediaRecorder.current.ondataavailable = (ev) => chunks.current.push(ev.data);
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem(storageKey, reader.result);
        setHasRecording(true);
      };
      reader.readAsDataURL(blob);
      stream.getTracks().forEach(t => t.stop());
    };
    mediaRecorder.current.start();
    setIsRecording(true);
  };

  const stopRecording = (e) => {
    e.stopPropagation();
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  const playRecording = (e) => {
    e.stopPropagation();
    const data = localStorage.getItem(storageKey);
    if (!data) return;
    if (audioRef.current) audioRef.current.pause();
    audioRef.current = new Audio(data);
    audioRef.current.onplay = () => setIsPlaying(true);
    audioRef.current.onended = () => setIsPlaying(false);
    audioRef.current.play();
  };

  const deleteRecording = (e) => {
    e.stopPropagation();
    localStorage.removeItem(storageKey);
    setHasRecording(false);
    setIsPlaying(false);
  };

  if (isRecording) {
    return (
      <button
        onClick={stopRecording}
        title="Stop recording"
        className="w-8 h-8 rounded-full flex items-center justify-center bg-red-700/80 text-amber-100 animate-pulse"
      >
        <Square className="w-3 h-3 fill-current" />
      </button>
    );
  }

  if (hasRecording) {
    return (
      <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
        <button
          onClick={playRecording}
          title="Play your recording"
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isPlaying ? 'bg-amber-600/50 text-amber-200 animate-pulse' : 'bg-amber-700/40 text-amber-300 hover:bg-amber-600/50'
          }`}
        >
          <Play className="w-3 h-3 fill-current" />
        </button>
        <button
          onClick={deleteRecording}
          title="Delete recording"
          className="w-6 h-6 rounded-full flex items-center justify-center bg-stone-700/40 text-stone-400 hover:bg-red-900/40 hover:text-red-400 transition-all"
        >
          <Trash2 className="w-2.5 h-2.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={startRecording}
      title="Record your voice for this letter"
      className="w-8 h-8 rounded-full flex items-center justify-center bg-stone-700/50 text-amber-400/70 hover:bg-amber-900/40 hover:text-amber-300 transition-all"
    >
      <Mic className="w-3.5 h-3.5" />
    </button>
  );
}