import React from "react";
import { Typography, Row, Col, Image, Spin } from "antd";
import { Container } from "react-bootstrap";
import usePress from "../../hooks/usePress";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function PropertyPress() {
  const { data, isLoading, error } = usePress();

  // Log the data to check its structure

  // Check if data is an object with a posts array
  const pressData = data?.posts || [];

  const navigate = useNavigate();

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
        <Row gutter={[60, 60]}>
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
                <Col lg={12} sm={24} md={24}>
                  <Image src={item.cover} preview={false} />
                </Col>
                <Col lg={12} sm={24} md={24}>
                  <div>
                    <Title className="text-upper f-40 f-100">
                      {item.title}
                    </Title>
                    <Text>{item.date}</Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="button-secondary text-upper mt-32"
                      style={{
                        width: "45%",
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
