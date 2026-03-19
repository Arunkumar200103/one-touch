"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language-context";

export interface Suggestion {
  type: "category" | "service";
  label: string;
  id: string;
}

interface SearchAutocompleteProps {
  suggestions: Suggestion[];
  isOpen: boolean;
  selectedIndex: number;
  onSelect: (value: string) => void;
  searchQuery: string;
  isMobile?: boolean;
}

export function SearchAutocomplete({
  suggestions,
  isOpen,
  selectedIndex,
  onSelect,
  searchQuery,
  isMobile = false,
}: SearchAutocompleteProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Scroll to the selected item if it goes out of view
    if (selectedIndex >= 0 && dropdownRef.current) {
      const activeItem = dropdownRef.current.children[selectedIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  if (!isOpen || suggestions.length === 0) return null;

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    // Escape special regex characters in query
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    const parts = text.split(regex);
    
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="font-bold text-blue-600 bg-blue-50 px-0.5 rounded">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div
      ref={dropdownRef}
      className={`absolute left-0 right-0 mt-2 bg-white border border-gray-100 shadow-2xl z-50 overflow-y-auto ${
        isMobile ? "top-full max-h-60 rounded-b-xl" : "top-full max-h-80 rounded-xl"
      }`}
    >
      {suggestions.map((item, index) => (
        <div
          key={item.id}
          onClick={() => onSelect(item.label)}
          onMouseEnter={() => {
             // Optional: update selected index on hover, but we manage it in parent via keyboard.
          }}
          className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${
            index === selectedIndex ? "bg-blue-50" : "hover:bg-gray-50"
          }`}
        >
          <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-50">
            {item.type === "category" ? (
              <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-gray-900 truncate">
              {highlightMatch(item.label, searchQuery)}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              {item.type === "category" ? t("Category") || "Category" : t("Service") || "Service"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
