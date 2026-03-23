"use client";

import { useMemo, useState, useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { useLanguage } from "@/lib/language-context";
import { getCategoryColor } from "@/lib/category-colors";
import businessesEn from "@/lib/businesses.json";
import businessesTa from "@/lib/businesses-ta.json";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const WORKING_HOURS = [
  { day: "Mon – Fri", time: "9:00 AM – 6:00 PM", open: true },
  { day: "Saturday", time: "9:00 AM – 4:00 PM", open: true },
  { day: "Sunday", time: "Closed", open: false },
];

const WHY_US = [
  { icon: "✓", text: "Verified & Trusted" },
  { icon: "⚡", text: "Fast Response" },
  { icon: "💰", text: "Best Price Guarantee" },
  { icon: "🏆", text: "Quality Assured" },
];

export default function BusinessProfilePage({ params }: PageProps) {
  const { t, language } = useLanguage();
  const { id } = use(params);
  const businessId = parseInt(id);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"about" | "services" | "contact">("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 240);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const business = useMemo(() => {
    const businesses = language === "ta" ? businessesTa : businessesEn;
    return (businesses as any[]).find((biz) => biz.id === businessId);
  }, [businessId, language]);

  if (!business) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Business not found</h1>
          <Link href="/" className="text-blue-600 hover:underline font-medium">Return to home</Link>
        </div>
      </main>
    );
  }

  const colors = getCategoryColor(business.category);
  const initials = business.ownerName
    .split(" ").slice(0, 2)
    .map((n: string) => n[0]).join("").toUpperCase();
  const memberYear = new Date(business.startDate).getFullYear();
  const hasSocial = business.socialLinks && Object.keys(business.socialLinks).length > 0;
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const isOpenToday = today === "Sunday" ? false : true;

  return (
    <main className="min-h-screen bg-gray-50 pb-24 sm:pb-8">
      <Navbar />

      {/* ── Sticky Contact Bar ── */}
      <div className={`fixed top-[56px] md:top-[64px] left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0 pointer-events-none"}`}>
        <div className="bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm px-4 py-2">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="font-bold text-gray-900 text-sm truncate">{business.businessName}</p>
              <p className="text-[10px] text-gray-400 truncate">{business.location}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {business.socialLinks?.whatsapp && (
                <a href={`https://wa.me/${business.socialLinks.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-white bg-green-500">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /></svg>
                  WA
                </a>
              )}
              <a href={`tel:${business.contactNumber}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                style={{ background: colors.primary }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.346.766.834 1.554 1.548 2.267 1.31 1.31 2.834 2.076 3.924 2.267l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 01-1-1H3a1 1 0 01-1-1V3z" /></svg>
                {t("callNow")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-[55vh] sm:min-h-[70vh] flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          {business.photos?.[0] && (
            <Image src={business.photos[0]} alt={business.businessName} fill className="object-cover opacity-25" priority />
          )}
          <div className="absolute inset-0 opacity-35" style={{ background: `linear-gradient(135deg, ${colors.primary}99, transparent 60%)` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </div>

        {/* Back */}
        <Link href={`/category/${encodeURIComponent(business.category)}`}
          className="absolute top-4 left-4 flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors z-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t("back")}
        </Link>

        {/* Hero Content */}
        <div className="relative z-10 px-4 sm:px-10 pb-8 pt-16 max-w-5xl mx-auto w-full">
          {/* Open/Closed Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${isOpenToday ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isOpenToday ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
              {isOpenToday ? "Open Today" : "Closed Today"}
            </span>
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ background: `${colors.primary}33`, color: colors.light, border: `1px solid ${colors.primary}66` }}>
              {t(business.category)}
            </span>
          </div>

          <h1 className="text-2xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-2">
            {business.businessName}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-6 text-white/65 text-xs sm:text-sm">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {business.location}
            </span>
            {business.rating && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-white">{business.rating}</span>
                <span>({business.reviews} reviews)</span>
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-2.5">
            <a href={`tel:${business.contactNumber}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm shadow-xl transition-all hover:scale-105 active:scale-95"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}cc)` }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.346.766.834 1.554 1.548 2.267 1.31 1.31 2.834 2.076 3.924 2.267l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 01-1-1H3a1 1 0 01-1-1V3z" /></svg>
              {t("callNow")}
            </a>
            {business.socialLinks?.whatsapp && (
              <a href={`https://wa.me/${business.socialLinks.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm bg-green-500 hover:bg-green-600 shadow-xl transition-all hover:scale-105 active:scale-95">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /></svg>
                WhatsApp
              </a>
            )}
            {business.socialLinks?.website && (
              <a href={business.socialLinks.website} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-sm bg-white/15 hover:bg-white/25 border border-white/30 backdrop-blur-sm shadow-xl transition-all hover:scale-105 active:scale-95">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Website
              </a>
            )}
          </div>
        </div>

        {/* Scroll caret */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/30 animate-bounce hidden sm:block">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── QUICK ACTIONS (mobile) ── */}
      <section className="bg-white border-y border-gray-100 px-4 py-3">
        <div className="max-w-5xl mx-auto grid grid-cols-4 gap-2">
          {[
            {
              label: "Call", color: "text-blue-600", bg: "bg-blue-50",
              href: `tel:${business.contactNumber}`,
              icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.346.766.834 1.554 1.548 2.267 1.31 1.31 2.834 2.076 3.924 2.267l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 01-1-1H3a1 1 0 01-1-1V3z" /></svg>
            },
            {
              label: "WhatsApp", color: "text-green-600", bg: "bg-green-50",
              href: business.socialLinks?.whatsapp ? `https://wa.me/${business.socialLinks.whatsapp.replace(/\D/g, "")}` : `tel:${business.contactNumber}`,
              icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /></svg>
            },
            {
              label: "Share", color: "text-purple-600", bg: "bg-purple-50",
              href: "#",
              onClick: () => { if (typeof navigator !== "undefined" && navigator.share) navigator.share({ title: business.businessName, url: window.location.href }); },
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
            },
            {
              label: "Locate", color: "text-red-600", bg: "bg-red-50",
              href: `https://maps.google.com/?q=${encodeURIComponent(business.location)}`,
              icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
            },
          ].map(({ label, color, bg, href, icon, onClick }: any) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer" onClick={onClick}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all active:scale-95">
              <div className={`w-11 h-11 ${bg} ${color} rounded-full flex items-center justify-center`}>{icon}</div>
              <span className="text-[10px] font-semibold text-gray-600">{label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── TABS (Mobile Nav) ── */}
      <div className="bg-white border-b border-gray-100 sticky top-[56px] md:top-[64px] z-30">
        <div className="max-w-5xl mx-auto flex">
          {(["about", "services", "contact"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs sm:text-sm font-bold capitalize transition-all border-b-2 ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
              style={activeTab === tab ? { borderColor: colors.primary, color: colors.primary } : {}}>
              {tab === "about" ? "About" : tab === "services" ? "Services" : "Contact"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">

        {/* ── STATS STRIP ── */}
        <div className="grid grid-cols-4 gap-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          {[
            { label: "Rating", value: `${business.rating}★` },
            { label: "Reviews", value: String(business.reviews) },
            { label: "Experience", value: `${business.yearExperience}yr` },
            { label: "Since", value: String(memberYear) },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="font-black text-base sm:text-xl" style={{ color: colors.primary }}>{value}</p>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{label}</p>
            </div>
          ))}
        </div>

        {/* ── ABOUT TAB ── */}
        {(activeTab === "about") && (
          <>
            {/* Owner card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shrink-0 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}99)` }}>
                  {initials}
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-widest">{t("ownerName")}</p>
                  <h2 className="text-base font-black text-gray-900">{business.ownerName}</h2>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: colors.light, color: colors.primary }}>
                    {business.yearExperience}+ yrs experience
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{business.description}</p>
            </div>

            {/* Why choose us */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-black text-gray-900 mb-3">Why Choose Us?</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {WHY_US.map(({ icon, text }) => (
                  <div key={text}
                    className="flex items-center gap-2.5 p-3 rounded-xl"
                    style={{ background: `${colors.primary}0d`, border: `1px solid ${colors.primary}22` }}>
                    <span className="text-base shrink-0">{icon}</span>
                    <span className="text-xs font-semibold text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-gray-900">Working Hours</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${isOpenToday ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  {isOpenToday ? "Open Now" : "Closed"}
                </span>
              </div>
              <div className="space-y-2.5">
                {WORKING_HOURS.map(({ day, time, open }) => (
                  <div key={day} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-xs font-semibold text-gray-700">{day}</span>
                    <span className={`text-xs font-bold ${open ? "text-gray-800" : "text-red-500"}`}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location / Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(business.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* Map placeholder */}
                <div className="h-36 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: "linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
                  <div className="flex flex-col items-center gap-2 z-10">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xs font-bold text-gray-700">View on Google Maps</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">Address</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{business.location}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400 ml-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>

            {/* Photo Gallery */}
            {business.photos && business.photos.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-black text-gray-900 mb-3">{t("photos") || "Gallery"}</h3>
                <div className="grid grid-cols-3 gap-2">
                  {business.photos.map((src: string, i: number) => (
                    <button key={i} onClick={() => setLightboxSrc(src)}
                      className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity group">
                      <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ── SERVICES TAB ── */}
        {activeTab === "services" && business.services && business.services.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-black text-gray-900 mb-4">{t("services") || "Services"}</h3>
            <div className="space-y-2.5">
              {business.services.map((svc: string, i: number) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl border transition-all"
                  style={{ borderColor: `${colors.primary}29`, background: `${colors.primary}07` }}>
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: colors.light }}>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" style={{ color: colors.primary }}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-gray-700">{svc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── CONTACT TAB ── */}
        {activeTab === "contact" && (
          <>
            {/* Phone cards */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-3">
              <h3 className="text-sm font-black text-gray-900 mb-1">Contact Numbers</h3>
              <a href={`tel:${business.contactNumber}`}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.346.766.834 1.554 1.548 2.267 1.31 1.31 2.834 2.076 3.924 2.267l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 01-1-1H3a1 1 0 01-1-1V3z" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">{t("contactNumber")}</p>
                    <p className="font-bold text-gray-900 text-sm">{business.contactNumber}</p>
                  </div>
                </div>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              {business.altContact && (
                <a href={`tel:${business.altContact}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.346.766.834 1.554 1.548 2.267 1.31 1.31 2.834 2.076 3.924 2.267l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 01-1-1H3a1 1 0 01-1-1V3z" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400">{t("altContactNumber")}</p>
                      <p className="font-bold text-gray-900 text-sm">{business.altContact}</p>
                    </div>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </div>

            {/* Social links */}
            {hasSocial && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <h3 className="text-sm font-black text-gray-900 mb-3">{t("socialLinks") || "Connect"}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {business.socialLinks.facebook && business.socialLinks.facebook.startsWith("http") && (
                    <a href={business.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-blue-100 text-blue-700 rounded-xl font-semibold text-sm hover:bg-blue-200 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 3.99 2.908 7.31 6.75 7.97v-5.625h-2.031V10h2.031V7.797c0-2.016 1.193-3.129 3.022-3.129.875 0 1.79.156 1.79.156v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.219l-.355 2.326h-1.864v5.625C15.09 17.31 18 13.99 18 10z" /></svg>
                      Facebook
                    </a>
                  )}
                  {business.socialLinks.instagram && (
                    <a href={business.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-pink-100 text-pink-700 rounded-xl font-semibold text-sm hover:bg-pink-200 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                      Instagram
                    </a>
                  )}
                  {business.socialLinks.linkedin && (
                    <a href={business.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-sky-100 text-sky-700 rounded-xl font-semibold text-sm hover:bg-sky-200 transition-colors">
                      LinkedIn
                    </a>
                  )}
                  {business.socialLinks.whatsapp && (
                    <a href={`https://wa.me/${business.socialLinks.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-green-100 text-green-700 rounded-xl font-semibold text-sm hover:bg-green-200 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /></svg>
                      WhatsApp
                    </a>
                  )}
                  {business.socialLinks.website && (
                    <a href={business.socialLinks.website} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Website
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Location Card */}
            <a href={`https://maps.google.com/?q=${encodeURIComponent(business.location)}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-400 mb-0.5">Address</p>
                <p className="font-bold text-gray-900 text-sm">{business.location}</p>
                <p className="text-xs text-blue-500 font-medium mt-0.5">Open in Maps →</p>
              </div>
            </a>
          </>
        )}
      </div>

      {/* ── Mobile sticky CTA ── */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-3 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl">
        <div className="flex gap-2">
          {business.socialLinks?.whatsapp && (
            <a href={`https://wa.me/${business.socialLinks.whatsapp.replace(/\D/g, "")}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white bg-green-500 active:scale-95 transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" /></svg>
              Chat
            </a>
          )}
          <a href={`tel:${business.contactNumber}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white active:scale-95 transition-all"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}cc)` }}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.346.766.834 1.554 1.548 2.267 1.31 1.31 2.834 2.076 3.924 2.267l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 01-1-1H3a1 1 0 01-1-1V3z" /></svg>
            {t("callNow")}
          </a>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxSrc && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxSrc(null)}>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white" onClick={() => setLightboxSrc(null)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden">
            <Image src={lightboxSrc} alt="Gallery" fill className="object-contain" />
          </div>
        </div>
      )}
    </main>
  );
}
