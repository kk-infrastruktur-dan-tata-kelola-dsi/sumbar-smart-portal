"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Image from "next/image";

import placeholderImage from "@/public/images/placholder-vertical.jpg";

const cards = [
  {
    id: 1,
    title: "Longsor di Sumbar",
    img: placeholderImage,
  },
  {
    id: 2,
    title: "Banjir di Pesisir Selatan",
    img: placeholderImage,
  },
  {
    id: 3,
    title: "Masyarakat Mentawai Mengungkap",
    img: placeholderImage,
  },
  {
    id: 4,
    title: "Wali Kota Padang Menyampaikan",
    img: placeholderImage,
  },
  {
    id: 5,
    title: "Festival Budaya Minang Digelar",
    img: placeholderImage,
  },
];

export default function StackedCarousel() {
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const resizeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const x = useMotionValue(0);

  // Initialize window width and check for mobile on mount
  useEffect(() => {
    const handleResize = () => {
      // Clear any pending resize timer
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }

      // Debounce resize events to avoid excessive calculations
      resizeTimerRef.current = setTimeout(() => {
        setWindowWidth(window.innerWidth);
        setIsMobile(window.innerWidth < 768);
      }, 200);
    };

    // Set initial values
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    }

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
    };
  }, []);

  // Auto-scroll - pauses when dragging
  useEffect(() => {
    if (isDragging) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      return;
    }

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isDragging]);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback(
    (_: any, info: any) => {
      const threshold = 100;

      if (Math.abs(info.offset.x) > threshold) {
        if (info.offset.x < 0) {
          setCurrent((prev) => (prev + 1) % cards.length);
        } else {
          setCurrent((prev) => (prev - 1 + cards.length) % cards.length);
        }
      }

      // Reset drag position
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });

      // Reset timer after a short delay
      setTimeout(() => {
        setIsDragging(false);
      }, 100);
    },
    [x],
  );

  const handleCardClick = useCallback((index: number) => {
    setCurrent(index);
    setIsDragging(true);
    setTimeout(() => setIsDragging(false), 100);
  }, []);

  // Memoize card styles to prevent recalculation on every render
  const cardStyles = useMemo(() => {
    return cards.map((_, index) => {
      let position = index - current;

      if (position > 2) position -= cards.length;
      if (position < -2) position += cards.length;

      const isActive = position === 0;

      // Responsive spacing based on container width
      const isTablet = windowWidth >= 768 && windowWidth < 1024;

      // Adjusted base spacing calculations for better mobile experience
      let baseSpacing = 260; // Default for desktop

      if (isMobile) {
        baseSpacing = Math.min(windowWidth * 0.2, 100); // Reduced spacing for mobile
      } else if (isTablet) {
        baseSpacing = Math.min(windowWidth * 0.18, 180);
      }

      // Refined scale and spacing for better visual hierarchy
      const scaleMultiplier = isMobile ? 0.95 : 0.95;
      const yOffset = isMobile ? 0.3 : 0.8; // Reduced vertical offset for mobile

      // Simple horizontal layout for mobile
      if (isMobile) {
        if (isActive) {
          return {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            zIndex: 5,
            rotateY: 0,
            rotateZ: 0,
          };
        }

        if (position === 1) {
          return {
            x: windowWidth * 0.5, // Reduced from 0.75 to prevent overflow
            y: 0,
            scale: 0.85, // Slightly smaller
            opacity: 0.7,
            zIndex: 4,
            rotateY: 0,
            rotateZ: 0,
          };
        }

        if (position === -1) {
          return {
            x: -windowWidth * 0.5, // Reduced from 0.75 to prevent overflow
            y: 0,
            scale: 0.85, // Slightly smaller
            opacity: 0.7,
            zIndex: 4,
            rotateY: 0,
            rotateZ: 0,
          };
        }

        // Hide other cards on mobile
        return {
          x: position > 0 ? windowWidth : -windowWidth,
          y: 0,
          scale: 0.8,
          opacity: 0,
          zIndex: 3,
          rotateY: 0,
          rotateZ: 0,
        };
      }

      // Desktop/tablet stacked layout
      if (isActive) {
        return {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          zIndex: 5,
          rotateY: 0,
          rotateZ: 0,
        };
      }

      if (position === 1) {
        return {
          x: baseSpacing,
          y: 40 * yOffset,
          scale: 0.88 * scaleMultiplier,
          opacity: 1,
          zIndex: 4,
          rotateY: -12,
          rotateZ: -3,
        };
      }

      if (position === 2) {
        return {
          x: baseSpacing * 1.7,
          y: 70 * yOffset,
          scale: 0.76 * scaleMultiplier,
          opacity: 1,
          zIndex: 3,
          rotateY: -18,
          rotateZ: -5,
        };
      }

      if (position === -1) {
        return {
          x: -baseSpacing,
          y: 40 * yOffset,
          scale: 0.88 * scaleMultiplier,
          opacity: 1,
          zIndex: 4,
          rotateY: 12,
          rotateZ: 3,
        };
      }

      if (position === -2) {
        return {
          x: -baseSpacing * 1.7,
          y: 70 * yOffset,
          scale: 0.76 * scaleMultiplier,
          opacity: 1,
          zIndex: 3,
          rotateY: 18,
          rotateZ: 5,
        };
      }

      return {
        x: 0,
        y: 100,
        scale: 0.6,
        opacity: 0,
        zIndex: 2,
        rotateY: 0,
        rotateZ: 0,
      };
    });
  }, [current, isMobile, windowWidth]);

  return (
    <div className="relative w-full max-w-full overflow-hidden flex flex-col items-center justify-center py-4 md:py-8">
      <div className="relative w-full h-[320px] sm:h-[380px] md:h-[450px] lg:h-[500px] flex items-center justify-center">
        <motion.div
          className="relative w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          style={{ x }}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          {cards.map((card, index) => {
            const style = cardStyles[index];
            const isActive = index === current;

            return (
              <motion.div
                key={card.id}
                animate={{
                  x: style.x,
                  y: style.y,
                  scale: style.scale,
                  opacity: style.opacity,
                  zIndex: style.zIndex,
                  rotateY: style.rotateY,
                  rotateZ: style.rotateZ,
                }}
                className="absolute will-change-transform"
                initial={false}
                layout={false}
                style={{
                  perspective: 1200,
                  transformStyle: "preserve-3d",
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                }}
              >
                <div
                  className={`relative w-[180px] h-[260px] sm:w-[220px] sm:h-[300px] md:w-[280px] md:h-[380px] lg:w-[300px] lg:h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-white ${
                    isActive
                      ? "ring-2 md:ring-4 ring-yellow-400 ring-offset-1 md:ring-offset-2"
                      : ""
                  }`}
                >
                  <Image
                    fill
                    alt={card.title}
                    className={`object-cover transition-all duration-700 ${
                      isActive
                        ? "blur-0 brightness-100"
                        : "blur-[2px] md:blur-sm brightness-[0.7]"
                    }`}
                    priority={isActive}
                    quality={isActive ? 90 : 70}
                    src={card.img || "/placeholder.jpg"}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5">
                    <h3 className="text-white font-bold text-sm md:text-lg mb-2 md:mb-3 line-clamp-2">
                      {card.title}
                    </h3>
                    <button className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-yellow-300 hover:text-yellow-200 transition-colors font-medium">
                      Lihat Selengkapnya
                      <span className="text-base md:text-lg">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation dots */}
      <div className="flex gap-1.5 md:gap-2 mt-4 md:mt-6">
        {cards.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "bg-yellow-500 w-6 md:w-8"
                : "bg-gray-300 hover:bg-gray-400 w-1.5 md:w-2"
            }`}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
