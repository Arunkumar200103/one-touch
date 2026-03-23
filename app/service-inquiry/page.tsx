"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Navbar } from "@/components/navbar";
import { useLanguage } from "@/lib/language-context";
import { Breadcrumb } from "@/components/breadcrumb";
import { InfoCard } from "@/components/info-card";
import { BackToHome } from "@/components/back-to-home";
import { getPageColor } from "@/lib/page-colors";
import Link from "next/link";

const colors = getPageColor("inquiry");

type FormDataType = {
  serviceType: string;
  fullName: string;
  phone: string;
  email: string;
  location: string;
  description: string;
};

export default function ServiceInquiry() {
  const { t } = useLanguage();
  const [step, setStep] = useState<number>(1);

  const [formData, setFormData] = useState<FormDataType>({
    serviceType: "",
    fullName: "",
    phone: "",
    email: "",
    location: "",
    description: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("Form submitted:", formData);
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const services = [
    t("Construction"),
    t("Electronics"),
    t("Education"),
    t("CCTV & Networking"),
    t("Furniture"),
    t("Technology"),
    t("Fabrication"),
    t("otherReason"),
  ];

  if (submitted) {
    return (
      <main className={`min-h-screen bg-gradient-to-b ${colors.gradient}`}>
        <Navbar />

        <div className="max-w-4xl mx-auto px-4 py-4">
          <BackToHome />
        </div>

        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Service Inquiry" },
          ]}
          accentColor={colors.primary}
        />

        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-3xl p-12 shadow-xl text-center">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold"
              style={{ backgroundColor: colors.light }}
            >
              ✓
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("requestSubmitted")}
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              {t("thankYouInquiry")}
            </p>

            <div className="bg-gray-50 p-6 rounded-xl space-y-3 mb-8 text-left">
              <p>
                <strong>{t("serviceLabel")}:</strong> {formData.serviceType}
              </p>
              <p>
                <strong>{t("locationLabel")}:</strong> {formData.location}
              </p>
              <p>
                <strong>{t("contactLabel")}:</strong> {formData.fullName} ({formData.phone})
              </p>
            </div>

            <Link href="/">
              <button
                className="px-8 py-3 font-semibold text-white rounded-xl hover:shadow-lg transition-all"
                style={{ backgroundColor: colors.primary }}
              >
                {t("back")}
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen bg-gradient-to-b ${colors.gradient}`}>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-4 mt-[-5rem]">
        <BackToHome />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Service Inquiry" },
          ]}
          accentColor={colors.primary}
        />

        {/* Progress */}
        <div className="mb-12">
          <div className="flex gap-2 mb-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="flex-1 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: step >= num ? colors.primary : "#E5E7EB",
                }}
              />
            ))}
          </div>

          <p className="text-xs sm:text-sm text-gray-600">
            {t("stepLabel")} {step} {t("of")} 3 —{" "}
            {step === 1
              ? t("chooseService")
              : step === 2
              ? t("yourDetails")
              : t("confirmRequest")}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl"
        >
          {/* Step 1 */}
          {step === 1 && (
            <>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-1.5 sm:mb-2"
                style={{ color: colors.primary }}
              >
                {t("whatServiceNeed")}
              </h2>

              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                {t("selectCategoryDesc")}
              </p>

              <div className="space-y-3">
                {services.map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 rounded-xl cursor-pointer text-sm sm:text-base"
                    style={{
                      borderColor:
                        formData.serviceType === service
                          ? colors.primary
                          : "#E5E7EB",
                      backgroundColor:
                        formData.serviceType === service
                          ? colors.light
                          : "transparent",
                    }}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      value={service}
                      checked={formData.serviceType === service}
                      onChange={handleInputChange}
                      required
                    />
                    {service}
                  </label>
                ))}
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: colors.primary }}
              >
                {t("yourDetails")}
              </h2>

              <input
                type="text"
                name="fullName"
                placeholder={t("fullNameLabel")}
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="tel"
                  name="phone"
                  placeholder={t("phoneNumberLabel")}
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base"
                />

                <input
                  type="email"
                  name="email"
                  placeholder={t("emailAddress")}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base"
                />
              </div>

              <input
                type="text"
                name="location"
                placeholder={t("cityAreaLabel")}
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl text-sm sm:text-base"
              />

              <textarea
                name="description"
                placeholder={t("describeRequirement")}
                value={formData.description}
                onChange={handleInputChange}
                required
                className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl h-24 sm:h-32 text-sm sm:text-base"
              />
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: colors.primary }}
              >
                {t("reviewRequest")}
              </h2>

              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl space-y-2 sm:space-y-3 text-sm sm:text-base">
                <p>
                  <strong>{t("serviceLabel")}:</strong> {formData.serviceType}
                </p>
                <p>
                  <strong>{t("nameLabel")}:</strong> {formData.fullName}
                </p>
                <p>
                  <strong>{t("phone")}:</strong> {formData.phone}
                </p>
                <p>
                  <strong>{t("email")}:</strong> {formData.email}
                </p>
                <p>
                  <strong>{t("locationLabel")}:</strong> {formData.location}
                </p>
                <p>
                  <strong>{t("descriptionLabel")}:</strong> {formData.description}
                </p>
              </div>

              <InfoCard
                title={t("nextStepLabel")}
                description={t("nextStepDesc")}
                icon="📋"
                backgroundColor={colors.light}
                borderColor={colors.primary}
                iconColor={colors.primary}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-10">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-4 font-semibold border-2 border-gray-300 rounded-xl"
              >
                {t("backLabel")}
              </button>
            )}

            <button
              type="submit"
              className="flex-1 py-4 font-semibold text-white rounded-xl hover:shadow-lg"
              style={{ backgroundColor: colors.primary }}
            >
              {step === 3 ? t("submitRequest") : t("continueLabel")}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}