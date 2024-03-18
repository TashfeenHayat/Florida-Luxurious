import React from "react";
import { Col, Flex, Row, Typography } from "antd";
import DownArrow from "../../assets/downarrow.svg";
const { Title, Text } = Typography;
function FloridaProperties() {
  return (
    <div className="bg-img-logo" style={{ color: "#fff", padding: "0px 20px" }}>
      <Row>
        <Col span={12} className="relative cover_rectagle">
          <Flex
            className="pt-90 pb-10"
            style={{ position: "sticky", top: "0" }}
          >
            <div>
              <Title level={1} className="text-white">
                Florida Luxurious Properties
              </Title>
              <Text className="text-white f-18" style={{ lineheight: "29px" }}>
                Performance metrics are quantifiable measures used to assess the
                efficiency, effectiveness, and success of an organization, team,
                process, or individual. These metrics are used to track progress
                toward goals, evaluate performance, and identify areas for
                improvement. In the context of a business or website,
                performance metrics can include a wide range of indicators such
                as revenue, sales, customer satisfaction, website traffic,
                conversion rates, user engagement, and more. By analyzing
                performance metrics, organizations can make data-driven
                decisions to optimize operations and achieve their objectives.
              </Text>
            </div>
          </Flex>
        </Col>
        <Col span={12}>
          <Col span={19} offset={1}>
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
