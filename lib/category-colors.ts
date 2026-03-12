export const categoryColors: Record<string, {
  primary: string;
  light: string;
  dark: string;
  gradient: string;
  bgGradient: string;
  banner: string;
}> = {
  Construction: {
    primary: "#D97706",
    light: "#FEF3C7",
    dark: "#92400E",
    gradient: "from-amber-400 to-orange-600",
    bgGradient: "from-amber-50 to-orange-50",
    banner: "/banners/construction-banner.jpg"
  },
  Electronics: {
    primary: "#0EA5E9",
    light: "#CFFAFE",
    dark: "#0C4A6E",
    gradient: "from-sky-400 to-blue-600",
    bgGradient: "from-sky-50 to-blue-50",
    banner: "/banners/electronics-banner.jpg"
  },
  Education: {
    primary: "#8B5CF6",
    light: "#EDE9FE",
    dark: "#4C1D95",
    gradient: "from-violet-400 to-purple-600",
    bgGradient: "from-violet-50 to-purple-50",
    banner: "/banners/education-banner.jpg"
  },
  "CCTV & Networking": {
    primary: "#EF4444",
    light: "#FEE2E2",
    dark: "#7F1D1D",
    gradient: "from-red-400 to-red-600",
    bgGradient: "from-red-50 to-orange-50",
    banner: "/banners/cctv-banner.jpg"
  },
  Furniture: {
    primary: "#EC4899",
    light: "#FCE7F3",
    dark: "#831843",
    gradient: "from-pink-400 to-rose-600",
    bgGradient: "from-pink-50 to-rose-50",
    banner: "/banners/furniture-banner.jpg"
  },
  Technology: {
    primary: "#06B6D4",
    light: "#CFFAFE",
    dark: "#164E63",
    gradient: "from-cyan-400 to-teal-600",
    bgGradient: "from-cyan-50 to-teal-50",
    banner: "/banners/technology-banner.jpg"
  },
  Fabrication: {
    primary: "#6366F1",
    light: "#E0E7FF",
    dark: "#312E81",
    gradient: "from-indigo-400 to-indigo-600",
    bgGradient: "from-indigo-50 to-indigo-100",
    banner: "/banners/fabrication-banner.jpg"
  }
};

export const getCategoryColor = (category: string) => {
  return categoryColors[category] || categoryColors.Construction;
};
