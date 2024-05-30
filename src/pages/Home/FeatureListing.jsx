import React from "react";
import { Typography, Flex, Col, Row, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/backArrow.svg";
import NextArrow from "../../assets/nextArrow.svg";
import Slider from "react-slick";
import Property from "../../assets/property.png";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import { Container } from "react-bootstrap";
import useProperties from "../../hooks/useProperties";
const { Title, Text, Paragraph } = Typography;
function FeatureListing() {
  const { data, isLoading } = useProperties();
  console.log(data?.properties);
  const navigate = useNavigate();
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
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
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
    <div className="boxshadow-section" style={{ paddingBottom: "98px" }}>
      <Paragraph
        className="heading-florida-lux-listing"
        data-aos="fade-down-left"
        data-aos-duration="2000"
      >
        Featured{" "}
        <Text
          className="heading-florida-lux-listing"
          style={{ fontWeight: "bold" }}
        >
          luxurious
        </Text>{" "}
        Listing
      </Paragraph>
      {isLoading ? (
        <Flex justify={"center"}>
          <Spin size="large" />
        </Flex>
      ) : (
        <>
          <Container>
            <Flex
              justify={"center"}
              align={"center"}
              style={{
                marginTop: 65,
                marginBottom: 65,
              }}
              className="features_section_slider"
              data-aos="fade-down-left"
              data-aos-duration="2000"
            >
              <div className="meet-slider-width">
                <Slider {...settings}>
                  {data?.properties.map((properties, index) => (
                    <div
                      className="displayy-teamimg-center"
                      onClick={() => navigate(`/features/${properties._id}`)}
                    >
                      <img src={Property} width="100%" className="img-op" />

                      <div className="info">
                        <Flex justify={"space-between"} align={"center"}>
                          <button className="button-view">View All</button>
                          <Flex>
                            <IoLocationOutline color="white" size={20} />
                            <Text
                              className="f-14 f-bold text-white"
                              style={{ textAlign: "right" }}
                            >
                              {properties?.addressLine1 +
                                " " +
                                properties?.addressLine2}
                              <br />
                              <IoPricetagOutline size={20} /> ${" "}
                              {properties.salePrice}
                              {/* {Number(properties?.salePrice).toLocaleString()} */}
                            </Text>
                          </Flex>
                        </Flex>
                      </div>

                      <div className="show-info">
                        <div style={{ background: "#fff", height: "50px" }}>
                          <Flex
                            justify={"space-between"}
                            align={"center"}
                            style={{ height: "100%" }}
                          >
                            <Text className="mx-4 f-16 f-bold">
                              {properties?.addressLine1 +
                                " " +
                                properties?.addressLine2}
                            </Text>
                            <div className="prop-info">
                              <Text
                                style={{ color: "white" }}
                                className="text-upper"
                              >
                                {" "}
                                View More +
                              </Text>
                            </div>
                          </Flex>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </Flex>
          </Container>
          <Flex
            justify="center"
            align="center"
            onClick={() => navigate("/properties")}
          >
            <button className="button-view1">View All</button>
          </Flex>
        </>
      )}
    </div>
  );
}

export default FeatureListing;
