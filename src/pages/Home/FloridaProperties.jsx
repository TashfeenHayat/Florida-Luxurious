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
    <div
      className="bg-img-logo"
      style={{ color: "#fff", padding: "0px 20px", backgroundColor: "#1c1c1c" }}
    >
      <Row>
        <Col lg={12} md={24} className="relative cover_rectagle">
          <Flex
            className="pt-90 pb-10"
            style={{ position: "sticky", top: "0" }}
          >
            <div>
              <Title level={1} className="text-white" data-aos="fade-right">
                Florida Luxurious Properties
              </Title>
              <Flex gap={20} justify="center" wrap="wrap">
                <img
                  src={Bagde}
                  data-aos="fade-right"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                />
                <img
                  src={Bagde2}
                  data-aos="fade-right"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1500"
                />
                <img
                  src={Bagde3}
                  data-aos="fade-right"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="2000"
                />
                <img
                  src={Bagde4}
                  data-aos="fade-right"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="2500"
                />
              </Flex>
            </div>
          </Flex>
        </Col>
        <Col lg={12} md={24}>
          <Col lg={19} offset={1}>
            <Flex justify="center" align={"center"}>
              <img src={DownArrow} height="250px" />
            </Flex>
            <Flex
              vertical
              justify="center"
              align={"center"}
              className="pb-90"
              gap={"4rem"}
            >
              <Title
                className="text-white f-64 mt-150 text-center"
                level={1}
                style={{ marginBottom: "0px" }}
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                #1
                <br />{" "}
                <Text
                  className="text-gray text-upper f-16 mt-16"
                  data-aos="fade-left"
                >
                  Ranked Private Brokerage
                </Text>
              </Title>

              <Title
                className="text-white f-64 text-center"
                level={1}
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                $1.8 BILLION <br />
                <Text className="text-gray text-upper f-16">
                  Has exceeded the mark
                </Text>
              </Title>

              <Title
                className="text-white f-64 text-center"
                level={1}
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                $1,831,197,188 <br />{" "}
                <Text className="text-gray text-upper f-16 ">Total Sales</Text>
              </Title>
            </Flex>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default FloridaProperties;
