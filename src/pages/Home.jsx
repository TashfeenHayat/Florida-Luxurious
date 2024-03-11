import React from "react";
import { Typography, Flex } from "antd";
import Header from "../components/Header";
const { Title, Text } = Typography;
function Home() {
  return (
    <>
      <div className="hero-bg-img ">
        <div className="hero-bg-img-shadow ">
          <Flex
            align={"center"}
            justify={"center"}
            hidden
            style={{ height: "inherit" }}
            wrap={"wrap"}
            vertical
          >
            <Text style={{ color: "#D4CFC9" }} className="text-paragraph">
              Luxury. Innovation. Excellence.
            </Text>
            <Title className="title-home-page">
              unlock exclusive living <br />
              explore florida’s finest properties
            </Title>
            <Text style={{ color: "#D4CFC9" }} className="text-paragraph">
              Discover Your Dream Home in the Heart of Florida with Florida
              Luxurious Properties
            </Text>
          </Flex>
        </div>
      </div>
    </>
  );
}

export default Home;
