"use client";
import { Heart, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// // Types for hearts and sparkles
// type HeartObj = {
//   id: number;
//   left: number;
//   delay: number;
//   duration: number;
//   size: number;
// };
type SparkleObj = {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
};

// AnimatedButton with types
const AnimatedButton = ({
  onClick,
  text,
  className,
}: {
  onClick: () => void;
  text: string;
  className?: string;
}) => (
  <button onClick={onClick} className={className}>
    {text}
  </button>
);

export default function BirthdayPage() {
  const router = useRouter();
  type Heart = {
    id: number;
    left: number;
    delay: number;
    duration: number;
    size: number;
  };
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [sparkles, setSparkles] = useState<SparkleObj[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  // Generate floating hearts and sparkles
  useEffect(() => {
    const generateHearts = () => {
      const newHearts = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 8 + Math.random() * 4,
        size: 20 + Math.random() * 30,
      }));
      setHearts(newHearts);
    };

    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
      }));
      setSparkles(newSparkles);
    };

    generateHearts();
    generateSparkles();

    setTimeout(() => setShowMessage(true), 1500);

    const sparkleInterval = setInterval(generateSparkles, 4000);
    return () => clearInterval(sparkleInterval);
  }, []);

  const shuffleCards = useCallback(() => {
    // Your shuffle logic here
  }, []);

  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Bright Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.5) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(255, 105, 180, 0.4) 0%, transparent 60%),
            radial-gradient(circle at 40% 40%, rgba(255, 20, 147, 0.2) 0%, transparent 60%),
            linear-gradient(135deg, #fff1f2 0%, #ffe4e6 25%, #fbcfe8 50%, #f9a8d4 75%, #f472b6 100%)
          `,
          backgroundSize: "100% 100%, 100% 100%, 100% 100%, 100% 100%",
        }}
      />

      {/* Animated Sparkles */}
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            animation: `twinkle ${sparkle.duration}s ${sparkle.delay}s infinite`,
          }}
        >
          <Sparkles className="text-yellow-300 opacity-70" size={16} />
        </div>
      ))}

      {/* Floating Hearts */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute pointer-events-none"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            animation: `floatUp ${heart.duration}s ${heart.delay}s infinite linear`,
          }}
        >
          <Heart
            className="text-pink-400 opacity-60 fill-current"
            size={heart.size}
          />
        </div>
      ))}

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Main Heading */}
        <div
          className="opacity-0 transform translate-y-10"
          style={{
            animation: "fadeInScale 1.5s 1s forwards",
          }}
        >
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-center">
  <span
    className="bg-gradient-to-r from-rose-600 via-pink-500 to-rose-700 bg-clip-text text-transparent inline-block"
    style={{
      fontFamily: "'Dancing Script', cursive",
      textShadow: "0 4px 8px rgba(236, 72, 153, 0.3)",
    }}
  >
    Happy 21st Birthday, My Love "D" 🎀
  </span>
</h1>

          <div className="text-4xl md:text-6xl mb-8">
            <span className="animate-bounce inline-block">😘</span>
            <span
              className="animate-bounce inline-block"
              style={{ animationDelay: "0.1s" }}
            >
              💖
            </span>
          </div>
        </div>

        {/* Romantic Message */}
        {showMessage && (
          <div
            className="relative max-w-2xl mx-auto mb-12 opacity-0"
            style={{ animation: "fadeInUp 1s 2s forwards" }}
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-pink-300 via-rose-200 to-yellow-100 blur-2xl opacity-60 z-0"></div>
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl z-10">
              <p
                className="text-xl md:text-2xl text-rose-700 font-medium leading-relaxed"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                &ldquo;Every moment I&apos;ve enjoyed with you has been magical,
                and now it&apos;s your special day, Dheepsz..! Wishing you a
                pleasant and memorable year ahead. May this day be filled with
                all the joy, love, and happiness forever. 🥰🎀 Oii Ready for
                your surprise? 🤌🏻&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Explore Button to Letter Page */}
        <div
          className="opacity-0"
          style={{
            animation: "fadeInUp 1s 2.5s forwards",
          }}
        >
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full blur-xl opacity-30 animate-pulse"></div>

            <AnimatedButton
              onClick={() => router.push("/memorygame")}
              text="Vaa innum explore pannalama 🎁"
              className="relative px-12 py-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 
              text-xl md:text-2xl font-bold shadow-2xl
              text-white tracking-wide overflow-hidden
              transform transition-all duration-300 ease-out
              hover:scale-110 hover:rotate-2 hover:shadow-pink-500/50
              active:scale-95 border-2 border-white/20
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 
              before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700"
            />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 opacity-30">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 blur-2xl animate-pulse"></div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <div
            className="w-40 h-40 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap");

        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(180deg);
            opacity: 0;
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.5) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
      `}</style>
    </main>
  );
}
