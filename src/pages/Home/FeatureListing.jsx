import React from "react";
import { Typography, Flex, Button, Spin, Image } from "antd";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/backArrow.svg";
import NextArrow from "../../assets/nextArrow.svg";
import Slider from "react-slick";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import { Container } from "react-bootstrap";
import useProperties from "../../hooks/useProperties";

const { Paragraph, Text } = Typography;

function FeatureListing() {
  const { data, isLoading } = useProperties();
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
          slidesToScroll: 1,
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
    ],
  };

  return (
    <div className="boxshadow-section" style={{ paddingBottom: "98px" }}>
      <Paragraph
        className="heading-florida-lux-listing"
        data-aos="fade-down-left"
        data-aos-duration="2000"
        style={{ textAlign: "center" }}
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
                  {data?.properties.map((properties) => (
                    <div
                      key={properties._id}
                      className="displayy-teamimg-center"
                      onClick={() => navigate(`/features/${properties._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <Image
                        src={
                          properties?.media?.[0]?.mdUrl ||
                          "https://placehold.co/618x489"
                        }
                        width="100%"
                        className="img-op"
                        fallback="https://placehold.co/618x489"
                        preview={false}
                      />
                      <div className="info">
                        <Flex justify={"space-between"} align={"center"} direction="column" style={{ textAlign: "center" }}>
                          <Button className="button-view">View All </Button>
                          <Flex justify={"center"} align={"center"}>
                            <IoLocationOutline color="white" size={20} />
                            <Text
                              className="f-14 f-bold text-white"
                              style={{ textAlign: "center" }}
                            >
                              {properties?.addressLine1}
                              <br />
                              <IoPricetagOutline size={20} /> ${" "}
                              {properties.salePrice}
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
                              {properties?.addressLine1}
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
            style={{ marginTop: 30 }}
            onClick={() => navigate("/properties")}
          >
            <Button className="button-view1">View All</Button>
          </Flex>
        </>
      )}
    </div>
  );
}

export default FeatureListing;
