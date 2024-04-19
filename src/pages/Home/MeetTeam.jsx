import React, { useRef } from "react";
import { Typography, Carousel, Row, Col, Image, Flex, Grid } from "antd";
import { Container } from "react-bootstrap";
import LetTalk from "../../components/LetTalk";
import FlipCard from "../../components/Flipcard";
import BackArrow from "../../assets/backArrow.svg";
import NextArrow from "../../assets/nextArrow.svg";
import { useNavigate } from "react-router-dom";
import useAgents from "../../hooks/useAgents";
const { Title } = Typography;
const { useBreakpoint } = Grid;

function MeetTeam() {
  const { isLoading, data } = useAgents();

  const ref = useRef();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const elementsPerChunk = screens.lg ? 4 : screens.md ? 2 : 1;
  // Your image array

  // Divide data into chunks of four
  const chunks = [];
  for (let i = 0; i < data.length; i += elementsPerChunk) {
    chunks.push(data.slice(i, i + elementsPerChunk));
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
          <Container className="pt-4">
            <Row align={"middle"} justify={"center"}>
              <Col lg={2} md={4} pull={0} sm={6}>
                <Image
                  src={BackArrow}
                  preview={false}
                  width={"50%"}
                  style={{ cursor: "pointer" }}
                  onClick={() => ref.current.prev()}
                />
              </Col>
              <Col lg={20} md={16} sm={12} align={"middle"}>
                <Carousel dots={false} ref={ref}>
                  {chunks.map((chunk, index) => (
                    <div
                      key={index}
                      onClick={() => navigate("/agents")}
                      style={{ cursor: "pointer" }}
                    >
                      <Row gutter={[20, 40]} align="middle" justify={"center"}>
                        {chunk.map((image, idx) => (
                          <Col lg={6} md={12} sm={24} align="middle">
                            <FlipCard
                              fImg={
                                <img
                                  key={idx}
                                  src={
                                    image.photo
                                      ? image.photo
                                      : "https://placehold.co/300x388"
                                  }
                                  alt={"https://placehold.co/300x388"}
                                  style={{ width: "100%" }}
                                  onError={({ currentTarget }) =>
                                    (currentTarget.src =
                                      "https://placehold.co/300x388")
                                  }
                                />
                              }
                              bImg={
                                <img
                                  key={idx}
                                  src={
                                    image.photo
                                      ? image.photo
                                      : "https://placehold.co/300x388"
                                  }
                                  alt={`Team ${idx}`}
                                  style={{ width: "100%" }}
                                  className="img-op1"
                                  onError={({ currentTarget }) =>
                                    (currentTarget.src =
                                      "https://placehold.co/300x388")
                                  }
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

              <Col lg={2} md={4} push={1} sm={6}>
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
