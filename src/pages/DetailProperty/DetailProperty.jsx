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
  Form,
} from "antd";
import { Container } from "react-bootstrap";
import Button from "../../components/Buttons";
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
import { useDispatch } from "react-redux";
import { google_api_key } from "../../api/Axios";
import { contactUs } from "../../api/Inquiry";

const { Title, Paragraph, Text } = Typography;

export default function DetailProperty() {
  const requestRef = useRef(null);
  const [details, setDetails] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [compensation, setCompensation] = useState(false);
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });
  const dispatch = useDispatch();
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";

    // Remove non-numeric characters
    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    // Check if the number is 10 digits long (assume US number)
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6
      )}`;
    }

    // If the number is 11 digits long (potentially including country code)
    {
      if (cleaned.length === 11 && cleaned.startsWith("1")) {
        const number = cleaned.slice(1); // Remove leading '1' (US country code)
        return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(
          6
        )}`;
      }
    }

    // Return the number as-is if it doesn't match expected patterns
    return phoneNumber;
  };
  const mapRef = useRef(null);

  const { id } = useParams();

  const { data, isLoading } = useProperty(id);
  console.log("data", data?.property);
  const [backgroundImage, setBackGroundImage] = useState(null);

  useEffect(() => {
    return;
  }, [backgroundImage]);

  const navigate = useNavigate();

  const showModal = () => {
    setOpenModal(!openModal);
  };

  const hideModal = () => {
    setOpenModal(!openModal);
  };

  const scrollToRequest = () => {
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
            lat: parseFloat(data?.property?.latitude),
            lng: parseFloat(data?.property?.longitude),
          },
          zoom: 20,
          tilt: 45,
        });

        new window.google.maps.Marker({
          position: {
            lat: parseFloat(data?.property?.latitude),

            lng: parseFloat(data?.property?.longitude),
          },
          map: map,
        });
        console.log(data?.property?.latitude);
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
  }, [google_api_key, data?.property?.latitude, data?.property?.longitude]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(contactUs(contact));
  };

  const validateForm = () => {
    const { firstName, lastName, email, message } = contact;
    if (!firstName || !lastName || !email || !message) {
      message.error("Please fill out all required fields.");
      return false;
    }
    return true;
  };

  return (
    <div className="single_property">
      <div style={{ position: "relative", overflowX: "hidden" }}>
        <Image
          preview={false}
          src={data?.property?.media[0]?.mdUrl}
          width="100%"
          fallback="https://placehold.com"
        />
        <div
          className="hideetails"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
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
              MLS® #: {data?.property?.mlsId}
            </Text>
            <Title className="text-upper" style={{ color: "white" }} level={3}>
              {data?.property?.addressLine1} {data?.property?.addressLine2}
            </Title>
            <Paragraph
              className="text-upper f-20 f-100"
              style={{ lineHeight: "10px", color: "#D4CFC9" }}
            >
              {data?.property?.city}, {data?.property?.state},{" "}
              {data?.property?.zipCode}
            </Paragraph>
            <Title
              className="text-upper"
              style={{ color: "white", marginTop: ".2em" }}
              level={2}
            >
              {data?.property?.salePrice}
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
                  {data?.property?.bedroomCount} Bedrooms
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
                  {data?.property?.bathCount} Baths
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
                  {data?.property?.area} {data?.property?.areaUnit}
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
                <Text className="text-white f-16 f-100">
                  {data?.property?.parking} Car garage
                </Text>
              </Flex>
            </Col>
            {/* <Col lg={8}>
              <Flex justify={"flex-start"} align={"center"} gap={5}>
                <div
                  className="circle-bg-white"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginBottom: "0px",
                  }}
                >
                  <LuSofa size={15} />
                </div>
                <Text className="text-white f-16">SF Living</Text>
              </Flex>
            </Col> */}
          </Row>
          <Flex justify={"center"} align="center" vertical>
            <Text style={{ color: "#D4CFC9" }} className="my-4 f-16 f-100">
              New construction- single family residence
            </Text>
          </Flex>
          <Flex justify={"center"} align="center" vertical>
            <Text style={{ color: "#D4CFC9" }} className="my-4 f-16 f-100">
              Compensation Offered?{""} &nbsp;
              <Text
                style={{ color: "#D4CFC9", cursor: "pointer" }}
                className="my-4 f-16 f-100"
              >
                {data?.property?.compensation}
              </Text>
            </Text>

            {/*<Text
                style={{ color: "#D4CFC9", cursor: "pointer" }}
                className="my-4 f-16 f-100"
                onClick={() => setCompensation(true)}
              ></Text>
              &nbsp; &nbsp;
              <Text
                style={{ color: "#D4CFC9", cursor: "pointer" }}
                className="my-4 f-16 f-100"
                onClick={() => setCompensation(false)}
              >
                No
              </Text>
            */}
          </Flex>
        </div>
      </div>
      <div
        className="detail-container"
        style={{
          backgroundColor: "black",
          padding: "20px",
        }}
      >
        <Flex className="pt-5" vertical>
          <Text
            className="f-20 f-100"
            style={{ lineHeight: "14px", color: "#D4CFC9" }}
          >
            MLS® #: F10423862
          </Text>
          <Title className="text-upper" style={{ color: "white" }} level={3}>
            {data?.property?.addressLine1} {data?.property?.addressLine2}
          </Title>
          <Paragraph
            className="text-upper f-20 f-100"
            style={{ lineHeight: "10px", color: "#D4CFC9" }}
          >
            {data?.property?.city}, {data?.property?.state},{" "}
            {data?.property?.zipCode}
          </Paragraph>
        </Flex>

        <Row gutter={[8, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} sm={12}>
            <Flex gap={5}>
              <div
                className="circle-bg-white"
                style={{
                  width: "20px",
                  height: "20px",
                  marginBottom: "0px",
                }}
              >
                <IoBedOutline size={15} />
              </div>
              <Text className="text-white f-16 f-100">
                {data?.property?.bedroomCount} Bedrooms
              </Text>
            </Flex>
          </Col>
          <Col xs={12} sm={8}>
            <Flex gap={5}>
              <div
                className="circle-bg-white"
                style={{
                  width: "20px",
                  height: "20px",
                  marginBottom: "0px",
                }}
              >
                <FaWater size={15} />
              </div>
              <Text className="text-white f-16 f-100">100± Waterfront</Text>
            </Flex>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Flex gap={5}>
              <div
                className="circle-bg-white"
                style={{
                  width: "20px",
                  height: "20px",
                  marginBottom: "0px",
                }}
              >
                <LuBath size={15} />
              </div>
              <Text className="text-white f-16">
                {data?.property?.bathCount} Baths
              </Text>
            </Flex>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Flex gap={5}>
              <div
                className="circle-bg-white"
                style={{
                  width: "20px",
                  height: "20px",
                  marginBottom: "0px",
                }}
              >
                <FaVectorSquare size={15} />
              </div>
              <Text className="text-white f-16 f-100">
                {data?.property?.area} {data?.property?.areaUnit}
              </Text>
            </Flex>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Flex gap={5}>
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
          <Col xs={24} sm={12} md={8} lg={8}>
            <Flex gap={5}>
              <div
                className="circle-bg-white"
                style={{
                  width: "20px",
                  height: "20px",
                  marginBottom: "0px",
                }}
              >
                <LuSofa size={15} />
              </div>
              <Text className="text-white f-16">SF Living</Text>
            </Flex>
          </Col>
        </Row>

        <Flex justify="center" align="center" vertical>
          <Text style={{ color: "#D4CFC9" }} className="my-4 f-16 f-100">
            New construction - single family residence
          </Text>
        </Flex>

        <Flex justify="center" align="center" vertical>
          <Text style={{ color: "#D4CFC9" }} className="my-4 f-16 f-100">
            Compensation Offered?
            <Text
              style={{ color: "#D4CFC9", cursor: "pointer" }}
              className="my-4 f-16 f-100"
            >
              {data?.property?.compensation}
            </Text>
          </Text>
          {/* <Text style={{ color: "#D4CFC9" }} className="my-4 f-16 f-100">
            Compensation Offered?{" "}
            <Text
              style={{ color: "#D4CFC9", cursor: "pointer" }}
              className="my-4 f-16 f-100"
              onClick={() => setCompensation(true)}
            >
              Yes
            </Text>
            &nbsp; &nbsp;
            <Text
              style={{ color: "#D4CFC9", cursor: "pointer" }}
              className="my-4 f-16 f-100"
              onClick={() => setCompensation(false)}
            >
              No
            </Text>
          </Text>*/}
        </Flex>
      </div>
      <Container>
        <Row>
          <Col lg={12} xs={24} sm={24} className="p-3">
            <Card className="card-feature">
              <Title
                style={{ textAlign: "center", lineHeight: 2 }}
                className="text-upper"
              >
                {data?.property?.addressLine1} {data?.property?.addressLine2}
              </Title>
              <Paragraph className="f-16 f-200" style={{ lineHeight: 1.2 }}>
                {data?.property?.description
                  ?.split("\n")
                  .filter((txt) => txt.trim() !== "")
                  .map((txt) => (
                    <p>{txt}</p>
                  ))}
                {/*{data?.property?.description.split("\n").slice(0,3).map((txt) => (
                  <p>{txt}</p>
                ))}w*/}
              </Paragraph>
            </Card>
          </Col>
          <Col lg={12} xs={24} sm={24} className="p-5">
            <div>
              <Row gutter={[8, 16]}>
                <Col lg={12} sm={24} md={24}>
                  <Image
                    src={data?.property?.media[0]?.mdUrl}
                    style={{ cursor: "pointer" }}
                    preview
                    width="100%"
                    // fallback="https://placehold.co/272x215"
                  />
                </Col>
                <Col lg={12} sm={24} md={24}>
                  <Image
                    src={data?.property?.media[1]?.mdUrl}
                    style={{ cursor: "pointer" }}
                    preview
                    width="100%"
                    // fallback="https://placehold.co/272x215"
                  />
                </Col>
                <Col lg={12} sm={24} md={24}>
                  <Image
                    src={data?.property?.media[2]?.mdUrl}
                    style={{ cursor: "pointer" }}
                    preview
                    width="100%"
                    // fallback="https://placehold.co/272x215"
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
                        {data?.property?.media?.map((item, index) => (
                          <Col lg={8} md={12} sm={24}>
                            <Image
                              src={item?.mdUrl}
                              style={{ cursor: "pointer" }}
                              preview
                              width="100%"
                              // fallback="https://placehold.co/272x215"
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
              {/* <div style={{ marginBottom: 40 }}>
                <Button classNam="button-view1" width="300px">
                  Watch Videos
                </Button>
              </div> */}
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
            <Col lg={14} sm={24} md={24} xsm={24} className="p-5">
              <Title
                level={2}
                style={{
                  lineHeight: 2,
                  color: "white",
                  letterSpacing: "1.5px",
                }}
                className="text-upper f-30"
              >
                Interested in {data?.property?.addressLine1}{" "}
                {data?.property?.addressLine2}?
              </Title>
              <form onSubmit={handleSubmit}>
                <Row gutter={[8, 40]} className="detail-property">
                  <Col lg={12} md={12} sm={24}>
                    <Input
                      placeholder="First Name"
                      type="text"
                      className="child1"
                      name="firstName"
                      value={contact.firstName}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col lg={12} md={12} sm={24}>
                    <Input
                      placeholder="Last Name"
                      type="text"
                      name="lastName"
                      value={contact.lastName}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col lg={12} md={12} sm={24}>
                    <Input
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={contact.email}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col lg={12} md={12} sm={24}>
                    <Input
                      placeholder="Phone"
                      type="text"
                      name="phoneNumber"
                      value={contact.phoneNumber}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col lg={24} md={24}>
                    <Input
                      placeholder="Message"
                      type="text"
                      name="message"
                      value={contact.message}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                  <Col lg={24} md={24}>
                    <Checkbox
                      style={{ color: "white" }}
                      name="requestShowing"
                      checked={contact.requestShowing}
                      onChange={handleChange}
                    >
                      Request a showing
                    </Checkbox>
                  </Col>
                  <Col lg={24} md={24} align="middle">
                    <button
                      className="button-secondary-line-left"
                      htmlType="submit"
                    >
                      Submit info
                    </button>
                  </Col>
                </Row>
              </form>
            </Col>
            <Col lg={10} md={24} sm={24}>
              <div className="pt-5">
                <div
                  ref={mapRef}
                  style={{ height: "500px", width: "39rem", maxWidth: "82vw" }}
                />
                ;
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
        <Button
          classNam="button-view1"
          width="300px"
          Click={() => navigate("/features")}
        >
          Back to properties
        </Button>
        <Button
          classNam="button-view-line-right"
          width="300px"
          Click={() => navigate("/mls-listing")}
        >
          Search Mls
        </Button>
      </Flex>
      {/*<div className="boxshadow-section p-5">
        <Container className="p-5">
          <Title className="text-upper" style={{ letterSpacing: "1px" }}>
            Features
          </Title>
          <Row gutter={[8, 40]}>
            <Col lg={24} md={24} sm={24}></Col>
          </Row>
        </Container>
      </div>*/}
      <div style={{ backgroundColor: "#000", padding: "20px" }}>
        <Row gutter={16}>
          {data?.property?.Secondary_agentId ? (
            <>
              {/* Primary Agent Column */}
              <Col lg={12} md={24} sm={24} xs={24}>
                <Row gutter={[16, 16]}>
                  <Col lg={16} md={24} sm={24} xs={24} className="p-0">
                    <Flex gap={10} justify="center" align="center">
                      <img
                        src={data?.property?.Primary_agentId?.photo}
                        preview={false}
                        width="40%"
                        style={{ aspectRatio: 5 / 7, objectFit: "cover" }}
                      />

                      <Flex vertical justify="flex-start" align="">
                        <Title className="text-white">Contact</Title>
                        <Flex justify="flex-start" align="center" gap={10}>
                          <FaRegUser size={20} color="white" />
                          <Text className="text-white f-18 f-100">
                            {data?.property?.Primary_agentId?.firstName +
                              " " +
                              data?.property?.Primary_agentId?.lastName}
                          </Text>
                        </Flex>
                        <Flex justify="flex-start" align="center" gap={10}>
                          <CiPhone size={20} color="white" />
                          <Text className="text-white f-18 f-100">
                            {formatPhoneNumber(
                              data?.property?.Primary_agentId?.phoneNumber
                            )}
                          </Text>
                        </Flex>
                        <Flex justify="flex-start" align="center" gap={10}>
                          <CiMail size={20} color="white" />
                          <Text className="text-white f-18 f-100">
                            {data?.property?.Primary_agentId?.email}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Col>
                  <Col lg={8} md={24} sm={24} xs={24}>
                    <Flex
                      vertical
                      justify="center"
                      align="center"
                      style={{ height: "100%" }}
                      gap={10}
                    >
                      <Button
                        classNam="button-secondary-line-left"
                        Click={() =>
                          navigate(
                            `/my-sold/${
                              data?.property?.Primary_agentId?.firstName +
                              " " +
                              data?.property?.Primary_agentId?.lastName
                            }/${data?.property?.Primary_agentId?._id}`
                          )
                        }
                      >
                        Sold Properties
                      </Button>
                      <Button
                        classNam="button-secondary-line-left"
                        Click={() =>
                          navigate(
                            `/my-listing/${
                              data?.property?.Primary_agentId?.firstName +
                              " " +
                              data?.property?.Primary_agentId?.lastName
                            }/${data?.property?.Primary_agentId?._id}`
                          )
                        }
                      >
                        View my listings
                      </Button>
                    </Flex>
                  </Col>
                </Row>
              </Col>

              {/* Secondary Agent Column */}
              <Col lg={12} md={24} sm={24} xs={24}>
                <Row gutter={[16, 16]}>
                  <Col lg={16} md={24} sm={24} xs={24} className="p-0">
                    <Flex gap={10} justify="center" align="center">
                      <img
                        src={data?.property?.Secondary_agentId?.photo}
                        preview={false}
                        width="40%"
                        style={{ aspectRatio: 5 / 7, objectFit: "cover" }}
                      />

                      <Flex vertical justify="flex-start" align="">
                        <Title className="text-white">Contact</Title>
                        <Flex justify="flex-start" align="center" gap={10}>
                          <FaRegUser size={20} color="white" />
                          <Text className="text-white f-18 f-100">
                            {data?.property?.Secondary_agentId?.firstName +
                              " " +
                              data?.property?.Secondary_agentId?.lastName}
                          </Text>
                        </Flex>
                        <Flex justify="flex-start" align="center" gap={10}>
                          <CiPhone size={20} color="white" />
                          <Text className="text-white f-18 f-100">
                            {formatPhoneNumber(
                              data?.property?.Secondary_agentId?.phoneNumber
                            )}
                          </Text>
                        </Flex>
                        <Flex justify="flex-start" align="center" gap={10}>
                          <CiMail size={20} color="white" />
                          <Text className="text-white f-18 f-100">
                            {data?.property?.Secondary_agentId?.email}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Col>
                  <Col lg={8} md={24} sm={24} xs={24}>
                    <Flex
                      vertical
                      justify="center"
                      align="center"
                      style={{ height: "100%" }}
                      gap={10}
                    >
                      <Button
                        classNam="button-secondary-line-left"
                        Click={() =>
                          navigate(
                            `/my-sold/${
                              data?.property?.Primary_agentId?.firstName +
                              " " +
                              data?.property?.Primary_agentId?.lastName
                            }/${data?.property?.Primary_agentId?._id}`
                          )
                        }
                      >
                        Sold Properties
                      </Button>
                      <Button
                        classNam="button-secondary-line-left"
                        Click={() =>
                          navigate(
                            `/my-listing/${
                              data?.property?.Primary_agentId?.firstName +
                              " " +
                              data?.property?.Primary_agentId?.lastName
                            }/${data?.property?.Primary_agentId?._id}`
                          )
                        }
                      >
                        View my listings
                      </Button>
                    </Flex>
                  </Col>
                </Row>
              </Col>
            </>
          ) : (
            /* Show only Primary Agent when Secondary Agent is not present */
            <Col lg={24} md={24} sm={24} xs={24}>
              <Row gutter={16}>
                <Col lg={18} md={24} sm={24} xs={24} className="p-5">
                  <Row align="middle">
                    <Col lg={10} md={6} sm={24} xs={24}>
                      <Image
                        src={data?.property?.Primary_agentId?.photo}
                        preview={false}
                        width="50%"
                        style={{ aspectRatio: 5 / 7, objectFit: "cover" }}
                      />
                    </Col>
                    <Col lg={14} md={18} sm={24} xs={24}>
                      <Flex vertical justify="flex-start" align="">
                        <Title className="text-white">Contact</Title>
                        <Flex justify="flex-start" align="center" gap={10}>
                          <FaRegUser size={20} color="white" />
                          <Text className="text-white f-20 f-100">
                            {data?.property?.Primary_agentId?.firstName +
                              " " +
                              data?.property?.Primary_agentId?.lastName}
                          </Text>
                        </Flex>
                        <Flex justify="flex-start" align="center" gap={10}>
                          <CiPhone size={20} color="white" />
                          <Text className="text-white f-20 f-100">
                            {formatPhoneNumber(
                              data?.property?.Primary_agentId?.phoneNumber
                            )}
                          </Text>
                        </Flex>
                        <Flex justify="flex-start" align="center" gap={10}>
                          <CiMail size={20} color="white" />
                          <Text className="text-white f-24 f-100">
                            {data?.property?.Primary_agentId?.email}
                          </Text>
                        </Flex>
                      </Flex>
                    </Col>
                  </Row>
                </Col>
                <Col lg={6} md={24} sm={24} xs={24}>
                  <Flex
                    vertical
                    justify="center"
                    align="center"
                    style={{ height: "100%" }}
                    gap={10}
                  >
                    <button
                      className="let-talk-btn"
                      width="100%"
                      onClick={() =>
                        navigate(
                          `/my-sold/${
                            data?.property?.Primary_agentId?.firstName +
                            " " +
                            data?.property?.Primary_agentId?.lastName
                          }/${data?.property?.Primary_agentId?._id}`
                        )
                      }
                    >
                      Sold Properties
                    </button>
                    <button
                      className="let-talk-btn"
                      width="100%"
                      onClick={() =>
                        navigate(
                          `/my-listing/${
                            data?.property?.Primary_agentId?.firstName +
                            " " +
                            data?.property?.Primary_agentId?.lastName
                          }/${data?.property?.Primary_agentId?._id}`
                        )
                      }
                    >
                      View my listings
                    </button>
                  </Flex>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </div>

      <LetTalk />
    </div>
  );
}
