import React from "react";
import { Button, Drawer, Space, Flex, Row, Col, Typography } from "antd";
import Close from "../assets/closeicon.svg";
import LogoMenu from "../assets/logomenu.svg";
import BG from "../assets/bg.svg";

const { Title, Text } = Typography;
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
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={BG} width="70%" />
        <div
          style={{
            position: "absolute",
            top: "120px",
            left: "120px",
            width: "100%",
          }}
        >
          <Row>
            <Col span={8}>
              <Title className="text-white text-upper" style={{ fontSize: 24 }}>
                our offerings
              </Title>
              <Flex vertical gap="10px">
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
              </Flex>
            </Col>
            <Col span={8}>
              <Title className="text-white text-upper" style={{ fontSize: 24 }}>
                Search by location
              </Title>
              <Flex vertical gap="10px">
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
              </Flex>
            </Col>
            <Col span={8}>
              <Title className="text-white text-upper" style={{ fontSize: 24 }}>
                Communities
              </Title>
              <Flex vertical gap="10px">
                <Text className="text-white text-upper">Bay Colony</Text>
                <Text className="text-white text-upper">fort Lauderdale</Text>
                <Text className="text-white text-upper">
                  fort Lauderdale Beach
                </Text>
                <Text className="text-white text-upper">
                  fort Lauderdale condos
                </Text>
                <Text className="text-white text-upper">Harbor beach</Text>
                <Text className="text-white text-upper">Hillsboro mile</Text>
                <Text className="text-white text-upper">Hillsboro shores</Text>
                <Text className="text-white text-upper">las olla's isles</Text>
                <Text className="text-white text-upper">rio vista</Text>
              </Flex>
            </Col>
          </Row>
        </div>
        <div
          style={{
            position: "absolute",
            top: "420px",
            left: "120px",
            width: "100%",
          }}
        >
          <Row>
            <Col span={8}>
              <Title className="text-white text-upper" style={{ fontSize: 24 }}>
                about
              </Title>
              <Flex vertical gap="10px">
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
              </Flex>
            </Col>
            <Col span={8}>
              <Title className="text-white text-upper" style={{ fontSize: 24 }}>
                For Boat Owners
              </Title>
              <Flex vertical gap="10px">
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
                <Text className="text-white text-upper">Other Properites</Text>
              </Flex>
            </Col>{" "}
            <Col span={8}></Col>
          </Row>
        </div>
      </div>
    </Drawer>
  );
}

export default Drawers;
