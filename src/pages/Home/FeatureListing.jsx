import React from "react";
import { Typography, Flex, Col, Row, Button } from "antd";
import BackArrow from "../../assets/backArrow.svg";
import NextArrow from "../../assets/nextArrow.svg";
import Slider from "react-slick";
import Property from "../../assets/property.png";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";

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
    <div className="boxshadow-section" style={{ paddingBottom: "85px" }}>
      <Paragraph className="heading-florida-lux-listing">
        Featured{" "}
        <Text
          className="heading-florida-lux-listing"
          style={{ fontWeight: "bold" }}
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
              <div className="p-absoulte right-0">
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
              <div className="p-absoulte w-100 bottom-20 left-20">
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  style={{ width: "95%" }}
                >
                  <button className="button-view">View All</button>
                  <Flex>
                    <IoLocationOutline color="white" size={20} />
                    <Text
                      style={{
                        lineHeight: "22px",
                        letterSpacing: "0%",
                      }}
                      className="f-14 f-bold text-white"
                    >
                      2572 Mercedes Drive <br />
                      <IoPricetagOutline size={20} /> $15,000,0000
                    </Text>
                  </Flex>
                </Flex>
              </div>
            </div>
            <div className="displayy-teamimg-center">
              <img src={Property} width="100%" className="img-op" />
              <div className="p-absoulte right-0">
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
              <div className="p-absoulte w-100 bottom-20 left-20">
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  style={{ width: "95%" }}
                >
                  <button className="button-view">View All</button>
                  <Flex>
                    <IoLocationOutline color="white" size={20} />
                    <Text
                      style={{
                        lineHeight: "22px",
                        letterSpacing: "0%",
                      }}
                      className="f-14 f-bold text-white"
                    >
                      2572 Mercedes Drive <br />
                      <IoPricetagOutline size={20} /> $15,000,0000
                    </Text>
                  </Flex>
                </Flex>
              </div>
            </div>
            <div className="displayy-teamimg-center">
              <img src={Property} width="100%" className="img-op" />
              <div className="p-absoulte right-0">
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
              <div className="p-absoulte w-100 bottom-20 left-20">
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  style={{ width: "95%" }}
                >
                  <button className="button-view">View All</button>
                  <Flex>
                    <IoLocationOutline color="white" size={20} />
                    <Text
                      style={{
                        lineHeight: "22px",
                        letterSpacing: "0%",
                      }}
                      className="f-14 f-bold text-white"
                    >
                      2572 Mercedes Drive <br />
                      <IoPricetagOutline size={20} /> $15,000,0000
                    </Text>
                  </Flex>
                </Flex>
              </div>
            </div>
            <div className="displayy-teamimg-center">
              <img src={Property} width="100%" className="img-op" />
              <div className="p-absoulte right-0">
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
              <div className="p-absoulte w-100 bottom-20 left-20">
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  style={{ width: "95%" }}
                >
                  <button className="button-view">View All</button>
                  <Flex>
                    <IoLocationOutline color="white" size={20} />
                    <Text
                      style={{
                        lineHeight: "22px",
                        letterSpacing: "0%",
                      }}
                      className="f-14 f-bold text-white"
                    >
                      2572 Mercedes Drive <br />
                      <IoPricetagOutline size={20} /> $15,000,0000
                    </Text>
                  </Flex>
                </Flex>
              </div>
            </div>
          </Slider>
        </div>
      </Flex>
      <Flex justify="center" align="center">
        <button className="button-view1">View All</button>
      </Flex>
    </div>
  );
}

export default FeatureListing;
