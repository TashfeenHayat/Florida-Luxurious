import React from "react";
import { Flex } from "antd";
import Team from "../assets/team.png";

function Flip({ minHeight }) {
  return (
    <div className="displayy-teamimg-center" style={{ minHeight: minHeight }}>
      <div className="flip-container">
        <div className="flipper">
          <div className="front">
            <img src={Team} alt="Front" className="flip-image" />
          </div>
          <div className="back">
            <img src={Team} alt="Back" className="flip-image img-op1" />
            <div className="p-absoulte p-b-30-left-0 w-100">
              <Flex justify="center" align="center">
                <button className="team-view-btn">View More</button>
              </Flex>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flip;
