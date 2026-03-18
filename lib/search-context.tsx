"use client";
import { createContext, useContext, useState, useMemo } from "react";
import businessesData from "@/lib/businesses.json";
import { serviceTypes } from "@/lib/service-types";

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

function filterBusinesses(query: string): Business[] {
  const q = normalize(query);
  if (!q) return [];
  return (businessesData as Business[]).filter((b) =>
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

function filterServices(query: string): ServiceResult[] {
  const q = normalize(query);
  if (!q) return [];
  return serviceTypes.filter((s) =>
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

  const results: SearchResults = useMemo(() => {
    const q = normalize(search);
    if (!q) return { businesses: [], services: [], hasResults: false };

    const businesses = filterBusinesses(q);
    const services = filterServices(q);

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