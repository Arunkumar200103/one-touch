"use client";

import { useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { useLanguage } from "@/lib/language-context";
import { getCategoryColor } from "@/lib/category-colors";
import businessesEn from "@/lib/businesses.json";
import businessesTa from "@/lib/businesses-ta.json";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BusinessProfilePage({ params }: PageProps) {
  const { t, language } = useLanguage();
  const { id } = use(params);
  const businessId = parseInt(id);

  const business = useMemo(() => {
    const businesses = language === "ta" ? businessesTa : businessesEn;
    return (businesses as any[]).find((biz) => biz.id === businessId);
  }, [businessId, language]);

  if (!business) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Business not found
            </h1>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Return to home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const colors = getCategoryColor(business.category);

  return (
    <main className={`min-h-screen bg-gradient-to-b ${colors.bgGradient}`}>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          href={`/category/${encodeURIComponent(business.category)}`}
          className="transition-colors font-medium flex items-center gap-1 mb-6 hover:gap-2"
          style={{ color: colors.primary }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("back")}
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-scale">
          {/* Hero Section with Image */}
          <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
            {business.photos?.[0] && (
              <Image
                src={business.photos[0]}
                alt={business.businessName}
                fill
                className="object-cover opacity-50"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.light})`
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-5xl font-bold mb-2">{business.businessName}</h1>
              <p className="text-lg opacity-90">{t(business.category)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8 border-b border-gray-200">
            <div className="rounded-xl p-5 transition-all hover:shadow-md" style={{ backgroundColor: colors.light }}>
              <h3 className="text-xs font-semibold mb-2 opacity-75">
                {t("ownerName")}
              </h3>
              <p className="text-lg font-bold" style={{ color: colors.primary }}>
                {business.ownerName}
              </p>
            </div>

            <div className="rounded-xl p-5 transition-all hover:shadow-md" style={{ backgroundColor: colors.light }}>
              <h3 className="text-xs font-semibold mb-2 opacity-75">
                {t("location")}
              </h3>
              <p className="text-lg font-bold" style={{ color: colors.primary }}>
                {business.location}
              </p>
            </div>

            <div className="rounded-xl p-5 transition-all hover:shadow-md" style={{ backgroundColor: colors.light }}>
              <h3 className="text-xs font-semibold mb-2 opacity-75">
                {t("experience")}
              </h3>
              <p className="text-lg font-bold" style={{ color: colors.primary }}>
                {business.yearExperience}+ years
              </p>
            </div>

            <div className="rounded-xl p-5 transition-all hover:shadow-md" style={{ backgroundColor: colors.light }}>
              <h3 className="text-xs font-semibold mb-2 opacity-75">
                {t("since")}
              </h3>
              <p className="text-lg font-bold" style={{ color: colors.primary }}>
                {new Date(business.startDate).getFullYear()}
              </p>
            </div>
          </div>

          {/* Rating Section */}
          {business.rating && (
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(business.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 fill-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{business.rating} rating ({business.reviews} reviews)</p>
                </div>
              </div>
            </div>
          )}

          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {t("businessDescription")}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {business.description}
            </p>
          </div>

          <div className="p-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.346.766.834 1.554 1.548 2.267 1.31 1.31 2.834 2.076 3.924 2.267l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 01-1-1H3a1 1 0 01-1-1V3z" />
                </svg>
                <div>
                  <p className="text-gray-600 text-sm">
                    {t("contactNumber")}
                  </p>
                  <a
                    href={`tel:${business.contactNumber}`}
                    className="text-blue-600 hover:text-blue-700 font-bold text-lg"
                  >
                    {business.contactNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.346.766.834 1.554 1.548 2.267 1.31 1.31 2.834 2.076 3.924 2.267l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 01-1-1H3a1 1 0 01-1-1V3z" />
                </svg>
                <div>
                  <p className="text-gray-600 text-sm">
                    {t("altContactNumber")}
                  </p>
                  <a
                    href={`tel:${business.altContact}`}
                    className="text-blue-600 hover:text-blue-700 font-bold text-lg"
                  >
                    {business.altContact}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {business.socialLinks && Object.keys(business.socialLinks).length > 0 && (
            <div className="p-8 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {t("socialLinks")}
              </h2>
              <div className="flex flex-wrap gap-4">
                {business.socialLinks.facebook && (
                  <a
                    href={business.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M18 10c0-4.418-3.582-8-8-8s-8 3.582-8 8c0 3.99 2.908 7.31 6.75 7.97v-5.625h-2.031V10h2.031V7.797c0-2.016 1.193-3.129 3.022-3.129.875 0 1.79.156 1.79.156v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.219l-.355 2.326h-1.864v5.625C15.09 17.31 18 13.99 18 10z" />
                    </svg>
                    Facebook
                  </a>
                )}
                {business.socialLinks.instagram && (
                  <a
                    href={business.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0C7.346 0 7.033.014 5.914.072c-1.115.05-1.873.26-2.54.555-.688.267-1.27.623-1.85 1.204-.58.58-.936 1.163-1.203 1.85-.294.667-.505 1.426-.554 2.54C.014 7.033 0 7.347 0 10c0 2.654.014 2.966.072 4.086.05 1.115.26 1.872.555 2.54.267.688.623 1.27 1.204 1.85.58.58 1.163.937 1.85 1.204.667.293 1.426.504 2.54.554 1.12.058 1.434.072 4.086.072s2.966-.014 4.086-.072c1.115-.05 1.872-.26 2.54-.555.688-.267 1.27-.623 1.85-1.204.58-.58.937-1.163 1.204-1.85.294-.667.505-1.425.554-2.54.058-1.12.072-1.434.072-4.086s-.014-2.966-.072-4.086c-.05-1.115-.26-1.873-.555-2.54-.267-.688-.623-1.27-1.204-1.85-.58-.58-1.163-.937-1.85-1.204-.667-.294-1.425-.505-2.54-.554-1.12-.058-1.434-.072-4.086-.072zm0 1.802c2.607 0 2.917.01 3.948.057 1.052.048 1.62.228 1.994.378.502.195.86.428 1.237.804.376.376.609.735.804 1.237.15.374.33.942.378 1.994.047 1.03.057 1.34.057 3.948 0 2.607-.01 2.917-.057 3.948-.048 1.052-.228 1.62-.378 1.994-.195.502-.428.86-.804 1.237-.376.376-.735.609-1.237.804-.374.15-.942.33-1.994.378-1.03.047-1.34.057-3.948.057-2.607 0-2.917-.01-3.948-.057-1.052-.048-1.62-.228-1.994-.378-.502-.195-.86-.428-1.237-.804-.376-.376-.609-.735-.804-1.237-.15-.374-.33-.942-.378-1.994-.047-1.03-.057-1.34-.057-3.948 0-2.607.01-2.917.057-3.948.048-1.052.228-1.62.378-1.994.195-.502.428-.86.804-1.237.376-.376.735-.609 1.237-.804.374-.15.942-.33 1.994-.378 1.03-.047 1.34-.057 3.948-.057z" />
                    </svg>
                    Instagram
                  </a>
                )}
                {business.socialLinks.whatsapp && (
                  <a
                    href={`https://wa.me/${business.socialLinks.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.38-1.021 1.144-1.851 2.527-2.235 4.007-.384 1.48-.365 3.012.056 4.543.42 1.53 1.3 2.853 2.314 3.907 1.014 1.054 2.235 1.874 3.612 2.487 1.377.613 2.928 1.055 4.404.927 1.475-.129 2.91-.767 4.05-1.62 1.14-.852 2.023-2.05 2.559-3.406.536-1.357.744-2.932.529-4.32-.215-1.39-1.106-2.674-2.113-3.76-1.007-1.087-2.273-1.982-3.694-2.528-1.422-.546-3.028-.74-4.462-.246" />
                    </svg>
                    WhatsApp
                  </a>
                )}
                {business.socialLinks.website && (
                  <a
                    href={business.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    Website
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="p-8">
            <a
              href={`tel:${business.contactNumber}`}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.346.766.834 1.554 1.548 2.267 1.31 1.31 2.834 2.076 3.924 2.267l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 01-1-1H3a1 1 0 01-1-1V3z" />
              </svg>
              {t("callNow")}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
