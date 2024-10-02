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
const testimonials = [
  {
    name: "Teresa May",
    position: "Founder at ET Company",
    imgSrc: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp",
    rating: 4.5,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
  },
  {
    name: "Maggie McLoan",
    position: "Photographer at Studio LA",
    imgSrc: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(15).webp",
    rating: 5,
    quote:
      "Autem, totam debitis suscipit saepe sapiente magnam officiis quaerat necessitatibus odio assumenda perferendis labore laboriosam.",
  },
  {
    name: "Alexa Horwitz",
    position: "Front-end Developer in NY",
    imgSrc: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(17).webp",
    rating: 4,
    quote:
      "Cras sit amet nibh libero, in gravida nulla metus scelerisque ante sollicitudin commodo cras purus odio, vestibulum in tempus viverra turpis.",
  },
  {
    name: "Teresa May",
    position: "Founder at ET Company",
    imgSrc: "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp",
    rating: 4.5,
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic tenetur.",
  },
];
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
                    View my listing{" "}
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
              {" "}
              {blogData.blogs.map((item, index) => (
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
                      <Image
                        src={item?.cover || item?.agentId?.photo}
                        preview={false}
                        style={{ borderRadius: "5%", marginBottom: "10px" }}
                        width="100%"
                      />
                      <Title className="f-16 pt-4 text-upper">
                        {item?.title}
                      </Title>
                      <button
                        className="button-view1"
                        onClick={() => navigate(`/agent/blog/${item?._id}`)}
                        style={{ marginTop: "10px" }}
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
      <>
        {" "}
        {isLoading ? (
          <Skeleton.Image
            active
            style={{ maxWidth: "400px", maxHeight: "400px" }}
          />
        ) : (
          <Container>
            <div className="pt-98 pb-98">
              <Title className="text-upper f-100 text-center">
                Testimonials
              </Title>

              <Row justify="center">
                <Col xs={24} md={20}>
                  <Carousel autoplay>
                    {Array.isArray(testimonialsData?.testmonials) &&
                    testimonialsData.testmonials.length > 0 ? (
                      testimonialsData.testmonials.map((testimonial, index) => (
                        <div key={index}>
                          <Card
                            style={{
                              width: "100%",
                              maxWidth: 400,
                              background: "#E8E8E8",
                              margin: "0 auto",
                              padding: "20px",
                              borderRadius: "10px",
                              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                              textAlign: "center",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "16px",
                              }}
                            >
                              <img
                                src={Logo}
                                alt={testimonial.name}
                                style={{
                                  borderRadius: "50%",
                                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                                }}
                                width="80"
                                height="80"
                              />
                            </div>
                            <Title
                              level={5}
                              style={{ fontWeight: "bold", fontSize: "16px" }}
                            >
                              {testimonial.Username}
                            </Title>

                            <Rate
                              disabled
                              defaultValue={testimonial.rating}
                              style={{ marginBottom: "8px" }}
                            />
                            <Paragraph
                              style={{ marginBottom: "0", fontSize: "14px" }}
                            >
                              <span
                                style={{
                                  fontSize: "20px",
                                  paddingRight: "8px",
                                }}
                              >
                                “
                              </span>
                              {testimonial.content}
                              <span
                                style={{
                                  fontSize: "20px",
                                  paddingRight: "8px",
                                }}
                              >
                                "
                              </span>
                            </Paragraph>
                          </Card>
                        </div>
                      ))
                    ) : (
                      <div style={{ textAlign: "center", padding: "20px" }}>
                        <p>No testimonials available.</p>
                      </div>
                    )}
                  </Carousel>
                </Col>
              </Row>
            </div>
          </Container>
        )}
      </>
      <LetTalk />
    </>
  );
}

export default AgentProfile;
