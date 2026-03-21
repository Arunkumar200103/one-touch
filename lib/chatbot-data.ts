import { serviceTypes, ServiceType } from '@/lib/service-types';

export interface ServiceInfo {
  id: string;
  name: string;
  category: string;
  description: string;
  offer?: string;
}

// Convert ServiceType to ServiceInfo for compatibility
const allServices: ServiceInfo[] = serviceTypes.map(s => ({
  id: s.id,
  name: s.name,
  category: s.category,
  description: s.description,
  offer: s.price ? `Starts at ${s.price.split('-')[0].trim()}` : undefined
}));

export const chatbotData: ServiceInfo[] = allServices;

export const getMatchingServices = (query: string): ServiceInfo[] => {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return chatbotData.filter(
    (item) => 
      item.name.toLowerCase().includes(q) || 
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
  );
};

export const getTopSuggestions = (): string[] => {
  const categories = Array.from(new Set(serviceTypes.map(s => s.category)));
  return categories.slice(0, 6); // Top 6 categories
};
