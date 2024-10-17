"use client";

import React, { useState, useEffect } from "react";

import "../app/styles/bubbles.css";

const Bubbles: React.FC = () => {
  const [bubbles, setBubbles] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const generateBubbles = () => {
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      const bubbleCount = isMobile ? 15 : 30;

      return Array.from({ length: bubbleCount }, (_, i) => {
        const size = Math.random() * 30 + 10;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 5 + 8;
        const animationDelay = Math.random() * 5;

        return (
          <div
            key={i}
            className="bubble"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              animationDuration: `${animationDuration}s`,
              animationDelay: `${animationDelay}s`,
            }}
          />
        );
      });
    };

    const handleResize = () => {
      setBubbles(generateBubbles());
    };

    // Initial render
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div className="bubbles">{bubbles}</div>;
};

export default Bubbles;
