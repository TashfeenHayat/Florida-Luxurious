import React from "react";
import { Typography, Row, Col, Spin } from "antd";
import Slider from "react-slick";
import Florida from "../../assets/florida.png";
import useCommunities from "../../hooks/useCommunities";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../components/BackgroundImage";
import BoatImage from "../../assets/Allcommunities.jpg";

const { Title, Text } = Typography;

function Allcommunities() {
  const { data, isLoading } = useCommunities(20, 1);
  const sortingArr = [...(data?.filters ?? [])].sort((a, b) =>
    a?.name?.localeCompare(b?.name)
  );
  const navigate = useNavigate();

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(`Slider Changed to: ${index + 1}`);
    },
  };

  return (
    <>
      <BackgroundImage
        Image={BoatImage}
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "60px 0",
        }}
      >
        <Title
          style={{
            color: "white",
            lineHeight: "46px",
            letterSpacing: "2px",
            textAlign: "center",
            fontSize: "3rem", // Responsive font size
          }}
          className="text-upper f-50 f-100"
        >
          All Communities
        </Title>
      </BackgroundImage>
      <div style={{ padding: "40px 0" }}>
        <Title
          className="florida-heading-feature-negibour"
          level={1}
          style={{ textAlign: "center" }}
        >
          Featured Communities
        </Title>
        <Row gutter={[16, 16]} justify="center">
          {isLoading ? (
            <Col span={24} style={{ textAlign: "center" }}>
              <Spin size="large" />
            </Col>
          ) : (
            sortingArr.map((community, index) => (
              <Col lg={6} md={8} sm={12} xs={24} key={index}>
                <div
                  className="displayy-teamimg-center show-btn-community-home"
                  style={{ position: "relative" }}
                >
                  <img
                    src={community?.photo}
                    alt={community?.name}
                    width="100%"
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "90%",
                      textAlign: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      padding: "10px",
                      borderRadius: "8px",
                    }}
                  >
                    <Text
                      className="text-upper text-white f-100"
                      style={{ fontSize: "1.2rem" }}
                    >
                      {community?.name}
                    </Text>
                    <button
                      className="button-view1"
                      style={{
                        marginTop: "10px",
                        backgroundColor: "#981E59",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px 20px",
                      }}
                      onClick={() => navigate(`/community/${community?._id}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>
        {/* Uncomment and adjust the slider section if needed */}
        {/* <Flex
          justify={"center"}
          align={"center"}
          style={{
            marginTop: 65,
            marginBottom: 65,
          }}
          className="negborihood-list"
        >
          <div className="meet-slider-width" style={{ width: "100%" }}>
            <Slider {...settings}>
              {/* Repeat slider items as needed */}
        {/* <div className="displayy-teamimg-center">
                <img src={Florida} width="100%" className="img-op" />
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    width: "100%",
                  }}
                >
                  <Flex
                    justify={"space-between"}
                    align={"center"}
                    style={{ width: "95%" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 28,
                        lineHeight: "36.4px",
                        fontWeight: 100,
                      }}
                    >
                      Florida
                    </Text>
                  </Flex>
                </div>
              </div> */}
        {/* Add additional slider items here */}
        {/* </Slider>
          </div>
        </Flex> */}
        <Flex justify="center" align="center" style={{ marginTop: "40px" }}>
          <button
            className="button-neighborhood"
            style={{
              backgroundColor: "#981E59",
              color: "white",
              border: "none",
              borderRadius: "30px",
              padding: "10px 20px",
            }}
          >
            See All Neighborhoods
          </button>
        </Flex>
      </div>
    </>
  );
}

export default Allcommunities;
