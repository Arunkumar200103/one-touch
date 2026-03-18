/**
 * category-colors.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Design-token palette for every business category in LocalBiz.
 *
 * Each entry carries:
 *   primary     – main accent (buttons, active rings, icon fills)
 *   secondary   – analogous supporting hue (decorative strokes, badges)
 *   light       – low-saturation surface tint (card bg, chips)
 *   muted       – slightly deeper tint for hover / bordered states
 *   dark        – deep shade for overlays and high-contrast text
 *   gradient    – Tailwind gradient pair for coloured pill / badge fills
 *   bgGradient  – Tailwind gradient pair for page / card backgrounds
 *   text        – accessible body-text colour on `light` surfaces
 *   banner      – absolute path to the hero banner image
 *
 * Colour strategy
 * ───────────────
 * Each category owns one hue family. Primary is the mid-weight token
 * (600-level), dark is the 900-level for overlays, light/muted are the
 * 50/100 levels for surfaces. This guarantees 4.5:1 contrast ratio between
 * `text` and `light` without manual checking.
 *
 *  Category          Hue family        Rationale
 *  ──────────────    ──────────────    ──────────────────────────────────────
 *  Construction      Amber / Orange    Material, warmth, craftsmanship
 *  Electronics       Sky / Blue        Technology, precision, clarity
 *  Education         Violet / Purple   Creativity, intellect, depth
 *  CCTV & Networking Slate / Zinc      Neutral authority, surveillance
 *  Furniture         Rose / Pink       Home, comfort, lifestyle
 *  Technology        Cyan / Teal       Innovation, digital, future
 *  Fabrication       Indigo / Blue     Structure, engineering, reliability
 */

export interface CategoryColorScheme {
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
  /** Tailwind gradient utilities for coloured fills (badges, pills) */
  gradient: string;
  /** Tailwind gradient utilities for page / card backgrounds */
  bgGradient: string;
  /** Accessible text colour for use on `light` backgrounds */
  text: string;
  /** Absolute path to the category hero banner */
  banner: string;
}

export const categoryColors: Record<string, CategoryColorScheme> = {
  // ── Construction ─────────────────────────────────────────────────────────
  Construction: {
    primary:    "#D97706", // amber-600
    secondary:  "#EA580C", // orange-600
    light:      "#FFFBEB", // amber-50
    muted:      "#FEF3C7", // amber-100
    dark:       "#78350F", // amber-900
    gradient:   "from-amber-500 to-orange-600",
    bgGradient: "from-amber-50 to-orange-50",
    text:       "#92400E", // amber-800
    banner:     "/banners/construction-banner.jpg",
  },

  // ── Electronics ──────────────────────────────────────────────────────────
  Electronics: {
    primary:    "#0284C7", // sky-600
    secondary:  "#2563EB", // blue-600
    light:      "#F0F9FF", // sky-50
    muted:      "#E0F2FE", // sky-100
    dark:       "#0C4A6E", // sky-900
    gradient:   "from-sky-500 to-blue-600",
    bgGradient: "from-sky-50 to-blue-50",
    text:       "#0369A1", // sky-700
    banner:     "/banners/electronics-banner.jpg",
  },

  // ── Education ────────────────────────────────────────────────────────────
  Education: {
    primary:    "#7C3AED", // violet-600
    secondary:  "#9333EA", // purple-600
    light:      "#F5F3FF", // violet-50
    muted:      "#EDE9FE", // violet-100
    dark:       "#3B0764", // violet-950
    gradient:   "from-violet-500 to-purple-600",
    bgGradient: "from-violet-50 to-purple-50",
    text:       "#5B21B6", // violet-800
    banner:     "/banners/education-banner.jpg",
  },

  // ── CCTV & Networking ────────────────────────────────────────────────────
  // Red implies danger/error; slate reads as "watchful authority" — more apt
  // for a surveillance/networking category.
  "CCTV & Networking": {
    primary:    "#475569", // slate-600
    secondary:  "#64748B", // slate-500
    light:      "#F8FAFC", // slate-50
    muted:      "#F1F5F9", // slate-100
    dark:       "#0F172A", // slate-900
    gradient:   "from-slate-500 to-slate-700",
    bgGradient: "from-slate-50 to-zinc-50",
    text:       "#334155", // slate-700
    banner:     "/banners/cctv-banner.jpg",
  },

  // ── Furniture ────────────────────────────────────────────────────────────
  Furniture: {
    primary:    "#E11D48", // rose-600
    secondary:  "#DB2777", // pink-600
    light:      "#FFF1F2", // rose-50
    muted:      "#FFE4E6", // rose-100
    dark:       "#881337", // rose-900
    gradient:   "from-rose-500 to-pink-600",
    bgGradient: "from-rose-50 to-pink-50",
    text:       "#9F1239", // rose-800
    banner:     "/banners/furniture-banner.jpg",
  },

  // ── Technology ───────────────────────────────────────────────────────────
  Technology: {
    primary:    "#0891B2", // cyan-600
    secondary:  "#0D9488", // teal-600
    light:      "#ECFEFF", // cyan-50
    muted:      "#CFFAFE", // cyan-100
    dark:       "#164E63", // cyan-900
    gradient:   "from-cyan-500 to-teal-600",
    bgGradient: "from-cyan-50 to-teal-50",
    text:       "#0E7490", // cyan-700
    banner:     "/banners/technology-banner.jpg",
  },

  // ── Fabrication ──────────────────────────────────────────────────────────
  Fabrication: {
    primary:    "#4338CA", // indigo-700
    secondary:  "#2563EB", // blue-600
    light:      "#EEF2FF", // indigo-50
    muted:      "#E0E7FF", // indigo-100
    dark:       "#1E1B4B", // indigo-950
    gradient:   "from-indigo-500 to-blue-600",
    bgGradient: "from-indigo-50 to-blue-50",
    text:       "#3730A3", // indigo-800
    banner:     "/banners/fabrication-banner.jpg",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Typed helpers
// ─────────────────────────────────────────────────────────────────────────────

export type CategoryKey = keyof typeof categoryColors;

/**
 * Returns the full colour scheme for a category, falling back to
 * Construction if the key is unknown.
 *
 * @example
 * const { primary, gradient } = getCategoryColor("Education");
 */
export function getCategoryColor(category: string): CategoryColorScheme {
  return categoryColors[category] ?? categoryColors.Construction;
}

/**
 * Returns a single token from the scheme — avoids destructuring the
 * whole object when you only need one value.
 *
 * @example
 * const accent = getCategoryToken("Technology", "primary"); // "#0891B2"
 */
export function getCategoryToken<K extends keyof CategoryColorScheme>(
  category: string,
  token: K
): CategoryColorScheme[K] {
  return getCategoryColor(category)[token];
}

/**
 * Returns an inline-style object for hero / banner overlays.
 * Blends the banner image with the category's dark shade.
 *
 * @example
 * <div style={getCategoryHeroStyle("Furniture")} />
 */
export function getCategoryHeroStyle(category: string): React.CSSProperties {
  const { banner, dark } = getCategoryColor(category);
  return {
    backgroundImage:    `url(${banner})`,
    backgroundColor:    dark,
    backgroundBlendMode: "multiply",
    backgroundSize:     "cover",
    backgroundPosition: "center",
  };
}

/**
 * Utility — returns all registered category names as a typed string array.
 *
 * @example
 * const keys = getCategoryKeys(); // ["Construction", "Electronics", ...]
 */
export function getCategoryKeys(): string[] {
  return Object.keys(categoryColors);
}