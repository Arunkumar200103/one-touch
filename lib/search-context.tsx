"use client";
import { createContext, useContext, useState, useMemo } from "react";
import businessesEn from "@/lib/businesses.json";
import businessesTa from "@/lib/businesses-ta.json";
import { serviceTypes as serviceTypesEn } from "@/lib/service-types";
import { serviceTypesTa } from "@/lib/service-types-ta";
import { useLanguage } from "@/lib/language-context";

// ── Types ────────────────────────────────────────────────────────────────────

export interface Business {
  id: number;
  ownerName: string;
  businessName: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  contactNumber: string;
  altContact: string;
  location: string;
  startDate: string;
  photos: string[];
  services: string[];
  yearExperience: number;
  socialLinks: Record<string, string>;
}

export interface ServiceResult {
  id: string;
  category: string;
  name: string;
  description: string;
  keywords: string[];
  icon: string;
  estimatedTime: string;
  price: string;
}

export interface SearchResults {
  businesses: Business[];
  services: ServiceResult[];
  hasResults: boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function normalize(str: string) {
  return str.toLowerCase().trim();
}

/** Returns true if ANY of the haystack strings contains the needle */
function matchesAny(needle: string, ...haystack: (string | string[])[]) {
  return haystack.some((field) => {
    if (Array.isArray(field)) {
      return field.some((item) => normalize(item).includes(needle));
    }
    return normalize(field).includes(needle);
  });
}

function filterBusinesses(query: string, data: Business[]): Business[] {
  const q = normalize(query);
  if (!q) return [];
  return data.filter((b) =>
    matchesAny(
      q,
      b.businessName,
      b.ownerName,
      b.category,
      b.description,
      b.services,           // array — checks each service string
      b.location
    )
  );
}

function filterServices(query: string, data: ServiceResult[]): ServiceResult[] {
  const q = normalize(query);
  if (!q) return [];
  return data.filter((s) =>
    matchesAny(
      q,
      s.name,
      s.category,
      s.description,
      s.keywords            // array — checks each keyword
    )
  );
}

// ── Context ───────────────────────────────────────────────────────────────────

const SearchContext = createContext<any>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const { language } = useLanguage();

  const results: SearchResults = useMemo(() => {
    const q = normalize(search);
    if (!q) return { businesses: [], services: [], hasResults: false };

    const currentBusinesses = language === "ta" ? businessesTa : businessesEn;
    const currentServices = language === "ta" ? serviceTypesTa : serviceTypesEn;

    const businesses = filterBusinesses(q, currentBusinesses as Business[]);
    const services = filterServices(q, currentServices as ServiceResult[]);

    return {
      businesses,
      services,
      hasResults: businesses.length > 0 || services.length > 0,
    };
  }, [search]);

  return (
    <SearchContext.Provider value={{ search, setSearch, results }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}