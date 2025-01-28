import React from "react";
import { Col, Row, Flex, Typography, Button, Image } from "antd";
import Story from "../../assets/story.png";
import Logoicon from "../../assets/Logoforourstory.png";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;
function OurStory() {
  const navigate = useNavigate();
  return (
    <div className="boxshadow-section">
      <Row align="middle">
        <Col xl={6} lg={8} md={18} sm={12} xsm={12}>
          <div className="d-flex-story-center">
            <div
              className="our-story-bg p-5"
              data-aos="fade-down-right"
              data-aos-duration="2000"
            >
              <Flex justify={"space-between"} wrap="wrap">
                <Flex vertical style={{ flex: 1 }}>
                  <Title level={2} className="our-story-title">
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
                <div
                  className="ourstoryimg"
                  style={{ flex: 1, textAlign: "right" }}
                >
                  <img
                    src={Logoicon}
                    alt="Logo"
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              </Flex>
              <Flex vertical style={{ marginTop: "20px" }}>
                <Text className="our-story-text f-100 f-16 text-white text-left">
                  In alignment with private banking, wealth management, and
                  other highly individualized services that provide a greater
                  level of attention and customer satisfaction, we offer the
                  same discreet approach to buyers and sellers of luxurious
                  properties. As an assertive, entrepreneurial team with broad
                  expertise in servicing the needs of our clientele, we
                  consistently achieve top sales results in Broward’s luxury
                  market. To better facilitate the needs of our clients, we have
                  agents fluent in Italian, Portuguese, Russian, Spanish,
                  Romanian, Hebrew, Polish, and Turkish.
                </Text>
                <button
                  className="button-secondary text-upper mt-32"
                  style={{
                    width: "100%",
                    maxWidth: "250px",
                    marginTop: "20px",
                  }}
                  onClick={() => navigate("/contact-us")}
                >
                  Contact us
                </button>
              </Flex>
            </div>
          </div>
        </Col>

        <Col
          lg={16}
          md={0}
          xs={0}
          sm={0}
          className="py-4"
          data-aos="fade-down-left"
          data-aos-duration="2000"
        >
          <Image src={Story} preview={false} width="100%" />
        </Col>
      </Row>
    </div>
  );
}

export default OurStory;
