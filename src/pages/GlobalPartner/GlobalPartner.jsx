import React from "react";
import BackgroundImage from "../../components/BackgroundImage";
import BoatImage from "../../assets/boatowner.png";
import { Typography, Row, Col, Flex, Image } from "antd";
import Globalpartnerimg from "../../assets/globalpartnerimg.png";
import Lux from "../../assets/Lux.png";
const { Title, Text, Paragraph } = Typography;
function GlobalPartner() {
  return (
    <div>
      <BackgroundImage Image={BoatImage}>
        {" "}
        <Title
          style={{ color: "white", lineHeight: "14px", letterSpacing: "2px" }}
          className="text-upper f-50 f-100"
        >
          Global properties
        </Title>
      </BackgroundImage>
      <Paragraph className="f-40 f-100 text-black text-center text-upper pt-4">
        Florida{" "}
        <Text className="f-40 text-black text-center text-upper f-bold">
          Luxurious
        </Text>{" "}
        Properties GLOBAL
      </Paragraph>
      <Row gutter={[60, 60]} className="py-2">
        <Col lg={12} md={24} sm={24}>
          <div style={{ marginLeft: 50 }}>
            <Flex vertical justify={"center"} align="center">
              <Text
                className="text-black f-24 "
                style={{ textTransform: "capitalize" }}
              >
                Florida Luxurious Properties has a longstanding affiliation with
                a worldwide collection of more than 125,000 brokers covering 62
                countries. Who’s Who in Luxury Real Estate has been leading the
                real estate industry since 1986 and we are proud to be members
                of this hand – selected group of top brokers representing the
                finest luxury properties across the globe. With collective sales
                of over $240 Billion of real estate annually, it is the most
                elite and  comprehensive luxury real estate network in the
                world. Who’s Who in Luxury Real Estate’s is showcased on
                LuxuryRealEstate.com the No.1 portal for luxury properties
                online, allowing Florida Luxurious Properties to present our
                exclusive inventory to more than any near-peer.
              </Text>
              <Text className="f-40 f-bold text-center text-upper text-black mt-4">
                Our Global Partner
              </Text>
              <Image src={Lux} width="15%" className="text-center" />
              <Text className="f-24 f-100 text-center text-upper text-black mt-4">
                Honored in 2019 by LUXURY REAL ESTATE
              </Text>
            </Flex>
          </div>
        </Col>
        <Col lg={12} md={24} sm={24}>
          <Image src={Globalpartnerimg} className="bg-img-shadow" />
        </Col>
      </Row>
    </div>
  );
}

export default GlobalPartner;
