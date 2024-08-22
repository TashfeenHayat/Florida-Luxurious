import React, { useEffect, useState } from "react";
import { Col, Row, Typography } from "antd";
import DownArrow from "../../assets/downarrow.svg";
import Bagde from "../../assets/award19.svg";
import Bagde1 from "../../assets/award21.svg";
import Bagde2 from "../../assets/award20.svg";
import Bagde3 from "../../assets/Bagde3.svg";
import Bagde4 from "../../assets/award23.svg";

const { Title, Text } = Typography;

function FloridaProperties() {
  const [counter, setCounter] = useState(1831197188); // Starting value

  useEffect(() => {
    const target = 3005291899; // Total value
    const duration = 5000;
    const intervalTime = 30;
    const increment = (target - counter) / (duration / intervalTime);

    const interval = setInterval(() => {
      setCounter((prev) => {
        const newValue = Math.min(prev + increment, target);
        return newValue;
      });
    }, intervalTime);

    if (counter >= target) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div
      className="bg-img-logo"
      style={{ color: "#fff", padding: "0px 20px", backgroundColor: "#1c1c1c" }}
    >
      <Row gutter={[16, 16]}>
        <Col lg={12} md={24} className="relative cover_rectagle">
          <div
            style={{
              position: "sticky",
              top: 0,
              paddingTop: "90px",
              paddingBottom: "10px",
            }}
          >
            <Title level={1} className="text-white" data-aos="fade-right">
              Florida Luxurious Properties
            </Title>
            <div
              className="badge-container"
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <img
                src={Bagde}
                data-aos="fade-right"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
                style={{ maxWidth: "100px", height: "auto" }}
              />
              <img
                src={Bagde2}
                data-aos="fade-right"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1500"
                style={{ maxWidth: "100px", height: "auto" }}
              />
              <img
                src={Bagde1}
                data-aos="fade-right"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1500"
                style={{ maxWidth: "100px", height: "auto" }}
              />
              <img
                src={Bagde3}
                data-aos="fade-right"
                data-aos-easing="ease-in-sine"
                data-aos-duration="2000"
                style={{ maxWidth: "100px", height: "auto" }}
              />
              <img
                src={Bagde4}
                data-aos="fade-right"
                data-aos-easing="ease-in-sine"
                data-aos-duration="2500"
                style={{ maxWidth: "100px", height: "auto" }}
              />
            </div>
          </div>
        </Col>
        <Col lg={12} md={24}>
          <div style={{ textAlign: "center" }}>
            <img
              src={DownArrow}
              className="Downarrow"
              height="250px"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <div
              className="stats-container"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingBottom: "90px",
                gap: "4rem",
              }}
            >
              <Title
                className="text-white f-64 mt-150 text-center"
                level={1}
                style={{ marginBottom: "0px" }}
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                #1
                <br />
                <Text
                  className="text-gray text-upper f-16 mt-16"
                  data-aos="fade-left"
                >
                  Ranked Private Brokerage
                </Text>
              </Title>

              <Title
                className="text-white f-64 text-center"
                level={1}
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                $3 BILLION <br />
                <Text className="text-gray text-upper f-16">
                  Has exceeded the mark
                </Text>
              </Title>

              <Title
                className="text-white f-64 text-center"
                level={1}
                data-aos="fade-left"
                data-aos-duration="1500"
              >
                ${Math.floor(counter).toLocaleString()} <br />
                <Text className="text-gray text-upper f-16">Total Sales</Text>
              </Title>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default FloridaProperties;
