import React from "react";
import { Typography, Row, Col, Spin, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import useCommunities from "../../hooks/useCommunities";

const { Title, Text } = Typography;

function Neighborhoods() {
  const { data, isLoading } = useCommunities(20, 1);
  const sortingArr = [...(data?.filters ?? [])].sort((a, b) =>
    a?.name?.localeCompare(b?.name)
  );
  const displayedCommunities = sortingArr.slice(0, 6);
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: 98, paddingBottom: 98 }}>
      <Title className="florida-heading-feature-negibour" level={1}>
        Featured Communities
      </Title>
      {isLoading ? (
        <Flex justify={"center"}>
          <Spin size="large" />
        </Flex>
      ) : (
        <Row className="px-4">
          <Col lg={6}>
            <div className="displayy-teamimg-center show-btn-community-home">
              <div style={{ background: "black" }} className="communities-grid">
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "0%",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "95%",
                      flexDirection: "column",
                    }}
                  >
                    <Text className="text-upper text-white f-24 f-100">
                      Communities
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          {displayedCommunities.map((community, index) => (
            <Col lg={6} md={12} sm={24} key={index}>
              <div className="displayy-teamimg-center show-btn-community-home">
                <img
                  src={community?.photo}
                  width="100%"
                  className="img-op communities-grid"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "0%",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "95%",
                      flexDirection: "column",
                    }}
                  >
                    <Text
                      className="text-upper text-white f-100"
                      style={{ fontSize: "20px" }}
                    >
                      {community?.name}
                    </Text>

                    <button
                      className="button-view1"
                      onClick={() => navigate(`/community/${community?._id}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
          <Col
            lg={6}
            onClick={() => navigate("/all-communities")}
            style={{ cursor: "pointer" }}
          >
            <div className="displayy-teamimg-center show-btn-community-home">
              <div style={{ background: "black" }} className="communities-grid">
                <div
                  style={{
                    position: "relative",
                    top: "50%",
                    left: "0%",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "95%",
                    }}
                  >
                    <Text className="text-upper text-white f-24 f-100">
                      View All
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Neighborhoods;
