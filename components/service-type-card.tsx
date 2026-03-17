"use client";

import { useRouter } from "next/navigation";
import { ServiceType } from "@/lib/service-types";
import { getCategoryColor } from "@/lib/category-colors";
import businesses from "@/lib/businesses.json";

interface ServiceTypeCardProps {
  service: ServiceType;
}

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
      router.push(
        `/businesses?category=${encodeURIComponent(service.category)}&service=${encodeURIComponent(service.name)}`
      );
    }
  };

  return (
    <div
      onClick={handleGetService}
      className="group relative h-full flex flex-col bg-white/70 backdrop-blur-md rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2"
      style={{
        border: `1px solid ${colors.primary}20`,
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)",
      }}
    >
      {/* Animated Gradient Background Glow */}
      <div 
        className="absolute -top-[20%] -right-[10%] w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
        style={{ backgroundColor: colors.primary }}
      />

      <div className="p-7 flex flex-col h-full relative z-10">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          {/* Glassmorphic Icon Container */}
          <div
            className="w-16 h-16 flex items-center justify-center rounded-2xl text-3xl relative overflow-hidden transition-all duration-500 group-hover:shadow-lg group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${colors.light} 0%, white 100%)`,
              border: `1px solid ${colors.primary}30`,
            }}
          >
             {/* Icon Inner Glow */}
            <div className="absolute inset-0 opacity-20 bg-white group-hover:animate-pulse" />
            <span className="relative z-10 drop-shadow-sm">{service.icon}</span>
          </div>

          {/* Status Badge */}
          <div
            className="px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 backdrop-blur-xl"
            style={{
              backgroundColor: `${colors.primary}10`,
              color: colors.primary,
              border: `1px solid ${colors.primary}25`,
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`} style={{ backgroundColor: colors.primary }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: colors.primary }}></span>
            </span>
            {matches.length > 0 ? `${matches.length} Providers` : "New Service"}
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-grow">
          <h3 className="text-xl font-extrabold text-slate-900 mb-2 tracking-tight group-hover:text-black transition-colors">
            {service.name}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-6 font-medium">
            {service.description}
          </p>
        </div>

        {/* Pricing & Time Info Row */}
        <div className="flex items-center gap-3 mb-6">
           <div className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-50 border border-slate-100 text-[11px] font-bold text-slate-600">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {service.estimatedTime}
          </div>

          <div 
            className="flex items-center gap-1 px-3 py-2 rounded-2xl text-[11px] font-black"
            style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}
          >
            <span>₹</span>
            <span className="text-xs">{service.price.replace("₹", "").trim()}</span>
          </div>
        </div>

        {/* Modern Button */}
        <button
          className="group/btn w-full py-4 rounded-2xl text-white text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primary}ee 100%)`,
            boxShadow: `0 8px 20px -6px ${colors.primary}80`,
          }}
        >
          {matches.length === 1 ? "Book Session" : "Explore More"}
          <svg 
            className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth={3} 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}