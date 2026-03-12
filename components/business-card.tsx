"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { getCategoryColor } from "@/lib/category-colors";

interface BusinessCardProps {
  id: number;
  businessName: string;
  ownerName: string;
  location: string;
  contactNumber: string;
  category: string;
  description?: string;
  rating?: number;
  reviews?: number;
  photos?: string[];
}

export function BusinessCard({
  id,
  businessName,
  ownerName,
  location,
  contactNumber,
  category,
  description,
  rating = 4.5,
  reviews = 0,
  photos = [],
}: BusinessCardProps) {
  const { t } = useLanguage();
  const colors = getCategoryColor(category);
  const photoUrl = photos?.[0] || "/placeholder-business.jpg";

  return (
    <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <Image
          src={photoUrl}
          alt={businessName}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Category Badge */}
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-bold backdrop-blur-sm"
          style={{ backgroundColor: colors.primary + "dd" }}
        >
          {category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-800 truncate group-hover:text-gray-900">
            {businessName}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{ownerName}</p>

          {/* Rating */}
          {rating > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 fill-gray-300"
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-600">({reviews} reviews)</span>
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {description}
          </p>
        )}

        {/* Location */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start gap-2 text-sm text-gray-700">
            <svg className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="truncate">{location}</span>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.346.766.834 1.554 1.548 2.267 1.31 1.31 2.834 2.076 3.924 2.267l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 4 14.18 4 9.5V5a1 1 0 01-1-1H3a1 1 0 01-1-1V3z" />
            </svg>
            <a href={`tel:${contactNumber}`} className="font-medium transition-colors" style={{ color: colors.primary }}>
              {contactNumber}
            </a>
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/business/${id}`}>
          <button
            className="w-full text-white font-medium py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: colors.primary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(1)";
            }}
          >
            {t("viewDetails")}
          </button>
        </Link>
      </div>
    </div>
  );
}
