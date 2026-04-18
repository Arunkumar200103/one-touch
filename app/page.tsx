"use client";

import { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
import { useLocation } from "@/lib/location-context"
import { useSearch, SearchResults } from "@/lib/search-context";
import Adssection from "@/components/Adssection";
import { Footer } from "@/components/footer";
import { CategoryIcon } from "@/components/category-icons";
import {
  FiSmartphone, FiVideo, FiHome, FiTool, FiMonitor,
  FiBookOpen, FiDollarSign, FiBriefcase, FiAperture,
  FiWind, FiGift, FiTruck, FiCoffee,
  FiSettings, FiActivity, FiStar, FiMusic, FiShield,
  FiHeart
} from "react-icons/fi";
import { MdOutlineCleaningServices, MdOutlineRealEstateAgent } from "react-icons/md";
import { FaRegBuilding, FaRegHospital } from "react-icons/fa";

interface Slide {
  title: string
  subtitle: string
  image: string
  cta: string
  accent: string
  category: string
}

const featuredServices: Slide[] = [
  {
    title: "constructionTitle",
    subtitle: "constructionSub",
    image: "/banners/construction-banner.jpg",
    cta: "getQuote",
    accent: "#f97316",
    category: "Construction"
  },
  {
    title: "cctvTitle",
    subtitle: "cctvSub",
    image: "/banners/cctv-banner.jpg",
    cta: "contactNow",
    accent: "#ef4444",
    category: "CCTV & Networking"
  },
  {
    title: "furnitureTitle",
    subtitle: "furnitureSub",
    image: "/banners/furniture-banner.jpg",
    cta: "explore",
    accent: "#eab308",
    category: "Furniture"
  }
];



export const allCategories = [
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

const serviceCategories = [
  { name: "Fabrication", subtitle: "quickQuotes", gradient: "from-blue-600 to-blue-800", icon: <FiBriefcase />, image: "/banners/fabrication-banner.jpg", Category: "Fabrication" },
  { name: "repairs", subtitle: "getNearest", gradient: "from-slate-700 to-slate-900", icon: <FiTool />, image: "/businesses/electronics-1.jpg", Category: "Electronics" },
  { name: "Real Estate", subtitle: "finestAgents", gradient: "from-violet-600 to-purple-800", icon: <MdOutlineRealEstateAgent />, image: "/businesses/furniture-1.jpg", Category: "Real Estate" },
  { name: "Education", subtitle: "bookNow", gradient: "from-emerald-500 to-green-700", icon: <FiBookOpen />, image: "/businesses/education-1.jpg", Category: "Education" }
];

const testimonials = [
  { name: "Priya Sharma", city: "Mumbai", text: "Found an amazing interior designer within 10 minutes. Super smooth experience!", rating: 5, service: "Home Decor", avatar: "PS" },
  { name: "Rahul Mehta", city: "Bangalore", text: "The packers & movers I found here were professional and on time. Highly recommended.", rating: 5, service: "Packers & Movers", avatar: "RM" },
  { name: "Ananya Iyer", city: "Chennai", text: "Booked a doctor consultation same day. The platform is incredibly easy to use.", rating: 4, service: "Healthcare", avatar: "AI" },
  { name: "Vijay Nair", city: "Hyderabad", text: "Listed my business and got leads within the first week. Excellent ROI.", rating: 5, service: "Business Listing", avatar: "VN" },
  { name: "Sneha Reddy", city: "Pune", text: "The CCTV installation team was fantastic. Got everything set up in one day!", rating: 5, service: "CCTV & Networking", avatar: "SR" },
  { name: "Arjun Das", city: "Delhi", text: "Best platform for finding reliable contractors. Saved me so much time and money.", rating: 5, service: "Construction", avatar: "AD" },
  { name: "Meera Krishnan", city: "Kochi", text: "Found the perfect wedding planner through this platform. Everything was magical!", rating: 5, service: "Wedding", avatar: "MK" },
  { name: "Karthik Rajan", city: "Coimbatore", text: "The furniture customization service I found here exceeded all my expectations.", rating: 4, service: "Furniture", avatar: "KR" },
];



const IMG = {
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=85",
  spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=85",
  doctor: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=85",
  interior: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=85",
  wedding: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=85",
  tech: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=85",
  movers: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85",
  fitness: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=85",
  food: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&q=85",
  auto: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=700&q=85",
  app: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=85",
};

const IC = { northeast: "→", check: "✓" };




interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
}

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, []);
  return { ref, vis };
}

