import React, { useRef } from "react";
import { Typography, Carousel, Row, Col, Image, Flex, Grid } from "antd";
import { Container } from "react-bootstrap";
import LetTalk from "../../components/LetTalk";
import Slider from "react-slick";
import Flip from "../../components/Flipcard";
import BackArrow from "../../assets/backArrow.svg";
import NextArrow from "../../assets/nextArrow.svg";
import { useNavigate } from "react-router-dom";
import useAgents from "../../hooks/useAgents";

const { Title, Text, Paragraph } = Typography;

function MeetTeam() {
  const navigate = useNavigate();
  const { data, isLoading } = useAgents();
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", zIndex: 10 }}
        onClick={onClick}
      >
        <img src={BackArrow} alt="Previous" width="45px" />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", zIndex: 10 }}
        onClick={onClick}
      >
        <img src={NextArrow} alt="Next" width="45px" />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: data?.agents?.length >= 2 ? 2 : 3,
    slidesToScroll: data?.agents?.length >= 2 ? 2 : 3,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: false,
          nextArrow: false,
        },
      },

      // Add more breakpoints as needed
    ],
  };
  return (
    <>
      <div style={{ background: "black" }}>
        <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Title level={1} className="meet-team-heading">
            Meet The Team
          </Title>
          <Container className="pt-4">
            <Flex className="features_section_slider">
              <Row>
                <Col span={24}>
                  <Slider {...settings}>
                    {data?.agents.map((agent, index) => (
                      <div
                        key={index}
                        className="displayy-teamimg-center"
                        onClick={() => navigate(`/agent/${agent._id}`)}
                      >
                        <Flip
                          fImg={
                            <Image
                              src={
                                agent.photo
                                  ? agent.photo
                                  : "https://placehold.co/300x388"
                              }
                              className=""
                              preview={false}
                              fallback="https://placehold.co/300x388"
                            />
                          }
                          bImg={
                            <Image
                              src={
                                agent.photo
                                  ? agent.photo
                                  : "https://placehold.co/300x388"
                              }
                              preview={false}
                              fallback="https://placehold.co/300x388"
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
                        </Flip>
                      </div>
                    ))}
                  </Slider>
                </Col>
              </Row>
            </Flex>
          </Container>
          <Flex
            justify="center"
            align="center"
            onClick={() => navigate("/meet-the-team")}
            className="mt-5"
          >
            <button className="let-talk-btn">View All</button>
          </Flex>
        </div>
      </div>
      <LetTalk />
    </>
  );
}

export default MeetTeam;
