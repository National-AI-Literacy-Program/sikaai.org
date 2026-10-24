'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

interface TypewriterProps {
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

function toGraphemes(text: string, locale: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const seg = new Intl.Segmenter(locale, { granularity: 'grapheme' });
    return Array.from(seg.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

export default function Typewriter({
  strings,
  typeSpeed = 80,
  deleteSpeed = 40,
  pauseDuration = 1500,
  className = '',
}: TypewriterProps) {
  const locale = useLocale();
  const units = useMemo(() => strings.map((s) => toGraphemes(s, locale)), [strings, locale]);
  const longest = useMemo(
    () => units.reduce<string[]>((a, b) => (b.length > a.length ? b : a), []).join(''),
    [units],
  );

  const [stringIndex, setStringIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const total = units[stringIndex].length;
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!isDeleting && count < total) {
      timer = setTimeout(() => setCount((c) => c + 1), typeSpeed);
    } else if (!isDeleting && count === total) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && count > 0) {
      timer = setTimeout(() => setCount((c) => c - 1), deleteSpeed);
    } else if (isDeleting && count === 0) {
      setIsDeleting(false);
      setStringIndex((i) => (i + 1) % units.length);
    }
    return () => clearTimeout(timer);
  }, [count, isDeleting, stringIndex, units, typeSpeed, deleteSpeed, pauseDuration]);

  return (
    <span className={`inline-grid ${className}`}>
      {/* Crawlers and screen readers get a full phrase; the animation is decorative */}
      <span className="sr-only">{strings[0]}</span>
      {/* Invisible copy of the longest phrase reserves its height */}
      <span aria-hidden className="invisible col-start-1 row-start-1">{longest}</span>
      <span aria-hidden className="col-start-1 row-start-1">
        {units[stringIndex].slice(0, count).join('')}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="ml-1 inline-block h-[1em] w-0.5 bg-current align-middle"
        />
      </span>
    </span>
  );
}