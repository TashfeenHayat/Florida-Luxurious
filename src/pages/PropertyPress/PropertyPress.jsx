import React from "react";
import { Flex, Typography, Row, Col } from "antd";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
const { Title } = Typography;
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
      <Container>
        <Row gutter={[60, 60]}>
          <Col lg={12} sm={24} md={24}></Col>
          <Col lg={12} sm={24} md={24}></Col>
        </Row>
      </Container>
    </>
  );
}

export default PropertyPress;
