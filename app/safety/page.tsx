"use client";

import { Navbar } from "@/components/navbar";
import { useLanguage } from "@/lib/language-context";
import { Breadcrumb } from "@/components/breadcrumb";
import { InfoCard } from "@/components/info-card";
import { BackToHome } from "@/components/back-to-home";
import { getPageColor } from "@/lib/page-colors";
import Image from "next/image";

const colors = getPageColor("safety");

export default function Safety() {
  const { t } = useLanguage();
  const verificationSteps = [
    {
      number: "1",
      title: t("licenseVerification"),
      description: t("licenseVerificationDesc"),
    },
    {
      number: "2",
      title: t("identityCheck"),
      description: t("identityCheckDesc"),
    },
    {
      number: "3",
      title: t("contactValidation"),
      description: t("contactValidationDesc"),
    },
    {
      number: "4",
      title: t("backgroundReview"),
      description: t("backgroundReviewDesc"),
    },
  ];

  const safetyTips = [
    {
      title: t("verifyBeforeBooking"),
      description: t("verifyBeforeBookingDesc"),
      icon: "✓",
    },
    {
      title: t("communicateClearly"),
      description: t("communicateClearlyDesc"),
      icon: "💬",
    },
    {
      title: t("useSecurePayment"),
      description: t("useSecurePaymentDesc"),
      icon: "💰",
    },
    {
      title: t("trustYourGut"),
      description: t("trustYourGutDesc"),
      icon: "🎯",
    },
    {
      title: t("saveImportantDetails"),
      description: t("saveImportantDetailsDesc"),
      icon: "📝",
    },
    {
      title: t("leaveHonestReviewsTip"),
      description: t("leaveHonestReviewsTipDesc"),
      icon: "⭐",
    },
  ];

  const redFlags = [
    t("redFlag1"),
    t("redFlag2"),
    t("redFlag3"),
    t("redFlag4"),
    t("redFlag5"),
    t("redFlag6"),
    t("redFlag7"),
    t("redFlag8"),
  ];

  return (
    <main className={`min-h-screen bg-gradient-to-b ${colors.gradient}`}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-4 mt-[-5rem]">
        <BackToHome />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
        <Breadcrumb
          items={[
            { label: t("back"), href: "/" },
            { label: t("safety") },
          ]}
          accentColor={colors.primary}
        />

        {/* Our Commitment */}
        <div className="mb-12 sm:mb-20">
          <h2
            className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6"
            style={{ color: colors.primary }}
          >
            {t("safetyPriority")}
          </h2>
          <p className="text-base sm:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8 max-w-3xl">
            {t("safetyCommitment")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div
              className="p-6 sm:p-8 rounded-2xl text-white"
              style={{ backgroundColor: colors.primary }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{t("whatWeDo")}</h3>
              <ul className="space-y-3 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-xl">✓</span>
                  <span>{t("verifyLicenses")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">✓</span>
                  <span>{t("checkOwnerId")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">✓</span>
                  <span>{t("validateContact")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">✓</span>
                  <span>{t("removeFraud")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-xl">✓</span>
                  <span>{t("monitorReviews")}</span>
                </li>
              </ul>
            </div>

            <div
              className="p-6 sm:p-8 rounded-2xl border-2"
              style={{ borderColor: colors.primary }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4" style={{ color: colors.primary }}>
                {t("yourRole")}
              </h3>
              <ul className="space-y-3 text-sm sm:text-base text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-xl sm:text-2xl">👤</span>
                  <span>{t("readReviewsCarefully")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">👤</span>
                  <span>{t("communicateClearlyAboutPrices")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">👤</span>
                  <span>{t("reportSuspicious")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">👤</span>
                  <span>{t("leaveHonestReviewsSafety")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">👤</span>
                  <span>{t("keepPaymentRecords")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Verification Process */}
        <div className="mb-12 sm:mb-20">
          <h2
            className="text-xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12"
            style={{ color: colors.primary }}
          >
            {t("ourVerificationProcess")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all"
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg mb-4"
                  style={{ backgroundColor: colors.primary }}
                >
                  {step.number}
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-2" style={{ color: colors.primary }}>
                  {step.title}
                </h3>
                <p className="text-gray-700 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <div className="mb-12 sm:mb-20">
          <h2
            className="text-xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12"
            style={{ color: colors.primary }}
          >
            {t("safetyTipsForCustomers")}
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
        <div className="mb-12 sm:mb-20 bg-red-50 p-6 sm:p-12 rounded-3xl border-2 border-red-200">
          <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6 text-red-900">
            {t("redFlagsTitle")}
          </h2>
          <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8">
            {t("redFlagsDescText")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {redFlags.map((flag, index) => (
              <div key={index} className="flex items-start gap-3 text-sm sm:text-base">
                <span className="text-xl mt-0.5">⚠️</span>
                <span className="text-gray-800">{flag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Report Issues */}
        <div
          className="rounded-3xl p-6 sm:p-12 text-center text-white"
          style={{ backgroundColor: colors.primary }}
        >
          <h3 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">{t("foundAProblem")}</h3>
          <p className="text-sm sm:text-lg mb-6 sm:mb-8 opacity-90">
            {t("reportProblemDesc")}
          </p>
          <a href="/contact">
            <button className="bg-white text-gray-900 font-bold py-2.5 px-6 sm:py-3 sm:px-8 rounded-full transition-all hover:shadow-lg text-sm sm:text-base">
                {t("reportAnIssue")}
              </button>
          </a>
        </div>
      </div>
    </main>
  );
}
