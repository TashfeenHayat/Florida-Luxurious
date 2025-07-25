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
  Skeleton,
  Alert,
} from "antd";
import { EyeOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Container } from "react-bootstrap";
import Button from "../../components/Buttons";
import { IoBedOutline } from "react-icons/io5";
import { FaWater } from "react-icons/fa6";
import { PiSwimmingPoolThin } from "react-icons/pi";
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
import SkeletonImage from "antd/es/skeleton/Image";

const { Title, Paragraph, Text } = Typography;
import ReCAPTCHA from "react-google-recaptcha";

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
const [captchaToken, setCaptchaToken] = useState(null);
const RECAPTCHA_SITE_KEY = "6Lfo0oIrAAAAAASYr7BEI9Hxeq1Y7aC7AU8iON54";

  const [currentVideo, setCurrentVideo] = useState(null);

  const [imageLoading, setImageLoading] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleImageLoad = () => {
    setImageLoading(false);
  };
  const dispatch = useDispatch();
  const formatPhoneNumber = (phoneNumberObj) => {
    if (!phoneNumberObj) return "";

    const { areaCode, countryCode, isoCode, phoneNumber } = phoneNumberObj;

    // Check if all the parts exist
    if (!areaCode || !phoneNumber || !countryCode) return phoneNumberObj;

    // Format the phone number based on the fields
    const formattedPhone = `+${countryCode} (${areaCode}) ${phoneNumber.slice(
      0,
      3
    )}-${phoneNumber.slice(3)}`;

    return formattedPhone;
  };
  const mapRef = useRef(null);

  const { id } = useParams();

  const { data, isLoading } = useProperty(id);

  const [backgroundImage, setBackGroundImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentImage, setCurrentImage] = useState(null);
  const [firstModalVisible, setFirstModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const showVideoModal = (url) => {
    setVideoModalVisible(true);
    setVideoUrl(url); // Store the video URL in the state
  };

  // const hideVideoModal = () => {
  //   setVideoModalVisible(false);
  //   setVideoUrl(null); // Reset the video URL when the modal is closed
  // };

  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    return;
  }, [backgroundImage]);

  const navigate = useNavigate();

  const showModal = () => {
    setOpenModal(!openModal);
  };

  const hideModal = () => {
    setOpenModal(openModal);
  };

  // const scrollToRequest = () => {
  //   if (requestRef.current) {
  //     requestRef.current.scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }
  // };
  const scrollToRequest = () => {
    const targetElement = document.getElementById("requestSection");
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const offset = 60;

      window.scrollTo({
        top: rect.top + window.scrollY - offset,
        behavior: "smooth",
      });
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
    const phonePattern = /^[0-9]+$/;
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
  if (!validateForm()) return;

  const { firstName, lastName, email, phoneNumber, message } = contact;

  const fullAddress = `${data?.property?.addressLine1 || ""} ${data?.property?.addressLine2 || ""}`.trim();
  const propertyImage = data?.property?.media[0]?.mdUrl || "";
  const propertyLink = `https://www.floridaluxurious.com/features/${data?.property?.slug || data?.property?._id}`;

  // ✅ HTML Template for email
const messageHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #ffffff; color: #333; padding: 20px; border-radius: 10px; border: 1px solid #ddd;">
    
    <!-- Logo Centered -->
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://firebasestorage.googleapis.com/v0/b/florida-lux-e66c2.firebasestorage.app/o/footerlogo.png?alt=media&token=5a4dc8bb-7f7e-4272-953a-4ca28c57e4b6" alt="Florida Luxurious Logo" style="height: 60px;" />
    </div>

    <!-- Property Image -->
    ${propertyImage ? `
      <div style="text-align: center;">
        <img src="${propertyImage}" alt="Property" style="width: 100%; border-radius: 12px; border: 1px solid #ccc;" />
      </div>` : ''
    }

    <!-- Property Info -->
    <div style="padding: 20px 0; border-bottom: 1px solid #ccc;">
      <p style="font-size: 14px; color: #777;">MLS® #: ${data?.property?.mlsId || ''}</p>
      <h2 style="margin: 5px 0;">${data?.property?.addressLine1 || ''} ${data?.property?.addressLine2 || ''}</h2>
      <p style="margin: 0 0 12px;">${data?.property?.city}, ${data?.property?.state} ${data?.property?.zipCode}</p>
      <h3 style="color: #0e3d64; margin: 10px 0;">
        ${getCurrencySymbol(data?.property?.currency)}${formatPrice(data?.property?.salePrice)}
      </h3>

      <table style="width: 100%; font-size: 14px; margin-top: 12px;">
        <tr>
          <td>🛏 ${data?.property?.bedroomCount} Bedrooms</td>
          <td>🛁 ${data?.property?.bathCount} Baths</td>
          <td>📐 ${data?.property?.area} SF Living</td>
        </tr>
        <tr>
          <td>🌊 ${data?.property?.waterfront || '100 ± Waterfront'}</td>
          <td>🏊 ${data?.property?.pool || 'No Pool'}</td>
          <td>🚗 ${data?.property?.parking} Car Garage</td>
        </tr>
      </table>
    </div>

    <!-- Inquiry Info -->
    <div style="margin: 30px 0;">
      <h3>📩 Message From</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Phone:</strong> ${phoneNumber}</p>
      <div style="margin-top: 12px; padding: 15px; background: #f6f6f6; border-left: 4px solid #1a73e8;">
        ${message.replace(/\n/g, '<br/>')}
      </div>
    </div>

    <!-- User Photo & Name -->
    <div style="text-align: center; margin-top: 30px;">
      <img src="https://firebasestorage.googleapis.com/v0/b/florida-lux-e66c2.firebasestorage.app/o/footerlogo.png?alt=media&token=5a4dc8bb-7f7e-4272-953a-4ca28c57e4b6" alt="User" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover;" />
      <p style="margin-top: 10px;"><strong>${firstName} ${lastName}</strong></p>
    </div>

    <!-- View All Info Button -->
    <div style="text-align: center; margin-top: 30px;">
      <a 
        href="${propertyLink}" 
        target="_blank" 
        style="
          background-color: #004c97;
          color: #ffffff;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
          font-size: 16px;
          font-weight: bold;
        ">
        View All Info
      </a>
    </div>

    <p style="text-align: center; font-size: 12px; color: #aaa; margin-top: 40px;">
      Sent from Florida Luxurious Properties Website
    </p>
  </div>
`;






  // ✅ Plain Text (for DB and fallback)
  const messageText = `Interested in ${fullAddress}

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phoneNumber}

