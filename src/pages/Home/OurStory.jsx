import React from "react";
import { Col, Row } from "antd";
import Story from "../../assets/story.png";
function OurStory() {
  return (
    <Row>
      <Col span={12}>
        <div></div>
      </Col>
      <Col span={12}>
        <img src={Story} width="100%" />
      </Col>
    </Row>
  );
}

export default OurStory;
