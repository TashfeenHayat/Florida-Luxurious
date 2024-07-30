import React from "react";
import BackgroundImage from "../../components/BackgroundImage";
import Agent from "../../assets/Agent.png";
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
const { Title, Paragraph, Text } = Typography;
function AgentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, isError } = useAgent(id);
  const { isLoading: isBlogLoading, data: blogData } = useBlogs(10, 1, id);

  return (
    <>
      <BackgroundImage Image={Agent}>
        <Title className="text-white text-upper f-50 f-100">
          Agent Profile
        </Title>
      </BackgroundImage>

      <>
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
                <>
                  <Skeleton
                    active
                    round
                    paragraph={{ rows: 10 }}
                    title
                    loading={isLoading}
                  />
                </>
              ) : (
                <>
                  <Flex justify={"flex-start"} align="center" className="w-75">
                    <Paragraph className="">
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
                  <Paragraph className="agent-description text-capitalize">
                    {data?.description}
                  </Paragraph>
                </>
              )}
            </Col>
          </Row>
        </Container>
        <div className="agent-info-bg">
          <div className="agent-info-bg-shadow">
            <Row gutter={[8, 16]} align="middle" style={{ height: "100%" }}>
              <Col lg={8}></Col>
              <Col lg={8} align={"center"}>
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

                      <Flex gap={20}>
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
                        <Flex vertical justify="center" gap={10}>
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
              <Col lg={8}>
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
                  {blogData?.blogs?.map((item, index) => (
                    <Col
                      xl={8}
                      lg={12}
                      md={12}
                      sm={24}
                      key={index}
                      style={{ gap: "10px" }}
                    >
                      <Card style={{ width: 400, background: "#E8E8E8" }}>
                        <Flex justify={"center"} align="center" vertical>
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
                            class="button-view"
                            onClick={() => navigate(`/agent/blog/${item?._id}`)}
                          >
                            Read More{" "}
                          </button>
                        </Flex>
                      </Card>
                    </Col>
                  ))}
                  <Col lg={8} md={8} sm={24} key={""}>
                    <Card style={{ width: 400, background: "#E8E8E8" }}>
                      <Flex justify={"center"} align="center" vertical>
                        <Flex vertical>
                          <Flex
                            justify={"center"}
                            align="center"
                            className="py-3"
                          >
                            <img src={Logo} width={"30%"} preview={false} />
                          </Flex>
                          <Text className="text-upper text-black text-center f-16 f-200">
                            {" "}
                            Florida
                          </Text>
                          <Text className="text-upper text-black text-center f-16 f-bold">
                            {" "}
                            LUXURIOUS
                          </Text>
                          <Text className="text-upper text-black text-center f-16 f-200">
                            {" "}
                            properties
                          </Text>
                          <Flex
                            className="mt-1"
                            justify={"center"}
                            align="center"
                          >
                            <Text className="text-upper text-black text-center f-20 f-200">
                              ANNUAL{" "}
                              <Text className="text-upper text-black text-center f-20 f-bold">
                                LUXURY
                              </Text>{" "}
                              SALES REPORT
                            </Text>
                          </Flex>
                        </Flex>
                      </Flex>
                      <Flex justify={"center"}>
                        <button class="button-view">Read More </button>
                      </Flex>
                    </Card>
                  </Col>
                </Row>
              </div>
            </div>
          </Container>
        )}
        <LetTalk />
      </>
    </>
  );
}

export default AgentProfile;
