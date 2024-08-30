import React, { useState } from "react";
import { Typography, Row, Col, Spin, Grid } from "antd";
import useCommunities from "../../hooks/useCommunities";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../components/BackgroundImage";
import BoatImage from "../../assets/Allcommunities.jpg";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

function Allcommunities() {
  const { data, isLoading } = useCommunities(20, 1);
  const sortingArr = [...(data?.filters ?? [])].sort((a, b) =>
    a?.name?.localeCompare(b?.name)
  );
  const navigate = useNavigate();
  const screens = useBreakpoint();

  return (
    <>
      {/* Background Image with Title */}
      <BackgroundImage
        Image={BoatImage}
        style={{ backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <Title
          style={{
            color: "white",
            lineHeight: "46px",
            letterSpacing: "2px",
            textAlign: "center",
          }}
          className="text-upper f-50 f-100"
        >
          Featured Communities
        </Title>
      </BackgroundImage>

      {/* Communities Section */}
      <div style={{ paddingTop: 98, paddingBottom: 98, overflow: "hidden" }}>
        <Row gutter={[32, 32]} className="px-4">
          {/* Loading Spinner */}
          {isLoading ? (
            <Col span={24} style={{ textAlign: "center" }}>
              <Spin size="large" />
            </Col>
          ) : (
            sortingArr.map((community, index) => (
              <Col
                lg={8}
                md={12}
                sm={24}
                key={index}
                className="displayy-teamimg-center show-btn-community-home"
              >
                <div style={{ position: "relative" }}>
                  <img
                    src={community?.photo}
                    width="100%"
                    className="img-op communities-grid"
                    alt={community?.name}
                    style={{ display: "block" }}
                  />
                  <div
                    className="show-info"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      background: "rgba(0, 0, 0, 0.5)",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <Text
                      className="text-upper text-white f-100"
                      style={{
                        fontSize: screens.xs ? "16px" : "20px",
                        display: "block",
                      }}
                    >
                      {community?.name}
                    </Text>

                    <button
                      className="button-view2"
                      onClick={() => navigate(`/community/${community?._id}`)}
                      style={{
                        marginTop: "10px",
                        padding: "5px 20px",
                        fontSize: screens.xs ? "14px" : "16px",
                      }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>
      </div>
    </>
  );
}

export default Allcommunities;
