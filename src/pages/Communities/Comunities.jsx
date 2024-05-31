import React, { useEffect, useRef } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import Community from "../../assets/community.png";
import { Typography, Row, Col, Card, Spin, Flex, Image } from "antd";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useCommunity from "../../hooks/useCommunity";
import useProperties from "../../hooks/useProperties";
import LetTalk from "../../components/LetTalk";
import { Loader } from "@googlemaps/js-api-loader";
import { google_api_key } from "../../api/Axios";
import Property from "../../assets/property.png";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const { Title, Paragraph, Text } = Typography;
function Comunities() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data: property,
    isLoading: isPropertyLoading,
    isError: isPropertyError,
  } = useProperties(null, 6, 1, null, id);
  const mapRef = useRef(null);
  const { data, isLoading, isError } = useCommunity(id);
  console.log(property);
  useEffect(() => {
    const loader = new Loader({
      apiKey: google_api_key,
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: {
            lat: parseFloat(data?.geo?.geometry?.location?.lat),
            lng: parseFloat(data?.geo?.geometry?.location?.lng),
          },
          zoom: 20,
          tilt: 45,
        });
        new window.google.maps.Marker({
          position: {
            lat: parseFloat(data?.geo?.geometry?.location?.lat),
            lng: parseFloat(data?.geo?.geometry?.location?.lng),
          },
          map: map,
        });
      }
    });
  }, [
    google_api_key,
    data?.geo?.geometry?.location?.lng,
    data?.geo?.geometry?.location?.lng,
  ]);
  return (
    <div>
      <BackgroundImage Image={Community}>
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
          <Row>
            <Col lg={8} md={8} sm={0}></Col>
            <Col lg={8} md={8} sm={24}>
              <Card className="card-feature boxshadow-section">
                <Title
                  style={{ textAlign: "center", lineHeight: 2 }}
                  className="text-upper"
                >
                  {data?.name}
                </Title>
                <Paragraph className="f-16 f-200 " style={{ lineHeight: 1.8 }}>
                  {data?.description}
                </Paragraph>
              </Card>
            </Col>
            <Col lg={8} md={8} sm={0}></Col>
          </Row>
          <div className="boxshadow-section p-5 mt-5">
            <Container className="p-5">
              <Title className="text-upper" style={{ letterSpacing: "1px" }}>
                Features
              </Title>
              <Row gutter={[8, 40]}>
                <Col lg={24} md={24} sm={24}>
                  <Row gutter={[40, 24]}>
                    {data?.features?.map((item, index) => (
                      <Col lg={8} md={12} sm={24}>
                        <Title className="" level={2}>
                          {item?.name}
                        </Title>
                        <Paragraph className="f-16 f-100">
                          {item?.description}
                        </Paragraph>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Container>
          </div>
          <div style={{ background: "black" }} className="py-5">
            <Container>
              <Row gutter={[8, 16]}>
                <Col lg={12} md={12} sm={24}>
                  <Title className="text-white f-32 f-bold text-upper">
                    Why choose {data?.name}?
                  </Title>
                  <Text className="text-white f-16 f-100">
                    {data?.description}
                  </Text>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <div
                    ref={mapRef}
                    style={{ height: "500px", width: "100%" }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
          <Container className="py-5">
            <Title className="f-40 f-100 text-center text-upper">
              Search {data?.name} Luxury Homes For Sale
            </Title>
            <Row gutter={[60, 60]}>
              {property?.properties.map((property, index) => (
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
                      className=""
                      fallback="https://placehold.co/618x489"
                    />
                    <div className="more-info-property">
                      <Flex
                        vertical
                        align={"center"}
                        justify="center"
                        style={{ height: "100%" }}
                        gap={30}
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
                            ${property?.salePrice}
                          </Text>
                        </Flex>
                        <Flex vertical>
                          <Text className="text-center text-upper f-24 f-bold text-white">
                            Agent Listing
                          </Text>
                          <Text className="text-center text-upper f-24 f-100 text-gray">
                            Abraham
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
                            <IoPricetagOutline size={20} /> $
                            {property?.salePrice}
                          </Text>
                        </Flex>
                      </Flex>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
          <LetTalk />
        </>
      )}
    </div>
  );
}

export default Comunities;
