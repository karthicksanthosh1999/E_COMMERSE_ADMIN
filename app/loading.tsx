'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Loading() {
  const [progress, setProgress] = useState(0);

  // Generate particles only once
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-[#380004] via-[#5a0008] to-[#1a0002] flex flex-col items-center justify-center text-[#FFD700] font-serif select-none p-4">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-linear(circle_at_center,_var(--tw-linear-stops))] from-[#800020]/40 via-transparent to-black/80 pointer-events-none" />
      
      {/* Decorative ambient particles / stars */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
    {particles.map((particle) => (
      <motion.div
        key={particle.id}
        className="absolute bg-[#FFD700] rounded-full"
        style={{
          width: `${particle.width}px`,
          height: `${particle.height}px`,
          top: `${particle.top}%`,
          left: `${particle.left}%`,
        }}
        animate={{
          opacity: [0.2, 1, 0.2],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: particle.duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: particle.delay,
        }}
      />
    ))}
  </div>

      <AnimatePresence mode="wait">
          {/* ================= LOADING SCREEN ================= */ }
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex flex-col items-center justify-center max-w-lg w-full text-center px-6"
          >
            {/* Outer Rotating Gold Rings & Emblem Placeholder */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-8">
              {/* Outer Shimmer Ring 1 */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4AF37]/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              {/* Outer Shimmer Ring 2 (Counter) */}
              <motion.div
                className="absolute inset-2 rounded-full border border-[#FFD700]/30 shadow-[0_0_25px_rgba(212,175,55,0.3)]"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              {/* Glowing Pulse Aura */}
              <motion.div
                className="absolute inset-6 rounded-full bg-gradient-to-tr from-[#800020] to-[#D4AF37]/20 blur-xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Central Lotus & Goddess Iconography Container */}
              <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-[#4a0006] to-[#200002] border-2 border-[#D4AF37] flex flex-col items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.4)]">
                {/* Unfolding Lotus SVG Animation */}
                <Image 
                    src="/Code_Generated_Image.png"
                    height={100}
                    width={100}
                    alt='logo'
                />
              </div>
            </div>

            {/* Typography Loading Reveal */}
            <div className="space-y-2 mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl sm:text-3xl font-bold tracking-[0.2em] bg-gradient-to-r from-[#FFF2B2] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent uppercase drop-shadow-md"
              >
                Sri Gowri
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-sm sm:text-base font-semibold tracking-[0.3em] text-[#D4AF37]/90 uppercase"
              >
                CK Enterprises
              </motion.h2>
            </div>

            {/* Progress Bar with Gold Shimmer */}
            <div className="w-full max-w-xs space-y-3">
              <div className="relative h-2 w-full bg-black/50 rounded-full overflow-hidden border border-[#D4AF37]/30 p-[1px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#996515] via-[#FFD700] to-[#FFF2B2] rounded-full relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)] animate-[shimmer_1.5s_infinite]" />
                </motion.div>
              </div>
              <div className="flex justify-between text-xs tracking-widest text-[#D4AF37]/70 font-sans">
                <span>INITIALIZING SANCTUARY</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          </motion.div>

      </AnimatePresence>

      {/* Global CSS Shimmer Keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}