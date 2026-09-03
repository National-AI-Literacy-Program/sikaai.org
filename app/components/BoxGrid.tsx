"use client";

import React, { useState } from "react";

const boxItems = [
  "AI Literacy",
  "AI for Everyone",
  "AI in Agriculture",
  "AI in Manufacturing",
  "AI in Retail",
  "AI in Cybersecurity",
  "AI in Robotics",
  "AI in Natural Language Processing",
];

interface BoxGridProps {
  speed?: number;
  direction?: "left" | "right";
}

const BoxGrid: React.FC<BoxGridProps> = ({
  speed = 120,
  direction = "left",
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    setIsPaused(true);
  };

  return (
    <section className="box-grid-wrapper">
      <div className="carousel-track">
        <div
          className={`carousel-track-inner ${direction === "left" ? "marquee-left" : "marquee-right"
            }`}
          style={{
            animationDuration: `${speed}s`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {[...boxItems, ...boxItems].map((item, index) => (
            <button
              type="button"
              key={`${item}-${index}`}
              className={`box ${selectedIndex === index ? "selected" : ""}`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              onClick={() => handleClick(index)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        .box-grid-wrapper {
          width: 100%;
          padding: 5px 0;
          overflow: hidden;
        }

        .carousel-track {
          display: flex;
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .carousel-track-inner {
          display: flex;
          width: max-content;
          align-items: center;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .marquee-left {
          animation-name: looping-scroll-left;
        }

        .marquee-right {
          animation-name: looping-scroll-right;
        }

        .box {
          flex: 0 0 auto;
          margin: 8px 6px;
          padding: 14px 25px;
          border: 1px solid var(--line);
          border-radius: 99px;
          background: #fff;
          color: var(--foreground);
          font: inherit;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          cursor: pointer;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .box:hover,
        .box:focus-visible {
          border-color: var(--blue);
          background: var(--blue-pale);
          color: var(--blue-deep);
          outline: none;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px #007fb914;
        }

        .box.selected {
          border-color: var(--blue);
          background: var(--blue);
          color: #fff;
          box-shadow: 0 8px 18px #00aaff33;
        }

        @keyframes looping-scroll-left {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes looping-scroll-right {
          0% {
            transform: translateX(-50%);
          }

          100% {
            transform: translateX(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .carousel-track-inner {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default BoxGrid;
