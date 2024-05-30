import React from "react";
import BackgroundImage from "../../components/BackgroundImage";
import { Typography, Row, Col, Slider } from "antd";
import MLS from "../../assets/MLS.png";
import { Container } from "react-bootstrap";

const { Title, Text } = Typography;

function Mls() {
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
          <Row gutter={[8, 16]}>
            <Col lg={12}>
              <Text className="text-white f-bold f-24">Price</Text>
              <Slider
                className="custom-slider"
                defaultValue={30}
                trackStyle={{ backgroundColor: "black" }}
                handleStyle={{
                  borderColor: "#838383",
                  backgroundColor: "#838383",
                }}
              />
            </Col>
            <Col lg={12}>
              <Text className="text-white f-bold f-24">Price</Text>
              <Slider
                className="custom-slider"
                defaultValue={30}
                trackStyle={{ backgroundColor: "black" }}
                handleStyle={{
                  borderColor: "#838383",
                  backgroundColor: "#838383",
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Mls;
