"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  accentColor?: string;
}

export function FAQAccordion({
  items,
  accentColor = "#0066CC",
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:border-current hover:shadow-md"
          style={{ borderColor: openIndex === index ? accentColor : "#E5E7EB" }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full px-6 py-4 flex items-center justify-between font-bold text-lg text-left transition-colors"
            style={{
              backgroundColor:
                openIndex === index ? "#F0F9FF" : "transparent",
              color: openIndex === index ? accentColor : "#1F2937",
            }}
          >
            <span>{item.question}</span>
            <svg
              className="w-6 h-6 transition-transform duration-300"
              style={{
                transform:
                  openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                color: accentColor,
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>

          {openIndex === index && (
            <div className="px-6 py-4 bg-white border-t border-gray-200 text-gray-700 animate-fade-in-up">
              <p className="leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