export default function LandingPageV2({ slides = featuredServices }: { slides?: Slide[] }) {
  const { location } = useLocation()
  const { t } = useLanguage();
  const { search, results } = useSearch();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const scrollTo = (index: number) => emblaApi && emblaApi.scrollTo(index);
  const onSelect = () => { if (!emblaApi) return; setSelectedIndex(emblaApi.selectedScrollSnap()); };

  const [city, setCity] = useState("Mumbai");
  const r4 = useReveal(), r7 = useReveal();
  const hoverIn = (e: any) => { e.currentTarget.style.color = "#1A56DB"; };
  const hoverOut = (e: any) => { e.currentTarget.style.color = "#6B7280"; };

  const filteredCategories = allCategories.filter((cat) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return cat.name.toLowerCase().includes(q);
  });

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    const autoplay = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return

    const scrollAmount = 300
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <main className="bg-[#f8f9fc] min-h-screen relative overflow-hidden">
      {/* Background Decor for Hero */}
      <div className="absolute top-[-5%] right-[-10%] md:right-[-5%] pointer-events-none z-0">
        <svg viewBox="0 0 705 724" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[350px] md:w-[500px] lg:w-[705px] h-auto">
          <defs>
            <linearGradient id="hero-shape-gradient" x1="0" y1="0" x2="705" y2="724" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3B82F6" stopOpacity="0.08" />
              <stop offset="1" stopColor="#06B6D4" stopOpacity="0.12" />
            </linearGradient>
          </defs>
          <path d="M22.3069 222C-18.0931 153.2 5.4736 13.3333 22.3069 -48L701.807 -149L766.307 122.5L727.807 723.5C649.14 724.5 473.707 717 401.307 679C310.807 631.5 351.807 555 276.807 515C201.807 475 244.807 369.5 218.807 329.5C192.807 289.5 72.8069 308 22.3069 222Z" fill="url(#hero-shape-gradient)" />
        </svg>
      </div>

      <div className="relative z-50">
        <Navbar />
      </div>

      {/* ── FEATURED SERVICES ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-20 mt-6 md:mt-15 relative z-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <div>
            <h2 className="text-[#181E4B] font-serif text-3xl sm:text-4xl md:text-[50px] font-bold leading-[1.2] tracking-tight mb-2 md:mb-4">
              {t("featured")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]">
                {t("services")}
              </span>
            </h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
              {t("featuredDesc")}
            </p>
          </div>
          <Link href="/categories" className="text-xs md:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            {t("viewAll")} →
          </Link>
        </div>

        {/* GRID — stacked on mobile, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 lg:items-stretch">

          {/* CAROUSEL */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="relative flex-grow flex flex-col">
              <div className="overflow-hidden rounded-2xl md:rounded-3xl shadow-lg flex-grow" ref={emblaRef}>
                <div className="flex h-full">
                  {slides.map((slide, index) => (

                    <Link
                      key={index}
                      href={`/category/${encodeURIComponent(slide.category)}`}
                      className="min-w-full block h-full"
                    >
                      <div className="relative h-[240px] sm:h-[300px] lg:h-full lg:min-h-[320px] w-full">

                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                        />

                        <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-between">

                          <div>
                            <p className="text-xs font-bold text-white uppercase tracking-wider">
                              {t("featured")}
                            </p>

                            <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white mt-1">
                              {t(slide.title)}
                            </h3>
                          </div>

                          <button
                            className="w-fit bg-orange-500 hover:bg-orange-600 text-white px-5 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold transition active:scale-95"
                          >
                            {t(slide.cta)}
                          </button>

                        </div>
                      </div>
                    </Link>

                  ))}
                </div>
              </div>
              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4 shrink-0">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${index === selectedIndex ? "bg-orange-500 w-6" : "bg-gray-300 w-2"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* SERVICE CATEGORY CARDS — compact 2x2 on mobile, larger 2-col grid on lg */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 lg:gap-5 h-full">
            {serviceCategories.map((service) => (
              <Link
                key={service.name}
                href={`/category/${encodeURIComponent(service.Category)}`}
                className="block h-full"
              >
                <div
                  className={`relative h-[130px] sm:h-[160px] lg:h-full min-h-[130px] rounded-xl lg:rounded-2xl overflow-hidden shadow-md bg-gradient-to-br ${service.gradient} text-white cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]`}
                >
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                  />

                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  <div className="relative flex flex-col justify-between h-full p-4 lg:p-6">
                    <div className="flex items-start justify-between">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-lg sm:text-xl lg:text-2xl">
                        {service.icon}
                      </div>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-xs">→</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-[13px] sm:text-sm lg:text-lg leading-tight drop-shadow-sm">
                        {t(service.name)}
                      </h3>
                      <p className="text-[10px] sm:text-xs opacity-80 mt-0.5 lg:mt-1 drop-shadow-sm">
                        {t(service.subtitle)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>


      {/* ── POPULAR NEAR SECTIONS (Figma Design)  ── */}
      <section className="bg-white py-12 md:py-24 border-y border-gray-100 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-16 relative">
            <div className="text-center sm:text-left relative z-20">
              <p className="text-[#5E6282] font-semibold text-sm md:text-base tracking-widest uppercase mb-2">
                {t("services")}
              </p>
              <h2 className="text-[#181E4B] font-serif text-3xl sm:text-4xl md:text-[50px] font-bold leading-[1.2] tracking-tight">
                {t("popularNear")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]">
                  {t(location)}
                </span>
              </h2>
            </div>

            {/* Desktop "See all" Arrow Button */}
            <div className="hidden sm:block pb-2 relative z-20">
              <Link href="/categories" className="text-[13px] md:text-sm font-semibold text-[#5E6282] hover:text-[#181E4B] transition-colors flex gap-2 items-center group">
                See all category <span className="text-[#DF6951] w-6 h-6 flex items-center justify-center transition-transform group-hover:translate-x-1 text-xl">→</span>
              </Link>
            </div>

            {/* Plus Grid Decoration */}
            <svg width="100" height="100" viewBox="0 0 100 100" className="absolute top-0 right-0 -z-10 translate-x-4 -translate-y-4 md:translate-x-12 md:-translate-y-8 opacity-50 hidden sm:block">
              <pattern id="plus" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10 5V15M5 10H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </pattern>
              <rect width="100" height="100" fill="url(#plus)" className="text-[#E0E0E0]" />
            </svg>
          </div>

          {/* MOBILE SCROLL CONTROLS */}
          <div className="relative md:hidden mt-6">
            <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden sm:block">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hidden sm:block">
              <ChevronRight size={18} />
            </button>
            {/* SCROLL AREA */}
            <div ref={scrollRef} className="overflow-x-auto scrollbar-hide py-4 px-2">
              <div className="flex gap-4 w-max pr-10">
                {(filteredCategories.length > 0 ? filteredCategories : allCategories).map((cat: any) => (
                  <Link key={cat.name} href={`/category/${encodeURIComponent(cat.name)}`} className="flex flex-col items-center gap-3 group cursor-pointer w-[90px]">
                    <div className="w-[76px] h-[76px] flex items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-md border border-gray-100 bg-[#FFF1DA]">
                      <CategoryIcon name={cat.name} size={64} className="transition-transform duration-500 group-hover:scale-110 drop-shadow-sm" />
                    </div>
                    <p className="text-[11px] font-bold text-[#181E4B] text-center leading-tight">
                      {t(cat.name)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* DESKTOP GRID */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-6">
            {(filteredCategories.length > 0 ? filteredCategories : allCategories).slice(0, 8).map((item: any, i: number) => (
              <Link href={`/category/${encodeURIComponent(item.name)}`} key={i}>
                <div className="relative group cursor-pointer p-4 h-full">
                  {/* Backing shape on hover */}
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#DF6951] rounded-tl-3xl rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

                  {/* Main Card */}
                  <div className="relative bg-transparent group-hover:bg-white rounded-[36px] p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] h-full z-10 border border-transparent group-hover:border-white">

                    {/* Icon Container */}
                    <div className="relative w-[96px] h-[96px] mb-4 md:mb-6 flex items-center justify-center">
                      <div className="absolute bottom-[-10px] right-[-10px] w-14 h-14 bg-[#FFF1DA] rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm z-0 transition-transform group-hover:scale-110 duration-300" />
                      <CategoryIcon name={item.name} size={80} className="drop-shadow-sm relative z-10 transition-transform group-hover:-translate-y-1 duration-300" />
                    </div>

                    <h3 className="text-[#181E4B] font-bold text-lg md:text-[20px] mb-3">{item.name}</h3>
                    <p className="text-[#5E6282] text-sm leading-[1.6] font-medium">
                      Find the best {item.name.toLowerCase()} services trusted by thousands of customers near you.
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>



      <Adssection />


      {/* ── TOP PICKS BENTO ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <p className="text-[10px] md:text-[11px] font-bold tracking-[2px] uppercase text-amber-500 mb-2">{t("editorsPick")}</p>
            <h2 className="text-[#181E4B] font-serif text-3xl sm:text-4xl md:text-[50px] font-bold leading-[1.2] tracking-tight">
              {t("topPicks")}<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]">{t("thisWeek")}</span>
            </h2>
          </div>
          <a href="#" className="text-xs md:text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors flex gap-1 items-center" onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            See all {IC.northeast}
          </a>
        </div>

        {/* BENTO — responsive: stacked on mobile, grid on md+ */}
        <div className="hidden md:grid grid-cols-4 gap-4" style={{ gridTemplateRows: "256px 216px" }}>
          {/* Big: GV Buildtech */}
          <div className="col-span-2 row-span-1 rounded-3xl relative cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
            <img src="/businesses/gvbuildtech.png" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,20,.72)] via-[rgba(13,13,20,.06)] to-transparent rounded-[20px]" />
            <div className="absolute top-4 left-4">
              <span className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-white/90 text-gray-900">✦ {t("editorsPick")}</span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
              <div>
                <div className="text-[10px] font-bold tracking-[1.5px] text-white/50 mb-1.5 uppercase">{t("Construction")} · {t("Chennai")}</div>
                <div className="text-white font-extrabold text-xl">{t("GV Buildtech")}</div>
                <div className="text-white/50 text-sm mt-1">4.9 ★ · 1,240 {t("reviews_count")}</div>
              </div>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold px-4 py-2 rounded-xl transition">{t("bookNow")}</button>
            </div>
          </div>

          <BentoCard img="/businesses/techsolutions.png" title="Tech Solutions" sub="Technology · 4.8 ★" badge="Top Rated" badgeColor="bg-amber-100/90 text-amber-700" />
          <BentoCard img="/businesses/doctor-1.jpg" title="GreenHeal Clinic" sub="Healthcare · 4.9 ★" />

          <BentoCard img="/businesses/wood.png" title="Wood & Decor" sub="Furniture · 4.7 ★ · Verified" />

          {/* Wide: Raanuva Veeran Academy */}
          <div className="col-span-2 row-span-1 rounded-3xl relative cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
            <img src="/businesses/raanuvan.png" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,20,.78)] to-[rgba(13,13,20,.1)]" />
            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
              <div>
                <div className="text-[10px] font-bold text-white/45 mb-1.5 tracking-[1.5px] uppercase">{t("Education")} · {t("Chennai")}</div>
                <div className="text-white font-bold text-lg">{t("Raanuva Veeran Academy")}</div>
              </div>
              <div className="text-right">
                <div className="font-serif text-2xl text-amber-400">4.9★</div>
                <div className="text-[11px] text-white/45">850 {t("reviews_count")}</div>
              </div>
            </div>
          </div>

          <BentoCard img="/businesses/baas.png" title="BAAS Fabrication" sub="Fabrication · 4.8 ★" />
        </div>

        {/* Mobile bento — horizontal scroll cards */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto flex gap-3 pb-2 snap-x snap-mandatory scrollbar-hide">
          {[
            { img: "/businesses/gvbuildtech.png", title: "GV Buildtech", sub: "Construction · 4.9 ★", badge: "Editor's Choice" },
            { img: "/businesses/techsolutions.png", title: "Tech Solutions", sub: "Technology · 4.8 ★" },
            { img: "/businesses/doctor-1.jpg", title: "GreenHeal Clinic", sub: "Healthcare · 4.9 ★" },
            { img: "/businesses/wood.png", title: "Wood & Decor", sub: "Furniture · 4.7 ★" },
            { img: "/businesses/raanuvan.png", title: "Raanuva Veeran Academy", sub: "Education · 4.9 ★" },
            { img: "/businesses/baas.png", title: "BAAS Fabrication", sub: "Fabrication · 4.8 ★" },
          ].map((item, i) => (
            <div key={i} className="snap-start shrink-0 w-56 h-64 rounded-2xl relative overflow-hidden shadow-md cursor-pointer">
              <img src={item.img} alt={t(item.title)} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              {item.badge && (
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-gray-900">{t(item.badge)}</span>
                </div>
              )}
              <div className="absolute bottom-4 left-4">
                <div className="text-white font-bold text-sm">{t(item.title)}</div>
                <div className="text-white/60 text-xs mt-1">{t(item.sub)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CITY GRID ──
      <section ref={r4.ref} className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="text-center mb-8 md:mb-14">
          <p className="text-[10px] md:text-[11px] font-bold tracking-[2px] uppercase text-green-600 mb-2 md:mb-3">Pan-India Coverage</p>
          <h2 className="font-serif text-[clamp(22px,4vw,52px)] leading-tight tracking-[-1px] text-gray-900">
            Live in{" "}
            <span className="italic bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">950+ cities</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {CITIES.map((c, i) => (
            <div
              key={c.name}
              onClick={() => setCity(c.name)}
              className={`relative cursor-pointer rounded-xl overflow-hidden group ${city === c.name ? "ring-2 ring-gray-900" : ""}`}
            >
              <img src={c.img} alt={c.name} className="w-full h-[130px] md:h-[200px] object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className={`absolute inset-0 transition ${city === c.name ? "bg-black/60" : "bg-black/40 group-hover:bg-black/50"}`} />
              {city === c.name && (
                <div className="absolute top-2 right-2 md:top-3 md:right-3 w-6 h-6 md:w-7 md:h-7 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs">
                  {IC.check}
                </div>
              )}
              <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                <div className="font-extrabold text-base md:text-xl text-white tracking-tight">{t(c.name)}</div>
                <div className="text-[10px] md:text-xs text-white/70 font-medium mt-0.5">{c.biz} {t("businesses")}</div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ── TESTIMONIALS (Figma Design) ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 sm:py-16 md:py-24 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">

          {/* Left Column */}
          <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
            <p className="text-[#5E6282] font-semibold text-xs sm:text-sm md:text-base tracking-widest uppercase mb-2 sm:mb-4">{t("TESTIMONIALS")}</p>
            <h2 className="text-[#181E4B] font-serif text-3xl sm:text-4xl md:text-[50px] font-bold leading-[1.2] tracking-tight mb-6 md:mb-16">
              What People Say About Us.
            </h2>
            <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-6">
              {testimonials.slice(0, 3).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${activeTestimonial % 3 === i ? "bg-[#39425D]" : "bg-[#E5E5E5]"
                    }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="relative min-h-[250px] sm:min-h-[300px] flex flex-col justify-center lg:justify-start lg:pl-10 mt-6 md:mt-0">

            {/* Testimonial Cards Stack */}
            <div className="relative w-[calc(100%-16px)] sm:w-[85%] max-w-[500px] mx-auto lg:mx-0">

              {/* Background Card */}
              <div className="absolute top-4 left-4 sm:top-10 sm:left-10 md:top-16 md:left-16 w-full h-full bg-white rounded-[10px] border-2 border-[#F7F7F7] z-0 transition-all duration-500 font-sans p-5 sm:p-6 md:p-8 flex flex-col justify-end">
                <h4 className="text-[#5E6282] font-semibold opacity-60 text-sm md:text-base">{testimonials[(activeTestimonial + 1) % testimonials.length].name}</h4>
                <p className="text-[#5E6282] text-[10px] md:text-xs font-medium opacity-60">{testimonials[(activeTestimonial + 1) % testimonials.length].city}, {testimonials[(activeTestimonial + 1) % testimonials.length].service}</p>
              </div>

              {/* Foreground Card */}
              <div className="relative bg-white rounded-[10px] p-5 pt-8 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:shadow-[0_40px_100px_rgba(0,0,0,0.06)] z-10 transition-all duration-500 w-full font-sans">
                {/* Avatar */}
                <div className="absolute -top-5 -left-3 sm:-top-6 sm:-left-6 md:-top-8 md:-left-8 w-12 h-12 sm:w-14 sm:h-14 md:w-[68px] md:h-[68px] rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shadow-md">
                  <img src={`https://ui-avatars.com/api/?name=${testimonials[activeTestimonial].avatar}&background=EBF4FF&color=3B82F6&size=150&bold=true`} alt="Avatar" className="w-full h-full object-cover" />
                </div>

                <p className="text-[#5E6282] font-medium leading-relaxed mb-4 md:mb-8 text-xs sm:text-sm md:text-base">
                  “{testimonials[activeTestimonial].text}”
                </p>

                <div>
                  <h4 className="text-[#5E6282] font-bold text-base sm:text-[18px]">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-[#5E6282] text-[11px] sm:text-sm font-medium mt-0.5">{testimonials[activeTestimonial].city}, {testimonials[activeTestimonial].service}</p>
                </div>
              </div>

              {/* Up/Down Controls (positioned on the right for desktop) */}
              <div className="absolute top-1/2 -translate-y-1/2 right-[-24px] md:right-[-60px] flex flex-col gap-6 hidden sm:flex z-20">
                <button onClick={prevTestimonial} className="text-[#E5E5E5] hover:text-[#39425D] transition-colors active:-translate-y-1"><ChevronUp size={28} strokeWidth={2.5} /></button>
                <button onClick={nextTestimonial} className="text-[#39425D] hover:text-[#181E4B] transition-colors active:translate-y-1"><ChevronDown size={28} strokeWidth={2.5} /></button>
              </div>
            </div>

            {/* Mobile Controls (below the cards) */}
            <div className="flex sm:hidden justify-center gap-6 mt-10">
              <button onClick={prevTestimonial} className="text-[#39425D] hover:text-[#181E4B] transition-colors p-2 bg-white shadow-sm border border-gray-100 rounded-full active:scale-95"><ChevronLeft size={20} strokeWidth={2.5} /></button>
              <button onClick={nextTestimonial} className="text-[#39425D] hover:text-[#181E4B] transition-colors p-2 bg-white shadow-sm border border-gray-100 rounded-full active:scale-95"><ChevronRight size={20} strokeWidth={2.5} /></button>
            </div>

          </div>
        </div>
      </section>

      {/* ── LIST YOUR BUSINESS CTA ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-16">
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute bottom-0 left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-xl" />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-7 md:p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-[10px] md:text-xs font-bold tracking-widest text-blue-200 uppercase mb-2 md:mb-3">{t("forBusinessOwners")}</p>
              <h2 className="font-serif text-[clamp(28px,4vw,44px)] font-bold leading-[1.2] tracking-tight text-white mb-3 md:mb-4">
                {t("connectWith")} <span className="text-yellow-400">{t("buyersCount")}</span> {t("buyersLabel")}
              </h2>
              <p className="text-blue-100 mb-5 md:mb-8 text-sm md:text-base">{t("growBizDesc")}</p>
              <div className="flex flex-wrap gap-3 md:gap-4 mb-5 md:mb-8">
                {[t("freeListing"), t("instantLeads"), t("verifiedBadge")].map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-xs md:text-sm text-blue-100">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
              <button className="self-start bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-blue-900 font-black px-4 md:px-8 py-2 md:py-3.5 rounded-xl text-[10px] sm:text-xs md:text-base transition-all shadow-lg shadow-yellow-400/30 whitespace-nowrap sm:whitespace-normal">
                {t("listYourBiz")}
              </button>
            </div>
            <div className="relative hidden md:block min-h-64">
              <Image src="/businesses/tech-1.jpg" alt="Business Growth" fill className="object-cover opacity-60" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-3 md:gap-4 p-6 md:p-8">
                  {["500+ New Leads/Day", "4.8★ Avg Rating", "2M+ Monthly Searches", "100% Free Signup"].map((s) => (
                    <div key={s} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-[10px] md:text-xs font-bold text-center">{s}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APP SECTION ── */}
      <section ref={r7.ref} className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-[88px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-[80px] items-center">
          <div>
            <p className="text-[10px] md:text-[11px] font-bold tracking-[2px] uppercase text-blue-600 mb-2 md:mb-3">Mobile App</p>
            <h2 className="text-[#181E4B] font-serif text-3xl sm:text-4xl md:text-[50px] font-bold leading-[1.2] tracking-tight mb-4 md:mb-6">
              Search smarter <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]">on the go</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 md:mb-9 max-w-[400px]">
              Real-time quotes, instant bookings, and app-only deals. 50M+ downloads across India.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 mb-6 md:mb-9">
              {[[t("downloads"), t("downloads")], [t("appStore"), t("appStore")], [t("playStore"), t("playStore")], [t("support"), t("support")]].map(([value, label]) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3 md:p-4 border border-gray-200">
                  <div className="font-serif text-xl md:text-2xl text-gray-900">{value}</div>
                  <div className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-1">{label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              {[["🍎", "App Store", t("Download on the")], ["▶", "Google Play", t("Get it on")]].map(([icon, label, sub]) => (
                <button key={label as string} className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <span className="text-lg md:text-xl">{icon}</span>
                  <div className="text-left">
                    <div className="text-[9px] md:text-[10px] text-gray-500 font-medium">{sub}</div>
                    <div className="text-xs md:text-sm font-bold text-gray-900">{t(label as string)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[20px] md:rounded-[28px] overflow-hidden shadow-[0_30px_72px_-14px_rgba(13,13,20,.16)]">
              <img src={IMG.app} alt="app" className="w-full h-[240px] sm:h-[320px] md:h-[440px] object-cover block" />
            </div>
            <div className="absolute bottom-[-16px] md:bottom-[-22px] left-3 md:left-[-24px] bg-white border border-gray-200 rounded-xl px-4 md:px-5 py-3 md:py-4 flex items-center gap-2 md:gap-3 shadow-[0_20px_48px_-8px_rgba(13,13,20,.13)]">
              <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg bg-gray-900 flex items-center justify-center text-lg md:text-xl text-white">⚡</div>
              <div>
                <div className="font-bold text-xs md:text-sm text-gray-900">Instant Booking</div>
                <div className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">Confirmed in under 60 seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }

        /* Cleaned up testimonial infinite marquee from previous implementation */
      `}</style>
    </main>
  );
}

/* ── Reusable sub-components ── */

function BentoCard({ img, title, sub, badge, badgeColor }: {
  img: string; title: string; sub: string; badge?: string; badgeColor?: string;
}) {
  const { t } = useLanguage();
  return (
    <div className="col-span-1 row-span-1 rounded-3xl relative cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
      <img src={img} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,20,.75)] to-transparent" />
      {badge && (
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${badgeColor ?? "bg-white/90 text-gray-900"}`}>{t(badge)}</span>
        </div>
      )}
      <div className="absolute bottom-4 left-4">
        <div className="text-white font-bold text-sm md:text-base">{t(title)}</div>
        <div className="text-white/50 text-xs mt-1">{t(sub)}</div>
      </div>
    </div>
  );
}

/* TestimonialCard removed in favor of Figma design */