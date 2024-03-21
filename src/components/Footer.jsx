import React from "react";
import FooterLogo from "../assets/footerlogo.png";
import { Row, Col, Flex, Typography } from "antd";
const { Text, Title } = Typography;
function Footer() {
  return (
    <div className="bg-footer">
      <div className="footer-bg-img-shadow">
        <Row>
          <Col span={4}>
            <img src={FooterLogo} width="300" />
          </Col>
          <Col span={5} offset={2}>
            <Title className="text-upper f-24">our offerings</Title>
            <Flex vertical gap="10px">
              <Text className="text-upper">Our Offering</Text>
              <Text className="text-upper">Our Offering</Text>
              <Text className="text-upper">Our Offering</Text>
              <Text className="text-upper">Our Offering</Text>
              <Text className="text-upper">Our Offering</Text>
            </Flex>
          </Col>
          <Col span={5}>
            <Title className="text-upper f-24">Search by location</Title>
          </Col>
          <Col span={5}>
            <Title className="text-upper f-24">Communities</Title>
            <Text>Our Offering</Text>
          </Col>
          <Col span={5} offset={6}>
            <Title className="text-upper f-24">About</Title>
            <Flex vertical gap="10px">
              <Text className="text-upper">Our Offering</Text>
              <Text className="text-upper">Our Offering</Text>
              <Text className="text-upper">Our Offering</Text>
              <Text className="text-upper">Our Offering</Text>
              <Text className="text-upper">Our Offering</Text>
            </Flex>
          </Col>
          <Col span={5} offset={0}>
            <Title className="text-upper f-24">for boat owners</Title>
          </Col>
        </Row>
        <Flex justify="space-between" align="center">
          working
        </Flex>
      </div>
    </div>
  );
}

export default Footer;
