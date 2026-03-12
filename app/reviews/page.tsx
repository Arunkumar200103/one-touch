"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { Breadcrumb } from "@/components/breadcrumb";
import { BackToHome } from "@/components/back-to-home";
import { getPageColor } from "@/lib/page-colors";
import businesses from "@/lib/businesses.json";
import Image from "next/image";

const colors = getPageColor("reviews");

type Review = {
  id: number;
  businessName: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  category: string;
};

const sampleReviews: Review[] = [
  {
    id: 1,
    businessName: "BuildRight Constructions",
    author: "Ramesh K.",
    rating: 5,
    date: "2 weeks ago",
    text: "Great work! They completed my house renovation on time and within budget.",
    category: "Construction",
  },
  {
    id: 2,
    businessName: "TechHub Electronics",
    author: "Priya S.",
    rating: 4,
    date: "1 month ago",
    text: "Fixed my laptop quickly. Good service but slightly expensive.",
    category: "Electronics",
  },
  {
    id: 3,
    businessName: "Bright Learning Academy",
    author: "Anu M.",
    rating: 5,
    date: "3 weeks ago",
    text: "My son's grades improved a lot. Great teachers!",
    category: "Education",
  },
  {
    id: 4,
    businessName: "SecureNet CCTV Solutions",
    author: "Vikram T.",
    rating: 4,
    date: "1 month ago",
    text: "Professional installation and support.",
    category: "CCTV & Networking",
  },
  {
    id: 5,
    businessName: "Premium Furniture Store",
    author: "Divya R.",
    rating: 5,
    date: "2 weeks ago",
    text: "Beautiful furniture and smooth delivery service.",
    category: "Furniture",
  },
];

export default function Reviews() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("recent");

  const categories = [
    "All",
    ...new Set((businesses as any[]).map((b) => b.category)),
  ];

  const filteredReviews = useMemo(() => {
    let result = [...sampleReviews];

    if (selectedCategory !== "All") {
      result = result.filter((r) => r.category === selectedCategory);
    }

    if (selectedRating > 0) {
      result = result.filter((r) => r.rating >= selectedRating);
    }

    if (sortBy === "highest") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "lowest") {
      result.sort((a, b) => a.rating - b.rating);
    }

    return result;
  }, [selectedCategory, selectedRating, sortBy]);

  const avgRating = (
    sampleReviews.reduce((sum, r) => sum + r.rating, 0) /
    sampleReviews.length
  ).toFixed(1);

  return (
    <main className={`min-h-screen bg-gradient-to-b ${colors.gradient}`}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-4">
        <BackToHome />
      </div>

      {/* Hero Section */}
      <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <Image
          src={colors.banner}
          alt="Reviews"
          fill
          className="object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center px-6">
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ color: colors.light }}
          >
            Customer Reviews
          </h1>

          <p className="text-xl text-gray-200">
            See what customers say about our trusted businesses.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-16">

        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Reviews" },
          ]}
          accentColor={colors.primary}
        />

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div
            className="p-6 rounded-2xl text-white text-center"
            style={{ backgroundColor: colors.primary }}
          >
            <div className="text-4xl font-bold">{sampleReviews.length}</div>
            <p className="text-white/80">Total Reviews</p>
          </div>

          <div className="p-6 rounded-2xl border-2 text-center"
               style={{ borderColor: colors.primary }}>

            <div className="text-3xl font-bold mb-2"
                 style={{ color: colors.primary }}>
              {avgRating}
            </div>

            <p className="text-gray-600">Average Rating</p>
          </div>

          <div
            className="p-6 rounded-2xl text-white text-center"
            style={{ backgroundColor: colors.primary }}
          >
            <div className="text-4xl font-bold">
              {(businesses as any[]).length}
            </div>
            <p className="text-white/80">Businesses Rated</p>
          </div>

        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-12">

          <h3
            className="text-lg font-bold mb-6"
            style={{ color: colors.primary }}
          >
            Filter Reviews
          </h3>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Category */}
            <div>
              <label className="block font-semibold mb-3">
                Service Category
              </label>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg"
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block font-semibold mb-3">
                Minimum Rating
              </label>

              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-lg"
              >
                <option value={0}>All Ratings</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4+ Stars</option>
                <option value={3}>3+ Stars</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block font-semibold mb-3">Sort By</label>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg"
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>

          </div>
        </div>

        {/* Reviews */}
        <div className="space-y-6">

          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (

              <div
                key={review.id}
                className="bg-white p-6 rounded-2xl shadow-md border-l-4"
                style={{ borderColor: colors.primary }}
              >

                <div className="flex justify-between mb-3">

                  <div>
                    <h3 className="font-bold text-lg">
                      {review.businessName}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {review.author} • {review.date}
                    </p>
                  </div>

                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < review.rating ? "⭐" : "☆"}
                      </span>
                    ))}
                  </div>

                </div>

                <p className="text-gray-700 leading-relaxed">
                  {review.text}
                </p>

              </div>

            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No reviews match your filters.
              </p>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}