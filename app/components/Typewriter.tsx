'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypewriterProps {
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function Typewriter({
  strings,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseDuration = 1500,
  className = '',
}: TypewriterProps) {
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = strings[stringIndex];

    let timer: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentFullText.length) {
      // Typing forward
      timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, typeSpeed);
    } else if (!isDeleting && charIndex === currentFullText.length) {
      // Pause at full string before backspacing
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && charIndex > 0) {
      // Backspacing
      timer = setTimeout(() => {
        setCharIndex((prev) => prev - 1);
      }, deleteSpeed);
    } else if (isDeleting && charIndex === 0) {
      // Move to next string and restart typing
      setIsDeleting(false);
      setStringIndex((prev) => (prev + 1) % strings.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, stringIndex, strings, typeSpeed, deleteSpeed, pauseDuration]);

  const visibleText = strings[stringIndex].substring(0, charIndex);

  return (
    <span className={className}>
      {visibleText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
      />
    </span>
  );
}