import React, { useState } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import { Typography, Row, Col, Slider, Flex } from "antd";
import MLS from "../../assets/MLS.png";
import { Container } from "react-bootstrap";
import Icons from "../../components/Icons";
const { Title, Text } = Typography;

function Mls() {
  const [price, setPrice] = useState(0);

  const handlePrice = (price) => {
    console.log(price);
    setPrice(price);
  };
  return (
    <div>
      <BackgroundImage Image={MLS}>
        <Title
          style={{ lineHeight: "14px", letterSpacing: "2px" }}
          className="text-upper f-50 f-100 text-white"
        >
          MLS
        </Title>
      </BackgroundImage>
      <div className="mls-body">
        <Container className="py-5">
          <Title className="text-center text-white f-40 f-100 text-upper">
            search active LISTING
          </Title>
          <Row gutter={[60, 60]}>
            <Col lg={12}>
              <Text className="text-white f-bold f-14">Price</Text>
              <Slider
                className="custom-slider"
                defaultValue={price}
                trackStyle={{ backgroundColor: "black" }}
                handleStyle={{
                  borderColor: "#838383",
                  backgroundColor: "#838383",
                }}
                tooltip={{ open: false }}
                max={20}
                value={price}
                onChange={handlePrice}
              />
              <Flex justify={"space-between"}>
                <Text className="text-white f-bold f-14">{price} M</Text>
                <Text className="text-white f-bold f-14">20 M</Text>
              </Flex>
            </Col>
            <Col lg={12}>
              <Text className="text-white f-bold f-14">LIVING AREA</Text>
              <Slider
                className="custom-slider"
                defaultValue={30}
                trackStyle={{ backgroundColor: "black" }}
                handleStyle={{
                  borderColor: "#838383",
                  backgroundColor: "#838383",
                }}
                tooltip={{ open: false }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <Icons />
    </div>
  );
}

export default Mls;
