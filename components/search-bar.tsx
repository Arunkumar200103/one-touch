"use client";

import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query);
    }
  };

  const startVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice search not supported in your browser");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setQuery(transcript);
      const category = transcript.split(" ")[0];
      router.push(`/category/${encodeURIComponent(category)}`);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert("Error in voice recognition");
    };

    recognition.start();
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto px-4 py-8">
      <div
        className={`flex items-center gap-2 bg-white rounded-2xl px-3 py-2 transition-all duration-200 ${
          isFocused
            ? "shadow-[0_0_0_2px_#3b82f6] shadow-blue-100"
            : "shadow-[0_2px_16px_0_rgba(0,0,0,0.08)] hover:shadow-[0_4px_24px_0_rgba(0,0,0,0.12)]"
        }`}
      >
        {/* Search Icon */}
        <svg
          className={`w-5 h-5 shrink-0 transition-colors ${isFocused ? "text-blue-500" : "text-gray-400"}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={t("searchPlaceholder")}
          className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none py-1.5 min-w-0"
        />

        {/* Clear button */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="shrink-0 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200 shrink-0" />

        {/* Voice button */}
        <button
          type="button"
          onClick={startVoiceSearch}
          title={t("voiceSearch")}
          className={`shrink-0 p-2 rounded-xl transition-all ${
            isListening
              ? "bg-red-50 text-red-500 animate-pulse"
              : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
          }`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3z" />
            <path d="M17 11a1 1 0 10-2 0 3 3 0 01-6 0 1 1 0 10-2 0 5 5 0 0010 0z" />
            <path d="M12 18v3M9 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </button>

        {/* Search button */}
        <button
          type="submit"
          className="shrink-0 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
        >
          Search
        </button>
      </div>

      {/* Listening indicator */}
      {isListening && (
        <p className="text-center text-xs text-red-500 font-medium mt-3 flex items-center justify-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
          Listening…
        </p>
      )}
    </form>
  );
}