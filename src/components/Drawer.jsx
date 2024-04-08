import React from "react";
import { Drawer, Flex, Row, Col, Typography, Image } from "antd";
import Close from "../assets/closeicon.svg";
import LogoMenu from "../assets/logomenu.svg";
import BG from "../assets/bg.svg";

const { Title, Text, Paragraph } = Typography;
function Drawers({ setOpenDrawer, openDrawer }) {
  return (
    <Drawer
      placement="right"
      onClose={() => setOpenDrawer(false)}
      open={openDrawer}
      width="1200px"
      style={{ background: "black", cursor: "pointer" }}
    >
      <Flex justify={"space-between"} align={"center"}>
        <img src={LogoMenu} />
        <img src={Close} />
      </Flex>
      <div style={{ position: "relative" }}>
        <div className="d-flex justify-content-center align-items-center">
          <Image src={BG} preview={false} width="60%" />
        </div>
        <div className="drawer-option">
          <Row gutter={[60, 40]}>
            <Col lg={16} md={16} sm={24}>
              <Row gutter={[8, 20]}>
                <Col lg={12} md={12} sm={24}>
                  <Title className="text-white text-upper" level={3}>
                    our offerings
                  </Title>
                  <Flex vertical>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                  </Flex>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Title className="text-white text-upper" level={3}>
                    Search by location
                  </Title>
                  <Flex vertical>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                  </Flex>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Title className="text-white text-upper" level={3}>
                    about
                  </Title>
                  <Flex vertical>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                  </Flex>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Title className="text-white text-upper" level={3}>
                    for boat owners
                  </Title>
                  <Flex vertical>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                    <Text
                      style={{ color: "#D4CFC9" }}
                      className="text-upper f-16"
                    >
                      Other properties
                    </Text>
                  </Flex>
                </Col>
              </Row>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Title className="text-white text-upper" level={3}>
                Communities
              </Title>
              <Flex vertical>
                <Text style={{ color: "#D4CFC9" }} className="text-upper f-16">
                  Other properties
                </Text>
                <Text style={{ color: "#D4CFC9" }} className="text-upper f-16">
                  Other properties
                </Text>
                <Text style={{ color: "#D4CFC9" }} className="text-upper f-16">
                  Other properties
                </Text>
                <Text style={{ color: "#D4CFC9" }} className="text-upper f-16">
                  Other properties
                </Text>
                <Text style={{ color: "#D4CFC9" }} className="text-upper f-16">
                  Other properties
                </Text>
                <Text style={{ color: "#D4CFC9" }} className="text-upper f-16">
                  Other properties
                </Text>
                <Text style={{ color: "#D4CFC9" }} className="text-upper f-16">
                  Other properties
                </Text>
                <Text style={{ color: "#D4CFC9" }} className="text-upper f-16">
                  Other properties
                </Text>
                <Text style={{ color: "#D4CFC9" }} className="text-upper f-16">
                  Other properties
                </Text>
                <Text style={{ color: "#D4CFC9" }} className="text-upper f-16">
                  Other properties
                </Text>
                <Text style={{ color: "#D4CFC9" }} className="text-upper f-16">
                  Other properties
                </Text>
                <Text style={{ color: "#D4CFC9" }} className="text-upper f-16">
                  Other properties
                </Text>
              </Flex>
            </Col>
          </Row>
        </div>
      </div>
    </Drawer>
  );
}

export default Drawers;
