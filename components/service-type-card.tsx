"use client";

import { ServiceType } from "@/lib/service-types";
import { getCategoryColor } from "@/lib/category-colors";

interface ServiceTypeCardProps {
  service: ServiceType;
}

export function ServiceTypeCard({ service }: ServiceTypeCardProps) {
  const colors = getCategoryColor(service.category);

  return (
    <div className="group h-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="p-6 flex flex-col h-full">
        {/* Header with Icon */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="text-4xl p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
            style={{ backgroundColor: colors.light }}
          >
            {service.icon}
          </div>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: colors.primary }}
          >
            Popular
          </span>
        </div>

        {/* Content */}
        <h3
          className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300"
          style={{ color: colors.primary }}
        >
          {service.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Details Grid */}
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center gap-3 text-sm">
            <svg className="w-5 h-5" style={{ color: colors.primary }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5" />
            </svg>
            <div>
              <p className="text-gray-500 text-xs">Time needed</p>
              <p className="font-semibold text-gray-800">{service.estimatedTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <svg className="w-5 h-5" style={{ color: colors.primary }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.5 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm3 8a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            <div>
              <p className="text-gray-500 text-xs">Estimated price</p>
              <p className="font-semibold text-gray-800">{service.price}</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          className="w-full py-2.5 rounded-lg text-white font-bold transition-all duration-300 hover:shadow-lg transform group-hover:translate-y-[-2px]"
          style={{ backgroundColor: colors.primary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = "brightness(0.9)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "brightness(1)";
          }}
        >
          Get Service
        </button>
      </div>
    </div>
  );
}
