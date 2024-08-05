import React from "react";
import { Typography, Row, Col } from "antd";
import Slider from "react-slick";
import Florida from "../../assets/florida.png";
import useCommunities from "../../hooks/useCommunities";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../components/BackgroundImage";
import BoatImage from "../../assets/boatowner.png";

const { Title, Text } = Typography;

function Allcommunities() {
  const { data, isLoading } = useCommunities(20, 1);
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
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    swipeToSlide: true,
  };

  return (
    <>
      <BackgroundImage Image={BoatImage}>
        <Title
          style={{ color: "white", lineHeight: "14px", letterSpacing: "2px" }}
          className="text-upper f-50 f-100"
        >
          All Communities
        </Title>
      </BackgroundImage>
      <div style={{ paddingTop: 98, paddingBottom: 98 }}>
        <Title className="florida-heading-feature-negibour" level={1}>
          Feature Neighborhoods
        </Title>
        <Row gutter={[16, 16]} justify="center">
          {data?.filters?.map((community, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <div className="displayy-teamimg-center show-btn-community-home">
                <img
                  src={community?.photo}
                  alt={community?.name}
                  width="100%"
                  className="img-op communities-grid"
                />
                <div className="community-overlay">
                  <Text
                    className="text-upper text-white f-100"
                    style={{ fontSize: "20px" }}
                  >
                    {community?.name}
                  </Text>
                  <button
                    className="button-view1"
                    onClick={() => navigate(`/community/${community?._id}`)}
                  >
                    View
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="slider-container">
          <Slider {...settings}>
            {[...Array(6)].map((_, index) => (
              <div className="displayy-teamimg-center" key={index}>
                <img src={Florida} width="100%" className="img-op" />
                <div className="slider-overlay">
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
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button className="button-neighborhood">See All Neighborhoods</button>
        </div>
      </div>
    </>
  );
}

export default Allcommunities;
