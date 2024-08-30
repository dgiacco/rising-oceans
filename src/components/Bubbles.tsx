import React from "react";

import "../app/styles/bubbles.css";

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const Bubbles = () => {
  const bubbles = Array.from({ length: 30 }).map((_, index) => {
    const size = random(15, 50); // Random bubble size between 20px and 60px
    const left = random(0, 100); // Random horizontal position between 0% and 100%
    const duration = random(8, 15); // Random animation duration between 8s and 15s
    const delay = random(0, 5); // Random animation delay between 0s and 5s

    return (
      <div
        key={index}
        className="bubble"
        style={{
          width: size,
          height: size,
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });

  return <>{bubbles}</>;
};

export default Bubbles;
