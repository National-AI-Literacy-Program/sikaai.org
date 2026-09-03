"use client";

import { useEffect, useState } from "react";

interface SloganRotatorInterface {
  slogans?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  changingSpeed?: number;
}

const defaultSlogans = ["सिकाइबाट AI", "AI सँगै सिकाइ"];

const SloganRotator: React.FC<SloganRotatorInterface> = ({
  slogans = defaultSlogans,
  typingSpeed = 100,
  deletingSpeed = 50,
  changingSpeed = 1500,
}) => {
  const [typedSlogan, setTypedSlogan] = useState<string>("");
  const [sloganIndex, setSloganIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = 0;

    const currentSlogan = slogans[sloganIndex];

    if (isDeleting) {
      interval = setInterval(() => {
        setTypedSlogan((prev) => prev.slice(0, -1));
      }, deletingSpeed);

      if (typedSlogan === "") {
        clearInterval(interval);
        setIsDeleting(false);
        setSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
      }
    } else {
      if (typedSlogan.length < currentSlogan.length) {
        interval = setInterval(() => {
          setTypedSlogan((prev) => currentSlogan.slice(0, prev.length + 1));
        }, typingSpeed);
      } else {
        clearInterval(interval);
        setTimeout(() => setIsDeleting(true), changingSpeed);
      }
    }

    return () => clearInterval(interval);
  }, [typedSlogan, isDeleting, sloganIndex, slogans]);

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-8xl font-semibold mb-6">{typedSlogan}</h1>
    </div>
  );
};

export default SloganRotator;
