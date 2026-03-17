"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ServiceType } from "@/lib/service-types";
import { getCategoryColor } from "@/lib/category-colors";
import businesses  from "@/lib/businesses.json"; // your JSON data

interface ServiceTypeCardProps {
  service: ServiceType;
}

// Map service name → matching business IDs
function findMatchingBusinesses(service: ServiceType) {
  return businesses.filter(
    (b) =>
      b.category === service.category &&
      b.services.some((s) =>
        s.toLowerCase().includes(service.name.toLowerCase()) ||
        service.name.toLowerCase().includes(s.toLowerCase())
      )
  );
}

export function ServiceTypeCard({ service }: ServiceTypeCardProps) {
  const colors = getCategoryColor(service.category);
  const router = useRouter();
  const matches = findMatchingBusinesses(service);

  const handleGetService = () => {
    if (matches.length === 1) {
      router.push(`/business/${matches[0].id}`);
    } else {
      // Go to filtered businesses list
      router.push(
        `/businesses?category=${encodeURIComponent(service.category)}&service=${encodeURIComponent(service.name)}`
      );
    }
  };

  return (
    <div
      className="group relative h-full flex flex-col bg-white rounded-3xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)",
        border: "1.5px solid #f0f0f0",
        transition: "box-shadow 0.3s, transform 0.3s, border-color 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px 0 ${colors.primary}28`;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px) scale(1.01)";
        (e.currentTarget as HTMLDivElement).style.borderColor = colors.primary + "55";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px 0 rgba(0,0,0,0.07)";
        (e.currentTarget as HTMLDivElement).style.transform = "none";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#f0f0f0";
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.primary}88)`,
        }}
      />

      <div className="p-6 flex flex-col flex-grow">
        {/* Header Row */}
        <div className="flex items-start justify-between mb-5">
          {/* Icon */}
          <div
            className="w-14 h-14 flex items-center justify-center rounded-2xl text-3xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            style={{
              background: `linear-gradient(135deg, ${colors.light}, ${colors.primary}18)`,
              boxShadow: `0 4px 14px 0 ${colors.primary}22`,
            }}
          >
            {service.icon}
          </div>

          {/* Providers badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: colors.light,
              color: colors.primary,
              border: `1px solid ${colors.primary}30`,
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: colors.primary }}
            />
            {matches.length > 0
              ? `${matches.length} Provider${matches.length > 1 ? "s" : ""}`
              : "Available"}
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-lg font-bold mb-1.5 leading-snug"
          style={{ color: "#1a1a2e" }}
        >
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-5 leading-relaxed line-clamp-2 flex-grow">
          {service.description}
        </p>

        {/* Meta chips */}
        <div className="flex flex-wrap gap-2 mb-5">
          {/* Time chip */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
            style={{
              backgroundColor: "#f8f8f8",
              color: "#555",
            }}
          >
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" d="M12 6v6l4 2" />
            </svg>
            {service.estimatedTime}
          </div>

          {/* Price chip */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
            style={{
              backgroundColor: colors.light,
              color: colors.primary,
            }}
          >
            <span className="font-bold text-sm">₹</span>
            {service.price.replace("₹", "").trim()}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleGetService}
          className="w-full py-3 rounded-2xl text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}cc)`,
            boxShadow: `0 4px 15px 0 ${colors.primary}40`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 22px 0 ${colors.primary}60`;
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 15px 0 ${colors.primary}40`;
            (e.currentTarget as HTMLButtonElement).style.transform = "none";
          }}
        >
          {matches.length === 1 ? "View Provider" : "Find Providers"}
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}