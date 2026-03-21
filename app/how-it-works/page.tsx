"use client";

import { Navbar } from "@/components/navbar";
import { useLanguage } from "@/lib/language-context";
import { Breadcrumb } from "@/components/breadcrumb";
import { StepCard } from "@/components/step-card";
import { InfoCard } from "@/components/info-card";
import { BackToHome } from "@/components/back-to-home";
import { getPageColor } from "@/lib/page-colors";
import Link from "next/link";
import Image from "next/image";

const colors = getPageColor("howItWorks");

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      number: 1,
      title: t("step1Title"),
      description: t("step1Desc"),
      icon: "🔍",
    },
    {
      number: 2,
      title: t("step2Title"),
      description: t("step2Desc"),
      icon: "👁️",
    },
    {
      number: 3,
      title: t("step3Title"),
      description: t("step3Desc"),
      icon: "⭐",
    },
    {
      number: 4,
      title: t("step4Title"),
      description: t("step4Desc"),
      icon: "📞",
    },
    {
      number: 5,
      title: t("step5Title"),
      description: t("step5Desc"),
      icon: "💬",
    },
  ];

  const benefits = [
    {
      title: t("benefit1Title"),
      description: t("benefit1Desc"),
      icon: "✓",
    },
    {
      title: t("benefit2Title"),
      description: t("benefit2Desc"),
      icon: "👥",
    },
    {
      title: t("benefit3Title"),
      description: t("benefit3Desc"),
      icon: "🎯",
    },
    {
      title: t("benefit4Title"),
      description: t("benefit4Desc"),
      icon: "📱",
    },
    {
      title: t("benefit5Title"),
      description: t("benefit5Desc"),
      icon: "⚡",
    },
    {
      title: t("benefit6Title"),
      description: t("benefit6Desc"),
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
            {t("howItWorksHero")}
          </h1>

          <p className="text-xl text-gray-200 max-w-2xl leading-relaxed">
            {t("howItWorksHeroDesc")}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 mt-[-90px]">

        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <BackToHome />
        </div>

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: t("back"), href: "/" },
            { label: t("howItWorks"), href: "/how-it-works" },
          ]}
        />

        {/* Steps Section */}
        <section className="mb-24">

          <div className="mb-16">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: colors.primary }}
            >
              {t("fiveSimpleSteps")}
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl">
              {t("fiveStepsDesc")}
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
              {t("whyChoosePlatform")}
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl">
              {t("simplifyProcessDesc")}
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
            {t("startDiscoveringTitle")}
          </h3>

          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            {t("browseThousandsDesc")}
          </p>

          <Link href="/">
            <button className="bg-white text-gray-900 font-bold py-4 px-10 rounded-full transition-all hover:shadow-2xl hover:scale-105">
                {t("startExploringBtn")}
              </button>
          </Link>
        </section>

      </div>
    </main>
  );
}