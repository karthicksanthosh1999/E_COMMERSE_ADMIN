import type { SareeProduct } from "@/types/product";

export const products: SareeProduct[] = [
  {
    id: "saree-001",
    name: "Royal Burgundy Kanjivaram Silk Saree",
    slug: "royal-burgundy-kanjivaram-silk-saree",
    description:
      "An elegant silk saree featuring a rich burgundy body and intricate gold-inspired zari detailing. Ideal for weddings and festive occasions.",
    price: 8499,
    originalPrice: 10999,
    category: "Kanjivaram Sarees",
    fabric: "Silk",
    color: "Burgundy",
    occasion: "Wedding",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
    rating: 4.8,
    reviewCount: 124,
    stock: 12,
    featured: true,
  },
  {
    id: "saree-002",
    name: "Emerald Green Festive Silk Saree",
    slug: "emerald-green-festive-silk-saree",
    description:
      "A statement-making traditional saree for celebrations, family gatherings, and festive occasions.",
    price: 6299,
    originalPrice: 7999,
    category: "Silk Sarees",
    fabric: "Silk",
    color: "Green",
    occasion: "Festive",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=900&q=85",
    rating: 4.7,
    reviewCount: 86,
    stock: 8,
    featured: true,
  },
  {
    id: "saree-003",
    name: "Classic Rose Pink Designer Saree",
    slug: "classic-rose-pink-designer-saree",
    description:
      "A graceful pink designer saree with a refined traditional aesthetic for celebrations and special events.",
    price: 4299,
    originalPrice: 5499,
    category: "Designer Sarees",
    fabric: "Silk Blend",
    color: "Pink",
    occasion: "Party",
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=85",
    rating: 4.6,
    reviewCount: 58,
    stock: 15,
    featured: true,
  },
  {
    id: "saree-004",
    name: "Golden Beige Traditional Saree",
    slug: "golden-beige-traditional-saree",
    description:
      "A timeless beige saree with a warm golden finish, suited to traditional ceremonies and family occasions.",
    price: 3599,
    originalPrice: 4599,
    category: "Wedding Sarees",
    fabric: "Silk Blend",
    color: "Beige",
    occasion: "Ceremony",
    image:
      "https://images.unsplash.com/photo-1610189012906-4c7e5b9c3e2c?auto=format&fit=crop&w=900&q=85",
    rating: 4.5,
    reviewCount: 42,
    stock: 6,
    featured: false,
  },
];