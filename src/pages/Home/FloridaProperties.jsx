import React, { useEffect, useState } from "react";
import { Col, Flex, Row, Typography } from "antd";
import DownArrow from "../../assets/downarrow.svg";
import Bagde from "../../assets/2019.svg";
import Bagde1 from "../../assets/2021.svg";

import Bagde2 from "../../assets/2020.svg";
import Bagde3 from "../../assets/2022.svg";
import Bagde4 from "../../assets/2023.svg";

const { Title, Text } = Typography;
function FloridaProperties() {
  const [counter, setCounter] = useState(3000000);

  useEffect(() => {
    const target = 3625844000;

    const duration = 500;
    const intervalTime = 30;
    const increment = (target - counter) / (duration / intervalTime);

    // Set up the interval
    const interval = setInterval(() => {
      setCounter((prev) => {
        const newValue = Math.min(prev + increment, target);
        return newValue;
      });
    }, intervalTime);
    if (counter >= target) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [counter]);
  return (
    <div
      className="bg-img-logo"
      style={{ color: "#fff", padding: "0px 20px", backgroundColor: "#1c1c1c" }}
    >
      <Row>
        <Col
          lg={12}
          md={24}
          sm={32}
          xsm={9}
          className="relative cover_rectagle"
        >
          <Flex
            className="pt-90 pb-10"
            style={{ position: "sticky", top: "0" }}
          >
            <div>
              <Title level={1} className="text-white" data-aos="fade-right">
                Florida Luxurious Properties
              </Title>
              <Flex gap={20} justify="center" wrap="wrap" overflow="hidden">
                <img
                  style={{ width: "90px" }}
                  src={Bagde}
                  data-aos="fade-right"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                />
                <img
                  style={{ width: "90px" }}
                  src={Bagde2}
                  data-aos="fade-right"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1500"
                />
                <img
                  style={{ width: "90px" }}
                  src={Bagde1}
                  data-aos="fade-right"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1500"
                />
                <img
                  style={{ width: "90px" }}
                  src={Bagde3}
                  data-aos="fade-right"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="2000"
                />
                <img
                  style={{ width: "90px" }}
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
              <img src={DownArrow} className="Downarrow" height="250px" />
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
                  className="text-white text-upper f-24 mt-16"
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
                $3.26 BILLION <br />
                <Text className="text-white text-upper f-24">
                  Has exceeded the mark
                </Text>
              </Title>

              <Title
                className="text-white f-64 text-center"
                level={1}
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                ${Math.floor(counter).toLocaleString()} <br />{" "}
                <Text className="text-white text-upper f-24 ">Total Sales</Text>
              </Title>
            </Flex>
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default FloridaProperties;
