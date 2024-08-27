import React from "react";
import { Typography, Row, Col, Image, Spin } from "antd";
import { Container } from "react-bootstrap";
import usePress from "../../hooks/usePress";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const { Title, Text } = Typography;

function PropertyPress() {
  const { data, isLoading, error } = usePress();
  // console.log("press", data);
  // Check if data is an object with a posts array
  const pressData = data?.posts || [];
  console.log("press", pressData);
  const navigate = useNavigate();

  // Use a media query to detect if the screen width is less than or equal to 768px (mobile/tablet)
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <div className="team-banner">
        <div className="team-banner-shadow">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Title className="text-upper text-white f-50 f-100">
              Property Press
            </Title>
          </div>
        </div>
      </div>
      <Container className="py-4">
        <Row gutter={[30, 30]}>
          {isLoading ? (
            <Col span={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Spin size="large" />
              </div>
            </Col>
          ) : error ? (
            <Col span={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text type="danger">Failed to load data.</Text>
              </div>
            </Col>
          ) : pressData.length > 0 ? (
            pressData.map((item, index) => (
              <React.Fragment key={index}>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <Image
                    src={item.cover}
                    preview={false}
                    style={{ width: "100%" }}
                  />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                  <div>
                    <Title className="text-upper f-30 f-100">
                      {item.title}
                    </Title>
                    <Text>{item.date}</Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: isMobile ? "center" : "end", // Center button on mobile
                      alignItems: "center",
                      marginTop: 24,
                    }}
                  >
                    <button
                      className="button-secondary text-upper"
                      style={{
                        width: "100%",
                        maxWidth: "200px",
                        background: "black",
                        color: "white",
                      }}
                      onClick={() => navigate(`/propertypress/${item._id}`)}
                    >
                      Read More
                    </button>
                  </div>
                </Col>
              </React.Fragment>
            ))
          ) : (
            <Col span={24}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text>No data available.</Text>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default PropertyPress;
