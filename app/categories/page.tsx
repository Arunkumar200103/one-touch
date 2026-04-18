import React from 'react';
import Link from 'next/link';
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CategoryIcon } from "@/components/category-icons";
const allCategories = [
  { name: "Electronics", bg: "bg-blue-50 group-hover:bg-blue-100" },
  { name: "CCTV & Networking", bg: "bg-red-50 group-hover:bg-red-100" },
  { name: "Furniture", bg: "bg-amber-50 group-hover:bg-amber-100" },
  { name: "Construction", bg: "bg-orange-50 group-hover:bg-orange-100" },
  { name: "Fabrication", bg: "bg-zinc-100 group-hover:bg-zinc-200" },
  { name: "Technology", bg: "bg-indigo-50 group-hover:bg-indigo-100" },
  { name: "Education", bg: "bg-emerald-50 group-hover:bg-emerald-100" },
  { name: "Finance", bg: "bg-green-50 group-hover:bg-green-100" },
  { name: "Real Estate", bg: "bg-teal-50 group-hover:bg-teal-100" },
  { name: "Restaurants", bg: "bg-orange-50 group-hover:bg-orange-100" },
  { name: "Beauty Spa", bg: "bg-pink-50 group-hover:bg-pink-100" },
  { name: "Home Decor", bg: "bg-purple-50 group-hover:bg-purple-100" },
  { name: "Wedding", bg: "bg-rose-50 group-hover:bg-rose-100" },
  { name: "Rent & Hire", bg: "bg-sky-50 group-hover:bg-sky-100" },
  { name: "Hotels", bg: "bg-blue-50 group-hover:bg-blue-100" },
  { name: "Automotive", bg: "bg-slate-100 group-hover:bg-slate-200" },
  { name: "Health & Wellness", bg: "bg-red-50 group-hover:bg-red-100" },
  { name: "Events", bg: "bg-violet-50 group-hover:bg-violet-100" },
  { name: "Entertainment", bg: "bg-fuchsia-50 group-hover:bg-fuchsia-100" },
  { name: "Legal", bg: "bg-slate-100 group-hover:bg-slate-200" },
];

export default function CategoriesPage() {
  return (
    <main className="bg-[#f8f9fc] min-h-screen relative overflow-hidden flex flex-col">
      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="flex-1">
        <section className="bg-[#181E4B] py-16 md:py-24 text-center px-4 relative overflow-hidden">
          {/* Decorative Plus Grid watermark */}
          <svg width="200" height="200" viewBox="0 0 100 100" className="absolute top-0 right-0 -z-0 translate-x-12 -translate-y-12 opacity-10 hidden md:block">
            <pattern id="plus-categories" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </pattern>
            <rect width="100" height="100" fill="url(#plus-categories)" className="text-white" />
          </svg>
          <svg width="200" height="200" viewBox="0 0 100 100" className="absolute bottom-0 left-0 -z-0 -translate-x-12 translate-y-12 opacity-10 hidden md:block">
            <rect width="100" height="100" fill="url(#plus-categories)" className="text-white" />
          </svg>

          <div className="relative z-10">
            <p className="text-[#06B6D4] font-semibold text-sm md:text-base tracking-widest uppercase mb-3">DIRECTORY</p>
            <h1 className="text-white text-3xl md:text-5xl font-serif font-bold tracking-tight mb-5">
              All Services & Categories
            </h1>
            <p className="text-[#A0A4B8] text-sm md:text-base max-w-xl mx-auto">
              Explore our comprehensive directory of professionals and local businesses carefully curated to fit your everyday needs.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
            {allCategories.map((item, i) => (
              <Link href={`/category/${encodeURIComponent(item.name)}`} key={i}>
                <div className="bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-300 rounded-[28px] p-6 md:p-8 flex flex-col items-center justify-center text-center cursor-pointer border border-transparent hover:border-gray-100 group h-full">
                  <div className={`w-20 h-20 md:w-[96px] md:h-[96px] flex items-center justify-center rounded-2xl md:rounded-[24px] mb-4 md:mb-5 transition-transform duration-500 group-hover:scale-110 shadow-sm border border-orange-50 bg-[#FFF1DA]`}>
                    <CategoryIcon name={item.name} size={76} className="transition-transform group-hover:-translate-y-1 duration-300" />
                  </div>
                  <h3 className="text-[#181E4B] font-bold text-sm md:text-base mb-1">
                    {item.name}
                  </h3>
                  <p className="text-[#5E6282] text-[10px] sm:text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    View providers ➔
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
