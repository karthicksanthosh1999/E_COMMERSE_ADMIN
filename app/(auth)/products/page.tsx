"use client";

import { useMemo, useState } from "react";
import type { SareeProduct } from "@/types/product";

import { products } from "@/data/products";
import {
  ProductFilters,
  type ProductFilterValues,
} from "../products/_components/product-filters";
import { ProductCard } from "../products/_components/product-card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialFilters: ProductFilterValues = {
  categories: [],
  fabrics: [],
  colors: [],
  maxPrice: 20000,
};

type SortOption = "featured" | "price-low" | "price-high" | "rating";

export default function ProductsPage() {
  const [filters, setFilters] =
    useState<ProductFilterValues>(initialFilters);

  const [sort, setSort] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category);

      const matchesFabric =
        filters.fabrics.length === 0 ||
        filters.fabrics.includes(product.fabric);

      const matchesColor =
        filters.colors.length === 0 ||
        filters.colors.includes(product.color);

      const matchesPrice = product.price <= filters.maxPrice;

      return (
        matchesCategory &&
        matchesFabric &&
        matchesColor &&
        matchesPrice
      );
    });

    const sortFunctions: Record<
      SortOption,
      (a: SareeProduct, b: SareeProduct) => number
    > = {
      featured: (a, b) =>
        Number(b.featured) - Number(a.featured),

      "price-low": (a, b) => a.price - b.price,

      "price-high": (a, b) => b.price - a.price,

      rating: (a, b) => b.rating - a.rating,
    };

    return result.sort(sortFunctions[sort]);
  }, [filters, sort]);

  return (
    <div className="w-full bg-[#FAF7F0]">
      <div className="mx-auto max-w-full py-2">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <ProductFilters
            value={filters}
            onChange={setFilters}
          />

          <section className="min-w-0 flex-1">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-[var(--font-playfair)] text-xl font-semibold text-stone-900">
                  All Sarees
                </h2>

                <p className="mt-1 text-sm text-stone-500">
                  {filteredProducts.length} products found
                </p>
              </div>

              <Select
                value={sort}
                onValueChange={(value) =>
                  setSort(value as SortOption)
                }
              >
                <SelectTrigger className="w-[190px] border-[#E9E0D4] bg-white">
                  <SelectValue placeholder="Sort products" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="featured">
                    Featured
                  </SelectItem>

                  <SelectItem value="price-low">
                    Price: Low to High
                  </SelectItem>

                  <SelectItem value="price-high">
                    Price: High to Low
                  </SelectItem>

                  <SelectItem value="rating">
                    Highest Rated
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-[#D8C7B2] bg-white px-6 py-16 text-center">
                <h3 className="font-[var(--font-playfair)] text-xl font-semibold">
                  No sarees found
                </h3>

                <p className="mt-2 text-sm text-stone-500">
                  Try changing your filters to discover more products.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setFilters(initialFilters);
                    setSort("featured");
                  }}
                  className="mt-5 text-sm font-semibold text-[#781F3A] underline underline-offset-4"
                >
                  Clear filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}