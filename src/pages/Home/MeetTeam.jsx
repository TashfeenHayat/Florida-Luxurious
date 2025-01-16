import React from "react";
import { Typography, Spin, Image } from "antd";
import { Container } from "react-bootstrap";
import Slider from "react-slick";
import Flip from "../../components/Flipcard";
import BackArrow from "../../assets/backArrow.svg";
import NextArrow from "../../assets/nextArrow.svg";
import { useNavigate } from "react-router-dom";
import useAgents from "../../hooks/useAgents";
import { Flex } from "antd";

const { Title, Text } = Typography;

function MeetTeam() {
  const navigate = useNavigate();
  const { data, isLoading } = useAgents(15, 1);

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", zIndex: 10, right: "50rem" }} // Adjusted left position
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
        style={{ ...style, display: "block", zIndex: 10, left: "82rem" }} // Adjusted right position
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
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div style={{ background: "black" }}>
        <div style={{ padding: "98px 0" }}>
          <Container>
            <Title
              level={1}
              className="meet-team-heading f-40"
              data-aos="fade-up"
              data-aos-duration="2000"
              style={{ textAlign: "center", color: "#fff" }}
            >
              Meet The Team
            </Title>
            {isLoading ? (
              <Flex
                justify={"center"}
                align={"center"}
                style={{ minHeight: "200px" }}
              >
                <Spin size="large" />
              </Flex>
            ) : (
              <>
                <div
                  className="slider-container team-section"
                  style={{
                    marginTop: "65px",
                    // marginBottom: "65px",
                    cursor: "pointer",
                    //backgroundColor: "hsl(0, 0%, 90%)",
                  }}
                  data-aos="fade-down"
                  data-aos-duration="2000"
                >
                  <Slider {...settings}>
                    {data?.agents?.map((agent, index) => (
                      <div
                        onClick={() => navigate(`/agent/${agent._id}`)}
                        key={index}
                        style={{ padding: "0 10px" }}
                      >
                         <Flip
                          fImg={
                            <Image
                              src={
                                agent.photo ||
                                "https://firebasestorage.googleapis.com/v0/b/florida-77f94.appspot.com/o/Untitled%20design%20(1).png?alt=media&token=b14e90ef-b51c-4baf-ae2a-ada87141ed52"
                              }
                              preview={false}
                              fallback="https://firebasestorage.googleapis.com/v0/b/florida-77f94.appspot.com/o/Untitled%20design%20(1).png?alt=media&token=b14e90ef-b51c-4baf-ae2a-ada87141ed52"
                              style={{
                                aspectRatio: "5/7.5",
                                width: "100%",
                                objectFit: "cover",
                                backgroundColor: "hsl(0, 0%, 90%) !important",
                              }}
                            />
                          }
                          bImg={
                            <Image
                              src={
                                agent.photo ||
                                "https://firebasestorage.googleapis.com/v0/b/florida-77f94.appspot.com/o/Untitled%20design%20(1).png?alt=media&token=b14e90ef-b51c-4baf-ae2a-ada87141ed52"
                              }
                              className="img-op1"
                              preview={false}
                              fallback="https://firebasestorage.googleapis.com/v0/b/florida-77f94.appspot.com/o/Untitled%20design%20(1).png?alt=media&token=b14e90ef-b51c-4baf-ae2a-ada87141ed52"
                              style={{
                                aspectRatio: "5/7.5",
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          }
                        >
                          <div className="p-absoulte p-b-30-left-0 w-100">
                            <Flex justify="center" align="center">
                              <Text className="text-white text-upper f-24">
                                {agent.firstName}{" "}
                              </Text>
                            </Flex>
                          </div>
                        </Flip>
                      </div>
                    ))}
                  </Slider>
                </div>
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
          </Container>
        </div>
      </div>
    </>
  );
}

export default MeetTeam;
