import React from "react";
import { Flex, Typography, Row, Col, Image } from "antd";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PressImg from "../../assets/Press.png";
const { Title, Paragraph, Text } = Typography;
function PropertyPress() {
  const dispatch = useDispatch();
  return (
    <>
      <div className="team-banner">
        <div className="team-banner-shadow">
          <Flex justify={"center"} align="center">
            <Title className="text-upper text-white f-50 f-100">
              Property Press{" "}
            </Title>
          </Flex>
        </div>
      </div>
      <Container className="py-4">
        <Row gutter={[60, 60]}>
          <Col lg={12} sm={24} md={24}>
            <Image src={PressImg} preview={false} />
          </Col>
          <Col lg={12} sm={24} md={24}>
            <div>
              <Title className="text-upper f-40 f-100">
                lighthouse point yacht club update
                <br />
                <Text>march 2024</Text>
              </Title>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <button
                className="button-secondary text-upper mt-32"
                style={{ width: "45%", background: "black", color: "white" }}
              >
                Read More
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PropertyPress;
