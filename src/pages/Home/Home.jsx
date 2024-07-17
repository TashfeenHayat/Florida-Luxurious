import React from "react";
import FloridaProperties from "./FloridaProperties";
import { Typography, Flex, Input } from "antd";
import RecognitionSlide from "./RecognitionSlide";
import OurStory from "./OurStory";
import Team from "./MeetTeam";
import FeatureListing from "./FeatureListing";
import Neighborhoods from "./Neighborhoods";
import Icons from "../../components/Icons";
const { Title, Text } = Typography;
const { Search } = Input;
function Home() {
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div>
      <div className="background-video-container">
        <video autoPlay muted loop className="background-video">
          <source
            src="https://firebasestorage.googleapis.com/v0/b/yahyanbilal.appspot.com/o/herovideo.mp4?alt=media&token=dc257c02-dbfd-43fd-a5d0-49adf87f95b1"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="content-hero w-100">
        <div className="hero-bg-img-shadow">
          <Flex
            justify={"center"}
            align={"center"}
            vertical
            style={{ height: "100%" }}
          >
            <Text style={{ color: "#D4CFC9" }} className="text-paragraph">
              Luxury. Innovation. Excellence.
            </Text>
            <Title className="title-home-page f-64">
              unlock exclusive living <br />
              explore florida’s finest properties
            </Title>
            <Text
              style={{ color: "#D4CFC9" }}
              className="text-paragraph text-center"
            >
              Discover Your Dream Home in the Heart of Florida with Florida
              Luxurious Properties
            </Text>
            <div className="pt-5">
              <Search
                placeholder="Search community"
                allowClear
                enterButton={
                  <span style={{ backgroundColor: "#000000" }}>Search</span>
                }
                size="large"
                onSearch={onSearch}
                style={{
                  width: "80ch",
                }}
              />
            </div>
          </Flex>
        </div>
      </div>
      <Icons />
      <FloridaProperties />
      <RecognitionSlide />
      <FeatureListing />
      <Neighborhoods />
      <OurStory />
      <Team />
    </div>
  );
}

export default Home;
