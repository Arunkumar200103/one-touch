"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

interface BackToHomeProps {
  className?: string;
  showLabel?: boolean;
}

export function BackToHome({ className = "", showLabel = true }: BackToHomeProps) {
  const { t } = useLanguage();
  return (
    <Link href="/">
      <button
        className={`
          group flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg
          text-white text-sm sm:text-base font-medium transition-all duration-300
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
        {showLabel && <span>{t("back")}</span>}
      </button>
    </Link>
  );
}
