"use client";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

type CouplePhoto = {
  src: string;
  mood: "magical" | "romantic" | "eternal";
};

const couplePhotos: CouplePhoto[] = [
  {
    src: "/images/couple4.jpg",
    mood: "magical",
  },
  {
    src: "/images/couple1.jpg",
    mood: "romantic",
  },
  {
    src: "/images/couple2.jpg",
    mood: "eternal",
  },
    {
    src: "/images/couple3.jpg",
    mood: "eternal",
  },
];

const loveMessages = [
  "In a world full of people, i founded mine in you. 🎀",
];

const moodColors: Record<CouplePhoto["mood"], string> = {
  magical: "from-purple-500/30 to-pink-500/30",
  romantic: "from-rose-500/30 to-red-500/30",
  eternal: "from-indigo-500/30 to-purple-500/30",
};

type HeartType = { id: number; x: number; y: number };

export default function JustUsGallery() {
  const [activePhoto, setActivePhoto] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [hearts, setHearts] = useState<HeartType[]>([]);
  const [currentMessage, setCurrentMessage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle mouse movement for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove as EventListener);
      return () => container.removeEventListener("mousemove", handleMouseMove as EventListener);
    }
  }, []);

  // Auto-rotate love messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loveMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Create floating hearts
  const createHeart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id));
    }, 3000);
  };

  const nextPhoto = () =>
    setActivePhoto((prev) => (prev + 1) % couplePhotos.length);
  const prevPhoto = () =>
    setActivePhoto((prev) => (prev - 1 + couplePhotos.length) % couplePhotos.length);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-rose-900 overflow-y-auto"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%,
          rgba(236, 72, 153, 0.2) 0%,
          rgba(147, 51, 234, 0.1) 40%,
          rgba(15, 23, 42, 1) 70%),
          linear-gradient(135deg, #0f172a 0%, #581c87 50%, #be185d 100%)
        `,
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
            <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          >
            <div className="w-2 h-2 bg-pink-300/40 rounded-full blur-sm animate-pulse" />
          </div>
        ))}
      </div>

      {/* Floating hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute pointer-events-none z-50 animate-heart-float"
          style={{ left: heart.x, top: heart.y }}
        >
          <Heart className="w-8 h-8 text-red-400 fill-current" />
        </div>
      ))}

      {/* Header */}
      <header className="relative z-20 text-center pt-16 pb-8">
        <div className="relative inline-block">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 bg-clip-text text-transparent mb-4">
            Just Us
          </h1>
          <div className="absolute -top-4 -right-4 animate-bounce">
            <Heart className="w-8 h-8 text-pink-400 fill-current" />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-pulse">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
        </div>

        <div className="mt-8 h-8">
          <p className="text-lg md:text-xl text-pink-200/90 font-light italic transition-all duration-1000 ease-in-out">
            {loveMessages[currentMessage]}
          </p>
        </div>
      </header>

      {/* Main Gallery - Centered 3-photo showcase */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 pb-32">
        {/* Added pb-40 for bottom padding so content doesn't hide behind button */}
        <div className="relative w-full max-w-6xl">
          {/* Photo navigation dots */}
          <div className="flex justify-center mb-8 gap-3">
            {couplePhotos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhoto(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activePhoto === idx
                    ? "bg-pink-400 scale-125 shadow-lg shadow-pink-400/50"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to photo ${idx + 1}`}
                type="button"
              />
            ))}
          </div>

          {/* Photo showcase */}
          <div className="relative">
            {/* Navigation arrows */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full p-4 text-white/80 hover:text-white transition-all duration-300 group"
              aria-label="Previous photo"
              type="button"
            >
              <ArrowLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full p-4 text-white/80 hover:text-white transition-all duration-300 group"
              aria-label="Next photo"
              type="button"
            >
              <ArrowRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Photo display */}
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-black/20 border border-white/10 backdrop-blur-sm">
              {/* Background glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${moodColors[couplePhotos[activePhoto].mood]} blur-2xl scale-105`}
              />

              {/* Main photo */}
              <div
                className="relative w-full h-full cursor-pointer group"
                onClick={(e) => {
                  setIsFullscreen(true);
                  createHeart(e);
                }}
              >
                <Image
                  src={couplePhotos[activePhoto].src}
                  alt={`Couple photo ${activePhoto + 1}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  draggable={false}
                  width={800}
                  height={600}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Photo info */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  {/* You can add captions or leave empty */}
                </div>

                {/* Sparkle effect on hover */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="relative">
                    <Sparkles className="w-8 h-8 text-pink-300 animate-spin" />
                    <div className="absolute inset-0 animate-ping">
                      <Sparkles className="w-8 h-8 text-pink-300/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo counter */}
            <div className="text-center mt-6">
              <span className="text-pink-200/60 text-sm">
                {activePhoto + 1} of {couplePhotos.length}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="relative max-w-6xl w-full">
            <Image
              src={couplePhotos[activePhoto].src}
              alt={`Couple photo ${activePhoto + 1}`}
              className="w-full h-auto max-h-[90vh] object-contain rounded-2xl"
              width={1200}
              height={900}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 rounded-b-2xl"></div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white transition-colors backdrop-blur-sm"
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Bottom decorative elements */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 via-black/50 to-transparent backdrop-blur-sm py-8">
        <div className="flex flex-col items-center gap-4 max-w-xl mx-auto">
          
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 0.5, 
              duration: 1, 
              ease: "backOut" 
            }}
            onClick={() => router.push("/letter")}
            className="px-10 py-4 rounded-full 
              bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 
              text-lg md:text-xl font-semibold 
              shadow-lg hover:shadow-2xl 
              transition-all duration-300
              hover:scale-110 hover:rotate-1 
              text-white tracking-wide 
              flex items-center gap-3"
            whileHover={{ 
              scale: 1.05,
              rotate: 1 
            }}
            whileTap={{ 
              scale: 0.95 
            }}
          >
            <Heart className="w-6 h-6 animate-pulse text-pink-300" />
            Here&apos;s a special letter for you 💌
          </motion.button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(5px) rotate(-2deg); }
        }

        @keyframes heart-float {
          0% { transform: translateY(0px) scale(1) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-30px) scale(1.2) rotate(10deg); opacity: 0.8; }
          100% { transform: translateY(-60px) scale(0.8) rotate(20deg); opacity: 0; }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-heart-float {
          animation: heart-float 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

