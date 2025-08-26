"use client";
import { ArrowRight, Heart, Pause, Play, RotateCcw, Sparkles, Trophy } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Card = {
  id: number;
  img: string;
  matched: boolean;
};

type HeartType = {
  id: number;
  x: number;
  y: number;
  delay: number;
};

export default function RomanticMemoryGame() {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<Card | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [matches, setMatches] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [hearts, setHearts] = useState<HeartType[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [, setShowCelebration] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cardImages = useMemo(() => [
    "/images/photo1.jpg",
    "/images/photo2.jpg", 
    "/images/photo3.jpg",
    "/images/photo4.jpg",
    "/images/photo5.jpg",
    "/images/photo6.jpg",
  ], []);

  const shuffleCards = useCallback(() => {
    const shuffled = [...cardImages, ...cardImages]
      .map((img) => ({ id: Math.random(), img, matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setTurns(0);
    setMatches(0);
    setGameCompleted(false);
    setShowCelebration(false);
    setChoiceOne(null);
    setChoiceTwo(null);
  }, [cardImages]);

  // Handle mouse movement for background effects
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
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Initialize game
  useEffect(() => {
    shuffleCards();
  }, [shuffleCards]);

  // Compare selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.img === choiceTwo.img) {
        setCards(prev =>
          prev.map(card =>
            card.img === choiceOne.img ? { ...card, matched: true } : card
          )
        );
        setMatches(m => m + 1);
        createCelebrationHearts();
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Check for game completion
  useEffect(() => {
    if (matches === 6 && !gameCompleted) {
      setGameCompleted(true);
      setShowCelebration(true);
      createVictoryAnimation();
    }
  }, [matches, gameCompleted]);

const handleChoice = (card: Card) => {
  if (!disabled && !card.matched) {
    if (choiceOne) {
      setChoiceTwo(card);
    } else {
      setChoiceOne(card);
    }
  }
};


  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(t => t + 1);
    setDisabled(false);
  };

  const createCelebrationHearts = () => {
    const newHearts = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
      delay: Math.random() * 500
    }));
    setHearts(prev => [...prev, ...newHearts]);
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => !newHearts.some(newHeart => newHeart.id === heart.id)));
    }, 2000);
  };

  const createVictoryAnimation = () => {
    const victoryHearts = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i + 1000,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
      y: typeof window !== 'undefined' ? window.innerHeight : 600,
      delay: Math.random() * 2000
    }));
    setHearts(prev => [...prev, ...victoryHearts]);
    setTimeout(() => {
      setHearts([]);
    }, 5000);
  };

  const goToNextPage = () => {
    router.push('/couple');
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
          rgba(244, 114, 182, 0.2) 0%, 
          rgba(168, 85, 247, 0.1) 40%, 
          rgba(15, 23, 42, 1) 70%),
          linear-gradient(135deg, #881337 0%, #be185d 30%, #7c3aed 100%)
        `
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 6}s`
            }}
          >
            <Sparkles className="w-2 h-2 text-pink-300/30" />
          </div>
        ))}
      </div>

      {/* Floating celebration hearts */}
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute pointer-events-none z-50 animate-heart-rise text-2xl"
          style={{ 
            left: heart.x, 
            top: heart.y,
            animationDelay: `${heart.delay}ms`
          }}
        >
          ❤️
        </div>
      ))}

      {/* Music Player */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-black/20 backdrop-blur-md border border-white/20 rounded-full p-3 hover:bg-white/10 transition-all duration-300"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-pink-300" />
          ) : (
            <Play className="w-5 h-5 text-pink-300" />
          )}
        </button>
      </div>

      {/* Header */}
      <header className="relative z-20 text-center pt-12 pb-8">
        <div className="relative inline-block mb-6">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-200 via-rose-200 to-purple-200 bg-clip-text text-transparent">
            Match D Memories
          </h1>
          <div className="absolute -top-4 -right-8 animate-bounce">
            <Heart className="w-8 h-8 text-pink-400 fill-current" />
          </div>
          <div className="absolute -bottom-2 -left-6 animate-pulse">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
        </div>

        {/* Game Stats */}
        <div className="flex items-center justify-center gap-8 text-pink-200">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            <span className="text-lg">Turns: {turns}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            <span className="text-lg">Matches: {matches}/6</span>
          </div>
        </div>
      </header>

      {/* Game Board */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pb-12">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl">
          {cards.map(card => (
            <div
              key={card.id}
              onClick={() => handleChoice(card)}
              className={`relative w-20 h-28 md:w-28 md:h-36 cursor-pointer perspective-1000 transition-all duration-300 hover:scale-105 ${
                disabled ? 'cursor-not-allowed' : ''
              }`}
            >
              <div
                className={`relative w-full h-full duration-700 transform-style-preserve-3d transition-transform ${
                  card === choiceOne || card === choiceTwo || card.matched
                    ? "rotate-y-180"
                    : ""
                }`}
              >
                {/* Card Back */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl shadow-xl backface-hidden border-2 border-white/20">
                  <div className="flex flex-col items-center justify-center h-full">
                    <Heart className="w-8 h-8 md:w-12 md:h-12 text-white/90 fill-current mb-2" />
                    <div className="text-white/60 text-sm font-light">💕</div>
                  </div>
                  {/* Card decoration */}
                  <div className="absolute top-2 left-2">
                    <Sparkles className="w-4 h-4 text-white/40" />
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Sparkles className="w-4 h-4 text-white/40" />
                  </div>
                </div>

                {/* Card Front (Image) */}
                <div className="absolute inset-0 rounded-2xl shadow-xl overflow-hidden transform rotate-y-180 backface-hidden border-2 border-white/30">
                  <Image
                    src={card.img}
                    alt="Our memory"
                    className="w-full h-full object-cover transition-all duration-300"
                    width={300}
                    height={300}
                  />
                  {card.matched && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                      <div className="bg-green-500 rounded-full p-2 animate-pulse">
                        <Heart className="w-6 h-6 text-white fill-current" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Game Completion */}
        {gameCompleted && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 max-w-md text-center">
              <div className="text-6xl mb-6 animate-bounce">🏆</div>
              <h2 className="text-4xl font-bold text-pink-200 mb-4">
                Congratulations!
              </h2>
              <p className="text-xl text-pink-300/90 mb-2">
                You&apos;ve matched all beautiful memories!
              </p>
              <p className="text-lg text-pink-400/80 mb-8">
                Completed in {turns} turns ✨
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={goToNextPage}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                >
                  Continue Our Journey
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <button
                  onClick={shuffleCards}
                  className="w-full bg-white/10 hover:bg-white/20 text-pink-200 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Play Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Button */}
        <button
          onClick={shuffleCards}
          className="mt-8 bg-white/10 hover:bg-white/20 text-pink-200 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/20 flex items-center gap-2 backdrop-blur-md"
        >
          <RotateCcw className="w-5 h-5" />
          New Game
        </button>
      </main>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(2deg); }
          66% { transform: translateY(5px) rotate(-2deg); }
        }
        
        @keyframes heart-rise {
          0% { transform: translateY(0) scale(0.5); opacity: 0.8; }
          50% { transform: translateY(-30vh) scale(1.2); opacity: 1; }
          100% { transform: translateY(-60vh) scale(0.8); opacity: 0; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }
        
        .animate-heart-rise {
          animation: heart-rise 2s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}