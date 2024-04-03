import React, { useState } from "react";
import { Image, Row, Col, Card, Typography, Flex, Input, Checkbox } from "antd";
import { Container } from "react-bootstrap";
import FeatureImg from "../../assets/feature.png";
import Featurecol from "../../assets/feature1.png";
import Demomap from "../../assets/demomap.png";
import Flip from "../../components/Flip";
import Button from "../../components/Buttons";
import Team from "../../assets/team.png";

const { Title, Paragraph, Text } = Typography;
export default function DetailProperty() {
  const [details, setDetails] = useState(false);
  return (
    <>
      <div style={{ position: "relative" }}>
        <Image preview={false} src={FeatureImg} width="100%" />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>
        <div
          className="properties-single-slideshow-info"
          style={{ right: details ? "0px" : "-345px" }}
        >
          <span
            class="show-hide-btn show"
            style={{ width: "327px", left: "-141px", color: "black" }}
            onClick={() => setDetails(!details)}
          >
            {details ? "Hide Details" : "Details"}
          </span>

          <div class="properties-single-slideshow-info-address">
            24844 Malibu Rd.
            <span>Malibu, CA 90265</span>
          </div>

          <div class="properties-single-slideshow-info-price notranslate">
            $53,000,000
          </div>

          <ul class="properties-single-slideshow-info-extras">
            <li>
              4 <span class="icon-beds"></span> <em>Beds</em>{" "}
            </li>
            <li>
              5 <span class="icon-baths"></span> <em>Baths</em>{" "}
            </li>
            <li>
              4,021 <span class="icon-sqft"></span> <em>SQ. FT.</em>
            </li>{" "}
            <li>
              5,674 <span class="icon-lots"></span> <em>Lot Size</em>
            </li>
          </ul>
        </div>
      </div>
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
            <Col lg={14} className="p-5">
              <Title
                level={2}
                style={{
                  lineHeight: 2,
                  color: "white",
                  letterSpacing: "1.5px",
                }}
                className="text-upper"
              >
                Interested in 2549 Mercedes Drive?
              </Title>
              <form>
                {" "}
                <Row gutter={[8, 40]} className="detail-property">
                  <Col lg={12}>
                    <Input
                      placeholder="First Name"
                      type="text"
                      className="child1"
                    />
                  </Col>
                  <Col lg={12}>
                    <Input placeholder="Last Name" type="text" />
                  </Col>
                  <Col lg={12}>
                    <Input placeholder="Email" type="email" />
                  </Col>
                  <Col lg={12}>
                    <Input placeholder="Phone" type="text" />
                  </Col>
                  <Col lg={24}>
                    <Flex gap={10}>
                      <Checkbox />
                      <Text style={{ lineHeight: 2, color: "white" }}>
                        Request A showing
                      </Text>
                    </Flex>
                  </Col>
                  <Col lg={24}>
                    <Input placeholder="Message" type="text" />
                  </Col>
                  <Col lg={24} align="middle">
                    <Button classNam="button-secondary-line-left">
                      Submit info
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
            <Col lg={10}>
              <div className="pt-5">
                <Image src={Demomap} preview={false} width="100%" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Flex
        gap={30}
        className="mt-5 mb-5"
        justify="center"
        align="center"
        wrap="wrap"
      >
        <Button classNam="button-view1" width="300px">
          Back to properties
        </Button>
        <Button classNam="button-view-line-right" width="300px">
          Search Mls
        </Button>
      </Flex>
      <div className="boxshadow-section p-5">
        <Container className="p-5">
          <Title className="text-upper" style={{ letterSpacing: "1px" }}>
            Features
          </Title>
          <Row gutter={[8, 40]}>
            <Col lg={24}>
              <Row gutter={[40, 24]}>
                <Col lg={8}>
                  <Title className="" level={2}>
                    Interior Features
                  </Title>
                  <Paragraph className="f-24" style={{ fontWeight: 100 }}>
                    First floor entry, kitchen island, elevator, pantry, volume
                    cellings, walk-in closets, wet bar
                  </Paragraph>
                </Col>
                <Col lg={8}>
                  <Title className="" level={2}>
                    Exterior Features{" "}
                  </Title>
                  <Paragraph className="f-24" style={{ fontWeight: 100 }}>
                    built-in grill, exterior lightening, open balcony, outdoor
                    shower, patio
                  </Paragraph>
                </Col>
                <Col lg={8}>
                  <Title className="" level={2}>
                    Construction{" "}
                  </Title>
                  <Paragraph className="f-24" style={{ fontWeight: 100 }}>
                    CBS Construction, High Impact Windows & Doors
                  </Paragraph>
                </Col>
                <Col lg={8}>
                  <Title className="" level={2}>
                    Appliances
                  </Title>
                  <Paragraph className="f-24" style={{ fontWeight: 100 }}>
                    automatic garage door, dishwasher, disposal, dryer, gas
                    range, microwave, icemaker, microwave refrigerator, separate
                    freezer, washer, partial hme generator
                  </Paragraph>
                </Col>
                <Col lg={8}>
                  <Title className="" level={2}>
                    Water Features
                  </Title>
                  <Paragraph className="f-24" style={{ fontWeight: 100 }}>
                    123’ Waterfront, Private Dock, No Fixed Bridges, Ocean
                    Access
                  </Paragraph>
                </Col>
                <Col lg={8}>
                  <Title className="" level={2}>
                    Heating & Cooling{" "}
                  </Title>
                  <Paragraph className="f-24" style={{ fontWeight: 100 }}>
                    Ceiling Fans, Central Cooling
                  </Paragraph>
                </Col>
                <Col lg={8}>
                  <Title className="" level={2}>
                    Amenities{" "}
                  </Title>
                  <Paragraph className="f-24" style={{ fontWeight: 100 }}>
                    private surf club & marina
                  </Paragraph>
                </Col>
                <Col lg={8} className="bg-gif-block"></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <div style={{ backgroundColor: "#000" }}>
        <Container>
          <Row>
            <Col lg={18} className="p-5">
              <Flex gap={30}>
                <Image src={Team} preview={false} />
                <div>
                  <Title
                    level={2}
                    className="text-white"
                    style={{ textDecoration: "underline" }}
                  >
                    Contact
                  </Title>
                  <Text className="text-white">Greg Jaxtheimer</Text>
                  <Text className="text-white">954-349-6300</Text>
                  <Text className="text-white">Greg@floridaluxurious.com</Text>
                </div>
              </Flex>
            </Col>
            <Col lg={6}>
              <Flex
                vertical
                justify={"center"}
                align="center"
                style={{ height: "100%" }}
                gap={10}
              >
                <Button classNam="button-secondary-line-left" width="300px">
                  Sold Properties{" "}
                </Button>
                <Button classNam="button-secondary-line-left" width="300px">
                  View my listing{" "}
                </Button>
              </Flex>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="let-talk">
        <div className="hero-bg-img-shadow-talk">
          <Flex
            justify={"center"}
            align={"center"}
            style={{ height: "inherit" }}
            vertical
          >
            <Title level={3} className="meet-team-heading">
              LET’S TALK
            </Title>
            <div
              style={{
                marginBottom: "10px",
                marginTop: "20px",
                width: "6%",
                borderBottom: "1px solid white",
              }}
            ></div>
            <Text
              style={{
                color: "white",
                lineHeight: "25.6px",
                letterSpacing: "1px",
                fontSize: "20px",
                textAlign: "center",
                width: "45%",
              }}
            >
              Reach out to us today and let's start turning your real estate
              dreams into reality
            </Text>
            <div>
              <button
                style={{
                  marginTop: "24px",
                  height: "40px",
                }}
                className="let-talk-btn"
              >
                Contact Us
              </button>
            </div>
          </Flex>
        </div>
      </div>
    </>
  );
}
