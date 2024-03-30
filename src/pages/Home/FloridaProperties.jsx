import React from "react";
import { Col, Flex, Row, Typography } from "antd";
import DownArrow from "../../assets/downarrow.svg";
import Bagde from "../../assets/Bagde1.svg";
import Bagde2 from "../../assets/Bagde2.svg";
import Bagde3 from "../../assets/Bagde3.svg";
import Bagde4 from "../../assets/Bagde4.svg";

const { Title, Text } = Typography;
function FloridaProperties() {
  return (
    <div className="bg-img-logo" style={{ color: "#fff", padding: "0px 20px" }}>
      <Row>
        <Col lg={12} md={24} className="relative cover_rectagle">
          <Flex
            className="pt-90 pb-10"
            style={{ position: "sticky", top: "0" }}
          >
            <div>
              <Title level={1} className="text-white">
                Florida Luxurious Properties
              </Title>
              <Flex gap={20} justify="center" wrap="wrap">
                <img src={Bagde} />
                <img src={Bagde2} />
                <img src={Bagde3} />
                <img src={Bagde4} />
              </Flex>
            </div>
          </Flex>
        </Col>
        <Col lg={12} md={24}>
          <Col lg={19} offset={1}>
            <Flex justify="center" align={"center"}>
              <img src={DownArrow} height="250px" />
            </Flex>
            <Flex vertical justify="center" align={"center"} className="pb-90">
              <Title
                className="text-white f-50 mt-150"
                level={1}
                style={{ marginBottom: "0px" }}
              >
                #1
              </Title>
              <Text className="text-gray text-upper f-16 mt-16">
                Ranked Private Brokerage
              </Text>
              <Title className="text-white f-50" level={1}>
                $1.8 BILLION
              </Title>
              <Text className="text-gray text-upper f-16 mt-16">
                Has exceeded the mark
              </Text>
              <Title className="text-white f-50" level={1}>
                $1,831,197,188
              </Title>
              <Text className="text-gray text-upper f-16 mt-16">
                Total Sales
              </Text>
            </Flex>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default FloridaProperties;
