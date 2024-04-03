import React from "react";
import { Image, Row, Col, Card, Typography, Flex } from "antd";
import { Container } from "react-bootstrap";
import FeatureImg from "../../assets/feature.png";
import Featurecol from "../../assets/feature1.png";
import Button from "../../components/Buttons";
const { Title, Paragraph } = Typography;
export default function DetailProperty() {
  return (
    <div>
      <Image preview={false} src={FeatureImg} width="100%" />
      <Container>
        <Row>
          <Col lg={12} xs={24} sm={24} className="p-5">
            <Card className="card-feature">
              <Title
                style={{ textAlign: "center", lineHeight: 2 }}
                className="text-upper"
              >
                2549 Mercedes Drive
              </Title>
              <Paragraph
                className="f-16"
                style={{ fontWeight: 200, lineHeight: 2.8 }}
              >
                Construction has started! New Coastal Modern Harbor Beach
                Deepwater Estate sited on 100 ft of premier waterfrontage.
                Dramatic open and free flowing interiors capture waterway views
                from all major rooms. Resort retreat patio featuring a
                sun-splashed pool with spa. Harbor Beach is Fort Lauderdale
                premier neighborhood with quick access to the Ocean by boat.
                Members also have a Private Marina and ability to join the
                Private beach Club. Home designed by award winning Tuthill
                Architecture.
              </Paragraph>
            </Card>
          </Col>
          <Col lg={12} xs={24} sm={24} className="p-5">
            <div>
              <Row gutter={[8, 16]}>
                <Col lg={12} sm={24} md={24}>
                  <Image preview={false} src={Featurecol} width="100%" />
                </Col>
                <Col lg={12} sm={24} md={24}>
                  <Image preview={false} src={Featurecol} width="100%" />
                </Col>
                <Col lg={12} sm={24} md={24}>
                  <Image preview={false} src={Featurecol} width="100%" />
                </Col>
                <Col lg={12} sm={24} md={24}>
                  <Image preview={false} src={Featurecol} width="100%" />
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
                <Button classNam="button-view1" width="300px">
                  Watch Videos
                </Button>
              </div>
              <div style={{ marginBottom: 40 }}>
                <Button classNam="button-view1" width="300px">
                  Request details
                </Button>
              </div>
              <div style={{ marginBottom: 40 }}>
                <Button classNam="button-view1" width="300px">
                  Schedule a showing
                </Button>
              </div>
              <div style={{ marginBottom: 40 }}>
                <Button classNam="button-view1" width="300px">
                  View more listing
                </Button>
              </div>
            </Flex>
          </Col>
        </Row>
      </Container>
      <div style={{ backgroundColor: "#000" }}>
        <Container>
          <Row>
            <Col lg={12} className="pt-3">
              <Title
                level={2}
                style={{ textAlign: "center", lineHeight: 2, color: "white" }}
                className="text-upper"
              >
                Interested in 2549 Mercedes Drive?
              </Title>
            </Col>
            <Col lg={12}></Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
