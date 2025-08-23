"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    setHearts(Array.from({ length: 15 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300 text-4xl"
          initial={{ y: "100vh", x: Math.random() * window.innerWidth }}
          animate={{ y: "-20vh" }}
          transition={{ duration: 10 + Math.random() * 10, repeat: Infinity }}
        >
          💖
        </motion.div>
      ))}
    </div>
  );
}
