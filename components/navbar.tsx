"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Home", href: "/" },
  { label: "All Sarees", href: "/products" },
  { label: "Silk Sarees", href: "/categories/silk-sarees" },
  { label: "Wedding", href: "/categories/wedding-sarees" },
  { label: "About Us", href: "/about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="bg-[#781F3A] px-4 py-2 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
        A little tradition, a lot of elegance — discover your perfect saree.
      </div>

      <header className="sticky top-0 z-50 border-b border-[#E9E0D4] bg-[#FAF7F0]/95 backdrop-blur-md">
        <div className="mx-auto flex h-19 max-w-360 items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            <Link href="/" className="flex flex-col">
              <span className="font-[var(--font-playfair)] text-2xl font-bold tracking-wide text-[#781F3A] sm:text-3xl">
                VASTRA
              </span>
              <span className="hidden text-[9px] tracking-[0.3em] text-[#8C7858] sm:block">
                THE ART OF INDIAN ELEGANCE
              </span>
            </Link>
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-stone-700 transition-colors hover:text-[#781F3A]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon">
              <Link href="/search" aria-label="Search products">
                <Search className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex">
              <Link href="/account/wishlist" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:inline-flex"
            >
              <Link href="/account" aria-label="My account">
                <UserRound className="h-5 w-5" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative">
              <Link href="/cart" aria-label="Shopping cart">
                <ShoppingBag className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-[#E9E0D4] bg-[#FAF7F0] px-5 py-4 lg:hidden">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block border-b border-[#E9E0D4] py-3 text-sm font-medium text-stone-700 last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}