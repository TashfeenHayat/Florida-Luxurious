import React, { useEffect, useRef, useState } from "react";
import { Typography, Flex, Button, Spin, Image } from "antd";
import { useNavigate } from "react-router-dom";
import BackArrow from "../../assets/backArrow.svg";
import NextArrow from "../../assets/nextArrow.svg";
import Slider from "react-slick";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import { Container } from "react-bootstrap";
import useProperties from "../../hooks/useProperties";
import "slick-carousel/slick/slick.css";

const { Text, Paragraph } = Typography;
const status = "for_sale";
function FeatureListing() {
  const { data, isLoading } = useProperties(null, null, 1, status);

  const navigate = useNavigate();
  const currencySymbols = {
    usd: "$",
    eur: "€",
    pound: "£",
  };

  const formatPrice = (price) => {
    // Remove all non-numeric characters except for dot
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
    if (isNaN(numericPrice)) return "N/A"; // Return "N/A" if price is invalid

    // Return the formatted price with commas
    return numericPrice.toLocaleString("en-US");
  };

  // Function to get the correct currency symbol
  const getCurrencySymbol = (currencyCode) => {
    return (
      currencySymbols[currencyCode?.toLowerCase()] ||
      currencyCode?.toUpperCase()
    ); // Default to currency code if no symbol found
  };

  //Sorted highest to lowest
  const sortedProperties = data?.properties
    ?.slice() // Create a shallow copy of the properties array
    .sort((a, b) => {
      const priceA = Number(a?.salePrice?.slice(1).replace(/,/g, "") || 0);
      const priceB = Number(b?.salePrice?.slice(1).replace(/,/g, "") || 0);
      return priceB - priceA;
    })
    .slice(0, 30);

  const CustomPrevArrow = (props) => {
    const { className, prev, style, onClick } = props;
    return (
      <div
        className={className}
        prev={prev}
        style={{
          ...style,
          display: "block",
          zIndex: 10,
        }}
        onClick={onClick}
      >
        <img src={BackArrow} alt="Previous" width="45px" className="next" />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
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
        <img src={NextArrow} alt="Next" width="45px" className="next" />
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
        breakpoint: 1440, // below 1440px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1300, // below 1300px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1100, // below 1100px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 850, // below 850px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 768, // below 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 570, // below 570px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 390, // below 390px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0",
        },
      },
      {
        breakpoint: 350, // below 350px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "0",
        },
      },
    ],
  };
const cardRefs = useRef([]);
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth <= 768);
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);

useEffect(() => {
  if (!isMobile) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("mobile-hover-visible");
        }
      });
    },
    { threshold: 0.4 }
  );

  cardRefs.current.forEach((card) => {
    if (card) observer.observe(card);
  });

  return () => {
    cardRefs.current.forEach((card) => {
      if (card) observer.unobserve(card);
    });
  };
}, [isMobile]);
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
          <div
            justify={"center"}
            align={"center"}
            style={{
              marginTop: "65px",
              marginBottom: "65px",
              display: "flex",
              flexWrap: "wrap",
              alignitems: "center",
              aligncontent: "center",

              justifycontent: " space-between",
              position: "relative",
              right: "2rem",
            }}
            className="features_section_slider"
            data-aos="fade-down-left"
            data-aos-duration="2000"
          >
            <Slider {...settings}>
              {sortedProperties?.map((property, index) => (
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  key={index}
                  className="displayy-teamimg-center"
                  onClick={() => navigate(`/features/${property._id}`)}
                  style={{
                    position: "relative",
                    cursor: "pointer",
                    margin: "10px",
                    display: "flex",
                    justifyContent: "center", // Center content horizontally
                    alignItems: "center", // Center content vertically
                    width: "100%", // Ensuring the div takes full width of the slider
                  }}
                >
                  <Image
                    src={
                      property?.media?.[0]?.mdUrl ||
                      "https://placehold.co/618x489"
                    }
                    className="img-op"
                    fallback="https://placehold.co/618x489"
                    preview={false}
                    style={{
                      borderRadius: "8px",
                      objectFit: "cover",
                      width: "100%", // Ensure the image fills the container width
                      height: "auto", // Maintain aspect ratio
                      maxHeight: "80vh", // Limit image height on smaller screens
                      objectPosition: "center", // Center image within its container
                    }}
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
                          <IoPricetagOutline size={20} />{" "}
                          {getCurrencySymbol(property?.currency)}
                          {formatPrice(property.salePrice)}
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
          </div>

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
