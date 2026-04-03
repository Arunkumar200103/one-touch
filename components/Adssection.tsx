import { useRef, useState, useEffect, FC } from "react";
import { IconType } from "react-icons";
import { ChevronRight } from "lucide-react";
import { MdOutlineCleaningServices } from "react-icons/md";
import { FiTool, FiActivity, FiHome } from "react-icons/fi";

interface CardBase {
  badge: string;
  title: string;
  desc: string;
  cta: string;
  gradient: string;
  Icon: IconType;
  img: string;
  link: string;
}

import { useRouter } from "next/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface AdsSectionProps {
  t?: (key: string) => string;
}

// ─── hook: fires once when element enters viewport ────────────────────────────
function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── noise texture ────────────────────────────────────────────────────────────
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// ─── wide banner ──────────────────────────────────────────────────────────────
interface WideBannerProps {
  card: CardBase;
  visible: boolean;
}

const WideBanner: FC<WideBannerProps> = ({ card, visible }) => (
  <div
    className={[
      "relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group",
      "flex-shrink-0 snap-start",
      "w-[75vw] md:w-[400px] h-44 md:h-48",
      `bg-gradient-to-br ${card.gradient}`,
      "p-5 flex flex-col justify-between",
      "transition-all duration-700 ease-out",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    ].join(" ")}
    style={{ transitionDelay: "0ms" }}
  >
    {/* noise overlay */}
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{ backgroundImage: NOISE }}
    />

    {/* decorative circles */}
    <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500" />
    <div className="absolute -right-3 -bottom-3 w-24 h-24 rounded-full bg-white/10 group-hover:scale-110 transition-transform duration-500 delay-75" />

    {/* person image - rounded for ad style */}
    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl z-10 transition-transform duration-500 group-hover:scale-110">
      <img
        src={card.img}
        alt={card.title}
        className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
      />
    </div>

    {/* left-to-center gradient so text stays readable over image */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

    {/* content */}
    <div className="z-10 text-white">
      <span className="inline-block bg-white/20 backdrop-blur-sm text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
        {card.badge}
      </span>
      <h3 className="text-[1.6rem] font-black mt-2 mb-0.5 leading-none drop-shadow-sm">
        {card.title}
      </h3>
      <p className="text-xs font-medium opacity-80 max-w-[55%] leading-snug">
        {card.desc}
      </p>
    </div>

    <button
      type="button"
      className="z-10 self-start flex items-center gap-1.5 bg-white/20 hover:bg-white/30
                 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase
                 px-4 py-2 rounded-full transition-colors duration-200"
    >
      {card.cta} <ChevronRight size={12} />
    </button>
  </div>
);

// ─── narrow portrait card ─────────────────────────────────────────────────────
interface NarrowCardProps {
  card: CardBase;
  visible: boolean;
  delay: number;
}

