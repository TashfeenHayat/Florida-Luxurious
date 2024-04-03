import React from "react";
import Team from "../assets/team.png";
import { Flex, Typography, Button } from "antd";
function Flip({ fImg, bImg, minHeight }) {
  console.log(fImg, "che");
  return (
    <div className="displayy-teamimg-center">
      <div class="flip-container" style={{ minHeight: minHeight }}>
        <div class="flipper">
          <div class="front">
            <img src={Team} width="100%" />
          </div>
          <div class="back">
            <img src={Team} width="100%" className="img-op1" />
            <div className="p-absoulte p-b-30-left-0 w-100">
              <Flex justify="center" align="center">
                <button className="team-view-btn">View More </button>
              </Flex>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flip;
