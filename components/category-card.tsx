"use client";

import Link from "next/link";
import Image from "next/image";
import { getCategoryColor } from "@/lib/category-colors";

interface CategoryCardProps {
  name: string;
  icon: string;
  count: number;
}

const iconMap: { [key: string]: React.ReactNode } = {
  Construction: (
    <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v12.5A2.25 2.25 0 003.75 18.5h12.5a2.25 2.25 0 002.25-2.25V9.5M2 14h16M6 1.5v4M10 1.5v4M14 1.5v4" />
    </svg>
  ),
  Electronics: (
    <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 20 20">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
  ),
  Education: (
    <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  ),
  "CCTV & Networking": (
    <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 20 20">
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
  ),
  Furniture: (
    <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2H3V4zm0 4h14v9a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" />
    </svg>
  ),
  Technology: (
    <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 20 20">
      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
    </svg>
  ),
  Fabrication: (
    <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 20 20">
      <path d="M5 3a2 2 0 00-2 2v6h4V5a2 2 0 00-2-2zm0 8a2 2 0 00-2 2v2h4v-2a2 2 0 00-2-2zm7-8a2 2 0 00-2 2v6h4V5a2 2 0 00-2-2zm0 8a2 2 0 00-2 2v2h4v-2a2 2 0 00-2-2z" />
    </svg>
  ),
};

export function CategoryCard({ name, count }: CategoryCardProps) {
  const colors = getCategoryColor(name);

  return (
    <Link href={`/category/${encodeURIComponent(name)}`}>
      <div className="group h-full overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-100 bg-white">
        {/* Banner Image */}
        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.light})`
          }} />
          <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Image
              src={colors.banner}
              alt={name}
              fill
              className="object-cover group-hover:opacity-90 transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center justify-center gap-3 text-center">
          {/* Icon */}
          <div
            className="p-4 rounded-full transition-all duration-300 group-hover:scale-110"
            style={{
              color: colors.primary,
              backgroundColor: colors.light
            }}
          >
            {iconMap[name] || (
              <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            )}
          </div>

          {/* Text */}
          <div>
            <h3
              className="font-bold text-xl group-hover:scale-105 transition-transform duration-300"
              style={{ color: colors.primary }}
            >
              {name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {count} {count === 1 ? "business" : "businesses"}
            </p>
          </div>

          {/* Arrow */}
          <div
            className="mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1"
            style={{ color: colors.primary }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
