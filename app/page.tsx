"use client";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FloatingHearts from "./components/FloatingHearts";

export default function Hero() {
  const router = useRouter();

  useEffect(() => {
    // Animate hero card and button on mount
    const card = document.querySelector(".hero-card") as HTMLElement;
    const btn = document.querySelector(".continue-btn") as HTMLElement;
    if (card) {
      card.animate(
        [
          { opacity: 0, transform: "scale(0.95) translateY(40px)" },
          { opacity: 1, transform: "scale(1) translateY(0)" },
        ],
        { duration: 1200, easing: "cubic-bezier(.61,-0.01,.41,1.01)", fill: "forwards" }
      );
    }
    if (btn) {
      btn.animate(
        [
          { opacity: 0, transform: "scale(0.8)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 900, delay: 900, easing: "cubic-bezier(.61,-0.01,.41,1.01)", fill: "forwards" }
      );
    }
  }, []);

  const onContinue = () => {
    router.push("/birthday");
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300">
      {/* Floating Hearts */}
      <FloatingHearts />

      {/* Animated Sparkles */}
      {[...Array(18)].map((_, i) => (
        <Sparkles
          key={i}
          className="absolute text-yellow-300/70 animate-pulse pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${14 + Math.random() * 18}px`,
            opacity: 0.5 + Math.random() * 0.5,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Glow Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,182,193,0.25)_0%,transparent_60%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,105,180,0.18)_0%,transparent_60%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_60%,rgba(255,20,147,0.10)_0%,transparent_60%)] pointer-events-none"></div>

      {/* Hero Card */}
      <div className="hero-card relative z-10 max-w-xl w-full mx-auto px-6 py-12 rounded-3xl bg-white/30 backdrop-blur-2xl border border-white/30 shadow-2xl flex flex-col items-center">
        <h1
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-700 bg-clip-text text-transparent drop-shadow-lg font-[Great_Vibes] tracking-tight mb-4"
          style={{
            fontFamily: "'Great Vibes', cursive",
            textShadow: "0 4px 24px #f472b6, 0 2px 8px #ec4899",
          }}
        >
          Happy Birthday My Love 🎀
        </h1>
        <p
          className="mt-4 text-lg md:text-2xl text-rose-700 font-[Dancing_Script] font-semibold"
          style={{
            fontFamily: "'Dancing Script', cursive",
            textShadow: "0 1px 8px #fbcfe8",
          }}
        >
          You make my world brighter every single day ✨
        </p>
        <button
          onClick={onContinue}
          className="continue-btn mt-10 px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white text-lg md:text-xl font-bold shadow-lg hover:scale-105 hover:shadow-pink-300/40 transition-all duration-300 outline-none focus:ring-2 focus:ring-pink-300"
          style={{
            boxShadow: "0 4px 32px 0 #f472b6aa",
          }}
        >
          Continue to Birthday Page 💖
        </button>
      </div>

      {/* Footer Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-pink-200/40 blur-2xl rounded-full pointer-events-none"></div>

      {/* Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes:wght@400&family=Dancing+Script:wght@700&display=swap');
      `}</style>
    </section>
  );
}
