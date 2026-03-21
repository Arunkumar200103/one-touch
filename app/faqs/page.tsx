"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { useLanguage } from "@/lib/language-context";
import { Breadcrumb } from "@/components/breadcrumb";
import { FAQAccordion } from "@/components/faq-accordion";
import { BackToHome } from "@/components/back-to-home";
import { getPageColor } from "@/lib/page-colors";
import Image from "next/image";

const colors = getPageColor("faqs");

export default function FAQs() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const allFaqs = [
    {
      question: t("faq1Q"),
      answer: t("faq1A"),
    },
    {
      question: t("faq2Q"),
      answer: t("faq2A"),
    },
    {
      question: t("faq3Q"),
      answer: t("faq3A"),
    },
    {
      question: t("faq4Q"),
      answer: t("faq4A"),
    },
    {
      question: t("faq5Q"),
      answer: t("faq5A"),
    },
    {
      question: t("faq6Q"),
      answer: t("faq6A"),
    },
    {
      question: t("faq7Q"),
      answer: t("faq7A"),
    },
    {
      question: t("faq8Q"),
      answer: t("faq8A"),
    },
    {
      question: t("faq9Q"),
      answer: t("faq9A"),
    },
    {
      question: t("faq10Q"),
      answer: t("faq10A"),
    },
    {
      question: t("faq11Q"),
      answer: t("faq11A"),
    },
    {
      question: t("faq12Q"),
      answer: t("faq12A"),
    },
    {
      question: t("faq13Q"),
      answer: t("faq13A"),
    },
    {
      question: t("faq14Q"),
      answer: t("faq14A"),
    },
    {
      question: t("faq15Q"),
      answer: t("faq15A"),
    },
  ];

  const filteredFaqs = searchQuery
    ? allFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allFaqs;

  const categories = [
    { name: t("gettingStarted"), icon: "🚀", count: 3 },
    { name: t("usingLocalBiz"), icon: "🔍", count: 4 },
    { name: t("safetyPrivacy"), icon: "🛡️", count: 2 },
    { name: t("reviewsFeedback"), icon: "⭐", count: 2 },
    { name: t("technicalHelp"), icon: "💻", count: 2 },
    { name: t("bizOwners"), icon: "💼", count: 2 },
  ];

  return (
    <main className={`min-h-screen bg-gradient-to-b ${colors.gradient}`}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-4 mt-[-5rem]">
        <BackToHome />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
      <Breadcrumb
          items={[
            { label: t("back"), href: "/" },
            { label: "FAQs" },
          ]}
          accentColor={colors.primary}
        />

        {/* Search */}
        <div className="mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder={t("faqSearchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none text-lg"
            />
            <svg
              className="absolute right-4 top-4 w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchQuery && (
            <p className="mt-4 text-gray-600">
              {t("found")} {filteredFaqs.length} {filteredFaqs.length !== 1 ? t("results") : t("result")} {t("for")} "{searchQuery}"
            </p>
          )}
        </div>

        {!searchQuery && (
          <div className="mb-16">
            <h2
              className="text-3xl font-bold mb-8"
              style={{ color: colors.primary }}
            >
              {t("browseByTopic")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl text-center border-2 cursor-pointer transition-all hover:shadow-lg"
                  style={{
                    borderColor: colors.primary,
                    backgroundColor: "white",
                  }}
                >
                  <div className="text-4xl mb-2">{cat.icon}</div>
                  <h3 className="font-bold text-gray-900">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.count} {t("questions")}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        <div className="mb-16">
          {filteredFaqs.length > 0 ? (
            <FAQAccordion items={filteredFaqs} accentColor={colors.primary} />
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <p className="text-gray-600 text-lg">
                {t("noQuestionsFound")}
              </p>
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <div
          className="rounded-3xl p-12 text-center text-white"
          style={{ backgroundColor: colors.primary }}
        >
          <h3 className="text-3xl font-bold mb-4">{t("stillNeedHelp")}</h3>
          <p className="text-lg mb-8 opacity-90">
            {t("supportTeamReady")}
          </p>
          <a href="/contact">
            <button className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg">
              {t("contactSupport")}
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
