"use client";

import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/breadcrumb";
import { StepCard } from "@/components/step-card";
import { InfoCard } from "@/components/info-card";
import { BackToHome } from "@/components/back-to-home";
import { getPageColor } from "@/lib/page-colors";
import Link from "next/link";
import Image from "next/image";

const colors = getPageColor("howItWorks");

export default function HowItWorks() {

  const steps = [
    {
      number: 1,
      title: "Search for Services",
      description:
        "Browse service categories or use our smart search to find businesses based on service type, location, or business name.",
      icon: "🔍",
    },
    {
      number: 2,
      title: "Explore Business Profiles",
      description:
        "Open any business profile to view complete details including services offered, address, ratings, contact information, and photos.",
      icon: "👁️",
    },
    {
      number: 3,
      title: "Read Reviews & Ratings",
      description:
        "Check genuine customer reviews and ratings to understand service quality before choosing a provider.",
      icon: "⭐",
    },
    {
      number: 4,
      title: "Contact the Business",
      description:
        "Reach out directly using phone, WhatsApp, email, or the business website to discuss services and availability.",
      icon: "📞",
    },
    {
      number: 5,
      title: "Share Your Experience",
      description:
        "After receiving the service, leave a review and rating to help others find reliable businesses.",
      icon: "💬",
    },
  ];

  const benefits = [
    {
      title: "Verified Businesses",
      description:
        "Every business listed on our platform is reviewed and verified for authenticity.",
      icon: "✓",
    },
    {
      title: "Authentic Customer Reviews",
      description:
        "Read real feedback from customers to confidently choose the right service.",
      icon: "👥",
    },
    {
      title: "Simple & Easy to Use",
      description:
        "Our platform is designed for everyone with a simple and user-friendly interface.",
      icon: "🎯",
    },
    {
      title: "Multiple Contact Options",
      description:
        "Connect through phone calls, WhatsApp, email, or the business website.",
      icon: "📱",
    },
    {
      title: "Fast & Powerful Search",
      description:
        "Find the services you need quickly with our optimized search experience.",
      icon: "⚡",
    },
    {
      title: "Completely Free",
      description:
        "Searching and connecting with businesses is completely free for users.",
      icon: "💰",
    },
  ];

  return (
    <main className={`min-h-screen bg-gradient-to-b ${colors.gradient}`}>
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[420px] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <Image
          src={colors.banner}
          alt="How It Works"
          fill
          className="object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-12">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            style={{ color: colors.light }}
          >
            How It Works
          </h1>

          <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
            Discover, compare, and connect with trusted local service providers
            in just a few simple steps.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <BackToHome />
        </div>

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "How It Works", href: "/how-it-works" },
          ]}
        />

        {/* Steps Section */}
        <section className="mb-24">

          <div className="mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: colors.primary }}
            >
              5 Simple Steps
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl">
              Finding and connecting with local businesses has never been
              easier. Just follow these simple steps.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step) => (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                backgroundColor={colors.light}
                textColor={colors.primary}
              />
            ))}
          </div>

        </section>

        {/* Benefits Section */}
        <section className="mb-24">

          <div className="mb-12">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: colors.primary }}
            >
              Why Choose Our Platform?
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl">
              We simplify the process of finding reliable local services with a
              secure and easy-to-use platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <InfoCard
                  title={benefit.title}
                  description={benefit.description}
                  icon={benefit.icon}
                  backgroundColor={colors.light}
                  borderColor={colors.primary}
                  iconColor={colors.primary}
                />
              </div>
            ))}

          </div>

        </section>

        {/* CTA Section */}
        <section
          className="rounded-3xl p-14 text-center text-white shadow-xl"
          style={{ backgroundColor: colors.primary }}
        >
          <h3 className="text-3xl font-bold mb-4">
            Start Discovering Trusted Local Services Today
          </h3>

          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Browse thousands of local businesses and connect with the right
            service provider in seconds.
          </p>

          <Link href="/">
            <button className="bg-white text-gray-900 font-bold py-4 px-10 rounded-full transition-all hover:shadow-2xl hover:scale-105">
              Start Exploring Services
            </button>
          </Link>
        </section>

      </div>
    </main>
  );
}