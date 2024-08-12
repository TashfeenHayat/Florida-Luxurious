import React, { useState } from "react";
import { Typography, Flex, Row, Col } from "antd";
import Slider from "react-slick";
import Florida from "../../assets/florida.png";
import useCommunities from "../../hooks/useCommunities";

import { useNavigate } from "react-router-dom";
const { Title, Text, Paragraph } = Typography;
function Neighborhoods() {
  const { data, isLoading } = useCommunities(20, 1);
  console.log(data?.filters,"ali")
 const sortingArr = [...(data?.filters ?? [])].sort((a, b) => a?.name?.localeCompare(b?.name));
  console.log(sortingArr,"bitch sort")
    const displayedCommunities = sortingArr.slice(0, 6);
  const navigate = useNavigate();

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1024, // Adjust as per your requirement
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 768, // Adjust as per your requirement
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 425, // Adjust as per your requirement
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      // Add more responsive configurations as needed
    ],
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };
  return (
    <div style={{ paddingTop: 98, paddingBottom: 98 }}>
      <Title className="florida-heading-feature-negibour" level={1}>
        Featured Communities 
      </Title>
      <Row className="px-4">
        <Col lg={6}>
          <div className="displayy-teamimg-center show-btn-community-home ">
            <div style={{ background: "black" }} className="communities-grid">
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0%",
                  width: "100%",
                }}
              >
                <Flex
                  justify={"center"}
                  align={"center"}
                  style={{ width: "95%" }}
                  vertical
                >
                  <Text className="text-upper text-white f-24 f-100">
                    Communities
                  </Text>
                </Flex>
              </div>
            </div>
          </div>
        </Col>
        {displayedCommunities.map((community, index) => (
          <Col lg={6} md={12} sm={24} key={index} className="">
            <div className="displayy-teamimg-center show-btn-community-home ">
              <img
                src={community?.photo}
                width="100%"
                className="img-op communities-grid "
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "0%",
                  width: "100%",
                }}
              >
                <Flex
                  justify={"center"}
                  align={"center"}
                  style={{ width: "95%" }}
                  vertical
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
                </Flex>
              </div>
            </div>
          </Col>
        ))}
        <Col
          lg={6}
          onClick={() => navigate("/all-communities")}
          style={{ cursor: "pointer" }}
        >
           <div className="displayy-teamimg-center show-btn-community-home ">
            <div style={{ background: "black" }} className="communities-grid">
              <div
                style={{
                position:"relative",
                  top: "50%",
                  left: "0%",
                  width: "100%",
                }}
              >
                <Flex
                  justify={"center"}
                  align={"center"}
                  style={{ width: "95%" }}
               
                >
                  <Text className="text-upper text-white f-24 f-100">
                    View All
                  </Text>
                </Flex>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      {/* <Flex
        justify={"center"}
        align={"center"}
        style={{
          marginTop: 65,
          marginBottom: 65,
        }}
        className="negborihood-list"
      >
        <div className="meet-slider-width" style={{ width: "100%" }}>
          <Slider {...settings}>
            <div className="displayy-teamimg-center">
              <img src={Florida} width="100%" className="img-op" />
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  width: "100%",
                }}
              >
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  style={{ width: "95%" }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 28,
                      lineHeight: "36.4px",
                      fontWeight: 100,
                    }}
                  >
                    Florida
                  </Text>
                </Flex>
              </div>
            </div>
            <div className="displayy-teamimg-center">
              <img src={Florida} width="100%" className="img-op" />
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  width: "100%",
                }}
              >
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  style={{ width: "95%" }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 28,
                      lineHeight: "36.4px",
                      fontWeight: 100,
                    }}
                  >
                    Florida
                  </Text>
                </Flex>
              </div>
            </div>
            <div className="displayy-teamimg-center">
              <img src={Florida} width="100%" className="img-op" />
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  width: "100%",
                }}
              >
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  style={{ width: "95%" }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 28,
                      lineHeight: "36.4px",
                      fontWeight: 100,
                    }}
                  >
                    Florida
                  </Text>
                </Flex>
              </div>
            </div>
            <div className="displayy-teamimg-center">
              <img src={Florida} width="100%" className="img-op" />
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  width: "100%",
                }}
              >
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  style={{ width: "95%" }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 28,
                      lineHeight: "36.4px",
                      fontWeight: 100,
                    }}
                  >
                    Florida
                  </Text>
                </Flex>
              </div>
            </div>
            <div className="displayy-teamimg-center">
              <img src={Florida} width="100%" className="img-op" />
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  width: "100%",
                }}
              >
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  style={{ width: "95%" }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 28,
                      lineHeight: "36.4px",
                      fontWeight: 100,
                    }}
                  >
                    Florida
                  </Text>
                </Flex>
              </div>
            </div>
            <div className="displayy-teamimg-center">
              <img src={Florida} width="100%" className="img-op" />
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  width: "100%",
                }}
              >
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  style={{ width: "95%" }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 28,
                      lineHeight: "36.4px",
                      fontWeight: 100,
                    }}
                  >
                    Florida
                  </Text>
                </Flex>
              </div>
            </div>
            <div className="displayy-teamimg-center">
              <img src={Florida} width="100%" className="img-op" />
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  width: "100%",
                }}
              >
                <Flex
                  justify={"space-between"}
                  align={"center"}
                  style={{ width: "95%" }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 28,
                      lineHeight: "36.4px",
                      fontWeight: 100,
                    }}
                  >
                    Florida
                  </Text>
                </Flex>
              </div>
            </div>
          </Slider>
        </div>
      </Flex>
      <Flex justify="center" align="center">
        <button className="button-neighborhood">See All Neighborhoods </button>
      </Flex> */}
    </div>
  );
}

export default Neighborhoods;