const NarrowCard: FC<NarrowCardProps> = ({ card, visible, delay }) => (
  <div
    className={[
      "relative rounded-2xl overflow-hidden shadow-xl cursor-pointer group",
      "flex-shrink-0 snap-start",
      "w-[38vw] md:w-[150px] h-44 md:h-48",
      `bg-gradient-to-br ${card.gradient}`,
      "p-3.5 flex flex-col justify-between",
      "transition-all duration-700 ease-out",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    ].join(" ")}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {/* noise overlay */}
    <div
      className="absolute inset-0 opacity-[0.05]"
      style={{ backgroundImage: NOISE }}
    />

    {/* person image - smaller rounded */}
    <div className="absolute -right-2 -bottom-2 w-24 h-24 rounded-full border-4 border-white/10 overflow-hidden shadow-xl z-0 transition-transform duration-500 group-hover:scale-110">
      <img
        src={card.img}
        alt={card.title}
        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
      />
    </div>

    {/* top-to-mid gradient for text legibility */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />

    {/* large bg icon */}
    <div className="absolute right-1 bottom-1 text-[60px] text-white/10 group-hover:scale-110 transition-transform duration-500">
      <card.Icon />
    </div>

    {/* content */}
    <div className="z-10 text-white">
      <span className="inline-block bg-white/20 backdrop-blur-sm text-[9px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase">
        {card.badge}
      </span>
      <h3 className="text-sm font-black mt-1.5 mb-0.5 leading-tight drop-shadow-sm">
        {card.title}
      </h3>
      <p className="text-[10px] font-medium opacity-80 leading-snug">{card.desc}</p>
    </div>

    <button
      type="button"
      className="z-10 self-start flex items-center gap-0.5 text-white/90 hover:text-white
                 text-[9px] font-bold tracking-widest uppercase transition-colors duration-200"
    >
      {card.cta} <ChevronRight size={11} />
    </button>
  </div>
);

// ─── scroll dots (mobile only) ────────────────────────────────────────────────
interface ScrollDotsProps {
  count: number;
}

const ScrollDots: FC<ScrollDotsProps> = ({ count }) => (
  <div className="flex justify-center gap-1.5 mt-3 md:hidden">
    {Array.from({ length: count }).map((_, i) => (
      <span
        key={i}
        className={`block rounded-full transition-all duration-300 ${
          i === 0 ? "w-4 h-1.5 bg-indigo-500" : "w-1.5 h-1.5 bg-gray-300"
        }`}
      />
    ))}
  </div>
);

// ─── main exported component ──────────────────────────────────────────────────
const AdsSection: FC<AdsSectionProps> = ({ t }) => {
  const { ref, visible } = useScrollReveal(0.12);
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();

  // Infinite Auto-scroll
  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 4000);

    return () => clearInterval(intervalId);
  }, [api]);

  // safe fallback if t() is not provided
  const label = (key: string, fallback: string): string =>
    t ? t(key) : fallback;

  const wideCards: CardBase[] = [
    {
      badge: label("limitedTime", "Limited Time"),
      title: label("off20", "20% Off"),
      desc: label("cleaningServiceDesc", "Professional cleaning service at your doorstep"),
      cta: label("bookNow", "Book Now"),
      gradient: "from-[#4f46e5] to-[#7c3aed]",
      Icon: MdOutlineCleaningServices,
      img: "/ads/cleaning.png",
      link: "/category/Construction",
    },
    {
      badge: label("exclusive", "Exclusive"),
      title: label("homeInterior", "Home Interior"),
      desc: label("interiorDesc", "Transform your living space with our experts"),
      cta: label("explore", "Explore"),
      gradient: "from-[#6366f1] to-[#a855f7]",
      Icon: FiHome,
      img: "/ads/interior.png",
      link: "/category/Furniture",
    },
  ];

  const narrowCards: CardBase[] = [
    {
      badge: label("megaDeal", "Mega Deal"),
      title: label("acRepair", "AC Repair"),
      desc: label("startingAt", "Starting at ₹299"),
      cta: label("claimOffer", "Claim Offer"),
      gradient: "from-[#e11d48] to-[#db2777]",
      Icon: FiTool,
      img: "/ads/ac.png",
      link: "/category/Electronics",
    },
    {
      badge: label("24/7Support", "24/7 Support"),
      title: label("plumbing", "Plumbing"),
      desc: label("plumbingDesc", "Fast and reliable expert plumbing"),
      cta: label("bookExtra", "Book Now"),
      gradient: "from-[#0ea5e9] to-[#2563eb]",
      Icon: FiActivity,
      img: "/ads/plumbing.png",
      link: "/category/Construction",
    },
    {
      badge: label("certified", "Certified"),
      title: label("electrical", "Electrical"),
      desc: label("electricalDesc", "Safe and modern wiring solutions"),
      cta: label("getEstimate", "Get Estimate"),
      gradient: "from-[#f59e0b] to-[#d97706]",
      Icon: FiTool,
      img: "/ads/electrical.png",
      link: "/category/Electronics",
    },
  ];

  // Combine and duplicate cards to ensure infinite loop works on all screen sizes
  const baseCards = [...wideCards, ...narrowCards];
  const allCards = [...baseCards, ...baseCards, ...baseCards]; // Triplicating to be super safe for 4K screens

  const handleCardClick = (link: string) => {
    router.push(link);
  };

  return (
    <section
      ref={ref}
      className="max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-16 mt-4 md:mt-8 relative z-20"
    >
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="hide-scrollbar">
          {allCards.map((card, i) => {
            const isWide = (i % baseCards.length) < wideCards.length;
            return (
              <CarouselItem 
                key={`${card.title}-${i}`} 
                className="basis-auto pl-4"
                onClick={() => handleCardClick(card.link)}
              >
                {isWide ? (
                  <WideBanner card={card} visible={visible} />
                ) : (
                  <NarrowCard 
                    card={card} 
                    visible={visible} 
                    delay={((i % baseCards.length) - wideCards.length + 1) * 120} 
                  />
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default AdsSection;