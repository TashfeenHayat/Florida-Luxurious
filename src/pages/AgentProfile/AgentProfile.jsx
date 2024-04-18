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
              src={Team}
              style={{ marginTop: "-50px" }}
              width="100%"
            />
          </Col>
          <Col lg={16} className="py-5">
            <Flex justify={"flex-start"} align="center" className="w-75">
              <Paragraph className="">
                <span className="about-agent">About</span>
                <i className="title-line-agent"></i>
                <br />
                <span className="agent-first-name">Erika</span>
                <br />
                <span className="agent-last-name">Axani</span>
                <br />
                <span className="agent-estate">Estate Agent</span>
              </Paragraph>
            </Flex>
            <Paragraph className="agent-description">
              Erika focuses upon the unique and appealing South Florida
              lifestyle and her area of expertise is Fort Lauderdale, known as
              the “Venice of America”. She has a constantly changing listing
              inventory which varies from luxury oceanfront townhomes, high-rise
              condominiums, waterfront estate homes and new development. As an
              analyst with considerable experience in both residential and
              commercial real estate, she has developed a marketing strategy
              that has proven successful in identifying the best opportunities
              for her clients. Erika is passionate about giving back to her
              community and is deeply involved with a multitude of local
              charitable organizations in Broward County.
            </Paragraph>
          </Col>
        </Row>
      </Container>
      <LetTalk />
    </>
  );
}

export default AgentProfile;
