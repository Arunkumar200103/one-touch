import { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { VoiceButton } from './VoiceButton';

interface ChatInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
  language?: string;
  onVoiceInput?: (text: string) => void;
}

export function ChatInput({ onSend, placeholder = "Type a message...", disabled, language, onVoiceInput }: ChatInputProps) {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    }
  };

  const handleVoice = (transcript: string) => {
    setText(transcript);
    if (onVoiceInput) {
      onVoiceInput(transcript);
    } else {
      onSend(transcript);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 sm:p-3 bg-white border-t border-gray-100">
      <VoiceButton onTranscript={handleVoice} language={language} className="shrink-0 scale-90 sm:scale-100" />
      <input
        ref={inputRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 sm:text-sm text-[13px] focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:opacity-50 transition-shadow"
      />
      <button
        type="submit"
        disabled={disabled || !text.trim()}
        className="p-2 sm:p-2.5 rounded-full bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        <SendHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </form>
  );
}
