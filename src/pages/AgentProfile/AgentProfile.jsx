import React from "react";
import BackgroundImage from "../../components/BackgroundImage";
import Agent from "../../assets/Agent.png";
import { Typography, Row, Col, Image, Flex } from "antd";
import Team from "../../assets/team.png";
import { Container } from "react-bootstrap";
import LetTalk from "../../components/LetTalk";
import { useParams } from "react-router-dom";
import useAgent from "../../hooks/useAgent";
const { Title, Paragraph } = Typography;
function AgentProfile() {
  const { id } = useParams();
  const { isLoading, data } = useAgent(id);
  return (
    <>
      <BackgroundImage Image={Agent}>
        <Title className="text-white text-upper f-50">Agent Profile</Title>
      </BackgroundImage>
      <Container>
        <Row gutter={[80, 20]}>
          <Col lg={8}>
            <Image
              preview={false}
              src={data?.photo}
              style={{ marginTop: "-50px" }}
              width="100%"
              fallback="https://placehold.co/300x388"
            />
          </Col>
          <Col lg={16} className="py-5">
            <Flex justify={"flex-start"} align="center" className="w-75">
              <Paragraph className="">
                <span className="about-agent">About</span>
                <i className="title-line-agent"></i>
                <br />
                <span className="agent-first-name">{data?.firstName}</span>
                <br />
                <span className="agent-last-name">{data?.lastName}</span>
                <br />
                <span className="agent-estate">Estate Agent</span>
              </Paragraph>
            </Flex>
            <Paragraph className="agent-description">
              {data?.description}
            </Paragraph>
          </Col>
        </Row>
      </Container>
      <LetTalk />
    </>
  );
}

export default AgentProfile;
