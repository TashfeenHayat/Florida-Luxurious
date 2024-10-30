import React from "react";
import { Typography, Flex, Button, Spin, Image } from "antd";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/backArrow.svg";
import NextArrow from "../../assets/nextArrow.svg";
import Slider from "react-slick";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import { Container } from "react-bootstrap";
import useProperties from "../../hooks/useProperties";

const { Text, Paragraph } = Typography;

function FeatureListing() {
  const { data, isLoading } = useProperties(null, 30, 1, "for_sale");

  const navigate = useNavigate();

  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          zIndex: 10,
        }}
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
    <div
      className="boxshadow-section"
      style={{ paddingBottom: "98px", overflow: "hidden" }}
    >
      <Paragraph
        className="heading-florida-lux-listing"
        data-aos="fade-down-left"
        data-aos-duration="2000"
        style={{ textAlign: "center", marginBottom: "24px" }}
      >
        Featured{" "}
        <Text
          className="heading-florida-lux-listing"
          style={{ fontWeight: "bold" }}
        >
          luxurious
        </Text>{" "}
        Listings
      </Paragraph>

      {isLoading ? (
        <Flex
          justify={"center"}
          align={"center"}
          style={{ minHeight: "200px" }}
        >
          <Spin size="large" />
        </Flex>
      ) : (
        <Container>
          <Flex
            justify={"center"}
            align={"center"}
            style={{
              marginTop: "65px",
              marginBottom: "65px",
              flexWrap: "wrap",
            }}
            className="features_section_slider"
            data-aos="fade-down-left"
            data-aos-duration="2000"
          >
            <Slider {...settings}>
              {data?.properties?.map((property, index) => (
                <div
                  key={index}
                  className="displayy-teamimg-center"
                  onClick={() => navigate(`/features/${property._id}`)}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    maxWidth: "300px",
                    flex: "1 1 auto",
                    margin: "10px",
                  }}
                >
                  <Image
                    src={
                      property?.media?.[0]?.mdUrl ||
                      "https://placehold.co/618x489"
                    }
                    width="100%"
                    className="img-op"
                    fallback="https://placehold.co/618x489"
                    preview={false}
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                  />
                  <div className="info">
                    <Flex
                      justify={"space-between"}
                      align={"center"}
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "10px",
                        right: "10px",
                        background: "rgba(0, 0, 0, 0.5)",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      <Button
                        className="button-view"
                        style={{ fontSize: "12px" }}
                      >
                        View All
                      </Button>
                      <Flex>
                        <IoLocationOutline color="white" size={20} />
                        <Text
                          className="f-14 f-bold text-white"
                          style={{ textAlign: "right", marginLeft: "8px" }}
                        >
                          {property?.addressLine1} {property?.addressLine2}
                          <br />
                          <IoPricetagOutline size={20} /> {property.salePrice}
                        </Text>
                      </Flex>
                    </Flex>
                  </div>
                  <div className="show-info">
                    <div
                      style={{
                        background: "#fff",
                        height: "50px",
                        borderRadius: "5px",
                      }}
                    >
                      <Flex
                        justify={"space-between"}
                        align={"center"}
                        style={{ height: "100%", padding: "0 10px" }}
                      >
                        <Text className="mx-4 f-16 f-bold">
                          {property?.addressLine1} {property?.addressLine2}
                        </Text>
                        <div className="prop-info">
                          <Text
                            style={{ color: "white" }}
                            className="text-upper"
                          >
                            View More +
                          </Text>
                        </div>
                      </Flex>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </Flex>

          <Flex
            justify="center"
            align="center"
            style={{ marginTop: "24px" }}
            onClick={() => navigate("/properties")}
          >
            <Button className="button-view1" style={{ fontSize: "16px" }}>
              View All
            </Button>
          </Flex>
        </Container>
      )}
    </div>
  );
}

export default FeatureListing;
