import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  Row,
  Col,
  Card,
  Typography,
  Flex,
  Input,
  Checkbox,
  Modal,
} from "antd";
import { Container } from "react-bootstrap";
import FeatureImg from "../../assets/feature.png";
import Featurecol from "../../assets/feature1.png";
import Demomap from "../../assets/demomap.png";
import Button from "../../components/Buttons";
import Team from "../../assets/team.png";
import { IoBedOutline } from "react-icons/io5";
import { FaWater } from "react-icons/fa6";
import { LuBath, LuSofa } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { CiPhone, CiMail } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import LetTalk from "../../components/LetTalk";
import { FaVectorSquare, FaPlus } from "react-icons/fa6";
import { TbCarGarage } from "react-icons/tb";
import { useParams, useNavigate } from "react-router-dom";
import useProperty from "../../hooks/useProperty";
import { Loader } from "@googlemaps/js-api-loader";
import { google_api_key } from "../../api/Axios";

const { Title, Paragraph, Text } = Typography;

export default function DetailProperty() {
  const requestRef = useRef(null);
  const [details, setDetails] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const mapRef = useRef(null);

  const { id } = useParams();

  const { data, isLoading } = useProperty(id);

  console.log(data?._doc);
  const navigate = useNavigate();

  const showModal = () => {
    setOpenModal(!openModal);
  };

  const hideModal = () => {
    setOpenModal(!openModal);
    console.log("wokring");
  };

  const scrollToRequest = () => {
    console.log("working");

    if (requestRef.current) {
      requestRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: google_api_key,
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: {
            lat: parseFloat(data?._doc?.latitude),
            lng: parseFloat(data?._doc?.longitude),
          },
          zoom: 20,
          tilt: 45,
        });
        new window.google.maps.Marker({
          position: {
            lat: parseFloat(data?._doc?.latitude),
            lng: parseFloat(data?._doc?.longitude),
          },
          map: map,
        });
        const buildingsLayer = new google.maps.ImageMapType({
          getTileUrl: (coord, zoom) => {
            return (
              "https://mt1.google.com/vt/lyrs=y&x=" +
              coord.x +
              "&y=" +
              coord.y +
              "&z=" +
              zoom +
              "&style=3" // This style parameter enables 3D buildings
            );
          },
          tileSize: new google.maps.Size(256, 256),
          maxZoom: 20,
          minZoom: 0,
          name: "3D Buildings",
        });

        map.overlayMapTypes.push(buildingsLayer);
      }
    });
  }, [google_api_key, data?._doc?.latitude, data?._doc?.longitude]);
  return (
    <>
      <div style={{ position: "relative", overflowX: "hidden" }}>
        <Image
          preview={false}
          src={data?._doc?.media[3]?.mdUrl}
          width="100%"
          fallback="https://placehold.co/1512x934"
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>
        <div
          className="properties-single-slideshow-info"
          style={{
            right: details ? "0px" : "-500px",
            transition: "right 0.3s ease",
          }}
        >
          <span
            class="show-hide-btn show"
            style={{ width: "100%", left: "-250px", color: "black" }}
            onClick={() => setDetails(!details)}
          >
            {details ? "Hide Details" : "Details"}
          </span>

          <Flex className="pt-5" vertical>
            <Text
              className="f-20 f-100"
              style={{ lineHeight: "14px", color: "#D4CFC9" }}
            >
              MLS® #: F10423862
            </Text>
            <Title className="text-upper" style={{ color: "white" }} level={3}>
              {data?._doc?.addressLine1 + " " + data?._doc?.addressLine2}
            </Title>
            <Paragraph
              className="text-upper f-20 f-100"
              style={{ lineHeight: "10px", color: "#D4CFC9" }}
            >
              {data?._doc?.city}, {data?._doc?.state}, {data?._doc?.zipCode}
            </Paragraph>
            <Title
              className="text-upper"
              style={{ color: "white", marginTop: ".2em" }}
              level={2}
            >
              ${data?._doc?.salePrice}
            </Title>
          </Flex>
          <Row gutter={[8, 16]}>
            <Col lg={8}>
              <Flex justify={"flex-start"} align={"center"} gap={5}>
                <Flex>
                  <div
                    className="circle-bg-white"
                    style={{
                      width: "30px",
                      height: "30px",
                      marginBottom: "0px",
                    }}
                  >
                    <IoBedOutline size={15} />
                  </div>
                </Flex>
                <Text className="text-white f-16 f-100">
                  {data?._doc?.bedroomCount} Bedrooms
                </Text>
              </Flex>
            </Col>
            <Col lg={8}>
              <Flex justify={"flex-start"} align={"center"} gap={5}>
                <div
                  className="circle-bg-white"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginBottom: "0px",
                  }}
                >
                  <FaWater size={15} />
                </div>
                <Text className="text-white f-16 f-100">100± Waterfront</Text>
              </Flex>
            </Col>
            <Col lg={8}>
              <Flex justify={"flex-start"} align={"center"} gap={5}>
                <div
                  className="circle-bg-white"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginBottom: "0px",
                  }}
                >
                  <LuBath size={15} />
                </div>
                <Text className="text-white f-16">
                  {data?._doc?.bathCount} Baths
                </Text>
              </Flex>
            </Col>
            <Col lg={8}>
              <Flex justify={"flex-start"} align={"center"} gap={5}>
                <Flex>
                  <div
                    className="circle-bg-white"
                    style={{
                      width: "30px",
                      height: "30px",
                      marginBottom: "0px",
                    }}
                  >
                    <FaVectorSquare size={15} />
                  </div>
                </Flex>
                <Text className="text-white f-16 f-100">
                  {data?._doc?.area} {data?._doc?.areaUnit}
                </Text>
              </Flex>
            </Col>
            <Col lg={8}>
              <Flex justify={"flex-start"} align={"center"} gap={5}>
                <div
                  className="circle-bg-white"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginBottom: "0px",
                  }}
                >
                  <TbCarGarage size={15} />
                </div>
                <Text className="text-white f-16 f-100">Car garage</Text>
              </Flex>
            </Col>
            <Col lg={8}>
              <Flex justify={"flex-start"} align={"center"} gap={5}>
                <div
                  className="circle-bg-white"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginBottom: "0px",
                  }}
                >
                  <LuSofa size={15} />
                </div>
                <Text className="text-white f-16">SF Living</Text>
              </Flex>
            </Col>
          </Row>
          <Flex justify={"center"} align="center">
            <Text style={{ color: "#D4CFC9" }} className="my-4 f-16 f-100">
              New construction- single family residence
            </Text>
          </Flex>
        </div>
      </div>
      <Container>
        <Row>
          <Col lg={12} xs={24} sm={24} className="p-3">
            <Card className="card-feature">
              <Title
                style={{ textAlign: "center", lineHeight: 2 }}
                className="text-upper"
              >
                {data?._doc?.addressLine1 + " " + data?._doc?.addressLine2}
              </Title>
              <Paragraph className="f-16 f-200" style={{ lineHeight: 2.8 }}>
                {data?._doc?.description}
              </Paragraph>
            </Card>
          </Col>
          <Col lg={12} xs={24} sm={24} className="p-5">
            <div>
              <Row gutter={[8, 16]}>
                <Col lg={12} sm={24} md={24}>
                  <Image
                    src={data?._doc?.media[0]?.mdUrl}
                    width="100%"
                    fallback="https://placehold.co/272x215"
                  />
                </Col>
                <Col lg={12} sm={24} md={24}>
                  <Image
                    src={data?._doc?.media[1]?.mdUrl}
                    width="100%"
                    fallback="https://placehold.co/272x215"
                  />
                </Col>
                <Col lg={12} sm={24} md={24}>
                  <Image
                    src={data?._doc?.media[2]?.mdUrl}
                    width="100%"
                    fallback="https://placehold.co/272x215"
                  />
                </Col>
                <Col lg={12} sm={24} md={24}>
                  <div
                    style={{ background: "#1C1C1C", height: "100%" }}
                    onClick={showModal}
                  >
                    <Flex
                      style={{ height: "100%", cursor: "pointer" }}
                      justify="center"
                      align="center"
                    >
                      <FaPlus size={60} color="#D4CFC9" />
                    </Flex>

                    <Modal
                      open={openModal}
                      footer={null}
                      styles={{
                        content: {
                          backgroundColor: "black",
                          borderRadius: "0px",
                          height: "400px",
                          overflowY: "auto",
                          padding: "3rem",
                        },
                      }}
                      width={"700px"}
                      closeIcon={<IoMdClose size={20} color={"#FFFFFF"} />}
                    >
                      <Row gutter={[8, 16]}>
                        {data?._doc?.media?.map((item, index) => (
                          <Col lg={8} md={12} sm={24}>
                            <Image
                              src={item?.mdUrl}
                              width="100%"
                              fallback="https://placehold.co/195x154"
                            />
                          </Col>
                        ))}
                      </Row>
                    </Modal>
                  </div>
                </Col>
              </Row>
            </div>
            <Flex
              vertical
              justify={"center"}
              align="center"
              style={{ marginTop: 40 }}
            >
              <div style={{ marginBottom: 40 }}>
                <Button classNam="button-view1" width="300px">
                  Watch Videos
                </Button>
              </div>
              {/* <div style={{ marginBottom: 40 }}>
                <Button classNam="button-view1" width="300px">
                  Request details
                </Button>
              </div> */}
              <div style={{ marginBottom: 40 }}>
                <Button
                  classNam="button-view1"
                  width="300px"
                  Click={scrollToRequest}
                >
                  Schedule a showing
                </Button>
              </div>
              <div style={{ marginBottom: 40 }}>
                <Button
                  classNam="button-view1"
                  width="300px"
                  Click={() => navigate("/properties")}
                >
                  View more listing
                </Button>
              </div>
            </Flex>
          </Col>
        </Row>
      </Container>
      <div style={{ backgroundColor: "#000" }} ref={requestRef}>
        <Container>
          <Row>
            <Col lg={14} sm={24} md={24} className="p-5">
              <Title
                level={2}
                style={{
                  lineHeight: 2,
                  color: "white",
                  letterSpacing: "1.5px",
                }}
                className="text-upper"
              >
                Interested in{" "}
                {data?._doc?.addressLine1 + " " + data?._doc?.addressLine2}?
              </Title>
              <form>
                {" "}
                <Row gutter={[8, 40]} className="detail-property">
                  <Col lg={12} md={12} sm={24}>
                    <Input
                      placeholder="First Name"
                      type="text"
                      className="child1"
                    />
                  </Col>
                  <Col lg={12} md={12} sm={24}>
                    <Input placeholder="Last Name" type="text" />
                  </Col>
                  <Col lg={12} md={12} sm={24}>
                    <Input placeholder="Email" type="email" />
                  </Col>
                  <Col lg={12} md={12} sm={24}>
                    <Input placeholder="Phone" type="text" />
                  </Col>
                  <Col lg={24} md={24}>
                    <Flex gap={10}>
                      <Checkbox />
                      <Text style={{ lineHeight: 2, color: "white" }}>
                        Request A showing
                      </Text>
                    </Flex>
                  </Col>
                  <Col lg={24} md={24}>
                    <Input placeholder="Message" type="text" />
                  </Col>
                  <Col lg={24} md={24} align="middle">
                    <Button classNam="button-secondary-line-left">
                      Submit info
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
            <Col lg={10} md={24} sm={24}>
              <div className="pt-5">
                <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Flex
        gap={30}
        className="mt-5 mb-5"
        justify="center"
        align="center"
        wrap="wrap"
      >
        <Button classNam="button-view1" width="300px">
          Back to properties
        </Button>
        <Button classNam="button-view-line-right" width="300px">
          Search Mls
        </Button>
      </Flex>
      <div className="boxshadow-section p-5">
        <Container className="p-5">
          <Title className="text-upper" style={{ letterSpacing: "1px" }}>
            Features
          </Title>
          <Row gutter={[8, 40]}>
            <Col lg={24} md={24} sm={24}>
              <Row gutter={[40, 24]}>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Interior Features
                  </Title>
                  <Paragraph className="f-16 f-100">
                    First floor entry, kitchen island, elevator, pantry, volume
                    cellings, walk-in closets, wet bar
                  </Paragraph>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Exterior Features{" "}
                  </Title>
                  <Paragraph className="f-16 f-100">
                    Built-in grill, Exterior Lightening, Open Balcony, Outdoor
                    Shower, Patio
                  </Paragraph>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Construction{" "}
                  </Title>
                  <Paragraph className="f-16 f-100">
                    CBS Construction, High Impact Windows & Doors
                  </Paragraph>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Appliances
                  </Title>
                  <Paragraph
                    className="f-16 f-100"
                    style={{ textTransform: "capitalize" }}
                  >
                    automatic garage door, dishwasher, disposal, dryer, gas
                    range, microwave, icemaker, microwave refrigerator, separate
                    freezer, washer, partial hme generator
                  </Paragraph>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Water Features
                  </Title>
                  <Paragraph className="f-16 f-100">
                    123’ Waterfront, Private Dock, No Fixed Bridges, Ocean
                    Access
                  </Paragraph>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Heating & Cooling{" "}
                  </Title>
                  <Paragraph className="f-16 f-100">
                    Ceiling Fans, Central Cooling
                  </Paragraph>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Amenities{" "}
                  </Title>
                  <Paragraph
                    className="f-16 f-100"
                    style={{ textTransform: "capitalize" }}
                  >
                    private surf club & marina
                  </Paragraph>
                </Col>
                <Col lg={8} md={0} sm={0} className="bg-gif-block"></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ backgroundColor: "#000" }}>
        <Container>
          <Row>
            <Col lg={18} md={24} sm={24} className="p-5">
              <Row align={"middle"}>
                <Col lg={10} md={6} sm={24}>
                  <Image
                    src={data?._doc?.agentId?.photo}
                    preview={false}
                    width="80%"
                  />
                </Col>
                <Col lg={14} md={18} sm={24}>
                  <Flex vertical justify={"flex-start"} align={""}>
                    <Title className="text-white">Contact</Title>
                    <Flex justify={"flex-start"} align="center" gap={10}>
                      <FaRegUser size={20} color="white" />
                      <Text className="text-white f-24 f-100">
                        {data?._doc?.agentId?.firstName +
                          " " +
                          data?._doc?.agentId?.lastName}
                      </Text>
                    </Flex>
                    <Flex justify={"flex-start"} align="center" gap={10}>
                      <CiPhone size={20} color="white" />
                      <Text className="text-white f-24 f-100">
                        {"+" + data?._doc?.agentId?.phoneNumber}
                      </Text>
                    </Flex>
                    <Flex justify={"flex-start"} align="center" gap={10}>
                      <CiMail size={20} color="white" />

                      <Text className="text-white f-24 f-100">
                        {data?._doc?.agentId?.email}
                      </Text>
                    </Flex>
                  </Flex>
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={24} sm={24}>
              <Flex
                vertical
                justify={"center"}
                align="center"
                style={{ height: "100%" }}
                gap={10}
              >
                <Button
                  classNam="button-secondary-line-left"
                  width="300px"
                  Click={() =>
                    navigate(
                      `/my-sold/${
                        data?._doc?.agentId?.firstName +
                        " " +
                        data?._doc?.agentId?.lastName
                      }/${data?._doc?.agentId?._id}`
                    )
                  }
                >
                  Sold Properties{" "}
                </Button>
                <Button
                  classNam="button-secondary-line-left"
                  width="300px"
                  Click={() =>
                    navigate(
                      `/my-listing/${
                        data?._doc?.agentId?.firstName +
                        " " +
                        data?._doc?.agentId?.lastName
                      }/${data?._doc?.agentId?._id}`
                    )
                  }
                >
                  View my listing{" "}
                </Button>
              </Flex>
            </Col>
          </Row>
        </Container>
      </div>
      <LetTalk />
    </>
  );
}
