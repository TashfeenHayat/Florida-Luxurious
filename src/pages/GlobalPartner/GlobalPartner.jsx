import React, { useState, useEffect } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import BoatImage from "../../assets/Globalpartner.jpg";
import { Typography, Row, Col, Flex, Image, Pagination, Spin } from "antd";
import Globalpartnerimg from "../../assets/globalpartnerimg.png";
import Lux from "../../assets/Lux.png";
import { Container } from "react-bootstrap";
import useGlobalProperties from "../../hooks/useGlobalProperty";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";

const { Title, Text, Paragraph } = Typography;

function GlobalPartner() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showGlobalProperties, setShowGlobalProperties] = useState(true);
  const itemsPerPage = 10;

  const { data, isLoading } = useGlobalProperties(itemsPerPage, currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 1500,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const script = document.createElement("script");

    if (showGlobalProperties) {
      script.src =
        "https://luxuryrealestateftl.luxuryrealestate.com/reciprocity.js";
      script.type = "text/javascript";
      script.async = true;

      // Append the script to the body
      document.body.appendChild(script);

      // Initialize the Reciprocity after the script is loaded
      script.onload = () => {
        if (window.Reciprocity) {
          window.Reciprocity.init({
            membersite: "luxuryrealestateftl",
            parentLocation: window.location,
          });
        }
      };
      setShowGlobalProperties(false);
    }

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="globalcontainer">
      <BackgroundImage Image={BoatImage}>
        <Title
          style={{
            color: "white",
            lineHeight: "41px",
            letterSpacing: "2px",
            textAlign: "center",
          }}
          className="text-upper f-50 f-100"
        >
          Global properties
        </Title>
      </BackgroundImage>
      <Paragraph className="f-40 f-100 text-black text-center text-upper pt-4">
        Florida{" "}
        <Text className="f-40 text-black text-center text-upper f-bold">
          Luxurious
        </Text>{" "}
        Properties GLOBAL
      </Paragraph>
      <Row gutter={[60, 60]} className="py-2" display="flex" justify="center">
        <Col xl={12} lg={14} md={24} sm={24} xs={24}>
          <div style={{ height: "100%" }}>
            <Flex vertical justify={"center"} align="center">
              <Text className="text-black f-24" style={{ overflow: "hidden" }}>
                Florida Luxurious Properties has a longstanding affiliation with
                a worldwide collection of more than 125,000 brokers covering 62
                countries. Who’s Who in Luxury Real Estate has been leading the
                real estate industry since 1986 and we are proud to be members
                of this hand-selected group of top brokers representing the
                finest luxury properties across the globe. With collective sales
                of over $240 Billion of real estate annually, it is the most
                elite and comprehensive luxury real estate network in the world.
                Who’s Who in Luxury Real Estate is showcased on
                LuxuryRealEstate.com, the No.1 portal for luxury properties
                online, allowing Florida Luxurious Properties to present our
                exclusive inventory to more than any near-peer.
              </Text>
            </Flex>
          </div>
        </Col>
        <Col xlg={2} lg={4} md={24} xsm={0} sm={0}>
          <Flex justify="center" align="center">
            <Image
              src={Globalpartnerimg}
              preview={false}
              style={{ maxHeight: "480px" }} // Adjust the maxHeight as needed
            />
          </Flex>
        </Col>
      </Row>

      <div>
        <Flex vertical justify={"center"} align="center">
          <Text className="f-32 f-bold text-center text-upper text-black mt-4">
            Our Global Partner
          </Text>
          <img
            src={Lux}
            width="169px"
            className="text-center"
            preview={false}
          />
          <Text className="f-24 f-100 text-center text-upper text-black mt-4">
            Honored in 2019 by LUXURY REAL ESTATE
          </Text>
        </Flex>
        <Row justify="center" gutter={[16, 16]} className="mt-5">
          <Col xs={24} sm={12} md={12} lg={8}>
            <div className="box-award">
              <Text
                className="f-bold f-24 text-upper"
                style={{ color: "white" }}
              >
                WINNER
              </Text>
              <br />
              <Text
                className="f-bold f-24 text-upper"
                style={{ color: "white" }}
              >
                “Best Brand Integration”
              </Text>
              <br />
              <Text className="f-18" style={{ color: "white" }}>
                Given to the member that creatively and consistently exhibits
                the Board of Regents and/or Luxury Real Estate Brand in
                conjunction with their own brand.
              </Text>
            </div>
          </Col>

          <Col xs={24} sm={12} md={10} lg={8}>
            <div className="box-award">
              <Text className="f-bold f-24 " style={{ color: "white" }}>
                WINNER
              </Text>
              <br />
              <Text
                className="f-bold f-24 text-upper"
                style={{ color: "white" }}
              >
                “Significant Sales Award”
              </Text>
              <br />
              <Text className="f-18" style={{ color: "white" }}>
                Bestowed upon five members who have had the most noteworthy sale
                of a single property within the last 12 months. The significant
                sale must represent the best/most expensive property in a
                specific location.
              </Text>
            </div>
          </Col>
        </Row>
      </div>
      <Container className="my-5">
        <Paragraph className="f-40 f-100 text-black text-center text-upper pt-4">
          Global{" "}
          <Text className="f-40 text-black text-center text-upper f-bold">
            Luxurious
          </Text>{" "}
          Offerings
        </Paragraph>
        <div
          style={{
            width: "100%",
            padding: "0",
            margin: "0",
          }}
        >
          <div id="reciprocity"></div>
        </div>
      </Container>
    </div>
  );
}

export default GlobalPartner;
