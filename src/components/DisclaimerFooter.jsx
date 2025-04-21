import React from "react";
import { Layout, Row, Col, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

const DisclaimerFooter = () => {
  return (
    <Footer
      style={{
        backgroundColor: "#000",
        padding: "20px 30px",
        textAlign: "center",
      }}
    >
      <Row justify="center">
        <Col xs={24} sm={24} md={20} lg={16}>
          <Text style={{ color: "#aaa", fontSize: 14 }}>
            © {new Date().getFullYear()} Florida Luxurious Properties. All
            rights reserved. Real Estate Website Design by{" "}
            <a
              href="https://www.interchanges.com/tag/nelson-bruton/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#aaa",
                fontSize: "14px",
                textDecoration: "none",
                fontWeight: "bold",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#fff")}
              onMouseLeave={(e) => (e.target.style.color = "#aaa")}
            >
              INTERCHANGES
            </a>
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default DisclaimerFooter;
