"use client";

import { cn } from "@/lib/utils";
import { Volume2 } from "lucide-react";

interface ChatMessageProps {
  message: string | React.ReactNode;
  isBot: boolean;
  onSpeak?: (text: string) => void;
}

export function ChatMessage({ message, isBot, onSpeak }: ChatMessageProps) {
  const textContent = typeof message === 'string' ? message : null;

  return (
    <div
      className={cn(
        "flex w-full mb-3 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards] group",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className={cn("flex items-end gap-1.5 max-w-[85%]", isBot ? "flex-row" : "flex-row-reverse")}>
        <div
          className={cn(
            "rounded-[20px] px-3 py-2 sm:px-4 sm:py-2.5 sm:text-sm text-[13px] shadow-sm leading-relaxed",
            isBot
              ? "bg-white border border-gray-200/60 text-gray-800 rounded-bl-none shadow-sm"
              : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-br-none shadow-blue-200/50 shadow-md"
          )}
        >
          {message}
        </div>

        {/* Re-read speaker button — only on bot text messages */}
        {isBot && textContent && onSpeak && (
          <button
            type="button"
            onClick={() => onSpeak(textContent)}
            title="Read aloud"
            className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity p-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-400 hover:text-indigo-600 shrink-0 mb-0.5"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
