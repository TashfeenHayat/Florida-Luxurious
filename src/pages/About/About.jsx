import React from "react";
import About from "../../assets/about.png";
import BackgroundImage from "../../components/BackgroundImage";
import { Typography, Col, Row, Flex, Image } from "antd";
import Icons from "../../components/Icons";
import LetTalk from "../../components/LetTalk";
import Bagde from "../../assets/2019.svg";
import Bagde1 from "../../assets/2021.svg";

import Bagde2 from "../../assets/2020.svg";
import Bagde3 from "../../assets/2022.svg";
import Bagde4 from "../../assets/2023.svg";
import Bagde5 from "../../assets/2024.svg";
import { useState, useEffect } from "react";
const { Title, Text, Paragraph } = Typography;
function OurStory() {
  const [counter, setCounter] = useState(1831197188); // Starting value

  useEffect(() => {
    const target = 3823776248; // total value
    const duration = 500;
    const intervalTime = 30;
    const increment = (target - counter) / (duration / intervalTime);
    const interval = setInterval(() => {
      setCounter((prev) => {
        const newValue = Math.min(prev + increment, target);
        return newValue;
      });
    }, intervalTime);

    // Clear the interval when the target is reached
    if (counter >= target) {
      clearInterval(interval);
    }

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(interval);
  }, [counter]);
  return (
    <div className="ourstory">
      <BackgroundImage Image={About}>
        <Title
          style={{ color: "white", lineHeight: "14px", letterSpacing: "2px" }}
          className="text-upper f-50 f-100"
        >
          Our Story
        </Title>
      </BackgroundImage>
      <Row>
        <Col lg={10} sm={24} md={24} className="p-5">
          <Flex justify={"center"} align="center" className="w-75">
            <Title className="text-upper">
              <span className="our-title">Our</span>
              <i className="title-line-story"></i>
              <br />
              <span style={{ marginLeft: "0px" }} className="story-title">
                Story
              </span>
            </Title>
          </Flex>

          <Paragraph
            className="f-24 text-left f-100"
            style={{ textAlign: "justify" }}
          >
            In alignment with private banking, wealth management, and other
            highly individualized services that provide a greater level of
            attention and customer satisfaction, we offer the same discreet
            approach to buyers and sellers of luxurious properties. As an
            assertive, entrepreneurial team with broad expertise in servicing
            the needs of our clientele, we consistently achieve top sales
            results in Broward’s luxury market. To better facilitate the needs
            of our clients, we have agents fluent in Italian, Portuguese,
            Russian, Spanish, Romanian, Hebrew, Polish, and Turkish.
          </Paragraph>
        </Col>
        <Col lg={14} sm={32} sx={32} md={24} style={{ background: "#000" }}>
          <div className="p-5">
            <Title className="text-white text-center text-upper f-40">
              <span style={{ fontWeight: 100 }}>Florida</span> Luxurious{" "}
              <span style={{ fontWeight: 100 }}>Properties</span>
            </Title>
          </div>
          <Row gutter={[20, 20]} justify="center" style={{ display: "flex" }}>
            <Col xs={18} sm={16} md={24} lg={34} xl={32}>
              <Row justify="center" gutter={[20, 20]} wrap="true">
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Image className="badge2" preview={false} src={Bagde} />
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Image className="badge2" preview={false} src={Bagde2} />
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Image className="badge2" preview={false} src={Bagde1} />
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Image className="badge2" preview={false} src={Bagde3} />
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Image className="badge2" preview={false} src={Bagde4} />
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={3}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Image className="badge2" preview={false} src={Bagde5} />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row gutter={[20, 20]} className="my-124 px-3">
            {/* Box 1 */}
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div
                style={{
                  borderLeft: "3px solid white",
                  paddingLeft: "20px",
                }}
              >
                <Text
                  className="text-white f-16 text-upper storytitle"
                  style={{ fontWeight: "bold", display: "block" }}
                >
                  Ranked Private Brokerage
                </Text>
                <Text
                  className="text-white text-upper"
                  style={{ fontSize: "30px", display: "block" }}
                >
                  #1
                </Text>
              </div>
            </Col>

            {/* Box 2 */}
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div
                style={{
                  borderLeft: "3px solid white",
                  paddingLeft: "20px",
                }}
              >
                <Text
                  className="text-white f-16 text-upper storytitle"
                  style={{ fontWeight: "bold", display: "block" }}
                >
                  Has exceeded the mark
                </Text>
                <Text
                  className="text-white text-upper"
                  style={{ fontSize: "30px", display: "block" }}
                >
                  $3.82 BILLION
                </Text>
              </div>
            </Col>

            {/* Box 3 */}
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div
                style={{
                  borderLeft: "3px solid white",
                  paddingLeft: "20px",
                }}
              >
                <Text
                  className="text-white f-16 text-upper storytitle"
                  style={{ fontWeight: "bold", display: "block" }}
                >
                  Total Sales
                </Text>
                <Text
                  className="text-white text-upper"
                  style={{ fontSize: "30px", display: "block" }}
                >
                  ${Math.floor(counter).toLocaleString()}
                </Text>
              </div>
            </Col>
          </Row>

          {/* <Flex justify={"space-around"} className="my-124 px-3" wrap="wrap">
            <div style={{ borderLeft: "3px solid white", paddingLeft: "20px" }}>
              <Text className="text-gray f-16 text-upper">
                Ranked Private Brokerage
              </Text>
              <br />
              <Text className="text-white text-upper f-40">#1</Text>
            </div>
            <div style={{ borderLeft: "3px solid white", paddingLeft: "20px" }}>
              <Text className="text-gray f-16 text-upper">
                Has exceeded the mark
              </Text>
              <br />
              <Text className="text-white text-upper f-40">$1.8 BILLION</Text>
            </div>
            <div style={{ borderLeft: "3px solid white", paddingLeft: "20px" }}>
              <Text className="text-gray f-16 text-upper">Total Sales</Text>
              <br />
              <Text className="text-white text-upper f-40">$1,831,197,188</Text>
            </div>
          </Flex> */}
        </Col>
      </Row>
      <LetTalk />
      <Icons />
    </div>
  );
}

export default OurStory;
