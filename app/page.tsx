"use client";

import { useEffect, useState, useRef } from "react";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import useEmblaCarousel from "embla-carousel-react";

const locations = ["Mumbai", "Bangalore", "Delhi", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"];

const featuredServices = [
  { title: "PACKERS & MOVERS", subtitle: "Professional moving service", image: "/banners/construction-banner.jpg", cta: "GET BEST DEAL", accent: "#f97316" },
  { title: "RESTAURANTS", subtitle: "Delicious Food at Your Doorstep", image: "/banners/restaurants-banner.jpg", cta: "ORDER NOW", accent: "#ef4444" },
  { title: "HOME SERVICES", subtitle: "Trusted Professionals", image: "/banners/home-services-banner.jpg", cta: "GET QUOTE", accent: "#eab308" }
];

const serviceCategories = [
  { name: "B2B", subtitle: "Quick Quotes", gradient: "from-blue-600 to-blue-800", icon: "👔", image: "/businesses/construction-1.jpg" },
  { name: "Repairs & Services", subtitle: "Get Nearest Vendor", gradient: "from-slate-700 to-slate-900", icon: "🔧", image: "/businesses/electronics-1.jpg" },
  { name: "Real Estate", subtitle: "Finest Agents", gradient: "from-violet-600 to-purple-800", icon: "🏢", image: "/businesses/furniture-1.jpg" },
  { name: "Doctors", subtitle: "Book Now", gradient: "from-emerald-500 to-green-700", icon: "⚕️", image: "/businesses/doctor-1.png" }
];

const allCategories = [
  { name: "Restaurants", icon: "🍽️" },
  { name: "Hotels", icon: "🏨" },
  { name: "Beauty Spa", icon: "💅" },
  { name: "Furniture", icon: "🛋️" },
  { name: "Home Decor", icon: "🏠" },
  { name: "Wedding", icon: "💍" },
  { name: "CCTV & Networking", icon: "📹" },
  { name: "Education", icon: "🎓" },
  { name: "Rent & Hire", icon: "🚗" },
  { name: "Technology", icon: "💻" },
  { name: "Fabrication", icon: "⚙️" },
  { name: "Automotive", icon: "🚘" },
  { name: "Health & Wellness", icon: "🏥" },
  { name: "Events", icon: "🎉" },
  { name: "Construction", icon: "🏗️" },
  { name: "Finance", icon: "💰" },
  { name: "Entertainment", icon: "🎭" },
  { name: "Legal", icon: "⚖️" },
];

const testimonials = [
  { name: "Priya Sharma", city: "Mumbai", text: "Found an amazing interior designer within 10 minutes. Super smooth experience!", rating: 5, service: "Home Decor", avatar: "PS" },
  { name: "Rahul Mehta", city: "Bangalore", text: "The packers & movers I found here were professional and on time. Highly recommended.", rating: 5, service: "Packers & Movers", avatar: "RM" },
  { name: "Ananya Iyer", city: "Chennai", text: "Booked a doctor consultation same day. The platform is incredibly easy to use.", rating: 4, service: "Healthcare", avatar: "AI" },
  { name: "Vijay Nair", city: "Hyderabad", text: "Listed my business and got leads within the first week. Excellent ROI.", rating: 5, service: "Business Listing", avatar: "VN" },
];

const trendingSearches = [
  "AC Repair", "Home Cleaning", "Wedding Photographer", "Interior Designer", "Catering Service", "Yoga Classes", "Plumber", "Electrician"
];

const IMG = {
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=85",
  spa:        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=700&q=85",
  doctor:     "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=85",
  interior:   "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=85",
  wedding:    "https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=85",
  tech:       "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=85",
  movers:     "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85",
  fitness:    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=85",
  food:       "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&q=85",
  auto:       "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=700&q=85",
  app:        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=85",
  city1:      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500&q=75",
  city2:      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&q=75",
  city3:      "https://images.pexels.com/photos/29183751/pexels-photo-29183751.jpeg?w=500&q=75",
  city4:      "https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?w=500&q=75",
  city5:      "https://images.unsplash.com/photo-1560179406-1c6c60e0dc76?w=500&q=75",
  city6:      "https://images.pexels.com/photos/36065203/pexels-photo-36065203.jpeg?w=500&q=75",
};

const IC = { northeast: "→", check: "✓" };

const CITIES = [
  { name:"Mumbai",    biz:"8.2L", img: IMG.city1 },
  { name:"Delhi",     biz:"7.4L", img: IMG.city2 },
  { name:"Bangalore", biz:"6.1L", img: IMG.city3 },
  { name:"Hyderabad", biz:"4.8L", img: IMG.city4 },
  { name:"Chennai",   biz:"3.9L", img: IMG.city5 },
  { name:"Pune",      biz:"3.2L", img: IMG.city6 },
];

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
  const [selectedLocation, setSelectedLocation] = useState("Mumbai");
  const { t } = useLanguage();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = (index: number) => emblaApi && emblaApi.scrollTo(index);
  const onSelect = () => { if (!emblaApi) return; setSelectedIndex(emblaApi.selectedScrollSnap()); };

  const [city, setCity] = useState("Mumbai");
  const r4 = useReveal(), r7 = useReveal();
  const hoverIn  = (e: any) => { e.currentTarget.style.color = "#1A56DB"; };
  const hoverOut = (e: any) => { e.currentTarget.style.color = "#6B7280"; };

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    const autoplay = setInterval(() => emblaApi.scrollNext(), 4000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <main className="bg-[#f8f9fc] min-h-screen">
      <Navbar />

      {/* ── FEATURED SERVICES ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-20 mt-6 md:mt-15">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <div>
            <h2 className="font-serif text-[clamp(22px,4vw,52px)] leading-tight tracking-[-1px] text-gray-900">
              Featured{" "}
              <span className="italic bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-gray-500 text-xs md:text-sm mt-1">
              Discover top rated services near you
            </p>
          </div>
          <Link href="/services" className="text-xs md:text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all →
          </Link>
        </div>

        {/* GRID — stacked on mobile, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

          {/* CAROUSEL */}
          <div className="lg:col-span-1">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl md:rounded-3xl shadow-lg" ref={emblaRef}>
                <div className="flex">
                  {slides.map((slide, index) => (
                    <div key={index} className="min-w-full relative h-56 sm:h-72 md:h-80 lg:h-100 w-full">
                      <Image src={slide.image} alt={slide.title} fill className="object-cover" />
                      <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-between">
                        <div>
                          <p className="text-xs font-bold text-white uppercase tracking-wider">Featured</p>
                          <h3 className="text-xl md:text-2xl font-extrabold text-orange-500 mt-1">{slide.title}</h3>
                        </div>
                        <button className="w-fit bg-orange-500 hover:bg-orange-600 text-white px-5 md:px-6 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-semibold transition active:scale-95">
                          {slide.cta}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Dots */}
              <div className="flex justify-center gap-2 mt-3">
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

          {/* SERVICE CATEGORY CARDS — 2 cols on mobile, 2 cols on lg */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3 md:gap-5">
            {serviceCategories.map((service) => (
              <div
                key={service.name}
                className={`relative rounded-xl md:rounded-2xl overflow-hidden shadow-md bg-gradient-to-br ${service.gradient} text-white p-4 md:p-6 cursor-pointer group transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                <Image src={service.image} alt={service.name} fill className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                <div className="relative flex flex-col justify-between h-full min-h-[100px] md:min-h-[130px]">
                  <div className="text-2xl md:text-3xl">{service.icon}</div>
                  <div>
                    <h3 className="font-bold text-sm md:text-lg leading-tight">{service.name}</h3>
                    <p className="text-xs opacity-90 mt-0.5 md:mt-1">{service.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── TRENDING TAGS ── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-50 rounded-full opacity-60 blur-3xl pointer-events-none" />
        <div className="absolute top-20 -left-20 w-64 h-64 bg-orange-50 rounded-full opacity-50 blur-2xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-8 md:pt-12 md:pb-10">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">Trending</span>
            {trendingSearches.map((s) => (
              <button
                key={s}
                className="text-[11px] md:text-xs px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-gray-200 bg-white/70 backdrop-blur-md text-gray-600 font-medium hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="bg-white py-10 md:py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <div>
              <p className="text-[10px] md:text-xs font-bold tracking-widest text-blue-500 uppercase mb-1">All Services</p>
              <h2 className="font-serif text-[clamp(22px,3.5vw,48px)] leading-tight tracking-[-1px] text-gray-900 mb-3 md:mb-5">
                Popular Near{" "}
                <span className="italic bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {selectedLocation}
                </span>
              </h2>
            </div>
            <Link href="/categories" className="text-xs md:text-sm font-semibold text-blue-600 hover:underline whitespace-nowrap">Browse all →</Link>
          </div>

          {/* Mobile: 4 cols, tablet: 6, desktop: 9 */}
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-9 gap-2 md:gap-3">
            {allCategories.map((cat) => (
              <Link key={cat.name} href={`/category/${encodeURIComponent(cat.name)}`}>
                <div className="flex flex-col items-center gap-1 md:gap-2 p-2 md:p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-400 rounded-xl md:rounded-2xl transition-all duration-300 group cursor-pointer active:scale-95">
                  <span className="text-xl md:text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <p className="text-[9px] md:text-[11px] font-semibold text-gray-600 group-hover:text-blue-600 text-center leading-tight">{cat.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP PICKS BENTO ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <p className="text-[10px] md:text-[11px] font-bold tracking-[2px] uppercase text-amber-500 mb-2">Editor's Pick</p>
            <h2 className="font-serif text-[clamp(22px,4vw,50px)] leading-tight tracking-[-1px] text-gray-900">
              Top picks<br /><span className="italic bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">this week</span>
            </h2>
          </div>
          <a href="#" className="text-xs md:text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors flex gap-1 items-center" onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            See all {IC.northeast}
          </a>
        </div>

        {/* BENTO — responsive: stacked on mobile, grid on md+ */}
        <div className="hidden md:grid grid-cols-4 gap-4" style={{ gridTemplateRows: "256px 216px" }}>
          {/* Big */}
          <div className="col-span-2 row-span-1 rounded-3xl relative cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
            <img src={IMG.interior} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,20,.72)] via-[rgba(13,13,20,.06)] to-transparent rounded-[20px]" />
            <div className="absolute top-4 left-4">
              <span className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-white/90 text-gray-900">✦ Editor's Choice</span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
              <div>
                <div className="text-[10px] font-bold tracking-[1.5px] text-white/50 mb-1.5 uppercase">INTERIOR DESIGN · MUMBAI</div>
                <div className="text-white font-extrabold text-xl">EliteSpace Studio</div>
                <div className="text-white/50 text-sm mt-1">4.9 ★ · 2,340 reviews</div>
              </div>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold px-4 py-2 rounded-xl transition">Book Now</button>
            </div>
          </div>
          <BentoCard img={IMG.restaurant} title="The Grand Kitchen" sub="Restaurant · 4.8 ★" badge="Top Rated" badgeColor="bg-amber-100/90 text-amber-700" />
          <BentoCard img={IMG.doctor} title="GreenHeal Clinic" sub="Healthcare · 4.9 ★" />
          <BentoCard img={IMG.movers} title="SwiftMove Packers" sub="4.7 ★ · Verified" />
          {/* Wide auto */}
          <div className="col-span-2 row-span-1 rounded-3xl relative cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
            <img src={IMG.auto} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,20,.78)] to-[rgba(13,13,20,.1)]" />
            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end">
              <div>
                <div className="text-[10px] font-bold text-white/45 mb-1.5 tracking-[1.5px] uppercase">AUTOMOTIVE · HYDERABAD</div>
                <div className="text-white font-bold text-lg">AutoCare 360</div>
              </div>
              <div className="text-right">
                <div className="font-serif text-2xl text-amber-400">4.7★</div>
                <div className="text-[11px] text-white/45">1,540 reviews</div>
              </div>
            </div>
          </div>
          <BentoCard img={IMG.wedding} title="Wedding Bliss" sub="Event Planning · 4.8 ★" />
        </div>

        {/* Mobile bento — horizontal scroll cards */}
        <div className="md:hidden -mx-4 px-4 overflow-x-auto flex gap-3 pb-2 snap-x snap-mandatory scrollbar-hide">
          {[
            { img: IMG.interior, title: "EliteSpace Studio", sub: "Interior Design · 4.9 ★", badge: "Editor's Choice" },
            { img: IMG.restaurant, title: "The Grand Kitchen", sub: "Restaurant · 4.8 ★" },
            { img: IMG.doctor, title: "GreenHeal Clinic", sub: "Healthcare · 4.9 ★" },
            { img: IMG.movers, title: "SwiftMove Packers", sub: "Packers & Movers · 4.7 ★" },
            { img: IMG.auto, title: "AutoCare 360", sub: "Automotive · 4.7 ★" },
            { img: IMG.wedding, title: "Wedding Bliss", sub: "Event Planning · 4.8 ★" },
          ].map((item, i) => (
            <div key={i} className="snap-start shrink-0 w-56 h-64 rounded-2xl relative overflow-hidden shadow-md cursor-pointer">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              {item.badge && (
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-gray-900">{item.badge}</span>
                </div>
              )}
              <div className="absolute bottom-4 left-4">
                <div className="text-white font-bold text-sm">{item.title}</div>
                <div className="text-white/60 text-xs mt-1">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CITY GRID ── */}
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
                <div className="font-extrabold text-base md:text-xl text-white tracking-tight">{c.name}</div>
                <div className="text-[10px] md:text-xs text-white/70 font-medium mt-0.5">{c.biz} Businesses</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="text-center mb-8 md:mb-12">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 md:mb-3">Social Proof</p>
          <h2 className="font-serif text-[clamp(22px,4vw,52px)] leading-tight tracking-[-1px] text-gray-900">
            What Our Users{" "}
            <span className="italic bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="text-gray-500 mt-2 md:mt-3 max-w-xl mx-auto text-sm md:text-base">
            Thousands of people trust our platform to discover reliable local services.
          </p>
        </div>

        {/* Mobile: horizontal scroll; md+: grid */}
        <div className="hidden sm:grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => <TestimonialCard key={i} t={t} />)}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="sm:hidden -mx-4 px-4 overflow-x-auto flex gap-3 pb-2 snap-x snap-mandatory scrollbar-hide">
          {testimonials.map((t, i) => (
            <div key={i} className="snap-start shrink-0 w-72">
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </section>

      {/* ── LIST YOUR BUSINESS CTA ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-16">
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full" />
          <div className="absolute bottom-0 left-20 w-40 h-40 bg-blue-500/30 rounded-full blur-xl" />
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-7 md:p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-[10px] md:text-xs font-bold tracking-widest text-blue-200 uppercase mb-2 md:mb-3">For Business Owners</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-3 md:mb-4">
                Connect with <span className="text-yellow-300">18.4 Crore+</span> Buyers
              </h2>
              <p className="text-blue-100 mb-5 md:mb-8 text-sm md:text-base">Grow your business in 3 easy steps. Join India's largest local search platform.</p>
              <div className="flex flex-wrap gap-3 md:gap-4 mb-5 md:mb-8">
                {["Free Listing", "Instant Leads", "Verified Badge"].map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-xs md:text-sm text-blue-100">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-yellow-300 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
              <button className="self-start bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-blue-900 font-black px-6 md:px-8 py-3 md:py-3.5 rounded-xl text-sm md:text-base transition-all shadow-lg shadow-yellow-400/30">
                List your Business — FREE
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
            <h2 className="font-serif text-[clamp(22px,3.5vw,48px)] leading-tight tracking-[-1px] text-gray-900 mb-3 md:mb-5">
              Search smarter <br />
              <span className="italic bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">on the go</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 md:mb-9 max-w-[400px]">
              Real-time quotes, instant bookings, and app-only deals. 50M+ downloads across India.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 mb-6 md:mb-9">
              {[["50M+","Downloads"],["4.8★","App Store"],["4.7★","Play Store"],["24/7","Support"]].map(([value,label]) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3 md:p-4 border border-gray-200">
                  <div className="font-serif text-xl md:text-2xl text-gray-900">{value}</div>
                  <div className="text-[10px] md:text-[11px] text-gray-500 font-medium mt-1">{label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 flex-wrap">
              {[["🍎","App Store","Download on the"],["▶","Google Play","Get it on"]].map(([icon,label,sub]) => (
                <button key={label as string} className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 border border-gray-200 rounded-lg hover:shadow-md transition">
                  <span className="text-lg md:text-xl">{icon}</span>
                  <div className="text-left">
                    <div className="text-[9px] md:text-[10px] text-gray-500 font-medium">{sub}</div>
                    <div className="text-xs md:text-sm font-bold text-gray-900">{label}</div>
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
      <footer className="bg-gray-950 text-gray-400 px-4 md:px-8 py-10 md:py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="bg-blue-600 rounded-xl p-2">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-white font-bold text-base md:text-lg">LocalBiz</span>
            </div>
            <p className="text-xs md:text-sm leading-relaxed">India's largest business discovery platform. Find trusted services, connect with businesses, and grow faster.</p>
          </div>

          {[
            { title: "Navigation", links: ["Home","Categories","Reviews","How It Works","Contact"] },
            { title: "For Businesses", links: ["List Your Business","Advertising","Business Dashboard","Partnerships"] },
            { title: "Support", links: ["Help Center","Privacy Policy","Terms of Use","Safety"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="text-white font-bold text-xs md:text-sm mb-3 md:mb-4">{title}</p>
              <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
                {links.map(l => <li key={l} className="hover:text-blue-400 cursor-pointer transition">{l}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-5 md:pt-6 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 text-[10px] md:text-xs text-gray-500">
          <p>© 2025 LocalBiz India. All rights reserved.</p>
          <p>Made with ❤️ for India</p>
        </div>
      </footer>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
      `}</style>
    </main>
  );
}

/* ── Reusable sub-components ── */

function BentoCard({ img, title, sub, badge, badgeColor }: {
  img: string; title: string; sub: string; badge?: string; badgeColor?: string;
}) {
  return (
    <div className="col-span-1 row-span-1 rounded-3xl relative cursor-pointer overflow-hidden hover:shadow-lg transition-shadow">
      <img src={img} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,13,20,.75)] to-transparent" />
      {badge && (
        <div className="absolute top-3 right-3">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${badgeColor ?? "bg-white/90 text-gray-900"}`}>{badge}</span>
        </div>
      )}
      <div className="absolute bottom-4 left-4">
        <div className="text-white font-bold text-sm md:text-base">{title}</div>
        <div className="text-white/50 text-xs mt-1">{sub}</div>
      </div>
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-0.5 mb-3 md:mb-4">
        {Array.from({ length: 5 }).map((_, j) => (
          <svg key={j} className={`w-3.5 h-3.5 md:w-4 md:h-4 ${j < t.rating ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>
      <p className="text-gray-700 text-xs md:text-sm leading-relaxed mb-4 md:mb-6">"{t.text}"</p>
      <div className="flex items-center gap-2 md:gap-3 pt-3 md:pt-4 border-t border-gray-100">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 text-white text-[10px] md:text-xs font-bold flex items-center justify-center">{t.avatar}</div>
        <div>
          <p className="text-xs md:text-sm font-semibold text-gray-900">{t.name}</p>
          <p className="text-[10px] md:text-xs text-gray-400">{t.city} · {t.service}</p>
        </div>
      </div>
    </div>
  );
}