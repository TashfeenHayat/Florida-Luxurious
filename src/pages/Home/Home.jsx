import React from "react";
import FloridaProperties from "./FloridaProperties";
import { Typography, Flex, Input } from "antd";
import RecognitionSlide from "./RecognitionSlide";
import OurStory from "./OurStory";
import Team from "./MeetTeam";
import FeatureListing from "./FeatureListing";
import Neighborhoods from "./Neighborhoods";
import Icons from "../../components/Icons";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;
const { Search } = Input;

function Home() {
  const navigate = useNavigate();
  const onSearch = (value) => navigate(`/searchcommunity?name=${value}`);

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
      <div className="content-hero">
        <Flex
          justify="center"
          align="center"
          vertical
          style={{ width: "100%", height: "100%", textAlign: "center" }}
        >
          <Text className="text-paragraph">
            Luxury. Innovation. Excellence.
          </Text>
          <Title className="title-home-page">
            unlock exclusive living <br />
            explore florida’s finest properties
          </Title>
          <Text className="text-paragraph">
            Discover Your Dream Home in the Heart of Florida with Florida
            Luxurious Properties
          </Text>
         <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
      <Search
        placeholder=""
        allowClear
        enterButton={<span className="search-button">Search</span>}
        size="large"
        onSearch={onSearch}
        style={{ width: '100%', maxWidth: '600px' }}
      />
    </div>
        </Flex>
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
