"use client";

import Link from "next/link";

interface BackToHomeProps {
  className?: string;
  showLabel?: boolean;
}

export function BackToHome({ className = "", showLabel = true }: BackToHomeProps) {
  return (
    <Link href="/">
      <button
        className={`
          group flex items-center gap-2 px-4 py-2 rounded-lg
          text-white font-medium transition-all duration-300
          hover:bg-white/20 active:scale-95
          ${className}
        `}
      >
        <svg
          className="w-5 h-5 transition-transform group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        {showLabel && <span>Back to Home</span>}
      </button>
    </Link>
  );
}
