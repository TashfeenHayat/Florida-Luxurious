import React, { useRef } from "react";
import { Typography, Carousel, Row, Col, Image, Flex } from "antd";
import { Container } from "react-bootstrap";
import LetTalk from "../../components/LetTalk";
import Team from "../../assets/team.png";
import FlipCard from "../../components/Flipcard";
import BackArrow from "../../assets/backArrow.svg";
import NextArrow from "../../assets/nextArrow.svg";

const { Title } = Typography;

function MeetTeam() {
  const ref = useRef();
  // Your image array
  const images = [Team, Team, Team, Team, Team, Team, Team, Team];

  // Divide images into chunks of four
  const chunks = [];
  for (let i = 0; i < images.length; i += 4) {
    chunks.push(images.slice(i, i + 4));
  }

  const customArrows = {
    prevArrow: <BackArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      <div style={{ background: "black" }}>
        <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Title level={1} className="meet-team-heading">
            Meet The Team
          </Title>
          <Container>
            <Row align={"middle"}>
              <Col span={2}>
                <Image
                  src={BackArrow}
                  preview={false}
                  width={"50%"}
                  style={{ cursor: "pointer" }}
                  onClick={() => ref.current.prev()}
                />
              </Col>
              <Col lg={20}>
                <Carousel dots={false} ref={ref}>
                  {chunks.map((chunk, index) => (
                    <div key={index}>
                      <Row gutter={[20, 20]} align="middle">
                        {chunk.map((image, idx) => (
                          <Col lg={6} md={12} sm={24}>
                            <FlipCard
                              fImg={
                                <img
                                  key={idx}
                                  src={image}
                                  alt={`Team ${idx}`}
                                  style={{ width: "100%" }}
                                />
                              }
                              bImg={
                                <img
                                  key={idx}
                                  src={image}
                                  alt={`Team ${idx}`}
                                  style={{ width: "100%" }}
                                  className="img-op1"
                                />
                              }
                            >
                              <div className="p-absoulte p-b-30-left-0 w-100">
                                <Flex justify="center" align="center">
                                  <button className="team-view-btn">
                                    View More{" "}
                                  </button>
                                </Flex>
                              </div>
                            </FlipCard>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  ))}
                </Carousel>
              </Col>

              <Col span={2}>
                <Image
                  src={NextArrow}
                  preview={false}
                  width={"50%"}
                  style={{ cursor: "pointer" }}
                  onClick={() => ref.current.next()}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <LetTalk />
    </>
  );
}

export default MeetTeam;
