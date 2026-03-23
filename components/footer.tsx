"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Language } from "@/lib/translations";

const primaryLinks = (t: any) => [
  { label: t("howItWorks"), href: "/how-it-works" },
  { label: t("services"), href: "/service-inquiry" },
  { label: t("reviews"), href: "/reviews" },
];

const moreLinks = (t: any) => [
  {
    label: t("about"),
    href: "/about",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: t("safety"),
    href: "/safety",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: t("faqs"),
    href: "/faqs",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: t("contact"),
    href: "/contact",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const businessLinks = (t: any) => [
  { label: t("listBiz"), href: "/list-business" },
  { label: t("advertising"), href: "/advertising" },
  { label: t("bizDashboard"), href: "/dashboard" },
  { label: t("partnerships"), href: "/partnerships" },
];

const supportLinks = (t: any) => [
  { label: t("helpCenter"), href: "/help" },
  { label: t("privacyPolicy"), href: "/privacy" },
  { label: t("termsOfUse"), href: "/terms" },
  { label: t("safety"), href: "/safety" },
];

export function Footer() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* ── Main Footer Grid ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-10 md:pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">

          {/* ── Brand Column ── */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo — mirrors Navbar exactly */}
            <Link href="/" className="inline-flex items-center gap-2 group mb-4">
              <div className="bg-blue-600 group-hover:bg-blue-700 transition-colors text-white font-black text-sm md:text-base px-2 md:px-3 py-1 md:py-1.5 rounded-xl leading-none">
                {t("title").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-black text-white text-sm leading-none tracking-tight">{t("title")}</p>
                <p className="text-[9px] text-gray-500 font-semibold tracking-widest uppercase">{t("tagline")}</p>
              </div>
            </Link>

            <p className="text-xs md:text-sm leading-relaxed mb-5">
              {t("footerBrandDesc")}
            </p>

            {/* Language toggle — mirrors Navbar pill */}
            <div className="flex gap-0.5 bg-gray-800 rounded-lg p-0.5 w-fit">
              {(["en", "ta"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    language === lang
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {lang === "en" ? "EN" : "TA"}
                </button>
              ))}
            </div>
          </div>

          {/* ── Navigation Column ── */}
          <div>
            <p className="text-white font-bold text-xs md:text-sm mb-3 md:mb-4 uppercase tracking-widest">
              {t("navigation")}
            </p>
            <ul className="space-y-2 text-xs md:text-sm">
              {/* Primary nav links */}
              {primaryLinks(t).map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {/* More links (About, Safety, FAQs, Contact) */}
              {moreLinks(t).map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── For Businesses Column ── */}
          <div>
            <p className="text-white font-bold text-xs md:text-sm mb-3 md:mb-4 uppercase tracking-widest">
              {t("forBusinesses")}
            </p>
            <ul className="space-y-2 text-xs md:text-sm">
              {businessLinks(t).map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Support Column ── */}
          <div>
            <p className="text-white font-bold text-xs md:text-sm mb-3 md:mb-4 uppercase tracking-widest">
              {t("support")}
            </p>
            <ul className="space-y-2 text-xs md:text-sm">
              {supportLinks(t).map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 md:py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] md:text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {t("title")}. {t("rightsReserved")}</p>
          <p className="whitespace-nowrap">{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}