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
      <img src={BackArrow} alt="Previous" width="45px" className="next" />
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
      <img src={NextArrow} alt="Next" width="45px" className="next" />
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
      prevArrow: <CustomPrevArrow />,
      nextArrow: <CustomNextArrow />,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 425,
      prevArrow: <CustomPrevArrow />,
      nextArrow: <CustomNextArrow />,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
function AgentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError } = useAgent(id);
  console.log(data);
  const { isLoading: isBlogLoading, data: blogData } = useBlogs(10, 1, id);

  const { isLoading: isReportLoading, reports } = useReport();
  const { isLoading: isTestimonialsLoading, data: testimonialsData } =
    useTestimonials(10, 1, id);

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
          <Col xl={8} lg={8} md={12} xs={32} sm={32}>
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
                fallback="https://firebasestorage.googleapis.com/v0/b/florida-77f94.appspot.com/o/Untitled%20design%20(1).png?alt=media&token=b14e90ef-b51c-4baf-ae2a-ada87141ed52"
              />
            )}
          </Col>
          <Col lg={16} md={12} xs={32} className="py-5">
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
                <Flex justify={"flex-start"} align="center" className="w-100">
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
                <Paragraph
                  className="agent-description"
                  style={{
                    display: "flex",
                    textAlign: "start",
                    lineHeight: 1.2,
                    whiteSpace: "pre-line",
                  }}
                >
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
          <Row
            gutter={[16, 16]}
            align="middle"
            style={{ height: "100%", margin: "auto" }}
            display="flex"
          >
            <Col xs={0} sm={0} md={6} lg={6} xl={4}></Col>
            <Col
              xs={24}
              sm={24}
              md={20}
              lg={16}
              xl={12}
              style={{ backgroundBlendMode: "normal", filter: "none" }}
            >
              <Flex justify="center" align="center" style={{ height: "100%" }}>
                {isLoading ? (
                  <Skeleton active round paragraph={{ rows: 4 }} title />
                ) : (
                  <Flex
                    vertical
                    gap={16}
                    align="center"
                    style={{ width: "100%" }}
                  >
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <Title className="text-white text-upper agentcontfont">
                        Contact {data?.firstName || "Agent"}
                      </Title>
                    </div>

                    {/* Social + Contact side by side on desktop, stacked on mobile */}
                    <Row
                      gutter={[16, 16]}
                      justify="center"
                      align="top"
                      style={{ width: "100%" }}
                      claskkName="social-media-adents"
                    >
                      {/* Social Icons (Left Column) */}
                      <Col
                        xs={24}
                        md={8}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Flex
                          className="responsive-social-icons"
                          style={{
                            display: "flex",
                            flexDirection: "column", // horizontal on mobile
                            gap: "12px",
                          }}
                        >
                          {data?.social?.facebook && (
                            <a
                              className="bg-social-media"
                              style={{ cursor: "pointer" }}
                              href={data.social.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaFacebookF color="black" size={24} />
                            </a>
                          )}
                          {data?.social?.linkedin && (
                            <a
                              className="bg-social-media"
                              style={{ cursor: "pointer" }}
                              href={data.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaLinkedinIn color="black" size={24} />
                            </a>
                          )}
                          {data?.social?.insta && (
                            <a
                              className="bg-social-media"
                              style={{ cursor: "pointer" }}
                              href={data.social.insta}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaInstagram color="black" size={24} />
                            </a>
                          )}
                        </Flex>
                      </Col>

                      {/* Contact Info (Right Column) */}
                      <Col xs={24} sm={24} md={16} lg={16}>
                        <Flex vertical gap={12} align="start">
                          <Flex align="center" gap={10}>
                            <MdOutlinePhone color="#838383" size={25} />
                            <span className="text-white f-24 agentfont">
                              {formatPhoneNumber(data?.phoneNumber || "")}
                            </span>
                          </Flex>
                          <Flex align="center" gap={10}>
                            <MdOutlineMailOutline color="#838383" size={25} />
                            <span className="text-white f-24 agentfont">
                              {data?.email || "No Email"}
                            </span>
                          </Flex>
                        </Flex>
                      </Col>
                    </Row>
                  </Flex>
                )}
              </Flex>
            </Col>

            <Col xs={24} sm={24} md={18} lg={24} xl={8}>
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
                      width: "auto", // Responsive width
                      maxWidth: "400px", // Max width for larger screens
                      background: "#d9d9d93b",
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
                      maxWidth: "400px",
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
      <div style={{ position: "relative" }}>
        {/* Left Shadow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "50px",
            background:
              "linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0))",
            zIndex: 1,
          }}
        ></div>

        {/* Right Shadow */}
        <div
          style={{
            position: "absolute",
            // top: 0,
            // right: 0,
            // height: "100%",
            width: "50px",
            background:
              "linear-gradient(to left, rgba(0,0,0,0.2), rgba(0,0,0,0))",
            zIndex: 1,
          }}
        ></div>

        {/* Swiper Component */}
        <Swiper
          className="swiper-container"
          spaceBetween={12}
          slidesPerView={4}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          style={{ marginBottom: 26 }}
          modules={[Autoplay]}
          breakpoints={{
            1024: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 3,
            },
            480: {
              slidesPerView: 1,
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
                      maxWidth: "450px",
                      margin: "auto",
                      borderRadius: "36px",
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
      </div>

      <LetTalk />
    </>
  );
}

export default AgentProfile;
