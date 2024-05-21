import React from "react";
import { Col, Row, Flex, Typography, Button, Image } from "antd";
import Story from "../../assets/story.png";
import Logoicon from "../../assets/logoicon.png";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
function OurStory() {
  const navigate = useNavigate();
  return (
    <div className="boxshadow-section">
      <Row align="middle">
        <Col lg={8} md={24} sm={0}>
          <div>
            <div className="d-flex-story-center">
              <div className="our-story-bg p-5">
                <Flex justify={"space-between"}>
                  <Flex vertical>
                    <Title level={2} className="our-story-title ">
                      {" "}
                      OUR STORY
                    </Title>
                    <Text
                      style={{
                        color: "#D4CFC9",
                        fontSize: "18px",
                        letterSpacing: "1px",
                        lineHeight: "31.5px",
                        fontWeight: 100,
                      }}
                    >
                      Broward’s Leading Private Brokerage!
                    </Text>
                  </Flex>
                  <img src={Logoicon} width="15%" />
                </Flex>
                <Flex vertical>
                  <Text className="our-story-text f-100 f-16 text-white text-left">
                    In alignment with private banking, wealth and other highly
                    individualized services which provide a greater level of
                    attention and customer satisfaction, we offer the same
                    discreet approach to Buyers and Sellers of luxurious
                    properties. As an assertive, entrepreneurial team with a
                    broad expertise in servicing the needs of our clientele we
                    consistently achieve top sales results in Broward’s luxury
                    market. To better facilitate the needs of our clients, we
                    have Agents fluent in French, German, Italian, Polish,
                    Portuguese, Russian, Spanish, Japanese, Arabic and Romanian.
                  </Text>
                  <button
                    className="button-secondary text-upper mt-32"
                    style={{ width: "45%" }}
                    onClick={() => navigate("/contact-us")}
                  >
                    Contact us
                  </button>
                </Flex>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={16} md={0} xs={0} sm={0} className="py-4">
          <Image src={Story} preview={false} width="100%" />
        </Col>
      </Row>
    </div>
  );
}

export default OurStory;
