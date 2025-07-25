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
  Skeleton,
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
// import useProperty from "../../hooks/useProperty";
import MlsPropertyDetail from "../../hooks/useMlsDetail";
import { Loader } from "@googlemaps/js-api-loader";
import { google_api_key } from "../../api/Axios";
import SkeletonImage from "antd/es/skeleton/Image";

const { Title, Paragraph, Text } = Typography;
import ReCAPTCHA from "react-google-recaptcha";
export default function DetailProperty() {
  const requestRef = useRef(null);
  const [details, setDetails] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [backgroundImage, setBackGroundImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
const RECAPTCHA_SITE_KEY = "6Lfo0oIrAAAAAASYr7BEI9Hxeq1Y7aC7AU8iON54";

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
  });
  const handleImageLoad = () => {
    setImageLoading(false);
  };
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
    if (cleaned.length === 11 && cleaned.startsWith("1")) {
      const number = cleaned.slice(1); // Remove leading '1' (US country code)
      return `+1 (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(
        6
      )}`;
    }

    // Return the number as-is if it doesn't match expected patterns
    return phoneNumber;
  };
  const mapRef = useRef(null);

  const { id } = useParams();

  const { data, isLoading } = MlsPropertyDetail(id, true);
  console.log(data);
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
            lat: parseFloat(data?.mls?.geo?.lat),
            lng: parseFloat(data?.mls?.geo?.lng),
          },
          zoom: 20,
          tilt: 45,
        });
        new window.google.maps.Marker({
          position: {
            lat: parseFloat(data?.mls?.geo?.lat),
            lng: parseFloat(data?.mls?.geo?.lng),
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
  }, [google_api_key, data?.mls?.geo?.lat, data?.mls?.geo?.lng]);

  useEffect(() => {
    return;
  }, [backgroundImage]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict phone number to digits only
    if (name === "phoneNumber" && /[^0-9]/.test(value)) {
      return; // Ignore non-numeric input
    }

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // Validate the form before submission
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate firstName
    if (!contact.firstName) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    }

    // Validate lastName
    if (!contact.lastName) {
      newErrors.lastName = "Last name is required.";
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!contact.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(contact.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Validate phoneNumber (must be exactly 10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!contact.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required.";
      isValid = false;
    } else if (!phonePattern.test(contact.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
      isValid = false;
    }

    // Validate message
    if (!contact.message) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    // If validation fails, set error messages
    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  if (!captchaToken) {
    alert("Please complete the captcha to proceed.");
    return;
  }
    if (!validateForm()) {
      return;
    }

    dispatch(contactUs(contact));
    setContact({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      message: "",
      requestShowing: false, // Reset the checkbox as well
    });
    setCaptchaToken(null);

  };

  return (
    <>
      <div style={{ position: "relative", overflowX: "hidden" }}>
        {imageLoading && (
          <Skeleton.Image style={{ width: "180vh", height: "500px" }} />
        )}
        <Image
          preview={false}
          src={
            backgroundImage
              ? backgroundImage
              : data?.mls?.photos[0] || SkeletonImage
          }
          onLoad={handleImageLoad}
          style={{ display: imageLoading ? "none" : "block" }}
          width="100%"
        />
        <div></div>
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
              MLS® #: {data?.mls?.listingId}
            </Text>
            <Title className="text-upper" style={{ color: "white" }} level={3}>
              {data?.mls?.address?.streetNumberText +
                " " +
                data?.mls?.address?.streetName}
            </Title>
            <Paragraph
              className="text-upper f-20 f-100"
              style={{ lineHeight: "10px", color: "#D4CFC9" }}
            >
              {data?.mls?.address?.city}, {data?.mls?.address?.state},{" "}
              {data?.mls?.address?.postalCode}
            </Paragraph>
            <Title
              className="text-upper"
              style={{ color: "white", marginTop: ".2em" }}
              level={2}
            >
              ${data?.mls?.listPrice}
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
                <Text className="text-white f-14 f-100">
                  {data?.mls?.property?.bedrooms} Bedrooms
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
                <Text className="text-white f-14 f-100">
                  {data?.mls?.property?.water}
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
                  <LuBath size={15} />
                </div>
                <Text className="text-white f-14">
                  {data?.mls?.property?.bathsFull} Baths
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
                <Text className="text-white f-14 f-100">
                  {data?.mls?.property?.area}
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
                <Text className="text-white f-14 f-100">
                  {data?.mls?.property?.garageSpaces} garage
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
                  <LuSofa size={15} />
                </div>
                <Text className="text-white f-14">SF Living</Text>
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
      {/* mobie view */}
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
            MLS® #: {data?.mls?.mlsId}
          </Text>
          <Title className="text-upper" style={{ color: "white" }} level={3}>
            {data?.mls?.address?.streetNumberText +
              " " +
              data?.mls?.address?.streetName}
          </Title>
          <Paragraph
            className="text-upper f-20 f-100"
            style={{ lineHeight: "22px", color: "#D4CFC9" }}
          >
            {data?.mls?.address?.city}, {data?.mls?.address?.state},{" "}
            {data?.mls?.address?.postalCode}
          </Paragraph>
          <Title
            className="text-upper"
            style={{ color: "white", marginTop: ".2em" }}
            level={2}
          >
            {/* {getCurrencySymbol(data?.mls?.property?.currency)} */}$
            {data?.mls?.listPrice}
          </Title>
        </Flex>

        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} sm={12}>
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
              <Text className="text-white f-14 f-100">
                {data?.mls?.property?.water}
              </Text>
            </Flex>
          </Col>
          <Col xs={24} sm={6} md={12} lg={8}>
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
              <Text className="text-white f-14">
                {data?.mls?.property?.bathsFull} Baths
              </Text>
            </Flex>
          </Col>
          <Col xs={24} sm={6} md={12} lg={8}>
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
              <Text className="text-white f-14 f-100">
                {data?.mls?.property?.area}
              </Text>
            </Flex>
          </Col>
          <Col xs={24} sm={6} md={12} lg={8}>
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
              <Text className="text-white f-14 f-100">
                {data?.mls?.property?.garageSpaces} garage
              </Text>
            </Flex>
          </Col>
          <Col xs={24} sm={6} md={12} lg={8}>
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
              <Text className="text-white f-14">SF Living</Text>
            </Flex>
          </Col>
        </Row>

        {/* <Flex justify="center" align="center" vertical>
                <Text style={{ color: "#D4CFC9" }} className="my-4 f-16 f-100">
                  New construction - single family residence
                </Text>
              </Flex> */}

        <Flex justify="center" align="center" vertical>
          <Text style={{ color: "#D4CFC9" }} className="my-4 f-16 f-100">
            Compensation Offered
            <Text
              style={{ color: "#D4CFC9", cursor: "pointer" }}
              className="my-4 f-16 f-100"
            >
              {data?.mls?.property?.compensation}
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
          <Col lg={12} xs={32} sm={24} className="p-3">
            <Card className="card-feature">
              <Title
                style={{ textAlign: "center", lineHeight: 2 }}
                className="text-upper"
              >
                {data?.mls?.address?.streetNumberText +
                  " " +
                  data?.mls?.address?.streetName}
              </Title>
              <Paragraph className="f-16 f-200" style={{ lineHeight: 2.8 }}>
                {data?.mls?.remarks
                  ?.split("\n")
                  .filter((txt) => txt.trim() !== "")
                  .map((txt) => (
                    <p>{txt}</p>
                  ))}
              </Paragraph>
            </Card>
          </Col>
          <Col lg={12} xs={24} sm={24} className="p-5">
            <div>
              <Row gutter={[8, 16]}>
                {/* Image Columns */}
                {[0, 1, 2]?.map((index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
                    {imageLoading && (
                      <Skeleton.Image
                        style={{ width: "100%", height: "200px" }}
                      />
                    )}{" "}
                    <Image
                      src={data?.mls?.photos[index]}
                      width="100%"
                      /*onClick={(e) =>
                        setBackGroundImage(e.target.getAttribute("src"))
                      }*/
                      style={{
                        cursor: "pointer",
                        display: imageLoading ? "none" : "block",
                      }}
                      preview
                      onLoad={handleImageLoad}
                    />
                  </Col>
                ))}

                {/* Modal Trigger */}
                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                  <div
                    style={{ background: "#1C1C1C", height: "109px%" }}
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
                      maskClosable={false}
                      centered
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
                      onCancel={hideModal}
                    >
                      <Row gutter={[8, 16]}>
                        <Image.PreviewGroup
                          preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) =>
                              setPreviewOpen(visible),
                          }}
                        >
                          {data?.mls?.photos?.map((item, index) => (
                            <Col
                              key={index}
                              xs={12}
                              sm={8}
                              md={6}
                              lg={6}
                              xl={6}
                            >
                              {imageLoading && (
                                <Skeleton.Image
                                  style={{ width: "100%", height: "200px" }}
                                />
                              )}
                              <Image
                                src={item}
                                width="100%"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent image click from also triggering
                                  setPreviewOpen(true); // Open the preview modal
                                }}
                                preview
                                onLoad={handleImageLoad}
                              />
                            </Col>
                          ))}
                        </Image.PreviewGroup>
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
                  View more listings
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
                className="text-upper"
              >
                Interested in{" "}
                {data?.mls?.address?.streetNumberText +
                  " " +
                  data?.mls?.address?.streetName}
                ?
              </Title>
              <form onSubmit={handleSubmit}>
                <Row gutter={[40, 40]} className="detail-property">
                  <Col lg={12} md={12} sm={24}>
                    <Input
              style={{"width":"50%"}}
                      placeholder="First Name"
                      type="text"
                      name="firstName"
                      value={contact.firstName}
                      onChange={handleChange}
                      required
                    />
                    {errors.firstName && (
                      <div style={{ color: "red" }}>{errors.firstName}</div>
                    )}
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
                    {errors.lastName && (
                      <div style={{ color: "red" }}>{errors.lastName}</div>
                    )}
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
                    {errors.email && (
                      <div style={{ color: "red" }}>{errors.email}</div>
                    )}
                  </Col>
                  <Col lg={12} md={12} sm={24}>
                    <Input
                      placeholder="Phone"
                      type="text"
                      name="phoneNumber"
                      value={contact.phoneNumber}
                      onChange={handleChange}
                    />
                    {errors.phoneNumber && (
                      <div style={{ color: "red" }}>{errors.phoneNumber}</div>
                    )}
                  </Col>
                  <Col lg={24} md={24}>
                    <Input
                      placeholder="Message"
                      type="text"
                      name="message"
                      value={contact.message}
                      style={{ color: "white" }}
                      onChange={handleChange}
                      required
                    />
                    {errors.message && (
                      <div style={{ color: "red" }}>{errors.message}</div>
                    )}
                  </Col>
                  <Col lg={24} md={24}>
                    {/* <Checkbox
                                   name="requestShowing"
                                   checked={contact.requestShowing}
                                   onChange={handleChange}
                                   style={{ color: "white" }}
                                 >
                                   {" "}
                                   Request a showing
                                 </Checkbox> */}
                  </Col>
                  <Col lg={24} md={24}>
  <ReCAPTCHA
    sitekey={RECAPTCHA_SITE_KEY}
    onChange={(token) => setCaptchaToken(token)}
    onExpired={() => setCaptchaToken(null)}
  />
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
            <Col
              xl={10}
              lg={10}
              md={24}
              sm={32}
              xsm={32}
              ref={mapRef}
              style={{ height: "500px", width: "100%" }}
            ></Col>
          </Row>
        </Container>
      </div>
      <Flex
        gap={30}
        style={{ overflow: "hidden" }}
        className="mt-5 mb-5"
        justify="center"
        align="center"
        wrap="wrap"
      >
        <Button
          classNam="button-view1"
          width="300px"
          Click={() => navigate("/mls-listing")}
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
      {/* <div className="boxshadow-section p-5">
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
      </div> */}
      <div style={{ backgroundColor: "#000" }}>
        <Container>
          <Row>
            <Col lg={18} md={24} sm={24} className="p-5">
              <Row align={"middle"}>
                <Col lg={10} md={6} sm={24}>
                  {/* <Image
                    src={data?.property?.agentId?.photo}
                    preview={false}
                    width="80%"
                  /> */}
                </Col>
                <Col lg={14} md={18} sm={24}>
                  <Flex vertical justify={"flex-start"} align={""}>
                    <Title className="text-white">Contact</Title>
                    <Flex justify={"flex-start"} align="center" gap={10}>
                      <FaRegUser size={20} color="white" />
                      <Text className="text-white f-24 f-100">
                        {data?.mls?.agent?.firstName +
                          " " +
                          data?.mls?.agent?.lastName}
                      </Text>
                    </Flex>
                    <Flex justify={"flex-start"} align="center" gap={10}>
                      <CiPhone size={20} color="white" />
                      <Text className="text-white f-24 f-100">
                        {formatPhoneNumber(data?.mls?.agent?.contact?.cell)}
                      </Text>
                    </Flex>
                    <Flex justify={"flex-start"} align="center" gap={10}>
                      <CiMail size={20} color="white" />

                      <Text className="text-white f-24 f-100">
                        {data?.mls?.agent?.contact?.email}
                      </Text>
                    </Flex>
                  </Flex>
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={24} sm={24}>
              {/* <Flex
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
                        data?.property?.agentId?.firstName +
                        " " +
                        data?.property?.agentId?.lastName
                      }/${data?.property?.agentId?._id}`
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
                        data?.property?.agentId?.firstName +
                        " " +
                        data?.property?.agentId?.lastName
                      }/${data?.property?.agentId?._id}`
                    )
                  }
                >
                  View my listing{" "}
                </Button>
              </Flex> */}
            </Col>
          </Row>
        </Container>
      </div>
      <LetTalk />
    </>
  );
}
