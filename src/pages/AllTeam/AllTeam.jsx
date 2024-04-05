import React from "react";
import { Flex, Typography, Col, Row, Image } from "antd";
import { Container } from "react-bootstrap";
import OurStory from "../Home/OurStory";
import Team from "../../assets/team.png";
import LetsTalk from "../../components/LetTalk";
import FlipCard from "../../components/Flipcard";
const { Title, Text, Paragraph } = Typography;
function AllTeam() {
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
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Col lg={6} md={12} sm={24} xs={24} key={i}>
                <FlipCard
                  fImg={<Image src={Team} className="w-100" preview={false} />}
                  bImg={
                    <Image
                      src={Team}
                      className="w-100 img-op1"
                      preview={false}
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
                    Matt bertanzetti
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
      <LetsTalk />
    </>
  );
}

export default AllTeam;
