export interface ServiceType {
  id: string;
  category: string;
  name: string;
  description: string;
  icon: string;
  estimatedTime: string;
  price: string;
}

export const serviceTypes: ServiceType[] = [
  // Construction Services
  {
    id: "construction-1",
    category: "Construction",
    name: "Residential Construction",
    description: "Build your dream home with expert planning and execution",
    icon: "🏠",
    estimatedTime: "3-6 months",
    price: "₹5,00,000 - ₹50,00,000",
  },
  {
    id: "construction-2",
    category: "Construction",
    name: "Commercial Projects",
    description: "Office buildings, retail spaces, and business complexes",
    icon: "🏢",
    estimatedTime: "6-12 months",
    price: "₹20,00,000 - ₹1 Cr+",
  },
  {
    id: "construction-3",
    category: "Construction",
    name: "Renovations & Repairs",
    description: "Modernize and upgrade your existing space",
    icon: "🔨",
    estimatedTime: "1-3 months",
    price: "₹50,000 - ₹10,00,000",
  },
  {
    id: "construction-4",
    category: "Construction",
    name: "Architectural Design",
    description: "Professional design and planning services",
    icon: "📐",
    estimatedTime: "2-4 weeks",
    price: "₹25,000 - ₹2,00,000",
  },

  // Electronics Services
  {
    id: "electronics-1",
    category: "Electronics",
    name: "Mobile Phone Repair",
    description: "Screen replacement, battery, and software fixes",
    icon: "📱",
    estimatedTime: "1-2 hours",
    price: "₹500 - ₹15,000",
  },
  {
    id: "electronics-2",
    category: "Electronics",
    name: "Laptop Service",
    description: "Repair, upgrade, and maintenance services",
    icon: "💻",
    estimatedTime: "2-4 hours",
    price: "₹1,000 - ₹20,000",
  },
  {
    id: "electronics-3",
    category: "Electronics",
    name: "Home Appliance Repair",
    description: "Fix your AC, refrigerator, washing machine, etc.",
    icon: "🔧",
    estimatedTime: "30 min - 2 hours",
    price: "₹500 - ₹10,000",
  },
  {
    id: "electronics-4",
    category: "Electronics",
    name: "Electronics Sales",
    description: "Buy genuine electronics and gadgets",
    icon: "🎧",
    estimatedTime: "Same day delivery",
    price: "₹5,000 - ₹2,00,000",
  },

  // Education Services
  {
    id: "education-1",
    category: "Education",
    name: "Mathematics Tutoring",
    description: "Expert guidance in Math for all grades",
    icon: "📊",
    estimatedTime: "1-2 hours/session",
    price: "₹200 - ₹1,000/hour",
  },
  {
    id: "education-2",
    category: "Education",
    name: "Science Coaching",
    description: "Physics, Chemistry, Biology explained simply",
    icon: "🔬",
    estimatedTime: "1-2 hours/session",
    price: "₹200 - ₹1,000/hour",
  },
  {
    id: "education-3",
    category: "Education",
    name: "Language Classes",
    description: "English, Tamil, Hindi, and other languages",
    icon: "📚",
    estimatedTime: "1 hour/session",
    price: "₹150 - ₹800/hour",
  },
  {
    id: "education-4",
    category: "Education",
    name: "Competitive Exam Prep",
    description: "Prepare for JEE, NEET, UPSC, and other exams",
    icon: "🎯",
    estimatedTime: "2-3 hours/session",
    price: "₹500 - ₹2,000/hour",
  },

  // CCTV & Networking Services
  {
    id: "cctv-1",
    category: "CCTV & Networking",
    name: "CCTV Installation",
    description: "Professional camera setup for home and office security",
    icon: "📹",
    estimatedTime: "4-8 hours",
    price: "₹5,000 - ₹50,000",
  },
  {
    id: "cctv-2",
    category: "CCTV & Networking",
    name: "Network Setup",
    description: "WiFi installation and network configuration",
    icon: "🌐",
    estimatedTime: "2-4 hours",
    price: "₹2,000 - ₹15,000",
  },
  {
    id: "cctv-3",
    category: "CCTV & Networking",
    name: "Security Monitoring",
    description: "24/7 monitoring service with alert system",
    icon: "🔒",
    estimatedTime: "Ongoing",
    price: "₹1,000 - ₹5,000/month",
  },
  {
    id: "cctv-4",
    category: "CCTV & Networking",
    name: "Maintenance Service",
    description: "Regular maintenance and system updates",
    icon: "⚙️",
    estimatedTime: "1-2 hours",
    price: "₹500 - ₹2,000",
  },

  // Furniture Services
  {
    id: "furniture-1",
    category: "Furniture",
    name: "Custom Furniture",
    description: "Made-to-order furniture for your needs",
    icon: "🛋️",
    estimatedTime: "2-4 weeks",
    price: "₹10,000 - ₹5,00,000",
  },
  {
    id: "furniture-2",
    category: "Furniture",
    name: "Interior Design",
    description: "Professional design consultation for your space",
    icon: "🎨",
    estimatedTime: "1-2 weeks",
    price: "₹5,000 - ₹50,000",
  },
  {
    id: "furniture-3",
    category: "Furniture",
    name: "Installation Service",
    description: "Professional assembly and installation",
    icon: "🔩",
    estimatedTime: "2-4 hours",
    price: "₹2,000 - ₹10,000",
  },
  {
    id: "furniture-4",
    category: "Furniture",
    name: "Home Delivery",
    description: "Quick and safe delivery to your doorstep",
    icon: "🚚",
    estimatedTime: "1-3 days",
    price: "₹500 - ₹5,000",
  },

  // Technology Services
  {
    id: "tech-1",
    category: "Technology",
    name: "Web Development",
    description: "Custom website development and design",
    icon: "🌐",
    estimatedTime: "4-12 weeks",
    price: "₹50,000 - ₹10,00,000",
  },
  {
    id: "tech-2",
    category: "Technology",
    name: "Mobile App Development",
    description: "iOS and Android app development",
    icon: "📲",
    estimatedTime: "8-16 weeks",
    price: "₹1,00,000 - ₹20,00,000",
  },
  {
    id: "tech-3",
    category: "Technology",
    name: "Software Development",
    description: "Custom software solutions for businesses",
    icon: "💾",
    estimatedTime: "Varies",
    price: "₹2,00,000 - ₹50,00,000",
  },
  {
    id: "tech-4",
    category: "Technology",
    name: "IT Consulting",
    description: "Technology strategy and implementation",
    icon: "🤝",
    estimatedTime: "Ongoing",
    price: "₹5,000 - ₹50,000/day",
  },

  // Fabrication Services
  {
    id: "fabrication-1",
    category: "Fabrication",
    name: "Metal Gates & Railings",
    description: "Custom metal designs for security and style",
    icon: "🚪",
    estimatedTime: "1-2 weeks",
    price: "₹10,000 - ₹1,00,000",
  },
  {
    id: "fabrication-2",
    category: "Fabrication",
    name: "Welding Work",
    description: "Professional welding and metal joining",
    icon: "🔥",
    estimatedTime: "1-3 days",
    price: "₹5,000 - ₹50,000",
  },
  {
    id: "fabrication-3",
    category: "Fabrication",
    name: "Custom Designs",
    description: "Bespoke metal fabrication projects",
    icon: "✨",
    estimatedTime: "Varies",
    price: "₹20,000 - ₹5,00,000",
  },
  {
    id: "fabrication-4",
    category: "Fabrication",
    name: "Installation & Repair",
    description: "Installation and repair of metal structures",
    icon: "🔧",
    estimatedTime: "1-2 days",
    price: "₹5,000 - ₹30,000",
  },
];

export function getServicesByCategory(category: string): ServiceType[] {
  return serviceTypes.filter((service) => service.category === category);
}
