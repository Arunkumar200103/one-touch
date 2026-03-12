"use client";

import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/breadcrumb";
import { InfoCard } from "@/components/info-card";
import { BackToHome } from "@/components/back-to-home";
import { getPageColor } from "@/lib/page-colors";
import Image from "next/image";

const colors = getPageColor("safety");

export default function Safety() {
  const verificationSteps = [
    {
      number: "1",
      title: "License Verification",
      description: "We verify business licenses and registrations with government authorities.",
    },
    {
      number: "2",
      title: "Identity Check",
      description: "All owners provide valid ID documents for verification.",
    },
    {
      number: "3",
      title: "Contact Validation",
      description: "We confirm phone numbers and verify business locations.",
    },
    {
      number: "4",
      title: "Background Review",
      description: "We check for any complaints or red flags in their history.",
    },
  ];

  const safetyTips = [
    {
      title: "Verify Before Booking",
      description: "Always check the business details, reviews, and ratings before contacting them. Read recent customer feedback.",
      icon: "✓",
    },
    {
      title: "Communicate Clearly",
      description: "Discuss prices, timeline, and work details clearly before the service starts. Get everything in writing if possible.",
      icon: "💬",
    },
    {
      title: "Use Secure Payment",
      description: "For larger projects, request detailed quotes and use secure payment methods. Never pay the full amount upfront.",
      icon: "💰",
    },
    {
      title: "Trust Your Gut",
      description: "If something doesn't feel right, trust your instinct. There are plenty of other businesses to choose from.",
      icon: "🎯",
    },
    {
      title: "Save Important Details",
      description: "Keep records of conversations, agreements, and receipts. These help if you need to follow up or file a complaint.",
      icon: "📝",
    },
    {
      title: "Leave Honest Reviews",
      description: "Share your experience after the service. Your feedback helps other customers and holds businesses accountable.",
      icon: "⭐",
    },
  ];

  const redFlags = [
    "Asking for payment through untraceable methods",
    "Unwilling to provide business license or credentials",
    "Extremely low prices compared to other businesses",
    "Refusing to sign agreements or discuss terms",
    "No phone contact, only messaging",
    "Pressure to decide or pay immediately",
    "No reviews or only very new accounts",
    "Asking for upfront cash for large jobs",
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
            { label: "Safety" },
          ]}
          accentColor={colors.primary}
        />

        {/* Our Commitment */}
        <div className="mb-20">
          <h2
            className="text-4xl font-bold mb-6"
            style={{ color: colors.primary }}
          >
            Your Safety is Our Priority
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8 max-w-3xl">
            One Touch is committed to connecting you with safe, verified, and trustworthy service providers. We've put systems in place to protect you from fraud and poor quality service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="p-8 rounded-2xl text-white"
              style={{ backgroundColor: colors.primary }}
            >
              <h3 className="text-2xl font-bold mb-4">What We Do</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Verify all business licenses and credentials</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Check business owner identity with government ID</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Validate contact information and business location</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Remove businesses with fraud complaints</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✓</span>
                  <span>Monitor reviews for genuine customer feedback</span>
                </li>
              </ul>
            </div>

            <div
              className="p-8 rounded-2xl border-2"
              style={{ borderColor: colors.primary }}
            >
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>
                Your Role
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">👤</span>
                  <span>Read reviews and check business details carefully</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">👤</span>
                  <span>Communicate clearly about prices and timeline</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">👤</span>
                  <span>Report suspicious activity or fraud</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">👤</span>
                  <span>Leave honest reviews after service</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">👤</span>
                  <span>Keep payment records and agreements</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Verification Process */}
        <div className="mb-20">
          <h2
            className="text-4xl font-bold mb-12"
            style={{ color: colors.primary }}
          >
            Our Verification Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4"
                  style={{ backgroundColor: colors.primary }}
                >
                  {step.number}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: colors.primary }}>
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mb-20">
          <h2
            className="text-4xl font-bold mb-12"
            style={{ color: colors.primary }}
          >
            Safety Tips for Customers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyTips.map((tip, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <InfoCard
                  title={tip.title}
                  description={tip.description}
                  icon={tip.icon}
                  backgroundColor={colors.light}
                  borderColor={colors.primary}
                  iconColor={colors.primary}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Red Flags */}
        <div className="mb-20 bg-red-50 p-12 rounded-3xl border-2 border-red-200">
          <h2 className="text-3xl font-bold mb-6 text-red-900">
            Warning Signs - Watch Out For
          </h2>
          <p className="text-gray-700 mb-8">
            Be careful if you notice any of these red flags:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {redFlags.map((flag, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-2xl mt-1">⚠️</span>
                <span className="text-gray-800">{flag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Report Issues */}
        <div
          className="rounded-3xl p-12 text-center text-white"
          style={{ backgroundColor: colors.primary }}
        >
          <h3 className="text-3xl font-bold mb-4">Found a Problem?</h3>
          <p className="text-lg mb-8 opacity-90">
            Report suspicious activity or fraud to our support team.
          </p>
          <a href="/contact">
            <button className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg">
              Report an Issue
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
