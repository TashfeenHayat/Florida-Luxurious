import React from "react";
import BackgroundImage from "../../components/BackgroundImage";
import Community from "../../assets/community.png";
import { Typography, Row, Col, Card } from "antd";
import { Container } from "react-bootstrap";
const { Title, Paragraph, Text } = Typography;
function Comunities() {
  return (
    <div>
      <BackgroundImage Image={Community}>
        <Title
          style={{ color: "white", lineHeight: "14px", letterSpacing: "2px" }}
          className="text-upper f-50 f-100"
        >
          Communities
        </Title>
      </BackgroundImage>
      <Row>
        <Col lg={8} md={8} sm={0}></Col>
        <Col lg={8} md={8} sm={24}>
          <Card className="card-feature boxshadow-section">
            <Title
              style={{ textAlign: "center", lineHeight: 2 }}
              className="text-upper"
            >
              BAY COLONY
            </Title>
            <Paragraph className="f-16 f-200 " style={{ lineHeight: 1.8 }}>
              Exclusive gated community in Fort Lauderdale's northeast. Over 100
              luxurious estate homes with panoramic Intracoastal views.
              Development ongoing since the late '60s. Features 24-hour
              security, underground utilities, and diverse architectural styles.
              Close to Galleria shopping, Coral Ridge Country Club, and
              entertainment. Quick access to Fort Lauderdale-Hollywood
              International Airport. Nearby public and private schools. For
              luxury real estate, contact Florida Luxurious Properties at
              954.870.4080 or online.
            </Paragraph>
          </Card>
        </Col>
        <Col lg={8} md={8} sm={0}></Col>
      </Row>
      <div className="boxshadow-section p-5 mt-5">
        <Container className="p-5">
          <Title className="text-upper" style={{ letterSpacing: "1px" }}>
            Features
          </Title>
          <Row gutter={[8, 40]}>
            <Col lg={24} md={24} sm={24}>
              <Row gutter={[40, 24]}>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Interior Features
                  </Title>
                  <Paragraph className="f-16 f-100">  
                    First floor entry, kitchen island, elevator, pantry, volume
                    cellings, walk-in closets, wet bar
                  </Paragraph>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Exterior Features{" "}
                  </Title>
                  <Paragraph className="f-16 f-100">
                    Built-in grill, Exterior Lightening, Open Balcony, Outdoor
                    Shower, Patio
                  </Paragraph>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Construction{" "}
                  </Title>
                  <Paragraph className="f-16 f-100">
                    CBS Construction, High Impact Windows & Doors
                  </Paragraph>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Appliances
                  </Title>
                  <Paragraph
                    className="f-16 f-100"
                    style={{ textTransform: "capitalize" }}
                  >
                    automatic garage door, dishwasher, disposal, dryer, gas
                    range, microwave, icemaker, microwave refrigerator, separate
                    freezer, washer, partial hme generator
                  </Paragraph>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Water Features
                  </Title>
                  <Paragraph className="f-16 f-100">
                    123’ Waterfront, Private Dock, No Fixed Bridges, Ocean
                    Access
                  </Paragraph>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Heating & Cooling{" "}
                  </Title>
                  <Paragraph className="f-16 f-100">
                    Ceiling Fans, Central Cooling
                  </Paragraph>
                </Col>
                <Col lg={8} md={12} sm={24}>
                  <Title className="" level={2}>
                    Amenities{" "}
                  </Title>
                  <Paragraph
                    className="f-16 f-100"
                    style={{ textTransform: "capitalize" }}
                  >
                    private surf club & marina
                  </Paragraph>
                </Col>
                <Col lg={8} md={0} sm={0} className="bg-gif-block"></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Comunities;
