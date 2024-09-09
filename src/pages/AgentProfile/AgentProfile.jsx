import React from "react";
import BackgroundImage from "../../components/BackgroundImage";
import Agent from "../../assets/Agent_profile.jpg";
import { Typography, Row, Col, Image, Flex, Spin, Skeleton, Card } from "antd";
import { MdOutlinePhone, MdOutlineMailOutline } from "react-icons/md";
import Button from "../../components/Buttons";
import { Container } from "react-bootstrap";
import LetTalk from "../../components/LetTalk";
import { useParams, useNavigate } from "react-router-dom";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import Logo from "../../assets/logoicon1.png";

import useAgent from "../../hooks/useAgent";
import useBlogs from "../../hooks/useBlogs";
import useReport from "./../../hooks/useReport";

const { Title, Paragraph, Text } = Typography;

function AgentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError } = useAgent(id);
  const { isLoading: isBlogLoading, data: blogData } = useBlogs(10, 1, id);
  const { isLoading: isReportLoading, reports } = useReport();

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
                            {"+" + data?.phoneNumber}
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

      {blogData?.blogs.length !== 0 && (
        <Container>
          <div className="pt-98 pb-98">
            <Title className="text-upper f-100 text-center">My blog</Title>
            <div>
              <Row gutter={[16, 24]}>
                {blogData?.blogs?.length === 0 && reports?.length === 0 ? (
                  <Col span={24}>
                    <Text>No blogs or reports available.</Text>
                  </Col>
                ) : (
                  <>
                    {blogData?.blogs?.map((item, index) => (
                      <Col
                        xl={8}
                        lg={12}
                        md={12}
                        sm={24}
                        xsm={24}
                        key={index}
                        style={{ gap: "10px" }}
                      >
                        <Card style={{ width: 400, background: "#E8E8E8" }}>
                          <Flex
                            justify={"center"}
                            align="center"
                            vertical
                            lg={8}
                            md={8}
                            sm={24}
                            xsm={24}
                          >
                            <Image
                              src={item?.agentId?.photo}
                              preview={false}
                              style={{ borderRadius: "300px" }}
                              width="40%"
                            />
                            <Title className="f-16 pt-4 text-upper">
                              {item?.title}
                            </Title>
                            <button
                              className="button-view1"
                              onClick={() =>
                                navigate(`/agent/blog/${item?._id}`)
                              }
                            >
                              Read More{" "}
                            </button>
                          </Flex>
                        </Card>
                      </Col>
                    ))}
                    <br />
                    {reports?.map((reportItem, index) => (
                      <Col
                        xl={8}
                        lg={12}
                        md={12}
                        sm={24}
                        xsm={24}
                        key={index}
                        style={{ gap: "10px" }}
                      >
                        <Card style={{ width: 400, background: "#E8E8E8" }}>
                          <Flex justify={"center"} align="center" vertical>
                            <img src={Logo} width={"30%"} />
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
                            <Button
                              classNam="button-view1"
                              Click={() =>
                                navigate(`/reports/${reportItem._id}`)
                              }
                            >
                              Read more
                            </Button>
                          </Flex>
                        </Card>
                      </Col>
                    ))}
                  </>
                )}
              </Row>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

export default AgentProfile;
