"use client";
import { ArrowLeft, Heart, Pause, Play, Quote, RefreshCw, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const feelingOptions = [
  { id: 'hug', text: '🫂 \n Hug with me ', color: 'from-blue-400 to-cyan-400', rejected: true },
  { id: 'kiss', text: '😘 Kiss me ', color: 'from-pink-400 to-rose-400', rejected: true },
  { id: 'hugandkiss', text: '🫂😘 Both ', color: 'from-purple-400 to-pink-400', rejected: false }
];

const rejectionMessages = [
  "Hmm... try again! 😼",
  "Think harder... 💭",
  "Keep trying raaa! 💕"
];

const successMessages = [
  "YES! That's exactly what I wanted to hear! 🥰",
  "You know me so well raa! 💗",
  "That's my gurl🫂😘",
];

// Heart Confetti Burst Component
function HeartConfettiBurst({ show }: { show: boolean }) {
  const [hearts, setHearts] = useState<Array<{
    id: number;
    x: number;
    y: number;
    dx: number;
    dy: number;
    delay: number;
    size: number;
    rotate: number;
    color: string;
  }>>([]);

  useEffect(() => {
    if (show) {
      const burst: Array<{
        id: number;
        x: number;
        y: number;
        dx: number;
        dy: number;
        delay: number;
        size: number;
        rotate: number;
        color: string;
      }> = [];
      const count = 40;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI;
        const distance = 120 + Math.random() * 60;
        burst.push({
          id: i,
          x: 0,
          y: 0,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          delay: Math.random() * 0.2,
          size: 24 + Math.random() * 16,
          rotate: Math.random() * 360,
          color: ["#ec4899", "#f472b6", "#fbbf24", "#f87171", "#a78bfa", "#f472b6"][i % 6]
        });
      }
      setHearts(burst);
      setTimeout(() => setHearts([]), 1800);
    }
  }, [show]);

  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center z-[100]">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute"
          style={{
            left: '50%',
            top: '60%',
            transform: `translate(-50%, -50%) translate(${h.dx}px, ${h.dy}px) rotate(${h.rotate}deg)`,
            animation: `confetti-burst 1.2s ${h.delay}s cubic-bezier(.61,-0.01,.41,1.01) both`,
            fontSize: h.size,
            color: h.color,
            opacity: 0.85
          }}
        >❤️</span>
      ))}
      <style jsx>{`
        @keyframes confetti-burst {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.2) rotate(0deg);}
          10% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// Interactive Conclusion Component
function InteractiveConclusionSection() {
  const [selectedFeeling, setSelectedFeeling] = useState<{ id: string } | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [rejectionCount, setRejectionCount] = useState(0);
  const [celebrationHearts, setCelebrationHearts] = useState<Array<{
    id: number;
    x: number;
    y: number;
    delay: number;
  }>>([]);
  const [confetti, setConfetti] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    delay: number;
    rotation: number;
    scale: number;
  }>>([]);
  const [showFinal, setShowFinal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Celebration hearts
  const createCelebrationHearts = () => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
      y: typeof window !== 'undefined' ? window.innerHeight : 600,
      delay: Math.random() * 2000
    }));
    setCelebrationHearts(newHearts);
    setTimeout(() => setCelebrationHearts([]), 4000);
  };

  // Confetti
  const createConfetti = () => {
    const colors = ['#ff69b4', '#ff1493', '#ffd700', '#ff6347', '#9370db', '#00bfff'];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 1000,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5
    }));
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 5000);
  };

  const handleFeelingClick = (feeling: { id: string; rejected: boolean }) => {
    setSelectedFeeling(feeling);
    if (feeling.rejected) {
      setRejectionCount(prev => prev + 1);
      setTimeout(() => setSelectedFeeling(null), 2000);
    } else {
      setShowResult(true);
      createCelebrationHearts();
      createConfetti();
      setTimeout(() => createCelebrationHearts(), 1000);
      setTimeout(() => createConfetti(), 1500);
      setTimeout(() => {
        setShowFinal(true);
        setShowConfetti(true);
      }, 10000); // <-- Show "Perfect Choice!" for 10 seconds before showing the conclusion
    }
  };

  const resetGame = () => {
    setSelectedFeeling(null);
    setShowResult(false);
    setRejectionCount(0);
    setCelebrationHearts([]);
    setConfetti([]);
    setShowFinal(false);
    setShowConfetti(false);
  };

  return (
    <div className="relative">
      {/* Celebration Hearts */}
      {celebrationHearts.map(heart => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50 animate-heart-rise text-4xl"
          style={{
            left: heart.x,
            top: heart.y,
            animationDelay: `${heart.delay}ms`
          }}
        >❤️</div>
      ))}

      {/* Confetti */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="fixed pointer-events-none z-40 animate-confetti-fall"
          style={{
            left: piece.x,
            top: piece.y,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}ms`,
            transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`
          }}
        >
          <div className="w-3 h-3 rounded-sm" />
        </div>
      ))}

      {/* Divider */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300/50 to-transparent"></div>
        <div className="px-6">
          <Sparkles className="w-8 h-8 text-pink-300 animate-pulse" />
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300/50 to-transparent"></div>
      </div>

      {!showResult && !showFinal ? (
        <div className="text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-200 via-rose-200 to-purple-200 bg-clip-text text-transparent mb-6">
              How Do You Feel?
            </h2>
            <p className="text-xl md:text-2xl text-pink-200/90 font-light">
              After reading my letter... whats your heart saying? 🌝
            </p>
            {rejectionCount > 0 && (
              <div className="mt-6 animate-bounce">
                <p className="text-lg text-yellow-300 font-medium">
                  {rejectionMessages[rejectionCount % rejectionMessages.length]}
                </p>
                <p className="text-sm text-pink-300/70 mt-2">
                  Attempts: {rejectionCount} 😼
                </p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {feelingOptions.map((feeling) => (
              <button
                key={feeling.id}
                onClick={() => handleFeelingClick(feeling)}
                disabled={selectedFeeling !== null}
                className={`relative group p-8 rounded-3xl border-2 transition-all duration-500 transform hover:scale-105 disabled:cursor-not-allowed ${
                  selectedFeeling?.id === feeling.id
                    ? feeling.rejected
                      ? 'border-red-400 bg-red-500/20 animate-shake'
                      : 'border-green-400 bg-green-500/20'
                    : 'border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-md'
                }`}
              >
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feeling.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`} />
                <div className="relative">
                  <div className="text-4xl mb-4">{feeling.text.split(' ')[0]}</div>
                  <div className="text-xl font-semibold text-white">
                    {feeling.text.split(' ').slice(1).join(' ')}
                  </div>
                </div>
                {selectedFeeling?.id === feeling.id && feeling.rejected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-500/30 rounded-3xl backdrop-blur-sm">
                    <div className="text-6xl animate-pulse">❌</div>
                  </div>
                )}
              </button>
            ))}
          </div>
          {rejectionCount >= 3 && (
            <div className="mt-8 p-4 bg-yellow-500/20 rounded-2xl border border-yellow-400/30 backdrop-blur-md max-w-md mx-auto">
              <p className="text-yellow-200 text-sm">
                💡 Hint: Maybe I want BOTH things at once? 😉
              </p>
            </div>
          )}
        </div>
      ) : !showFinal ? (
        <div className="text-center animate-fade-in">
          <div className="mb-12">
            <div className="text-8xl mb-6 animate-bounce">🥰</div>
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent mb-6">
              Perfect Choice!
            </h2>
            <p className="text-2xl md:text-3xl text-pink-200 font-light mb-4">
              {successMessages[Math.floor(Math.random() * successMessages.length)]}
            </p>
            <p className="text-xl text-pink-300/80">
              You tried {rejectionCount} times, but you got it right! 🤌🏻
            </p>
          </div>
        </div>
      ) : (
        <>
          {showFinal && (
            <>
              <HeartConfettiBurst show={showConfetti} />
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <div className="relative w-full max-w-2xl mx-auto px-6">
                  {/* Glow background */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-pink-200 via-rose-100 to-yellow-100 blur-2xl opacity-40 z-0"></div>
                  <div className="relative bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-2xl z-10">
                    {/* Main Tanglish Text */}
                    <div
                      className="text-2xl md:text-4xl font-bold text-pink-600 mb-4 animate-scale-in text-center"
                      style={{
                        fontFamily: "'Dancing Script', cursive",
                        textShadow: "0 2px 8px #f472b6, 0 0px 12px #f9a8d4",
                        letterSpacing: "0.01em"
                      }}
                    >
                      Ogayyy website mudinjiduchu... 🌝💖<br />
                      But kadhool mudiayalaye... <span className="whitespace-nowrap"> Our love? Never ending ra maaa... 🫂</span>
                    </div>
                    {/* Sub Text */}
                  
                    {/* Glowing Birthday Text */}
                    <div
                      className="mt-4 text-xl md:text-2xl font-bold text-white-500 animate-glow-bounce text-center"
                      style={{
                        textShadow: "0 0 2px #f472b6, 0 0 6px #fb7185, 0 0 12px #fca5a5",
                        animationDelay: "1.2s",
                        animationFillMode: "forwards"
                      }}
                    >
                      Once again Happy Birthday My Love &quot;D&quot; 🎀
                    </div>
                  </div>
                </div>
                <button
                  onClick={resetGame}
                  className="mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <RefreshCw className="w-5 h-5" />
                  Play Again
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default function MySpecialLetter() {
  type ConfettiHeart = {
    id: number;
    x: number;
    y: number;
    dx: number;
    dy: number;
    delay: number;
    size: number;
    rotate: number;
    color: string;
  };
  const [hearts, setHearts] = useState<ConfettiHeart[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Create floating hearts on click
  const createHeart = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now() + Math.random(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    // setHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 3000);
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 50% 50%, 
          rgba(244, 114, 182, 0.2) 0%, 
          rgba(168, 85, 247, 0.1) 40%, 
          rgba(15, 23, 42, 1) 70%),
          linear-gradient(135deg, #881337 0%, #be185d 30%, #7c3aed 100%)
        `
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${10 + Math.random() * 6}s`
            }}
          >
            <div className="w-1 h-1 bg-pink-300/40 rounded-full animate-pulse" />
          </div>
        ))}
      </div>

      {/* Floating hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute pointer-events-none z-50 animate-heart-float"
          style={{ left: heart.x, top: heart.y }}
        >
          <Heart className="w-8 h-8 text-red-400 fill-current" />
        </div>
      ))}

      {/* Header */}
      <header className="relative z-20 pt-8 pb-6">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back button */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-pink-200 hover:text-white transition-colors mb-8 group"
            aria-label="Back to Game"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Game
          </button>
          {/* Title */}
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-200 via-rose-200 to-purple-200 bg-clip-text text-transparent">
                For My Love
              </h1>
              <div className="absolute -top-2 -right-6 animate-bounce">
                <Heart className="w-6 h-6 text-pink-400 fill-current" />
              </div>
              <div className="absolute -bottom-1 -left-4 animate-pulse">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Quote className="w-5 h-5 text-pink-300 rotate-180" />
              <p className="text-lg text-pink-200/90 italic">
                A letter from my heart to yours
              </p>
              <Quote className="w-5 h-5 text-pink-300" />
            </div>
          </div>
        </div>
      </header>

      {/* Music Player */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-black/20 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/10 transition-all duration-300"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-pink-300" />
          ) : (
            <Play className="w-5 h-5 text-pink-300" />
          )}
        </button>
      </div>

      {/* Letter Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pb-16">
        <div
          className="relative bg-gradient-to-b from-amber-50 to-cream-100 rounded-3xl p-12 md:p-16 shadow-2xl border border-amber-200/50 cursor-pointer"
          onClick={createHeart}
          style={{
            background: 'linear-gradient(to bottom, #fffbeb, #fef3c7, #fde68a)'
          }}
        >
          {/* Paper texture overlay */}
          <div className="absolute inset-0 opacity-5 rounded-3xl pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
          {/* Letter Date */}
          <div className="text-center mb-8">
            <div className="inline-block text-amber-700/60 text-sm font-light mb-4">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <Heart className="w-6 h-6 text-rose-500 mx-auto" />
          </div>
{/* Letter Content */}
          <div className="relative text-amber-900 leading-relaxed space-y-8">
            {/* Beautiful greeting with enhanced styling */}
            <div className="text-center mb-12">
              <div
                className="text-4xl md:text-5xl font-bold text-rose-700 mb-4 relative inline-block"
                style={{ 
                  fontFamily: "'Sacramento', cursive",
                  textShadow: '2px 2px 4px rgba(180, 83, 9, 0.3)',
                  letterSpacing: '0.02em'
                }}
              >
                My Dearest Dheepsz...! 💝
                <div className="absolute -top-2 -right-8 animate-bounce">
                  <Heart className="w-6 h-6 text-rose-500 fill-current" />
                </div>
                <div className="absolute -bottom-1 -left-6 animate-pulse">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                </div>
              </div>
              <div className="w-24 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 mx-auto rounded-full"></div>
            </div>

            {/* Letter body with romantic styling */}
            <div
              className="text-lg font-serif leading-loose text-amber-800 relative"
              style={{
                fontFamily: "'Crimson Text', serif",
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 32px, rgba(180, 83, 9, 0.08) 32px, rgba(180, 83, 9, 0.08) 34px)',
                minHeight: '400px',
                paddingTop: '16px'
              }}
            >
              <div className="space-y-8 px-4">
                {/* Birthday wish with special styling */}
                <div className="text-center">
                  <span className="text-2xl font-bold text-rose-600" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  Dheepsz, wish you many more happy returns of the day D! 🎀🫂
                  </span>
                </div>

                {/* Main letter content with improved formatting */}
                <div className="space-y-6 text-justify indent-8">
                  <p className="leading-8">
                    There are lot of things that with you in the past <span className="font-semibold text-rose-700">3 years</span>... 
                    yeah 3 years since <span className="font-semibold text-rose-700">30th August</span> day when I text u the message happy birthday. 
                    Actually apo lam therla that nammkula ivlo dhooram la agum nu... but those lot of conversations between us and 
                    stories of each other makes much better as rather than as a friend to <span className="italic font-semibold text-rose-700">girlfriend of mine D</span>. 
                    Una yen pudichuchu lam therla deyyy but patha annikey some instance irundhuku adhan maybe annikey 
                    unta close aagama ivlo naal aprm una enta kooti2 vandhurku deyyy... ilanaa ivlo dhooram namma pesirpom ah 
                    unaku ena pudichurkuma therla... maybe idhey mari edho oru instance nammala innum better adutha level ku 
                    eduthu pochu naa.. yarku theriyum I hope if it happens means there is none other person will be happier than me in this universe..🥹
                  </p>

                  <p className="leading-8">
                    And you know what… Actually <span className="italic font-bold text-rose-700">naa un chins ooda kozhi la vilundhuten deyyy</span> 😭. 
                    Whenever I saw you I always want that happiness in your face to look at those chins holes d and I always want to hug you tightly .
                    Nee nenaikalam ivanku yen ivlo pudikudhu nu but enaku adhuku answer illa aana unta irukum podhu edhunalumey nalaa pogudhu deyyy u clam me... u stble me... nd u come into my lyf as a lucky fairytale for me 
                    Adhuku example ah dhan naan love panna team RCB win pannuchu... ivlo naal ahh cup eh ilamaa irundhchu pola... but hopefully with god&apos;s grace u come into my lyf and make it happend thats wat destiny uhm pola... my lucky charm.. 
                    adhukum nee en life la varanum dhan ivlo naal ahh cup eh ilamaa irundhchu pola... but hopefully with god&apos;s grace 
                    I got my <span className="font-bold text-rose-600 italic">lucky charm</span> in the 18th season of IPL and 20th age of mine. 
                    lucky and warmful ana person ah enta eppovum irupiya deyyy unoda 100th birthday varaikum enkudaye... just us irukalama deyyy until we can 😭 💕
                  </p>

                  {/* Love declaration section with special styling */}
                  <div className="bg-rose-50/50 rounded-2xl p-6 border-l-4 border-rose-400 my-8">
                    <p className="text-xl leading-8 text-rose-800">
                      Then finally... <br />
                      <span className="font-bold text-2xl text-rose-700" style={{ fontFamily: "'Dancing Script', cursive" }}>
                        I love your character, I love your smile, I love your chins, I love your eyes, 
                        I love your possessiveness, I love your care, I love your affection, 
                        I love your cuteness, I love your hug, I love your kiss, 
                        <span className="text-3xl block mt-2 text-center">
                          I love your everything... 🤗
                        </span>
                      </span>
                    </p>
                    <div className="text-center mt-6">
                      <div className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent" 
                          style={{ fontFamily: "'Dancing Script', cursive" }}>
                        I Love You Dheepsz.. My D forever maa 💖
                      </div>
                    </div>
                  </div>

                  <p className="text-center text-xl font-semibold text-rose-700 leading-10" style={{ fontFamily: "'Great Vibes', cursive" }}>
                    Have a great year ahead dheepsz as like the same &ldquo;loosu dheepsz&rdquo; which is more impressive 
                    and unforgettable forever my one and only love D! 🎀
                  </p>
                </div>
              </div>

              {/* Romantic signature */}
              <div className="text-right mt-16 pr-4">
                <div className="text-2xl italic mb-3 text-amber-700" style={{ fontFamily: "'Dancing Script', cursive" }}>
                  Forever yours,
                </div>
                <div className="text-4xl font-bold text-rose-600 relative inline-block"
                    style={{ fontFamily: "'Dancing Script', cursive" }}>
                  IKK 💖
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full"></div>
                </div>
                <div className="mt-2 text-sm text-amber-600 italic">
                  With all my heart & soul ✨
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-8 right-8">
            <Sparkles className="w-6 h-6 text-rose-400/40" />
          </div>
          <div className="absolute bottom-8 left-8">
            <Heart className="w-5 h-5 text-rose-400/40 fill-current" />
          </div>
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <div className="w-2 h-16 bg-rose-400/20 rounded-full"></div>
          </div>
          {/* Paper stack shadow effect */}
          <div className="absolute -bottom-2 -right-2 w-full h-full bg-amber-200/40 rounded-3xl -z-10" />
          <div className="absolute -bottom-4 -right-4 w-full h-full bg-amber-300/30 rounded-3xl -z-20" />
        </div>
      </main>

      {/* Interactive Conclusion Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16 mt-16">
        <InteractiveConclusionSection />
      </section>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(2deg); }
          66% { transform: translateY(10px) rotate(-2deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes heart-rise {
          0% { transform: translateY(0) scale(0.5); opacity: 0.8; }
          50% { transform: translateY(-50vh) scale(1.2); opacity: 1; }
          100% { transform: translateY(-100vh) scale(0.8); opacity: 0; }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes heart-float {
          0% { transform: translateY(0px) scale(1) rotate(0deg); opacity: 1; }
          50% { transform: translateY(-40px) scale(1.3) rotate(15deg); opacity: 0.7; }
          100% { transform: translateY(-80px) scale(0.8) rotate(30deg); opacity: 0; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.9);}
          100% { opacity: 1; transform: scale(1);}
        }
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out 2;
        }
        .animate-heart-rise {
          animation: heart-rise 4s ease-out forwards;
        }
        .animate-confetti-fall {
          animation: confetti-fall 5s linear forwards;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-heart-float {
          animation: heart-float 3s ease-out forwards;
        }
        .animate-scale-in {
          animation: fade-in 0.8s cubic-bezier(.61,-0.01,.41,1.01) both;
        }
        .animate-glow-bounce {
          animation: glow-bounce 1.2s cubic-bezier(.61,-0.01,.41,1.01) both;
        }
        @keyframes glow-bounce {
          0% { opacity: 0; transform: scale(0.7);}
          60% { opacity: 1; transform: scale(1.1);}
          100% { opacity: 1; transform: scale(1);}
        }
      `}</style>
    </div>
  );
}