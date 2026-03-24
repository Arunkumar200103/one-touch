"use client";

import { useState } from 'react';
import { BotMessageSquare, X } from 'lucide-react';
import { ChatbotContainer } from './ChatbotContainer';
import { cn } from '@/lib/utils';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 group overflow-hidden",
          isOpen 
            ? "bg-white text-gray-800 border border-gray-200" 
            : "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
        )}
        aria-label="Toggle chatbot"
      >
        <div className="relative z-10 flex items-center justify-center">
          {isOpen ? (
            <X className="w-7 h-7 animate-in spin-in-90 duration-300" />
          ) : (
            <BotMessageSquare className="w-7 h-7" />
          )}
        </div>
        {!isOpen && (
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-50 flex flex-col justify-end pointer-events-none">
          <div className="pointer-events-auto h-full sm:h-auto w-full sm:w-[420px]">
            <ChatbotContainer onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
