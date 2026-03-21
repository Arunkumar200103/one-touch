import { useState, useEffect, useCallback, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VoiceButtonProps {
  onTranscript: (text: string) => void;
  language?: string;
  className?: string;
}

export function VoiceButton({ onTranscript, language = 'en-US', className }: VoiceButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        recognitionRef.current = rec;
      }
    }
  }, []);

  const toggleListen = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isListening) {
      rec.stop();
      setIsListening(false);
    } else {
      rec.lang = language === 'Tamil' ? 'ta-IN' : 'en-US';
      
      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
      };

      rec.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          console.error("Speech recognition error", event.error);
        }
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      try {
        rec.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  }, [isListening, language, onTranscript]);

  if (!recognitionRef.current && typeof window !== 'undefined') return null;

  return (
    <button
      type="button"
      onClick={toggleListen}
      className={cn(
        "p-2 rounded-full transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2",
        isListening ? "bg-red-100 text-red-600 animate-pulse" : "bg-gray-100 text-gray-600 hover:bg-gray-200",
        className
      )}
      title="Voice Input"
    >
      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </button>
  );
}
