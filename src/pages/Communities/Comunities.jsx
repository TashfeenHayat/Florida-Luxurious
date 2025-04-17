import React, { useEffect, useRef, useState } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import {
  Typography,
  Row,
  Col,
  Card,
  Spin,
  Flex,
  Image,
  Pagination,
} from "antd";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useCommunity from "../../hooks/useCommunity";
import useProperties from "../../hooks/useProperties";
import LetTalk from "../../components/LetTalk";
import { Loader } from "@googlemaps/js-api-loader";
import { google_api_key } from "../../api/Axios";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Story from "../../assets/communitysection.png";

const { Title, Paragraph, Text } = Typography;

function Comunities() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items to display per page

  const {
    data: property,
    isLoading: isPropertyLoading,
    isError: isPropertyError,
  } = useProperties(null, itemsPerPage, currentPage, null, id);

  const mapRef = useRef(null);
  const { data, isLoading, isError } = useCommunity(id);

  useEffect(() => {
    const loader = new Loader({
      apiKey: google_api_key,
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: {
            lat: parseFloat(data?.geo?.location?.lat),
            lng: parseFloat(data?.geo?.location?.lng),
          },
          zoom: 15,
          tilt: 45,
        });
        new window.google.maps.Marker({
          position: {
            lat: parseFloat(data?.geo?.location?.lat),
            lng: parseFloat(data?.geo?.location?.lng),
          },
          map: map,
        });
      }
    });
  }, [google_api_key, data?.geo?.location?.lat, data?.geo?.location?.lng]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const currencySymbols = {
    usd: "$",
    eur: "€",
    pound: "£",
  };

  // Function to format price (remove unwanted characters, add commas)
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
      currencySymbols[currencyCode.toLowerCase()] || currencyCode.toUpperCase()
    ); // Default to currency code if no symbol found
  };

  //Sorted highest to lowest
  const sortedProperties = property?.properties?.slice().sort((a, b) => {
    const priceA = Number(a?.salePrice?.slice(1).replace(/,/g, "") || 0);
    const priceB = Number(b?.salePrice?.slice(1).replace(/,/g, "") || 0);
    return priceB - priceA;
  });

  // Slice the data based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = sortedProperties?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div style={{ overflow: "hidden" }}>
      <BackgroundImage Image={data?.photo}>
        <Title
          style={{ color: "white", lineHeight: "14px", letterSpacing: "2px" }}
          className="text-upper f-50 f-100"
        >
          Communities
        </Title>
      </BackgroundImage>

      {isLoading ? (
        <Flex justify={"center"} align="center" className="w-100 py-5">
          <Spin size="large" />
        </Flex>
      ) : (
        <>
          <Row justify="center">
            <Col lg={12} md={16} sm={24}>
              <Card className="card-feature boxshadow-section">
                <Title
                  style={{ textAlign: "center", lineHeight: 1.2 }}
                  className="text-upper"
                >
                  {data?.name}
                </Title>
                <Paragraph className="f-16 f-200 " style={{ lineHeight: 1.8 }}>
                  {data?.description}
                </Paragraph>
              </Card>
            </Col>
          </Row>
          <div className="boxshadow-section p-5 mt-5">
            <Container>
              <Title className="text-upper" style={{ letterSpacing: "1px" }}>
                Features
              </Title>
              <Row gutter={[16, 40]}>
                {data?.features?.map((item, index) => (
                  <Col lg={8} md={12} sm={24} key={index}>
                    <Title className="" level={2}>
                      {item?.name}
                    </Title>
                    <Paragraph className="f-16 f-100">
                      {item?.description}
                    </Paragraph>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
          <div style={{ background: "black" }} className="py-5">
            <Container>
              <Row gutter={[20, 40]}>
                <Col lg={12} md={24} sm={24}>
                  <Title className="text-white f-32 f-bold text-upper">
                    Why choose {data?.name}?
                  </Title>
                  <Text className="text-white f-16 f-100">
                    {data?.other_description}
                  </Text>
                </Col>
                <Col lg={12} md={24} sm={24}>
                  <div
                    ref={mapRef}
                    style={{ height: "300px", width: "100%" }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
          {/*<div className="py-5">
            <Row gutter={[60, 60]} align="middle">
              <Col lg={data?.condominiumOptions ? 8 : 0} md={24} sm={0}>
                <div>
                  <div
                    className="d-flex-story-center"
                    style={{ marginLeft: "200" }}
                  >
                    <div
                      className="our-story-bg p-5"
                      data-aos="fade-down-right"
                      data-aos-duration="2000"
                    >
                      <Flex justify={"space-between"}>
                        <Flex vertical>
                          <Title
                            level={2}
                            className="our-story-title text-upper"
                          >
                            {" "}
                            Condominium Options
                          </Title>
                        </Flex>
                      </Flex>
                      <Flex vertical>
                        <Text className="our-story-text f-100 f-16 text-white text-left">
                          {data?.condominiumOptions}
                        </Text>
                      </Flex>
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                lg={data?.condominiumOptions ? 16 : 24}
                md={0}
                xs={0}
                sm={0}
                className="py-4"
                data-aos="fade-down-left"
                data-aos-duration="2000"
              >
                <Image src={Story} preview={false} width="100%" />
              </Col>
            </Row>
          </div>*/}

          <Container className="py-5">
            <Title className="f-40 f-100 text-center text-upper">
              Search {data?.name} Luxury Homes For Sale
            </Title>
            <Row gutter={[16, 60]}>
              {currentProperties?.map((property, index) => (
                <Col
                  lg={12}
                  md={12}
                  sm={24}
                  key={index}
                  onClick={() => navigate(`/features/${property?._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="displayy-teamimg-center">
                    <Image
                      src={property?.media[0]?.mdUrl}
                      width="100%"
                      fallback="https://placehold.co/618x489"
                      style={{ aspectRatio: 5 / 3 }}
                    />
                    <div className="more-info-property">
                      <Flex
                        vertical
                        align={"center"}
                        justify="center"
                        style={{ height: "100%" }}
                        gap={20}
                      >
                        <Flex vertical>
                          <Text className="text-center text-upper f-24 f-bold text-white">
                            address
                          </Text>
                          <Text className="text-center text-upper f-24 f-100 text-gray">
                            {property?.addressLine1} {property?.addressLine2}
                          </Text>
                        </Flex>
                        <Flex vertical>
                          <Text className="text-center text-upper f-24 f-bold text-white">
                            last list price
                          </Text>
                          <Text className="text-center text-upper f-24 f-100 text-gray">
                            {getCurrencySymbol(property?.currency)}
                            {formatPrice(property?.salePrice)}
                          </Text>
                        </Flex>
                        <Flex vertical>
                          <button className="let-talk-btn">
                            View Property
                          </button>
                        </Flex>
                      </Flex>
                    </div>

                    <div className="info">
                      <Flex justify={"end"} align={"center"}>
                        <Flex>
                          <IoLocationOutline color="white" size={20} />
                          <Text
                            className="f-14 f-bold text-white"
                            style={{ textAlign: "right" }}
                          >
                            {property?.addressLine1} {property?.addressLine2}{" "}
                            <br />
                            <IoPricetagOutline size={20} />{" "}
                            {getCurrencySymbol(property?.currency)}
                            {formatPrice(property?.salePrice)}
                          </Text>
                        </Flex>
                      </Flex>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <Flex justify={"center"} align="center" className="my-4">
              {property?.properties?.length === 0 ? null : (
                <Pagination
                  defaultCurrent={1}
                  total={property?.properties?.length || 0}
                  pageSize={itemsPerPage}
                  onChange={handlePageChange}
                  responsive
                  showSizeChanger={false}
                />
              )}
            </Flex>
          </Container>
          <LetTalk />
        </>
      )}
    </div>
  );
}

export default Comunities;
