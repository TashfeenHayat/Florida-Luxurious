import React from "react";
import BackgroundImage from "../../components/BackgroundImage";
import Agent from "../../assets/Agent_profile.jpg";
import {
  Carousel,
  Typography,
  Row,
  Col,
  Image,
  Flex,
  Spin,
  Skeleton,
  Card,
  Rate,
} from "antd";
import { MdOutlinePhone, MdOutlineMailOutline } from "react-icons/md";
import Button from "../../components/Buttons";
import { Container } from "react-bootstrap";
import LetTalk from "../../components/LetTalk";
import { useParams, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Logo from "../../assets/logoicon1.png";
import BackArrow from "../../assets/backArrow.svg";
import NextArrow from "../../assets/nextArrow.svg";
import useAgent from "../../hooks/useAgent";
import useBlogs from "../../hooks/useBlogs";
import useReport from "./../../hooks/useReport";
import useTestimonials from "../../hooks/useTestimonials";

import Slider from "react-slick";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Virtual } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;

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
  slidesToShow: 3,
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
function AgentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError } = useAgent(id);
  const { isLoading: isBlogLoading, data: blogData } = useBlogs(10, 1, id);
  console.log(blogData);
  const { isLoading: isReportLoading, reports } = useReport();
  const { isLoading: isTestimonialsLoading, data: testimonialsData } =
    useTestimonials(10, 1, id);
  console.log("data", testimonialsData);
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
      return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
    }

    // Return the number as-is if it doesn't match expected patterns
    return phoneNumber;
  };

  return (
    <>
      <BackgroundImage
        Image={Agent}
        style={{ backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <Title
          className="text-white text-upper f-50 f-100"
          style={{ textAlign: "center" }}
        >
          Agent Profile
        </Title>
      </BackgroundImage>

      <Container>
        <Row gutter={[80, 20]}>
          <Col lg={8}>
            {isLoading ? (
              <Skeleton.Image
                active
                style={{ maxWidth: "400px", maxHeight: "400px" }}
              />
            ) : (
              <Image
                preview={false}
                src={data?.photo}
                style={{ marginTop: "-50px" }}
                width="100%"
                fallback="https://placehold.co/300x388"
              />
            )}
          </Col>
          <Col lg={16} className="py-5">
            {isLoading ? (
              <Skeleton
                active
                round
                paragraph={{ rows: 10 }}
                title
                loading={isLoading}
              />
            ) : (
              <>
                <Flex justify={"flex-start"} align="center" className="w-75">
                  <Paragraph>
                    <span className="about-agent">About</span>
                    <i className="title-line-agent"></i>
                    <br />
                    <span className="agent-first-name">
                      {data?.firstName}
                    </span>{" "}
                    &nbsp;
                    <span className="agent-last-name">{data?.lastName}</span>
                    <br />
                    <span className="agent-estate">Estate Agent</span>
                  </Paragraph>
                </Flex>
                <Paragraph className="agent-description">
                  {data?.description}
                </Paragraph>
              </>
            )}
          </Col>
        </Row>
      </Container>

      <div className="agent-info-bg">
        <div
          className="agent-info-bg-shadow"
          style={{
            overflow: "hidden",
            backgroundBlendMode: "normal",
            filter: "none",
          }}
        >
          <Row gutter={[8, 16]} align="middle" style={{ height: "100%" }}>
            <Col lg={12} xl={8} md={12} sm={24} xsm={24}></Col>
            <Col
              align={"center"}
              style={{ backgroundBlendMode: "normal", filter: "none" }}
            >
              <Flex
                justify={"center"}
                align="center"
                style={{ height: "100%" }}
                wrap="wrap"
              >
                {isLoading ? (
                  <Skeleton
                    active
                    round
                    paragraph={{ rows: 4 }}
                    title
                    loading={isLoading}
                  />
                ) : (
                  <Flex vertical gap={10} wrap="nowrap">
                    <div>
                      <Title className="text-white text-upper">
                        Contact {data?.firstName}
                      </Title>
                    </div>

                    <Flex gap={20} lg={12} xl={8} md={12} sm={24} xsm={24}>
                      <Flex
                        vertical
                        justify={"center"}
                        align={"center"}
                        style={{ marginLeft: "-50px" }}
                        gap={10}
                      >
                        <a
                          className="bg-social-media"
                          style={{ cursor: "pointer" }}
                          href={data?.social?.facebook}
                          target="_blank"
                        >
                          <FaFacebookF color="black" size={24} />
                        </a>
                        <a
                          className="bg-social-media"
                          style={{ cursor: "pointer" }}
                          href={data?.social?.linkedin}
                          target="_blank"
                        >
                          <FaLinkedinIn color="black" size={24} />
                        </a>
                        <a
                          className="bg-social-media"
                          style={{ cursor: "pointer" }}
                          href={data?.social?.insta}
                          target="_blank"
                        >
                          <FaInstagram color="black" size={24} />
                        </a>
                      </Flex>
                      <Flex
                        vertical
                        justify="center"
                        gap={10}
                        className="contact"
                      >
                        <Flex align={"center"} gap={10}>
                          <MdOutlinePhone color="#838383" size={25} />{" "}
                          <span className="text-white f-32">
                            {formatPhoneNumber(data?.phoneNumber)}
                          </span>
                        </Flex>
                        <Flex align={"center"} gap={10}>
                          <MdOutlineMailOutline color="#838383" size={25} />{" "}
                          <span className="text-white f-32 text-lower">
                            {data?.email}
                          </span>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </Col>
            <Col lg={12} xl={8} md={12} sm={24} xsm={24}>
              {isLoading ? (
                <Skeleton
                  active
                  round
                  paragraph={{ rows: 2 }}
                  loading={isLoading}
                />
              ) : (
                <Flex
                  vertical
                  justify={"center"}
                  align="center"
                  style={{ height: "100%" }}
                  gap={10}
                  xl={8}
                  lg={12}
                  md={12}
                  sm={24}
                  xsm={24}
                >
                  <Button
                    classNam="button-secondary-line-left"
                    width="300px"
                    Click={() =>
                      navigate(
                        `/my-sold/${data?.firstName + " " + data?.lastName}/${
                          data?._id
                        }`
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
                          data?.firstName + " " + data?.lastName
                        }/${data?._id}`
                      )
                    }
                  >
                    View my listings{" "}
                  </Button>
                </Flex>
              )}
            </Col>
          </Row>
        </div>
      </div>

      {blogData?.blogs.length > 0 ? (
        <Container>
          <div className="pt-98 pb-98">
            <Title className="text-upper f-100 text-center">My Blog</Title>
            <Slider {...settings}>
              {blogData.blogs.map((item, index) => (
                <div key={index} style={{ padding: "0 10px" }}>
                  <Card
                    style={{
                      width: "90%", // Responsive width
                      maxWidth: "400px", // Max width for larger screens
                      background: "#E8E8E8",
                      margin: "0 auto",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Flex justify="center" align="center" vertical>
                      <Image
                        src={item?.cover || item?.agentId?.photo}
                        preview={false}
                        style={{
                          borderRadius: "5%",
                          marginBottom: "10px",
                          width: "100%", // Ensure the image is responsive
                          height: "auto", // Maintain aspect ratio
                        }}
                      />
                      <Title className="f-16 pt-4 text-upper">
                        {item?.title}
                      </Title>
                      <button
                        className="button-view1"
                        onClick={() => navigate(`/agent/blog/${item?._id}`)}
                        // style={{
                        // //   marginTop: "10px",
                        // //   padding: "10px 15px",
                        // // // Example button color

                        //   border: "none",
                        //   borderRadius: "5px",
                        //   cursor: "pointer",
                        // }}
                      >
                        Read More
                      </button>
                    </Flex>
                  </Card>
                </div>
              ))}
            </Slider>
          </div>
        </Container>
      ) : reports?.length > 0 ? (
        <Container>
          <div className="pt-98 pb-98">
            <Title className="text-upper f-100 text-center">Reports</Title>
            <Slider {...settings}>
              {reports.map((reportItem, index) => (
                <div key={index} style={{ padding: "0 10px" }}>
                  <Card
                    style={{
                      width: "100%",
                      maxWidth: 400,
                      background: "#E8E8E8",
                      margin: "0 auto",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Flex justify="center" align="center" vertical>
                      <img src={Logo} width={"30%"} alt="Report Logo" />
                      <Title
                        style={{ color: "black" }}
                        className="text-upper f-100"
                        level={2}
                      >
                        {reportItem.title || "FLP ANNUAL REPORT 2023"}
                      </Title>
                      <div>
                        <Text
                          style={{ color: "#838383" }}
                          className="text-upper f-24 f-100"
                        >
                          {reportItem.date || "February 20, 2024"}
                        </Text>
                      </div>
                      <button
                        className="button-view1"
                        onClick={() => navigate(`/reports/${reportItem._id}`)}
                        style={{ marginTop: "10px" }}
                      >
                        Read more
                      </button>
                    </Flex>
                  </Card>
                </div>
              ))}
            </Slider>
          </div>
        </Container>
      ) : (
        <Container>
          <div className="pt-98 pb-98">
            <Text className="text-center">No blogs or reports available.</Text>
          </div>
        </Container>
      )}
      <Swiper
        className="swiper-container"
        spaceBetween={12} // Space between the cards
        slidesPerView={4} // Show 3 cards at once
        loop={true} // Enable continuous looping
        speed={3000} // Adjust the speed for smoother transition
        autoplay={
          {
            // Keep autoplay running even when interacting
          }
        }
        style={{marginBottom:26}}
        modules={[Autoplay]}
        breakpoints={{
          1024: {
            slidesPerView: 4, // On large screens, show 3 slides
          },
          768: {
            slidesPerView: 3, // On tablets, show 2 slides
          },
          480: {
            slidesPerView: 1, // On small screens, show 1 slide
          },
        }}
      >
        {Array.isArray(testimonialsData?.testmonials) &&
        testimonialsData.testmonials.length > 0 ? (
          testimonialsData.testmonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Card
                  hoverable
                  style={{
                    width: "100%",
                    maxWidth: "350px",
                    margin: "auto",
                    borderRadius: "16px",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                    paddingTop: "80px",
                    background: "#fff",
                  }}
                >
                  {/* Image Section */}
                  <div
                    style={{
                      position: "absolute",
                      top: "50px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderRadius: "50%",
                      overflow: "hidden",
                      width: "90px",
                      height: "90px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src={Logo}
                      alt={testimonial.Username}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* User Name and Testimonial Text */}
                  <Title
                    level={5}
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      textAlign: "center",
                      marginTop: "50px",
                    }}
                  >
                    {testimonial.Username}
                  </Title>

                  <Paragraph
                    style={{
                      fontSize: "14px",
                      fontStyle: "italic",
                      marginBottom: "20px",
                      textAlign: "center",
                      color: "#555",
                    }}
                  >
                    <span style={{ fontSize: "24px", paddingRight: "8px" }}>
                      “
                    </span>
                    {testimonial.content}
                    <span style={{ fontSize: "24px", paddingLeft: "8px" }}>
                      ”
                    </span>
                  </Paragraph>
                </Card>
              </motion.div>
            </SwiperSlide>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p>No testimonials available.</p>
          </div>
        )}
      </Swiper>

      <LetTalk />
    </>
  );
}

export default AgentProfile;
