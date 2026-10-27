"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";

import type { SareeProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface ProductCardProps {
  product: SareeProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = Math.round(
    ((product.originalPrice - product.price) /
      product.originalPrice) *
      100,
  );

  return (
    <Card className="group overflow-hidden rounded-xl border-[#E9E0D4] bg-white py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-3/4 overflow-hidden bg-[#F1E9DF]">
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {discount > 0 && (
          <Badge className="absolute left-3 top-3 rounded-sm bg-[#781F3A] px-2.5 py-1 text-[10px] tracking-wide text-white hover:bg-[#781F3A]">
            {discount}% OFF
          </Badge>
        )}

        <Button
          variant="secondary"
          size="icon"
          className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white/90 shadow-sm hover:bg-white"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart className="h-4 w-4 text-[#781F3A]" />
        </Button>

        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute bottom-3 left-3 rounded-sm bg-white/95 px-2 py-1 text-[10px] font-medium text-stone-700">
            Only {product.stock} left
          </span>
        )}

        {product.stock === 0 && (
          <span className="absolute bottom-3 left-3 rounded-sm bg-stone-900 px-2 py-1 text-[10px] font-medium text-white">
            Out of stock
          </span>
        )}
      </div>

      <CardContent className="p-3 sm:p-4">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9B7840]">
          {product.category}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-stone-900 transition-colors group-hover:text-[#781F3A] sm:text-base">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-[#C49A45] text-[#C49A45]" />

          <span className="text-xs font-medium text-stone-700">
            {product.rating}
          </span>

          <span className="text-xs text-stone-400">
            ({product.reviewCount} reviews)
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-base font-bold text-[#781F3A] sm:text-lg">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          {product.originalPrice > product.price && (
            <span className="text-xs text-stone-400 line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <Button
          disabled={product.stock === 0}
          className="mt-4 w-full bg-[#781F3A] text-xs font-semibold text-white hover:bg-[#552047] sm:text-sm"
        >
          <Link href={`/products/${product.slug}`}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            {product.stock === 0 ? "Out of Stock" : "View Saree"}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}