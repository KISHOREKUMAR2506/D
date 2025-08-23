"use client";
import { motion } from "framer-motion";

interface AnimatedButtonProps {
  onClick?: () => void;
  text: string;
  className?: string;
}

export default function AnimatedButton({ onClick, text, className }: AnimatedButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`${className} mt-8`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {text}
    </motion.button>
  );
}