Message:
${message}
`;

  // ✅ Final object to send to backend
  const finalContact = {
    ...contact,
    message: messageText,         
    html: messageHtml,          
    propertyId: data?.property?._id,
  };
console.log("Message Text:", messageHtml);
  dispatch(contactUs(finalContact)); 

  setContact({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    message: "",
    requestVisit: false,
  });
   setCaptchaToken(null);

};
  const currencySymbols = {
    usd: "$",
    eur: "€",
    pound: "£",
    // Add more currencies as needed
  };

  const formatPrice = (price) => {
    if (typeof price !== "string") {
      return "N/A"; // Or handle it however you prefer
    }
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
    if (isNaN(numericPrice)) return "N/A";

    return numericPrice.toLocaleString("en-US");
  };

  const getCurrencySymbol = (currencyCode) => {
    if (typeof currencyCode !== "string") {
      return "N/A";
    }

    const symbol = currencySymbols[currencyCode.toLowerCase()];
    return symbol || "N/A";
  };
  // const handleImageClick = (src) => {
  //   setCurrentImage(src); // Set the clicked image as the one to preview
  //   setPreviewOpen(true); // Open the modal
  // };

  const videoRef = useRef(null);
  const handleSecondModalClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset video time to 0
    }
    setSecondModalVisible(false); // Close the second modal
  };
  const handleVideoClick = (video) => {
    const videoUrl = video.mdUrl || video.xlUrl || video.smUrl; // Use available URL (prefer mdUrl > xlUrl > smUrl)

    if (videoUrl) {
      setSelectedVideo(videoUrl); // Set the selected video URL
      setSecondModalVisible(true); // Open the second modal with the video player
    }
  };
  return (
    <div className="single_property">
      <div style={{ position: "relative", overflowX: "hidden" }}>
        {imageLoading && (
          <Skeleton.Image style={{ width: "180vh", height: "500px" }} />
        )}
        <Image
          preview={false}
          src={data?.property?.media[0]?.mdUrl || SkeletonImage}
          width="100%"
          onLoad={handleImageLoad}
          style={{ display: imageLoading ? "none" : "block" }}
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
              {data?.property?.city} , {data?.property?.state}{" "}
              {data?.property?.zipCode}
            </Paragraph>
            <Title
              className="text-upper"
              style={{ color: "white", marginTop: ".2em" }}
              level={2}
            >
              {getCurrencySymbol(data?.property?.currency)}
              {formatPrice(data?.property?.salePrice)}
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
                <Text className="text-white f-12 f-100">
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
                  <LuBath size={15} />
                </div>
                <Text className="text-white f-12">
                  {data?.property?.bathCount} Baths
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

                <Text className="text-white f-12 f-100">
                  {data?.property?.waterfront
                    ? `${data?.property?.waterfront}  Waterfront`
                    : "100 ± Waterfront"}
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
                <Text className="text-white f-12 f-100">
                  {data?.property?.area} SF Living
                  {/* {data?.property?.areaUnit} */}
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
                  {" "}
                  <PiSwimmingPoolThin size={15} />
                </div>
             
                <Text className="text-white f-12 f-100">
                  {data?.property?.pool} {/*Pool */}
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
                
                <Text className="text-white f-12 f-100">
                  {data?.property?.parking} Car Garage
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
              {data?.property?.style} 
    
            </Text>
          </Flex>
          <Flex justify={"center"} align="center" vertical>
            <Text style={{ color: "#D4CFC9" }} className="my-4 f-14 f-100">
              Compensation Offered :{""} &nbsp;
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
            MLS® #: {data?.property?.mlsId}
          </Text>
          <Title className="text-upper" style={{ color: "white" }} level={3}>
            {data?.property?.addressLine1} {data?.property?.addressLine2}
          </Title>
          <Paragraph
            className="text-upper f-20 f-100"
            style={{ lineHeight: "22px", color: "#D4CFC9" }}
          >
            {data?.property?.city} , {data?.property?.state}{" "}
            {data?.property?.zipCode}
          </Paragraph>
          <Title
            className="text-upper"
            style={{ color: "white", marginTop: ".2em" }}
            level={2}
          >
            {getCurrencySymbol(data?.property?.currency)}
            {formatPrice(data?.property?.salePrice)}
          </Title>
        </Flex>

        <Row gutter={[8, 16]} style={{ marginTop: "20px" }}>
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
                <IoBedOutline size={15} />
              </div>
              <Text className="text-white f-16 f-100">
                {data?.property?.bedroomCount} Bedrooms
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
                <FaWater size={15} />
              </div>  
              <Text className="text-white f-12 f-100">
                  
                {data?.property?.waterfront
                  ? `${data?.property?.waterfront} Waterfront`
                  : "100 ± Waterfront"}
              </Text>
            </Flex>
          </Col>

          <Col xs={24} sm={12} md={12} lg={8}>
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
                {data?.property?.area} SF Living
                {/* {data?.property?.areaUnit} */}
              </Text>
            </Flex>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Flex gap={5}>
              <div
                className="circle-bg-white"
                style={{
                  width: "20px",
                  height: "20px",
                  marginBottom: "0px",
                }}
              >
                <TbCarGarage size={15} />
              </div>

              <Text className="text-white f-16 f-100">
                {data?.property?.parking} Car Garage
              </Text>
            </Flex>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Flex gap={5}>
              <div
                className="circle-bg-white"
                style={{
                  width: "20px",
                  height: "20px",
                  marginBottom: "0px",
                }}
              >
                <PiSwimmingPoolThin size={15} />
              </div>
              <Text className="text-white f-16 f-100">
                {data?.property?.pool}
                 {/*Pool */}
              </Text>
            </Flex>
          </Col>
        </Row>

        <Flex justify="center" align="center" vertical>
          <Text style={{ color: "#D4CFC9" }} className="my-4 f-16 f-100">
            {data?.property?.style}
          </Text>
        </Flex>

        <Flex justify="center" align="center" vertical>
          <Text style={{ color: "#D4CFC9" }} className="my-4 f-16 f-100">
            Compensation Offered :{data?.property?.compensation} </Text>
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
                style={{ textAlign: "center", lineHeight: 1, fontSize: "28px" }}
                className="text-upper"
              >
                {data?.property?.addressLine1} {data?.property?.addressLine2}
              </Title>

              <Paragraph className="f-16 f-200" style={{ lineHeight: 1.5 }}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.property?.description?.replace(
                      /\n/g,
                      "<br />"
                    ),
                  }}
                />
                {/* {data?.property?.description} */}
                {/* {data?.property?.description
                  ?.split("\n")
                  .filter((txt) => txt.trim() !== "")
                  .slice(0, 3)
                  .map((txt) => (
                    <p style={{ marginBottom: 3 }}>{txt}</p>
                  ))}
                {data?.property?.description
                  .split("\n")
                  .slice(3)
                  .map((txt) => (
                    <p style={{ marginTop: 8, lineHeight: 1.5 }}>{txt}</p>
                  ))} */}
              </Paragraph>
            </Card>
          </Col>

          <Col lg={12} xs={24} sm={24} className="p-5">
            <div>
              <Row gutter={[8, 16]}>
                <Col lg={12} sm={24} md={24}>
                  {imageLoading && (
                    <Skeleton.Image
                      style={{ width: "100%", height: "100px" }}
                    />
                  )}
                  <Image
                    src={data?.property?.media[0]?.mdUrl}
                    preview
                    onLoad={handleImageLoad}
                    style={{
                      display: imageLoading ? "none" : "block",
                      cursor: "pointer",
                    }}
                    width="100%"
                    fallback={SkeletonImage}
                  />
                </Col>
                <Col lg={12} sm={24} md={24}>
                  {imageLoading && (
                    <Skeleton.Image
                      style={{ width: "100%", height: "100px" }}
                    />
                  )}
                  <Image
                    src={data?.property?.media[1]?.mdUrl}
                    onLoad={handleImageLoad}
                    style={{
                      display: imageLoading ? "none" : "block",
                      cursor: "pointer",
                    }}
                    preview
                    width="100%"
                    fallback={SkeletonImage}
                  />
                </Col>
                <Col lg={12} sm={24} md={24}>
                  {imageLoading && (
                    <Skeleton.Image
                      style={{ width: "100%", height: "100px" }}
                    />
                  )}
                  <Image
                    src={data?.property?.media[2]?.mdUrl}
                    onLoad={handleImageLoad}
                    style={{
                      display: imageLoading ? "none" : "block",
                      cursor: "pointer",
                    }}
                    preview
                    width="100%"
                    fallback={SkeletonImage}
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
                      width={800}
                      closeIcon={
                        <IoMdClose
                          size={20}
                          color="#FFFFFF"
                          style={{ cursor: "pointer" }}
                          onClick={hideModal}
                        />
                      }
                      maskClosable={false}
                      centered
                      styles={{
                        content: {
                          backgroundColor: "black",
                          borderRadius: "0px",
                          height: "500px",
                          overflowY: "auto",
                          padding: "3rem",
                        },
                      }}
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
                          {data?.property?.media?.map((item, index) => (
                            <Col lg={8} md={12} sm={24}>
                              {imageLoading && (
                                <Skeleton.Image
                                  style={{ width: "100%", height: "100px" }}
                                />
                              )}
                              <Image
                                src={item?.mdUrl}
                                onLoad={handleImageLoad}
                                preview={true}
                                style={{
                                  display: imageLoading ? "none" : "block",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent image click from also triggering
                                  setPreviewOpen(true); // Open the preview modal
                                }}
                                width="100%"
                                fallback={SkeletonImage}
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
              <div style={{ marginBottom: 40 }}>
                {/* Button to open the first modal */}
                <div
                  className="button-view1"
                  style={{ width: "300px" }}
                  onClick={() => setFirstModalVisible(true)} // Show the first modal
                >
                  Watch Videos
                </div>

                {/* First Modal to show video previews */}
                <Modal
                  open={firstModalVisible} // Control the visibility of the first modal
                  visible={firstModalVisible}
                  onCancel={() => setFirstModalVisible(false)} // Close the first modal when canceled
                  footer={null}
                  width={800}
                  centered
                  styles={{
                    content: {
                      backgroundColor: "black",
                      borderRadius: "0px",
                      height: "500px",
                      padding: "3rem",
                    },
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    {/* Display the video previews */}
                    {data?.property?.video.map((video, index) => (
                      <div
                        key={index}
                        onClick={() => handleVideoClick(video)}
                        style={{
                          width: "180px",
                          height: "100px",
                          backgroundColor: "transparent",
                          borderRadius: "10px",
                          cursor: "pointer",
                          position: "relative",
                          overflow: "hidden",
                          boxShadow: "0 4px 8px rgba(244, 238, 238, 0.2)",
                          transition: "transform 0.3s ease",
                          border: "3px solid white", // Added solid black border with 30px thickness
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: "30px", // Adjust size for the icon
                            color: "white",
                            textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
                            cursor: "pointer", // Make the icon clickable
                          }}
                        >
                          <PlayCircleOutlined />
                        </div>
                      </div>
                    ))}
                  
                  </div>
                </Modal>

                {/* Second Modal to play selected video */}
                <Modal
                  open={secondModalVisible} // Control the visibility of the second modal
                  visible={secondModalVisible}
                  onCancel={handleSecondModalClose} // Close the second modal when canceled
                  footer={null}
                  width={800}
                  centered
                  styles={{
                    content: {
                      backgroundColor: "transparent",
                      borderRadius: "0px",
                      height: "500px",
                      padding: "3rem",
                    },
                  }}
                >
                  <div>
                    {selectedVideo && (
                      <video ref={videoRef} width="100%" height="auto" controls>
                        <source src={selectedVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </Modal>
              </div>

              {/*<div style={{ marginBottom: 40 }}>
                <Button classNam="button-view1" width="300px">
                  Request details
                </Button>
            </div>*/}
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
      <div>
        <div className="boxshadow-section p-5 mt-5">
          <Container>
            <Title className="text-upper" style={{ letterSpacing: "1px" }}>
              Features
            </Title>
            <Row gutter={[16, 40]}>
              {data?.property?.features.map((property, index) => (
                <Col lg={8} md={12} sm={24} key={index}>
                  <Title className="" level={2}>
                    {property?.name} {/* Corrected item to property */}
                  </Title>
                  <Paragraph className="f-16 f-100">
                    {property?.description} {/* Corrected item to property */}
                  </Paragraph>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
      <div
        style={{ backgroundColor: "#000" }}
        id="requestSection"
        ref={requestRef}
      >
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
              style={{ height: "500px", width: "100%", marginTop: "20px" }}
            ></Col>
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

      <div style={{ backgroundColor: "#000", padding: "20px" }}>
        <Row gutter={16}>
          {data?.property?.Secondary_agentId ? (
            <>
              {/* Primary Agent Column */}
              <Col lg={12} md={24} sm={24} xs={24}>
                <Row gutter={[16, 16]}>
                  <Col lg={16} md={24} sm={24} xs={24} className="p-0">
                    <Flex gap={10} justify="center" align="center">
                      {imageLoading && (
                        <Skeleton.Image
                          style={{ width: "100%", height: "100px" }}
                        />
                      )}
                      <img
                        src={data?.property?.Primary_agentId?.photo}
                        preview={false}
                        onLoad={handleImageLoad}
                        style={{
                          display: imageLoading ? "none" : "block",

                          aspectRatio: 5 / 7,
                          objectFit: "cover",
                        }}
                        width="40%"
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
