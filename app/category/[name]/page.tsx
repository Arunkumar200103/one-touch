"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { BusinessCard } from "@/components/business-card";
import { ServiceTypeCard } from "@/components/service-type-card";
import { useLanguage } from "@/lib/language-context";
import { getCategoryColor } from "@/lib/category-colors";
import { serviceTypes as serviceTypesEn } from "@/lib/service-types";
import { serviceTypesTa } from "@/lib/service-types-ta";
import businessesEn from "@/lib/businesses.json";
import businessesTa from "@/lib/businesses-ta.json";
import Link from "next/link";
import Image from "next/image";
import { use } from "react";

interface PageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function CategoryPage({ params }: PageProps) {
  const { t, language } = useLanguage();
  const { name } = use(params);
  const categoryName = decodeURIComponent(name);
  const [searchQuery, setSearchQuery] = useState("");
  const colors = getCategoryColor(categoryName);

  const filteredBusinesses = useMemo(() => {
    const businesses = language === "ta" ? businessesTa : businessesEn;
    let results = (businesses as any[]).filter(
      (biz) => biz.category === categoryName
    );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(
        (biz) =>
          biz.businessName.toLowerCase().includes(query) ||
          biz.ownerName.toLowerCase().includes(query) ||
          biz.location.toLowerCase().includes(query) ||
          biz.description.toLowerCase().includes(query)
      );
    }

    return results;
  }, [categoryName, searchQuery, language]);

  const currentServices = language === "ta" ? serviceTypesTa : serviceTypesEn;
  const categoryServices = currentServices.filter((s) => s.category === categoryName);

  return (
    <main className={`min-h-screen bg-gradient-to-b ${colors.bgGradient}`}>
      <Navbar />

      {/* Header Banner */}
      <div className="relative h-48 sm:h-64 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <Image
          src={colors.banner}
          alt={categoryName}
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center items-start px-4 sm:px-8">
          <Link
            href="/"
            className="text-white hover:text-gray-300 font-medium flex items-center gap-1.5 mb-3 sm:mb-4 transition-colors text-sm sm:text-base"
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

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
            {t(categoryName)}
          </h1>
          <p className="text-gray-200 text-sm sm:text-base">
            {filteredBusinesses.length}{" "}
            {filteredBusinesses.length === 1 ? "business" : "businesses"} available
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">

        {/* Service Types Section */}
        <div className="mb-16 animate-fade-in-up">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1.5 sm:mb-2">Available Services</h2>
            <p className="text-sm sm:text-base text-gray-600">Choose the specific service you need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryServices.map((service, index) => (
              <div
                key={service.id}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`
                }}
              >
                <ServiceTypeCard service={service} />
              </div>
            ))}
          </div>
        </div>

        <div className="my-8 sm:my-12 border-t-2 border-gray-200 pt-8 sm:pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Verified Businesses</h2>
        </div>

        {/* Filter Stats */}
        {searchQuery && (
          <div className="mb-8 p-4 bg-white rounded-lg border-l-4 border-l-current shadow-sm animate-fade-in" style={{ borderColor: colors.primary }}>
            <p className="text-gray-600">
              Found <span className="font-bold" style={{ color: colors.primary }}>{filteredBusinesses.length}</span> result{filteredBusinesses.length !== 1 ? "s" : ""} for "<span className="font-medium">{searchQuery}</span>"
            </p>
          </div>
        )}

        {/* Businesses Grid */}
        {filteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredBusinesses.map((business: any, index) => (
              <div
                key={business.id}
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <BusinessCard
                  id={business.id}
                  businessName={business.businessName}
                  ownerName={business.ownerName}
                  location={business.location}
                  contactNumber={business.contactNumber}
                  category={business.category}
                  description={business.description}
                  rating={business.rating}
                  reviews={business.reviews}
                  photos={business.photos}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-in">
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
            <p className="text-gray-600 text-lg font-medium mb-2">{t("noResults")}</p>
            <p className="text-gray-500">No businesses match your search. Try a different query.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}
