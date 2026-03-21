import { useEffect, useState, useRef } from 'react';
import { ServiceInfo } from '@/lib/chatbot-data';
import { cn } from '@/lib/utils';
import { Tag, ArrowRight } from 'lucide-react';

interface SuggestionsGridProps {
  suggestions: ServiceInfo[];
  onSelect: (service: ServiceInfo) => void;
  query: string;
}

export function SuggestionsGrid({ suggestions, onSelect, query }: SuggestionsGridProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (suggestions.length === 0) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onSelect(suggestions[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [suggestions, selectedIndex, onSelect]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [suggestions]);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="bg-yellow-200 text-black font-medium px-0.5 rounded-sm">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 w-full max-h-[250px] overflow-y-auto pr-1" ref={containerRef}>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
      `}</style>
      
      <div className="flex items-center gap-2 mb-1 px-1">
        <div className="h-px bg-gray-200 flex-1"></div>
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Search Results</span>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>
      
      {/* Desktop List View */}
      <div className="hidden sm:flex flex-col gap-1 w-full bg-white border border-gray-100 rounded-xl p-1 shadow-sm custom-scrollbar">
        {suggestions.map((service, index) => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            onMouseEnter={() => setSelectedIndex(index)}
            className={cn(
              "flex flex-col text-left px-3 py-2 rounded-lg transition-colors w-full focus:outline-none focus:ring-1 focus:ring-black",
              selectedIndex === index ? "bg-gray-100" : "hover:bg-gray-50"
            )}
          >
            <div className="flex justify-between items-center w-full">
              <span className="font-semibold text-sm text-gray-900">
                {highlightText(service.name, query)}
              </span>
              {service.offer && (
                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1 whitespace-nowrap ml-2">
                  <Tag className="w-3 h-3" /> {service.offer}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500 mt-0.5">{service.description}</span>
          </button>
        ))}
      </div>

      {/* Mobile Grid View */}
      <div className="sm:hidden grid gap-2 grid-cols-1 mb-2 custom-scrollbar">
        {suggestions.map((service, index) => (
          <button
            key={service.id}
            onClick={() => onSelect(service)}
            className={cn(
              "flex flex-col text-left p-3 rounded-xl border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-black",
              selectedIndex === index ? "bg-black text-white border-black" : "bg-white text-gray-900 shadow-sm"
            )}
          >
            <div className="flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">
                  {highlightText(service.name, query)}
                </span>
                <ArrowRight className={cn("w-4 h-4", selectedIndex === index ? "text-gray-300" : "text-gray-400")} />
              </div>
              <span className={cn("text-xs line-clamp-1", selectedIndex === index ? "text-gray-300" : "text-gray-500")}>
                {service.category}
              </span>
              {service.offer && (
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 rounded-md w-fit mt-1 flex items-center gap-1",
                  selectedIndex === index ? "bg-white/20 text-white" : "bg-green-100 text-green-700"
                )}>
                  <Tag className="w-3 h-3" /> {service.offer}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
