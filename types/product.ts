export type SareeCategory =
  | "Silk Sarees"
  | "Cotton Sarees"
  | "Banarasi Sarees"
  | "Kanjivaram Sarees"
  | "Designer Sarees"
  | "Wedding Sarees";

export interface SareeProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  category: SareeCategory;
  fabric: string;
  color: string;
  occasion: string;
  image: string;
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
}