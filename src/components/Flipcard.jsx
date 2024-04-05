import React, { useState } from "react";
import { Flex } from "antd";
export default function FlipCard({ fImg, bImg, children }) {
  const [flip, setFlip] = useState(false);

  const flipCard = () => {
    setFlip(!flip);
  };

  return (
    <div
      className={`flip-card ${flip != true ? "front-flip" : "back-flip"}`}
      onMouseEnter={flipCard}
      onMouseLeave={flipCard}
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
