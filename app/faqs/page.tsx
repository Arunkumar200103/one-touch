"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/breadcrumb";
import { FAQAccordion } from "@/components/faq-accordion";
import { BackToHome } from "@/components/back-to-home";
import { getPageColor } from "@/lib/page-colors";
import Image from "next/image";

const colors = getPageColor("faqs");

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState("");

  const allFaqs = [
    {
      question: "How do I search for services?",
      answer: "Simply go to the home page, use the search bar to enter what you need (like 'plumber' or 'construction'), select your location, and browse the results. You can also browse by category.",
    },
    {
      question: "Are the businesses on One Touch verified?",
      answer: "Yes, all businesses on our platform go through a verification process. We check their licenses, credentials, and customer feedback to ensure quality and reliability.",
    },
    {
      question: "Is it free to use One Touch?",
      answer: "Completely free! You can search, compare, and contact businesses without paying anything. We don't charge hidden fees or require any subscription.",
    },
    {
      question: "How do I contact a business?",
      answer: "Once you find a business, click on it to see their details. You can call them directly, message on WhatsApp, email them, or visit their website. Choose the method that works best for you.",
    },
    {
      question: "Can I save my favorite businesses?",
      answer: "Yes! You can save businesses to your favorites for quick access later. Just click the heart icon on any business card.",
    },
    {
      question: "How do I leave a review?",
      answer: "After using a service, go to that business's profile and click 'Write a Review'. Share your honest experience to help other customers make decisions.",
    },
    {
      question: "Is my personal information safe?",
      answer: "Your privacy is important to us. We use secure encryption to protect all your personal data. We never share your information with third parties.",
    },
    {
      question: "What if I'm not satisfied with a service?",
      answer: "Contact the business directly first to discuss the issue. If you need help, reach out to our support team and we'll assist in resolving the problem.",
    },
    {
      question: "How do I report a fake or suspicious business?",
      answer: "If you find a business that seems fake or suspicious, use the 'Report' button on their profile. Our team will investigate and remove them if verified as fraudulent.",
    },
    {
      question: "Can I request a service without finding a specific business?",
      answer: "Yes! Use our 'Service Inquiry' feature to describe what you need, and we'll connect you with matching businesses in your area.",
    },
    {
      question: "Do you have an app?",
      answer: "Currently, One Touch works great on any web browser on mobile, tablet, or desktop. We're working on dedicated apps for iOS and Android coming soon.",
    },
    {
      question: "What languages does One Touch support?",
      answer: "We currently support English and Tamil. You can switch languages using the language selector in the navigation menu.",
    },
    {
      question: "How do I change my language preference?",
      answer: "Click on the language selector (usually showing 'ENG' or 'TA') in the top right corner of the page and choose your preferred language.",
    },
    {
      question: "Can I advertise my business on One Touch?",
      answer: "Yes! If you own a business, go to our business registration page and complete the verification process. Our team will review and add your business.",
    },
    {
      question: "Is there a customer support team available?",
      answer: "Yes, our support team is available 24/7. Go to the Contact Us page or email support@onetouch.com for help with any questions or issues.",
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
    { name: "Getting Started", icon: "🚀", count: 3 },
    { name: "Using One Touch", icon: "🔍", count: 4 },
    { name: "Safety & Privacy", icon: "🛡️", count: 2 },
    { name: "Reviews & Feedback", icon: "⭐", count: 2 },
    { name: "Technical Help", icon: "💻", count: 2 },
    { name: "Business Owners", icon: "💼", count: 2 },
  ];

  return (
    <main className={`min-h-screen bg-gradient-to-b ${colors.bgGradient}`}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-4">
        <BackToHome />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">
      <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "FAQs" },
          ]}
          accentColor={colors.primary}
        />

        {/* Search */}
        <div className="mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions and answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none text-lg"
              style={{ focusBorderColor: colors.primary }}
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
              Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} for "{searchQuery}"
            </p>
          )}
        </div>

        {!searchQuery && (
          <div className="mb-16">
            <h2
              className="text-3xl font-bold mb-8"
              style={{ color: colors.primary }}
            >
              Browse by Topic
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
                  <p className="text-sm text-gray-500">{cat.count} questions</p>
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
                No questions found. Try a different search term.
              </p>
            </div>
          )}
        </div>

        {/* Still Need Help */}
        <div
          className="rounded-3xl p-12 text-center text-white"
          style={{ backgroundColor: colors.primary }}
        >
          <h3 className="text-3xl font-bold mb-4">Still need help?</h3>
          <p className="text-lg mb-8 opacity-90">
            Our support team is here to help. Contact us anytime.
          </p>
          <a href="/contact">
            <button className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg">
              Contact Support
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
