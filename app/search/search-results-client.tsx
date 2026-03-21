"use client";

import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import { useSearch } from "@/lib/search-context";
import { BusinessCard } from "@/components/business-card";
import { ServiceTypeCard } from "@/components/service-type-card";
import { useEffect } from "react";

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const { t } = useLanguage();
  const { search, setSearch, results } = useSearch();

  // Sync global search context with URL param on mount
  useEffect(() => {
    if (q && search !== q) {
      setSearch(q);
    }
  }, [q, setSearch, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
        {t("searchResultFor")} <span className="text-blue-600">"{q}"</span>
      </h1>
      <p className="text-gray-500 mb-8">
        {t("found")} {results.services.length} {t("services").toLowerCase()} and {results.businesses.length} {t("forBusinesses").toLowerCase()}.
      </p>

      {results.hasResults ? (
        <div className="space-y-12">
          {/* Services Matches */}
          {results.services.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("matchingServices")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.services.map((service: any) => (
                  <ServiceTypeCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          )}

          {/* Businesses Matches */}
          {results.businesses.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("matchingBusinesses")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.businesses.map((business: any) => (
                  <BusinessCard
                    key={business.id}
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
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-700 mb-2">{t("noResultsFound")}</h3>
          <p className="text-gray-500">{t("adjustSearch")}</p>
        </div>
      )}
    </div>
  );
}
