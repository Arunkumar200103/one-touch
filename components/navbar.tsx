"use client";

import { useLanguage } from "@/lib/language-context";
import { Language } from "@/lib/translations";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "@/lib/location-context"



const primaryLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Services", href: "/service-inquiry" },
  { label: "Reviews", href: "/reviews" },
];

const moreLinks = [
  {
    label: "About", href: "/about", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    label: "Safety", href: "/safety", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    label: "FAQs", href: "/faqs", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    label: "Contact", href: "/contact", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
];

const locations = ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"];

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [listening, setListening] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLInputElement>(null);
    const { location, setLocation } = useLocation()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node))
        setShowLocationDropdown(false);
      if (moreRef.current && !moreRef.current.contains(e.target as Node))
        setShowMoreDropdown(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-focus mobile search input when opened
  useEffect(() => {
    if (mobileSearchOpen) {
      setTimeout(() => mobileSearchRef.current?.focus(), 100);
    }
  }, [mobileSearchOpen]);

  function handleMic() {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === "ta" ? "ta-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e: any) => setSearch(e.results[0][0].transcript);
    recognition.start();
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">

      {/* ── TOP BAR ── */}
      <div className="max-w-7xl mx-auto px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-2 md:gap-4">

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-1.5 md:gap-2 group">
          <div className="bg-blue-600 group-hover:bg-blue-700 transition-colors text-white font-black text-sm md:text-base px-2 md:px-3 py-1 md:py-1.5 rounded-xl leading-none">
            {t("title").slice(0, 2).toUpperCase()}
          </div>
          {/* Hide full logo text on very small screens, show on sm+ */}
          <div className="hidden sm:block">
            <p className="font-black text-gray-900 text-sm leading-none tracking-tight">{t("title")}</p>
            <p className="text-[9px] text-gray-400 font-semibold tracking-widest uppercase">{t("tagline")}</p>
          </div>
        </Link>

        {/* ── Desktop Search Bar (hidden on mobile) ── */}
        <div className="hidden md:flex flex-1 items-center border-2 border-blue-500 rounded-xl bg-white max-w-2xl relative overflow-visible">

          {/* Location picker */}
          <div className="relative shrink-0" ref={locationRef}>
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-bold text-gray-700 whitespace-nowrap border-r border-gray-200 hover:bg-gray-50 rounded-l-[10px] transition-colors"
            >
              <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{location}</span>
              <svg className={`w-3 h-3 text-gray-400 transition-transform ${showLocationDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showLocationDropdown && (
              <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 w-48 overflow-hidden">
                <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Select City</p>
                {locations.map(loc => (
                  <button
                    key={loc}
                    onClick={() => { setLocation(loc); setShowLocationDropdown(false); }}
                    className={`flex items-center justify-between w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors ${loc === location ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                  >
                    {loc}
                    {loc === location && (
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Text input */}
          <input
            type="text"
            placeholder="Search for services, businesses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === "Enter" && search.trim() && console.log("search:", search)}
            className="flex-1 px-3 py-2.5 text-sm outline-none text-gray-800 placeholder-gray-400 min-w-0"
          />

          {/* Mic */}
          <button
            onClick={handleMic}
            title={listening ? "Listening..." : "Search by voice"}
            className={`px-2.5 py-2.5 shrink-0 transition-all ${listening ? "text-blue-600 animate-pulse" : "text-gray-400 hover:text-blue-500"}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>

          {/* Search button */}
          <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 font-bold text-sm transition-colors flex items-center gap-2 shrink-0 rounded-r-[10px]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden lg:inline">Search</span>
          </button>
        </div>

        {/* ── Mobile: Search icon button (opens expandable bar below) ── */}
        <button
          onClick={() => { setMobileSearchOpen(!mobileSearchOpen); setMobileMenuOpen(false); }}
          className="md:hidden ml-auto p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          aria-label="Search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* ── Desktop Nav Links ── */}
        <div className="hidden lg:flex items-center gap-0.5 shrink-0">
          {primaryLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-semibold text-gray-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-50 transition-all whitespace-nowrap"
            >
              {label}
            </Link>
          ))}

          {/* More dropdown */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setShowMoreDropdown(!showMoreDropdown)}
              className={`flex items-center gap-1 text-sm font-semibold px-3 py-2 rounded-lg transition-all whitespace-nowrap ${showMoreDropdown ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"}`}
            >
              More
              <svg className={`w-3.5 h-3.5 transition-transform ${showMoreDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showMoreDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 w-48 overflow-hidden">
                <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">More Pages</p>
                {moreLinks.map(({ label, href, icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setShowMoreDropdown(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <span className="text-gray-400">{icon}</span>
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Language Toggle ── */}
        <div className="hidden sm:flex gap-0.5 bg-gray-100 rounded-lg p-0.5 shrink-0">
          {(["en", "ta"] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2 md:px-2.5 py-1 md:py-1.5 rounded-md text-xs font-bold transition-all ${language === lang ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              {lang === "en" ? "EN" : "TN"}
            </button>
          ))}
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setMobileSearchOpen(false); }}
          className="lg:hidden p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all shrink-0"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* ── Mobile Expandable Search Bar ── */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-3 py-3">
          {/* Location + input row */}
          <div className="flex items-center border-2 border-blue-500 rounded-xl overflow-visible bg-white mb-2">

            {/* Location picker (compact) */}
            <div className="relative shrink-0" ref={locationRef}>
              <button
                onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                className="flex items-center gap-1 px-2.5 py-2.5 text-xs font-bold text-gray-700 whitespace-nowrap border-r border-gray-200 hover:bg-gray-50 rounded-l-[10px] transition-colors"
              >
                <svg className="w-3 h-3 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{location}</span>
                <svg className={`w-2.5 h-2.5 text-gray-400 transition-transform ${showLocationDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showLocationDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 w-44 overflow-hidden">
                  <p className="px-3 pt-2.5 pb-1 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Select City</p>
                  {locations.map(loc => (
                    <button
                      key={loc}
                      onClick={() => { setLocation(loc); setShowLocationDropdown(false); }}
                      className={`flex items-center justify-between w-full text-left px-3 py-2 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors ${loc === location ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
                    >
                      {loc}
                      {loc === location && (
                        <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Text input */}
            <input
              ref={mobileSearchRef}
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === "Enter" && search.trim() && console.log("search:", search)}
              className="flex-1 px-2.5 py-2.5 text-sm outline-none text-gray-800 placeholder-gray-400 min-w-0"
            />

            {/* Mic */}
            <button
              onClick={handleMic}
              className={`px-2 py-2.5 shrink-0 transition-all ${listening ? "text-blue-600 animate-pulse" : "text-gray-400 hover:text-blue-500"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>

            {/* Search button */}
            <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 py-2.5 font-bold text-sm transition-colors shrink-0 rounded-r-[10px]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-3 md:px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold px-3 mb-2">Navigation</p>
          <div className="flex flex-col gap-0.5">
            {[...primaryLinks, ...moreLinks].map(({ label, href, icon }: any) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2.5 rounded-lg transition-all"
              >
                {icon && <span className="text-gray-400">{icon}</span>}
                {label}
              </Link>
            ))}
          </div>

          {/* Language + close row */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-400 font-medium">Language:</p>
              <div className="flex gap-1">
                {(["en", "ta"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${language === lang ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    {lang === "en" ? "English" : "தமிழ்"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}