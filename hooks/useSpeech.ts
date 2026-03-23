"use client";

import { useState, useCallback, useRef } from 'react';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, lang = 'en') => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    // Strip JSX / emoji from plain string
    const cleanText = typeof text === 'string'
      ? text.replace(/[\u{1F300}-\u{1FAFF}]/gu, '').trim()
      : '';

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-US';
    utterance.rate = 0.95;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    // Pick a natural-sounding voice when available
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => {
      const name = v.name.toLowerCase();
      if (utterance.lang === 'ta-IN' && v.lang.includes('ta')) {
        // Look for explicitly female Tamil voices or known female Tamil voice names (Valli, Pallavi, Shruti, etc)
        return name.includes('female') || name.includes('valli') || name.includes('pallavi') || name.includes('shruti');
      }
      if (v.lang.startsWith('en')) {
        return name.includes('female') || name.includes('zira') || name.includes('samantha');
      }
      return false;
    }) || voices.find(v => v.lang === utterance.lang) || voices.find(v => v.lang.includes('ta') && utterance.lang === 'ta-IN');

    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;

    // Chrome bug: voices may load asynchronously
    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.speak(utterance);
      };
    } else {
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return { speak, stop, isSpeaking };
}
