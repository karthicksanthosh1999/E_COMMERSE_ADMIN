"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export interface ProductFilterValues {
  categories: string[];
  fabrics: string[];
  colors: string[];
  maxPrice: number;
}

interface ProductFiltersProps {
  value: ProductFilterValues;
  onChange: (value: ProductFilterValues) => void;
}

const groups = [
  {
    title: "Category",
    key: "categories" as const,
    options: [
      "Silk Sarees",
      "Cotton Sarees",
      "Banarasi Sarees",
      "Kanjivaram Sarees",
      "Designer Sarees",
      "Wedding Sarees",
    ],
  },
  {
    title: "Fabric",
    key: "fabrics" as const,
    options: ["Silk", "Cotton", "Silk Blend"],
  },
  {
    title: "Color",
    key: "colors" as const,
    options: [
      "Burgundy",
      "Green",
      "Pink",
      "Red",
      "Blue",
      "Beige",
    ],
  },
];

function FilterContents({
  value,
  onChange,
}: ProductFiltersProps) {
  function toggle(
    key: "categories" | "fabrics" | "colors",
    option: string,
    checked: boolean,
  ) {
    const current = value[key];

    onChange({
      ...value,
      [key]: checked
        ? [...current, option]
        : current.filter((item) => item !== option),
    });
  }

  function resetFilters() {
    onChange({
      categories: [],
      fabrics: [],
      colors: [],
      maxPrice: 20000,
    });
  }

  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <section key={group.key}>
          <h3 className="mb-4 text-sm font-semibold text-stone-900">
            {group.title}
          </h3>

          <div className="space-y-3">
            {group.options.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3 text-sm text-stone-600"
              >
                <Checkbox
                  checked={value[group.key].includes(option)}
                  onCheckedChange={(checked) =>
                    toggle(
                      group.key,
                      option,
                      checked === true,
                    )
                  }
                />

                <span>{option}</span>
              </label>
            ))}
          </div>

          <Separator className="mt-5" />
        </section>
      ))}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-stone-900">
            Maximum price
          </h3>

          <span className="text-sm font-medium text-[#781F3A]">
            ₹{value.maxPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <input
          type="range"
          min={1000}
          max={20000}
          step={500}
          value={value.maxPrice}
          onChange={(event) =>
            onChange({
              ...value,
              maxPrice: Number(event.target.value),
            })
          }
          aria-label="Maximum price"
          className="w-full accent-[#781F3A]"
        />

        <div className="mt-2 flex justify-between text-xs text-stone-500">
          <span>₹1,000</span>
          <span>₹20,000</span>
        </div>
      </section>

      <Button
        variant="outline"
        className="w-full border-[#781F3A] text-[#781F3A] hover:bg-[#781F3A] hover:text-white"
        onClick={resetFilters}
      >
        Clear all filters
      </Button>
    </div>
  );
}

export function ProductFilters({
  value,
  onChange,
}: ProductFiltersProps) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="sticky top-28 rounded-xl border border-[#E9E0D4] bg-white p-5">
          <div className="mb-6 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#781F3A]" />
            <h2 className="text-xl font-semibold">
              Refine Your Search
            </h2>
          </div>

          <FilterContents value={value} onChange={onChange} />
        </div>
      </aside>

      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger>
            <Button variant="outline" className="border-[#E9E0D4]">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[320px] overflow-y-auto bg-[#FAF7F0] sm:w-95"
          >
            <SheetHeader className="mb-6">
              <SheetTitle>Refine Your Search</SheetTitle>
            </SheetHeader>

            <FilterContents value={value} onChange={onChange} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}