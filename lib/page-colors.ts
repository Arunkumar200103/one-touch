/**
 * page-colors.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Centralised design-token palette for every page in LocalBiz.
 *
 * Each entry carries:
 *   primary   – main brand accent (buttons, links, active rings)
 *   secondary – supporting tint used for icon fills / subtle highlights
 *   light     – low-saturation surface tint (card backgrounds, chips)
 *   muted     – slightly deeper tint for hover / bordered states
 *   dark      – deep shade for high-contrast text / hero overlays
 *   gradient  – Tailwind gradient utility pair (from → to)
 *   text      – accessible body-text colour on `light` surfaces
 *   banner    – hero image path
 *
 * Colour strategy
 * ───────────────
 * Every hue is taken from a single, coherent 6-stop palette so neighbouring
 * pages feel related but distinct. Each page uses ONE dominant hue family;
 * secondary is its adjacent analogous hue. This avoids the rainbow-clutter
 * that arises when every accent is pulled from a different part of the wheel.
 *
 *  Page          Hue family        Rationale
 *  ──────────    ──────────────    ────────────────────────────────────────
 *  howItWorks    Sky / Cyan        Openness, process, clarity
 *  inquiry       Violet / Purple   Creativity, service discovery
 *  about         Emerald / Teal    Trust, growth, brand
 *  reviews       Amber / Orange    Warmth, social proof, attention
 *  favorites     Rose / Pink       Delight, personal, wishlist
 *  safety        Blue / Indigo     Authority, protection, reliability
 *  faqs          Slate / Zinc      Neutral, informational, accessible
 *  contact       Indigo / Violet   Action, connection, CTA
 */

export interface PageColorScheme {
  /** Main interactive accent — buttons, links, active states */
  primary: string;
  /** Analogous supporting accent — icons, decorative strokes */
  secondary: string;
  /** Low-saturation surface tint — card bg, chip fills */
  light: string;
  /** Hover / bordered surface — slightly deeper than light */
  muted: string;
  /** Deep shade — heading overlays, high-contrast badges */
  dark: string;
  /** Tailwind from/to gradient utilities */
  gradient: string;
  /** Accessible text colour for use on `light` backgrounds */
  text: string;
  /** Absolute path to the page hero banner */
  banner: string;
}

export const pageColors: Record<string, PageColorScheme> = {
  // ── How It Works ─────────────────────────────────────────────────────────
  howItWorks: {
    primary:   "#0EA5E9", // sky-500
    secondary: "#06B6D4", // cyan-500
    light:     "#F0F9FF", // sky-50
    muted:     "#E0F2FE", // sky-100
    dark:      "#0C4A6E", // sky-900
    gradient:  "from-sky-50 to-cyan-50",
    text:      "#0369A1", // sky-700
    banner:    "/banners/construction-banner.jpg",
  },

  // ── Service Inquiry ───────────────────────────────────────────────────────
  inquiry: {
    primary:   "#7C3AED", // violet-600
    secondary: "#8B5CF6", // violet-500
    light:     "#F5F3FF", // violet-50
    muted:     "#EDE9FE", // violet-100
    dark:      "#3B0764", // violet-950
    gradient:  "from-violet-50 to-purple-50",
    text:      "#5B21B6", // violet-800
    banner:    "/banners/electronics-banner.jpg",
  },

  // ── About ────────────────────────────────────────────────────────────────
  about: {
    primary:   "#059669", // emerald-600
    secondary: "#0D9488", // teal-600
    light:     "#ECFDF5", // emerald-50
    muted:     "#D1FAE5", // emerald-100
    dark:      "#064E3B", // emerald-900
    gradient:  "from-emerald-50 to-teal-50",
    text:      "#065F46", // emerald-800
    banner:    "/banners/technology-banner.jpg",
  },

  // ── Reviews ──────────────────────────────────────────────────────────────
  reviews: {
    primary:   "#D97706", // amber-600
    secondary: "#EA580C", // orange-600
    light:     "#FFFBEB", // amber-50
    muted:     "#FEF3C7", // amber-100
    dark:      "#78350F", // amber-900
    gradient:  "from-amber-50 to-orange-50",
    text:      "#92400E", // amber-800
    banner:    "/banners/education-banner.jpg",
  },

  // ── Favourites ───────────────────────────────────────────────────────────
  favorites: {
    primary:   "#E11D48", // rose-600
    secondary: "#DB2777", // pink-600
    light:     "#FFF1F2", // rose-50
    muted:     "#FFE4E6", // rose-100
    dark:      "#881337", // rose-900
    gradient:  "from-rose-50 to-pink-50",
    text:      "#9F1239", // rose-800
    banner:    "/banners/furniture-banner.jpg",
  },

  // ── Safety ───────────────────────────────────────────────────────────────
  safety: {
    primary:   "#2563EB", // blue-600
    secondary: "#4F46E5", // indigo-600
    light:     "#EFF6FF", // blue-50
    muted:     "#DBEAFE", // blue-100
    dark:      "#1E3A8A", // blue-900
    gradient:  "from-blue-50 to-indigo-50",
    text:      "#1D4ED8", // blue-700
    banner:    "/banners/cctv-banner.jpg",
  },

  // ── FAQs ─────────────────────────────────────────────────────────────────
  faqs: {
    primary:   "#475569", // slate-600  — neutral, info-dense page
    secondary: "#64748B", // slate-500
    light:     "#F8FAFC", // slate-50
    muted:     "#F1F5F9", // slate-100
    dark:      "#0F172A", // slate-900
    gradient:  "from-slate-50 to-zinc-50",
    text:      "#334155", // slate-700
    banner:    "/banners/fabrication-banner.jpg",
  },

  // ── Contact ──────────────────────────────────────────────────────────────
  contact: {
    primary:   "#4F46E5", // indigo-600
    secondary: "#7C3AED", // violet-600
    light:     "#EEF2FF", // indigo-50
    muted:     "#E0E7FF", // indigo-100
    dark:      "#1E1B4B", // indigo-950
    gradient:  "from-indigo-50 to-violet-50",
    text:      "#3730A3", // indigo-800
    banner:    "/banners/construction-banner.jpg",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Typed helpers
// ─────────────────────────────────────────────────────────────────────────────

export type PageKey = keyof typeof pageColors;

/**
 * Returns the full colour scheme for a page.
 *
 * @example
 * const { primary, gradient } = getPageColor("reviews");
 */
export function getPageColor(page: PageKey): PageColorScheme {
  return pageColors[page];
}

/**
 * Returns only a single token from the scheme — useful when you just
 * need one value without destructuring the whole object.
 *
 * @example
 * const accent = getPageToken("safety", "primary"); // "#2563EB"
 */
export function getPageToken<K extends keyof PageColorScheme>(
  page: PageKey,
  token: K
): PageColorScheme[K] {
  return pageColors[page][token];
}

/**
 * Generates an inline-style object for quick hero/banner overlays.
 *
 * @example
 * <div style={getHeroStyle("about")} />
 * // → { backgroundImage: "...", backgroundColor: "#059669" }
 */
export function getHeroStyle(page: PageKey): React.CSSProperties {
  const { banner, dark } = pageColors[page];
  return {
    backgroundImage: `url(${banner})`,
    backgroundColor: dark,
    backgroundBlendMode: "multiply",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}