import React from "react";
import { Typography, Row, Col, Flex } from "antd";
import BackgroundImage from "../../components/BackgroundImage";
import FeaturedPropertiesImage from "../../assets/Agent.png";
import { Container } from "react-bootstrap";
import Property from "../../assets/property.png";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
const { Title, Text } = Typography;
function Properties() {
  return (
    <>
      {" "}
      <BackgroundImage Image={FeaturedPropertiesImage}>
        <Title className="text-white text-upper f-50">
          FEATUREd properties
        </Title>
      </BackgroundImage>
      <Container className="py-5">
        <Row gutter={[20, 40]}>
          <Col lg={12}>
            <div
              className="displayy-teamimg-center"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/features")}
            >
              <img src={Property} width="100%" className="" />
              <div className="more-info-property">
                <Flex
                  vertical
                  align={"center"}
                  justify="center"
                  style={{ height: "100%" }}
                  gap={40}
                >
                  <div className="for-sale-properites">
                    <Text className="text-center text-upper f-24 f-bold">
                      FOR SALE
                    </Text>
                  </div>
                  <Flex vertical>
                    <Text className="text-center text-upper f-24 f-bold text-white">
                      address
                    </Text>
                    <Text className="text-center text-upper f-24 f-100 text-gray">
                      2572 mercedes drive
                    </Text>
                  </Flex>
                  <Flex vertical>
                    <Text className="text-center text-upper f-24 f-bold text-white">
                      last list price
                    </Text>
                    <Text className="text-center text-upper f-24 f-100 text-gray">
                      $ 15,995,000
                    </Text>
                  </Flex>
                  <Flex vertical>
                    <Text className="text-center text-upper f-24 f-bold text-white">
                      represented
                    </Text>
                    <Text className="text-center text-upper f-24 f-100 text-gray">
                      seller
                    </Text>
                  </Flex>
                </Flex>
              </div>
              <div className="p-absoulte right-0 top-0 for-sale-more">
                <div
                  style={{
                    height: "45px",
                    width: "150px",
                    background: "black",
                  }}
                >
                  <Flex
                    justify={"center"}
                    align="center"
                    style={{ height: "inherit" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textTransform: "uppercase",
                        lineHeight: "23.8px",
                        letterSpacing: "1px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      For Sale
                    </Text>
                  </Flex>
                </div>
              </div>
              <div className="info">
                <Flex justify={"end"} align={"center"}>
                  <Flex>
                    <IoLocationOutline color="white" size={20} />
                    <Text className="f-14 f-bold text-white">
                      2572 Mercedes Drive <br />
                      <IoPricetagOutline size={20} /> $15,000,0000
                    </Text>
                  </Flex>
                </Flex>
              </div>
            </div>
          </Col>
          <Col lg={12}>
            <div
              className="displayy-teamimg-center"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/features")}
            >
              <img src={Property} width="100%" className="" />
              <div className="more-info-property">
                <Flex
                  vertical
                  align={"center"}
                  justify="center"
                  style={{ height: "100%" }}
                  gap={40}
                >
                  <div className="for-sale-properites">
                    <Text className="text-center text-upper f-24 f-bold">
                      FOR SALE
                    </Text>
                  </div>
                  <Flex vertical>
                    <Text className="text-center text-upper f-24 f-bold text-white">
                      address
                    </Text>
                    <Text className="text-center text-upper f-24 f-100 text-gray">
                      2572 mercedes drive
                    </Text>
                  </Flex>
                  <Flex vertical>
                    <Text className="text-center text-upper f-24 f-bold text-white">
                      last list price
                    </Text>
                    <Text className="text-center text-upper f-24 f-100 text-gray">
                      $ 15,995,000
                    </Text>
                  </Flex>
                  <Flex vertical>
                    <Text className="text-center text-upper f-24 f-bold text-white">
                      represented
                    </Text>
                    <Text className="text-center text-upper f-24 f-100 text-gray">
                      seller
                    </Text>
                  </Flex>
                </Flex>
              </div>
              <div className="p-absoulte right-0 top-0 for-sale-more">
                <div
                  style={{
                    height: "45px",
                    width: "150px",
                    background: "black",
                  }}
                >
                  <Flex
                    justify={"center"}
                    align="center"
                    style={{ height: "inherit" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textTransform: "uppercase",
                        lineHeight: "23.8px",
                        letterSpacing: "1px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      For Sale
                    </Text>
                  </Flex>
                </div>
              </div>
              <div className="info">
                <Flex justify={"end"} align={"center"}>
                  <Flex>
                    <IoLocationOutline color="white" size={20} />
                    <Text className="f-14 f-bold text-white">
                      2572 Mercedes Drive <br />
                      <IoPricetagOutline size={20} /> $15,000,0000
                    </Text>
                  </Flex>
                </Flex>
              </div>
            </div>
          </Col>
          <Col lg={12}>
            <div
              className="displayy-teamimg-center"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/features")}
            >
              <img src={Property} width="100%" className="" />
              <div className="more-info-property">
                <Flex
                  vertical
                  align={"center"}
                  justify="center"
                  style={{ height: "100%" }}
                  gap={40}
                >
                  <div className="for-sale-properites">
                    <Text className="text-center text-upper f-24 f-bold">
                      FOR SALE
                    </Text>
                  </div>
                  <Flex vertical>
                    <Text className="text-center text-upper f-24 f-bold text-white">
                      address
                    </Text>
                    <Text className="text-center text-upper f-24 f-100 text-gray">
                      2572 mercedes drive
                    </Text>
                  </Flex>
                  <Flex vertical>
                    <Text className="text-center text-upper f-24 f-bold text-white">
                      last list price
                    </Text>
                    <Text className="text-center text-upper f-24 f-100 text-gray">
                      $ 15,995,000
                    </Text>
                  </Flex>
                  <Flex vertical>
                    <Text className="text-center text-upper f-24 f-bold text-white">
                      represented
                    </Text>
                    <Text className="text-center text-upper f-24 f-100 text-gray">
                      seller
                    </Text>
                  </Flex>
                </Flex>
              </div>
              <div className="p-absoulte right-0 top-0 for-sale-more">
                <div
                  style={{
                    height: "45px",
                    width: "150px",
                    background: "black",
                  }}
                >
                  <Flex
                    justify={"center"}
                    align="center"
                    style={{ height: "inherit" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textTransform: "uppercase",
                        lineHeight: "23.8px",
                        letterSpacing: "1px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      For Sale
                    </Text>
                  </Flex>
                </div>
              </div>
              <div className="info">
                <Flex justify={"end"} align={"center"}>
                  <Flex>
                    <IoLocationOutline color="white" size={20} />
                    <Text className="f-14 f-bold text-white">
                      2572 Mercedes Drive <br />
                      <IoPricetagOutline size={20} /> $15,000,0000
                    </Text>
                  </Flex>
                </Flex>
              </div>
            </div>
          </Col>
          <Col lg={12}>
            <div
              className="displayy-teamimg-center"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/features")}
            >
              <img src={Property} width="100%" className="" />
              <div className="more-info-property">
                <Flex
                  vertical
                  align={"center"}
                  justify="center"
                  style={{ height: "100%" }}
                  gap={40}
                >
                  <div className="for-sale-properites">
                    <Text className="text-center text-upper f-24 f-bold">
                      FOR SALE
                    </Text>
                  </div>
                  <Flex vertical>
                    <Text className="text-center text-upper f-24 f-bold text-white">
                      address
                    </Text>
                    <Text className="text-center text-upper f-24 f-100 text-gray">
                      2572 mercedes drive
                    </Text>
                  </Flex>
                  <Flex vertical>
                    <Text className="text-center text-upper f-24 f-bold text-white">
                      last list price
                    </Text>
                    <Text className="text-center text-upper f-24 f-100 text-gray">
                      $ 15,995,000
                    </Text>
                  </Flex>
                  <Flex vertical>
                    <Text className="text-center text-upper f-24 f-bold text-white">
                      represented
                    </Text>
                    <Text className="text-center text-upper f-24 f-100 text-gray">
                      seller
                    </Text>
                  </Flex>
                </Flex>
              </div>
              <div className="p-absoulte right-0 top-0 for-sale-more">
                <div
                  style={{
                    height: "45px",
                    width: "150px",
                    background: "black",
                  }}
                >
                  <Flex
                    justify={"center"}
                    align="center"
                    style={{ height: "inherit" }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textTransform: "uppercase",
                        lineHeight: "23.8px",
                        letterSpacing: "1px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      For Sale
                    </Text>
                  </Flex>
                </div>
              </div>
              <div className="info">
                <Flex justify={"end"} align={"center"}>
                  <Flex>
                    <IoLocationOutline color="white" size={20} />
                    <Text className="f-14 f-bold text-white">
                      2572 Mercedes Drive <br />
                      <IoPricetagOutline size={20} /> $15,000,0000
                    </Text>
                  </Flex>
                </Flex>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Properties;
