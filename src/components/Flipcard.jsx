import React, { useState,useEffect } from "react";

export default function FlipCard({ fImg, bImg, children }) {
  const [flip, setFlip] = useState(false);
 useEffect(() => {
   const isMobile = window.innerWidth <= 768;

   if (isMobile) {
     const timer = setInterval(() => {
       setFlip((prev) => !prev);
     }, 4000); // auto flip every 4 seconds

     return () => clearInterval(timer); // cleanup on unmount
   }
 }, []);
  const flipCard = () => setFlip(true);
  const unflipCard = () => setFlip(false);

  return (
    <div
      className={`flip-card ${!flip ? "front-flip" : "back-flip"}`}
      onMouseEnter={flipCard}
      onMouseLeave={unflipCard}
      onTouchStart={() => setFlip((prev) => !prev)} // flip on light tap on mobile
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">{fImg}</div>
        <div className="flip-card-back" style={{ position: "relative" }}>
          {bImg}
          {children}
        </div>
      </div>
    </div>
  );
}
