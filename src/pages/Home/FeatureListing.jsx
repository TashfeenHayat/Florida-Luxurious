import React from "react";
import { Typography, Flex, Col, Row, Button } from "antd";
import BackArrow from "../../assets/backArrow.svg";
import NextArrow from "../../assets/nextArrow.svg";
import Slider from "react-slick";
import Property from "../../assets/property.png";

const { Title, Text, Paragraph } = Typography;
function FeatureListing() {
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
    slidesToShow: 2,
    slidesToScroll: 2,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  return (
    <div className="boxshadow-section">
      <Paragraph
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: "40px",
          lineHeight: "150%",
          letterSpacing: "-1%",
          fontWeight: 200,
          paddingTop: 85,
        }}
      >
        Featured{" "}
        <Text
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            fontSize: "40px",
            lineHeight: "150%",
            fontWeight: "bold",
            letterSpacing: "-1%",
          }}
        >
          luxurious
        </Text>{" "}
        Listing
      </Paragraph>
      <Flex
        justify={"center"}
        align={"center"}
        style={{
          marginTop: 65,
          marginBottom: 65,
        }}
        className="features_section_slider"
      >
        <div className="meet-slider-width">
          <Slider {...settings}>
            <div className="displayy-teamimg-center">
              <img src={Property} width="100%" className="img-op" />
              <div style={{ position: "absolute", right: 0 }}>
                <div
                  style={{
                    height: "45px",
                    width: "150px",
                    background: "black",
                  }}
                >
                  <Flex
                    justify={"center"}
                    align="center"
                    style={{ height: "inherit" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textTransform: "uppercase",
                        lineHeight: "23.8px",
                        letterSpacing: "1px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      For Sale
                    </Text>
                  </Flex>
                </div>
              </div>
              <div style={{ position: "absolute", bottom: 20, left: 20 }}>
                <button className="button-view">View All</button>
              </div>
              <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                <h1>Heading</h1>
              </div>
            </div>
            <div className="displayy-teamimg-center">
              <img src={Property} width="100%" />
            </div>
            <div className="displayy-teamimg-center">
              <img src={Property} width="100%" />
            </div>
            <div className="displayy-teamimg-center">
              <img src={Property} width="100%" />
            </div>
          </Slider>
        </div>
      </Flex>
    </div>
  );
}

export default FeatureListing;
