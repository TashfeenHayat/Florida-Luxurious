import React from "react";
import { Row, Col } from "antd";
import LoadingImage from "../assets/LoadingFlorida.gif";

function Loading() {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
      }}
    >
      <Col xs={24} sm={18} md={12} lg={8} xl={6}>
        <img src={LoadingImage} style={{ width: "100%" }} alt="Loading" />
      </Col>
    </Row>
  );
}

export default Loading;
