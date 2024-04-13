import React from "react";
import { Flex, Typography, Col, Row, Image, Card } from "antd";
import { Container } from "react-bootstrap";
import OurStory from "../Home/OurStory";
import Team from "../../assets/team.png";
import LetsTalk from "../../components/LetTalk";
import FlipCard from "../../components/Flipcard";
import Logo from "../../assets/logoicon.png";
import { CiMap, CiPhone, CiMail } from "react-icons/ci";
import Buttons from "../../components/Buttons";
import useTeamMembers from "../../hooks/useTeamMembers";
const { Title, Text, Paragraph } = Typography;
function AllTeam() {
  const { isLoading, data } = useTeamMembers();
  return (
    <>
      <div className="team-banner">
        <div className="team-banner-shadow">
          <Flex justify={"center"} align="center">
            <Title className="text-upper text-white f-50">
              Find Your Advisor
            </Title>
          </Flex>
        </div>
      </div>
      <OurStory />
      <div className="boxshadow-section">
        <Container className="py-5">
          <Row gutter={[20, 80]}>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Title className="text-center f-100 text-upper">Our Agents</Title>
            </Col>
            {data.map((item, index) => (
              <Col lg={6} md={12} sm={24} xs={24} key={index}>
                <FlipCard
                  fImg={
                    <Image
                      src={
                        item.photo ? item.photo : "https://placehold.co/300x388"
                      }
                      className=""
                      preview={false}
                      fallback="https://placehold.co/300x388"
                    />
                  }
                  bImg={
                    <Image
                      src={
                        item.photo ? item.photo : "https://placehold.co/300x388"
                      }
                      className="img-op1"
                      preview={false}
                      fallback="https://placehold.co/300x388"
                    />
                  }
                >
                  <div className="p-absoulte p-b-30-left-0 w-100">
                    <Flex justify="center" align="center">
                      <button className="team-view-btn">View More </button>
                    </Flex>
                  </div>
                </FlipCard>
                <Flex justify={"center"} align="center">
                  <Text className="text-center f-24 f-100">
                    {item.firstName}
                    &nbsp;{item.lastName}
                  </Text>
                </Flex>
                <Flex justify={"center"} align="center">
                  <Text className="text-center text-upper f-bold">
                    florida retailer
                  </Text>
                </Flex>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <div className="boxshadow-section">
        <Container className="py-5">
          <Row align={"middle"} gutter={[40, 16]}>
            <Col lg={16} md={24} sm={24}>
              <Card bordered={false} style={{ backgroundColor: "black" }}>
                <Flex vertical>
                  <Flex justify={"center"} align="center" className="py-3">
                    <img src={Logo} width={"20%"} preview={false} />
                  </Flex>
                  <Text className="text-upper text-white text-center f-40 f-200">
                    {" "}
                    Florida
                  </Text>
                  <Text className="text-upper text-white text-center f-50 f-bold">
                    {" "}
                    LUXURIOUS
                  </Text>
                  <Text className="text-upper text-white text-center f-40 f-200">
                    {" "}
                    properties
                  </Text>
                  <Flex className="mt-5" justify={"center"} align="center">
                    <Text className="text-upper text-white text-center f-40 f-200">
                      ANNUAL{" "}
                      <Text className="text-upper text-white text-center f-40 f-bold">
                        LUXURY
                      </Text>{" "}
                      SALES REPORT
                    </Text>
                  </Flex>
                  <Flex className="mt-3">
                    <Text
                      className="text-upper f-24 f-100"
                      style={{ color: "#838383" }}
                    >
                      Broward County's <br />
                      <Text className="text-upper text-white f-24 f-bold">
                        #1 Ranked{" "}
                      </Text>
                      <br />
                      Private Luxurious <br />
                      Brokerage
                    </Text>
                  </Flex>
                  <hr style={{ opacity: 1.25, color: "white" }} />
                  <Flex justify={"space-between"} align="center">
                    <Flex align={"center"} gap={5}>
                      <CiMap color="#838383" size={15} />
                      <Text className="text-white text-upper">
                        2438 East Las Olas Boulevard Fort Lauderdale, FL 33301
                      </Text>
                    </Flex>
                    <Flex align={"center"} gap={5}>
                      <CiMail color="#838383" size={15} />
                      <Text className="text-white text-upper">
                        floridainfo@gmail.com
                      </Text>
                    </Flex>
                    <Flex align={"center"} gap={5}>
                      <CiPhone color="#838383" size={15} />
                      <Text className="text-white text-upper">
                        2954.870.080
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            </Col>
            <Col lg={8} md={24} sm={24}>
              <div>
                <Title
                  style={{ color: "black" }}
                  className="text-upper f-100 "
                  level={2}
                >
                  FLP ANNUAL REPORT 2023
                </Title>
              </div>
              <div>
                <Text
                  style={{ color: "#838383" }}
                  className="text-upper f-24 f-100"
                >
                  February 2024
                </Text>
              </div>
              <Flex justify={"center"} className="mt-3">
                {" "}
                <Buttons classNam="button-view1" width="200px">
                  Read More
                </Buttons>
              </Flex>
            </Col>
          </Row>
        </Container>
      </div>
      <LetsTalk />
    </>
  );
}

export default AllTeam;
