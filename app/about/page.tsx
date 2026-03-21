"use client";

import { Navbar } from "@/components/navbar";
import { useLanguage } from "@/lib/language-context";
import { Breadcrumb } from "@/components/breadcrumb";
import { InfoCard } from "@/components/info-card";
import { BackToHome } from "@/components/back-to-home";
import { getPageColor } from "@/lib/page-colors";
import Image from "next/image";
import Link from "next/link";

const colors = getPageColor("about");

export default function About() {
  const { t } = useLanguage();

  const features = [
    {
      title: t("verifiedBiz"),
      description: t("verifiedBizDesc"),
      icon: "🛡️",
    },
    {
      title: t("authenticReviews"),
      description: t("authenticReviewsDesc"),
      icon: "⭐",
    },
    {
      title: t("userFriendly"),
      description: t("userFriendlyDesc"),
      icon: "✨",
    },
    {
      title: t("supportLocal"),
      description: t("supportLocalDesc"),
      icon: "🤝",
    },
    {
      title: t("customerFirst"),
      description: t("customerFirstDesc"),
      icon: "❤️",
    },
    {
      title: t("completelyFree"),
      description: t("completelyFreeDesc"),
      icon: "💚",
    },
  ];

  const stats = [
    { number: "500+", label: t("verifiedBizCount") },
    { number: "10K+", label: t("happyCustomers") },
    { number: "7+", label: t("serviceCategoriesCount") },
    { number: "24/7", label: t("availability") },
  ];

  return (
    <main className={`min-h-screen bg-gradient-to-b ${colors.gradient}`}>
      <Navbar />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-4 mt-[-5rem">
        <BackToHome />
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 mt-[-90px]">

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: t("back"), href: "/" },
            { label: t("aboutUs") },
          ]}
          accentColor={colors.primary}
        />

        {/* Mission Section */}
        <section className="mb-24">

          <h2
            className="text-4xl font-bold mb-8"
            style={{ color: colors.primary }}
          >
            {t("ourMission")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            <div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t("missionP1")}
              </p>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {t("missionP2")}
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                {t("missionP3")}
              </p>

            </div>

            <div
              className="relative rounded-2xl h-80 overflow-hidden shadow-xl"
              style={{ backgroundColor: colors.light }}
            >
              <Image
                src={colors.banner}
                alt="Our Mission"
                fill
                className="object-cover"
              />
            </div>

          </div>

        </section>

        {/* Why Choose Us */}
        <section className="mb-24">

          <h2
            className="text-4xl font-bold mb-12"
            style={{ color: colors.primary }}
          >
            {t("whyChooseUs")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <InfoCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  backgroundColor={colors.light}
                  borderColor={colors.primary}
                  iconColor={colors.primary}
                />
              </div>
            ))}

          </div>

        </section>

        {/* Statistics */}
        <section
          className="mb-24 rounded-3xl p-14"
          style={{ backgroundColor: colors.primary }}
        >

          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            {t("ourImpact")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">

            {stats.map((stat, index) => (
              <div key={index} className="text-center">

                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>

                <p className="text-white/80 font-medium">
                  {stat.label}
                </p>

              </div>
            ))}

          </div>

        </section>

        {/* Core Values */}
        <section className="mb-24">

          <h2
            className="text-4xl font-bold mb-12"
            style={{ color: colors.primary }}
          >
            {t("ourCoreValues")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div
              className="p-8 border-2 rounded-2xl"
              style={{ borderColor: colors.primary }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: colors.primary }}
              >
                {t("transparency")}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t("transparencyDesc")}
              </p>
            </div>

            <div
              className="p-8 border-2 rounded-2xl"
              style={{ borderColor: colors.primary }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: colors.primary }}
              >
                {t("accessibility")}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t("accessibilityDesc")}
              </p>
            </div>

            <div
              className="p-8 border-2 rounded-2xl"
              style={{ borderColor: colors.primary }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: colors.primary }}
              >
                {t("communityGrowth")}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t("communityGrowthDesc")}
              </p>
            </div>

            <div
              className="p-8 border-2 rounded-2xl"
              style={{ borderColor: colors.primary }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{ color: colors.primary }}
              >
                {t("safetyTrust")}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t("safetyTrustDesc")}
              </p>
            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="text-center">

          <h2
            className="text-4xl font-bold mb-6"
            style={{ color: colors.primary }}
          >
            {t("readyToFind")}
          </h2>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            {t("readyDesc")}
          </p>

          <Link href="/">
            <button
              className="text-white font-bold py-4 px-10 rounded-full text-lg transition-all hover:shadow-xl hover:scale-105"
              style={{ backgroundColor: colors.primary }}
            >
              {t("exploreServices")}
            </button>
          </Link>

        </section>

      </div>
    </main>
  );
}