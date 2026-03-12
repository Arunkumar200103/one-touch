// Modern unique color schemes for different pages
export const pageColors = {
  howItWorks: {
    primary: "#06B6D4", // Cyan
    light: "#CFFAFE",
    gradient: "from-cyan-50 to-teal-50",
    dark: "#164E63",
    banner: "/banners/construction-banner.jpg",
  },
  inquiry: {
    primary: "#8B5CF6", // Violet
    light: "#EDE9FE",
    gradient: "from-violet-50 to-purple-50",
    dark: "#5B21B6",
    banner: "/banners/electronics-banner.jpg",
  },
  about: {
    primary: "#10B981", // Emerald
    light: "#D1FAE5",
    gradient: "from-emerald-50 to-green-50",
    dark: "#065F46",
    banner: "/banners/technology-banner.jpg",
  },
  reviews: {
    primary: "#F59E0B", // Amber
    light: "#FEF3C7",
    gradient: "from-amber-50 to-yellow-50",
    dark: "#78350F",
    banner: "/banners/education-banner.jpg",
  },
  favorites: {
    primary: "#EC4899", // Pink
    light: "#FCE7F3",
    gradient: "from-pink-50 to-rose-50",
    dark: "#831843",
    banner: "/banners/furniture-banner.jpg",
  },
  safety: {
    primary: "#3B82F6", // Blue
    light: "#DBEAFE",
    gradient: "from-blue-50 to-cyan-50",
    dark: "#1E3A8A",
    banner: "/banners/cctv-banner.jpg",
  },
  faqs: {
    primary: "#EF4444", // Red
    light: "#FEE2E2",
    gradient: "from-red-50 to-orange-50",
    dark: "#7F1D1D",
    banner: "/banners/fabrication-banner.jpg",
  },
  contact: {
    primary: "#6366F1", // Indigo
    light: "#E0E7FF",
    gradient: "from-indigo-50 to-blue-50",
    dark: "#312E81",
    banner: "/banners/construction-banner.jpg",
  },
};

export function getPageColor(page: keyof typeof pageColors) {
  return pageColors[page];
}
