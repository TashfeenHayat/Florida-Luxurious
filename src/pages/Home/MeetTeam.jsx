import React, { useRef } from "react";
import { Typography, Carousel, Row, Col, Image, Flex, Grid, Spin } from "antd";
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
  const { data, isLoading } = useAgents(15, 1);
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", zIndex: 10, left: "-45px" }} // Adjusted left position
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
        style={{ ...style, display: "block", zIndex: 10, right: "-45px" }} // Adjusted right position
        onClick={onClick}
      >
        <img src={NextArrow} alt="Next" width="45px" />
      </div>
    );
  };

  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };
  return (
    <>
      <div style={{ background: "black" }}>
        <div style={{ paddingTop: "98px", paddingBottom: "98px" }}>
          <Title level={1} className="meet-team-heading f-40">
            Meet The Team
          </Title>
          {isLoading ? (
            <Flex justify={"center"}>
              <Spin size="large" />
            </Flex>
          ) : (
            <>
              <Container>
                <div
                  className="slider-container team-section"
                  style={{
                    marginTop: "65px",
                    marginBottom: "65px",
                    cursor: "pointer",
                  }}
                >
                  <Slider {...settings}>
                    {data?.agents?.map((agent, index) => (
                      <div
                        onClick={() => navigate(`/agent/${agent._id}`)}
                        key={index}
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
                              style={{ aspectRatio: "5/6", objectFit: "cover" }}
                            />
                          }
                          bImg={
                            <Image
                              src={
                                agent.photo
                                  ? agent.photo
                                  : "https://placehold.co/300x388"
                              }
                              className="img-op1"
                              preview={false}
                              fallback="https://placehold.co/300x388"
                              style={{ aspectRatio: "5/6", objectFit: "cover" }}
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
                </div>
              </Container>
              <Flex
                justify="center"
                align="center"
                onClick={() => navigate("/meet-the-team")}
                className="mt-5"
              >
                <button className="let-talk-btn">View All</button>
              </Flex>
            </>
          )}
        </div>
      </div>
      <LetTalk />
    </>
  );
}

export default MeetTeam;
