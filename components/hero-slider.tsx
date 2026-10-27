"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Slide = {
  category: string; // short name shown in the progress bar
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string; // put files in /public/hero or use Cloudinary URLs
  accent: string; // button colour for this slide
};

// Later you can build this array from your Google Sheet "Categories" tab.
const slides: Slide[] = [
  {
    category: "Sarees",
    title: "Sarees woven for every occasion",
    description:
      "Silk, cotton and handloom sarees in colors that look as good in person as they do on screen.",
    cta: "Shop sarees",
    href: "/category/sarees",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85",
    accent: "#b3261e",
  },
  {
    category: "T-shirts",
    title: "T-shirts you will actually live in",
    description:
      "Soft cotton, clean cuts and fits that hold their shape after every wash.",
    cta: "Shop T-shirts",
    href: "/category/t-shirts",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=900&q=85",
    accent: "#1f5fbf",
  },
  {
    category: "Fruits",
    title: "Fruit picked this morning",
    description:
      "Bananas, apples and seasonal fruit, chosen by hand and ready to order today.",
    cta: "Shop fruits",
    href: "/category/fruits",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e8?auto=format&fit=crop&w=900&q=85",
    accent: "#2e7d32",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const count = slides.length;
  const paused = userPaused || hovering || reducedMotion;

  const goTo = useCallback((i: number) => setCurrent((i + count) % count), [count]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Respect "reduce motion": no autoplay for those users
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured categories"
      className="relative isolate h-[85vh] min-h-130 w-full overflow-hidden bg-neutral-950 text-white"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
      onPointerDown={(e) => setTouchStartX(e.clientX)}
      onPointerUp={(e) => {
        if (touchStartX === null) return;
        const dx = e.clientX - touchStartX;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        setTouchStartX(null);
      }}
    >
      {/* Slides */}
      {slides.map((slide, i) => {
        const active = i === current;
        return (
          <div
            key={slide.category}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={!active}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              active ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none"
            )}
          >
            {/* Image with slow zoom */}
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={cn(
                "object-cover transition-transform duration-8000 ease-out motion-reduce:transition-none",
                active ? "scale-100" : "scale-110"
              )}
            />

            {/* Readability overlay */}
            <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/35 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent" />

            {/* Text */}
            <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 md:px-10">
              <div className="max-w-xl pb-16">
                <h1
                  className={cn(
                    "font-serif text-4xl font-semibold leading-[1.1] tracking-tight transition-all duration-700 ease-out sm:text-5xl md:text-6xl motion-reduce:transition-none",
                    active
                      ? "translate-y-0 opacity-100 delay-300"
                      : "translate-y-6 opacity-0"
                  )}
                >
                  {slide.title}
                </h1>
                <p
                  className={cn(
                    "mt-5 max-w-md text-base text-white/85 transition-all duration-700 ease-out sm:text-lg motion-reduce:transition-none",
                    active
                      ? "translate-y-0 opacity-100 delay-500"
                      : "translate-y-6 opacity-0"
                  )}
                >
                  {slide.description}
                </p>
                <div
                  className={cn(
                    "mt-8 transition-all duration-700 ease-out motion-reduce:transition-none",
                    active
                      ? "translate-y-0 opacity-100 delay-700"
                      : "translate-y-6 opacity-0"
                  )}
                >
                  <Button
                    size="lg"
                    className="text-white hover:brightness-110"
                    style={{ backgroundColor: slide.accent }}
                  >
                    <Link href={slide.href} tabIndex={active ? 0 : -1}>
                      {slide.cta}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-7xl items-end gap-6 px-6 pb-6 md:px-10 md:pb-8">
          {/* Progress bars double as category tabs */}
          <div className="flex flex-1 gap-3">
            {slides.map((slide, i) => (
              <button
                key={slide.category}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show ${slide.category}`}
                aria-current={i === current}
                className="group flex-1 text-left focus-visible:outline-none"
              >
                <span
                  className={cn(
                    "mb-2 block text-sm transition-colors",
                    i === current ? "text-white" : "text-white/55 group-hover:text-white/80"
                  )}
                >
                  {slide.category}
                </span>
                <span className="block h-0.5 w-full overflow-hidden rounded-full bg-white/25 group-focus-visible:ring-2 group-focus-visible:ring-white">
                  <span
                    key={i === current ? `run-${current}` : `idle-${i}`}
                    className="block h-full bg-white"
                    style={
                      i === current
                        ? {
                            width: "0%",
                            animation: "hero-progress 6s linear forwards",
                            animationPlayState: "running",
                          }
                        : { width: i < current ? "100%" : "0%" }
                    }
                    onAnimationEnd={next}
                  />
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full border border-white/30 text-white hover:bg-white/15 hover:text-white"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full border border-white/30 text-white hover:bg-white/15 hover:text-white"
              onClick={prev}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full border border-white/30 text-white hover:bg-white/15 hover:text-white"
              onClick={next}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
