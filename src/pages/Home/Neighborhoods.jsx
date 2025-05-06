import React, { useState, useEffect, useRef } from "react";
import { Typography, Row, Col, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import useCommunities from "../../hooks/useCommunities";

const { Title, Text } = Typography;

function Neighborhoods() {
  const { data, isLoading } = useCommunities(20, 1);
    const [isMobile, setIsMobile] = useState(false);
  const sortingArr = [...(data?.filters ?? [])].sort((a, b) =>
    a?.name?.localeCompare(b?.name)
  );
  const displayedCommunities = sortingArr.slice(0, 6);
  const navigate = useNavigate();
 useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mobile-visible");
          } else {
            entry.target.classList.remove("mobile-visible");
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    // Delay observer setup to allow DOM to fully render after Slider
    const timeoutId = setTimeout(() => {
      const items = document.querySelectorAll(".displayy-teamimg-center");
      items.forEach((item) => observer.observe(item));
    }, 500); // can tweak to 300-800ms based on render delay

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [isMobile]);


  return (
    <div style={{ paddingTop: 98, paddingBottom: 98, overflow: "hidden" }}>
      <Title className="florida-heading-feature-negibour" level={1}>
        Featured Communities
      </Title>
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[18, 18]} className="px-4" style={{ overflow: "" }}>
          <Col xl={6} lg={8} md={12} sm={12} xs={24}>
            <div
              className="displayy-teamimg-center show-btn-community-home"
              // style={{ overflow: "hidden" }}
            >
              <div
                style={{ background: "black" }}
                className="communities-grid set-communities"
              >
                <div
                // style={{
                //   overflow: "hidden",
                // }}
                >
                  <Text className="text-upper text-white f-24 f-100 ">
                    Communities
                  </Text>
                </div>
              </div>
            </div>
          </Col>

          {displayedCommunities.map((community, index) => (
            <Col
              xl={6}
              lg={8}
              md={12}
              sm={12}
              xs={24}
              key={index}
              // style={{ overflow: "hidden" }}
            >
              <div
                className={`displayy-teamimg-center show-btn-community-home ${
                  isMobile ? "always-show-info" : ""
                } `}
                // style={{ overflow: "hidden" }}
              >
                <img
                  src={community?.photo}
                  width="100%"
                
                  className={`img-op communities-grid `}
                  alt="community"
                />
                <div
                  className="show-info"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "0%",
                    // display: "flex",
                    // justifyContent: "center",
                    // alignItems: "center",
                    // justifyItems: "center",
                    // width: "100%",
                    // overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      background: "rgba(0, 0, 0, 0.5)",
                      padding: "8px", // Reduced padding
                      borderRadius: "4px", // Reduced border radius
                    }}
                  >
                    <Text
                      className="text-upper text-white f-100"
                      style={{
                        fontSize: "20px",
                        display: "block",
                      }}
                    >
                      {community?.name}
                    </Text>

                    <button
                      className="button-view2"
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
            xl={6}
            lg={8}
            md={12}
            sm={12}
            xs={24}
            onClick={() => navigate("/all-communities")}
            style={{ cursor: "pointer" }}
          >
            <div
              className="displayy-teamimg-center show-btn-community-home"
              // style={{ overflow: "hidden" }}
            >
              <div
                style={{ background: "black", overflow: "hidden" }}
                className="communities-grid"
              >
                <div
                // style={{
                //   // position: "relative",
                //   // top: "50%",
                //   // left: "0%",
                //   width: "100%",
                //   display: "flex",
                //   justifyContent: "center",
                //   alignItems: "center",
                //   justifyItems: "center",
                // }}
                >
                  <div
                  // style={{
                  //   display: "flex",
                  //   justifyContent: "center",
                  //   alignItems: "center",
                  //   width: "95%",
                  // }}
                  >
                    <Text className="text-upper text-white f-24 f-100 text-center">
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
