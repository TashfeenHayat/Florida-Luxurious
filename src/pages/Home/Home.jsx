import React from "react";
import { Typography, Input } from "antd";
import FloridaProperties from "./FloridaProperties";
import RecognitionSlide from "./RecognitionSlide";
import OurStory from "./OurStory";
import Team from "./MeetTeam";
import LetTalk from "../../components/LetTalk";
import FeatureListing from "./FeatureListing";
import Neighborhoods from "./Neighborhoods";
import Icons from "../../components/Icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Animation from "../../components/Animation";
const { Title, Text } = Typography;
const { Search } = Input;

function Home() {
  const navigate = useNavigate();
  const onSearch = (value) => navigate(`/searchcommunity?name=${value}`);

  return (
    <>
      <div
        className="background-video-container"
        style={{
          position: "relative",
          overflow: "hidden",
          height: "100vh",
          width: "100%",
        }}
      >
        <motion.video
          autoPlay
          muted
          loop
          className="background-video"
          initial={{ opacity: 0 }} // Animation initial state
          animate={{ opacity: 1 }} // Animation final state
          transition={{ duration: 1.5 }} // Animation duration
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "translate(-50%, -50%)",
          }} // Responsive video
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/floridaluxrious.appspot.com/o/HOMES.mp4?alt=media&token=d1a0cf50-6483-47fa-9a55-40d6ad68e2a6"
            type="video/mp4"
          />
        </motion.video>

        <div
          className="content-hero"
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
              width: "100%",
              color: "#fff",
            }}
            initial={{ y: -50, opacity: 0 }} // Initial animation state
            animate={{ y: 0, opacity: 1 }} // Final animation state
            transition={{ duration: 1 }} // Animation duration
          >
            <Title
              className="title-home-page"
              style={{
                fontSize: "3rem",
                marginBottom: "1rem",
                textAlign: "center",
              }}
            >
              Luxury. Innovation. Excellence.
            </Title>
            {/* Uncomment this section if needed
      <Text
        className="text-paragraph"
        style={{ fontSize: "1.5rem", marginBottom: "2rem", textAlign: 'center' }}
      >
        unlock exclusive living <br />
        explore florida’s finest properties
      </Text>  */}
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          padding: "0 1rem",
        }}
      >
        <Search
          placeholder=""
          allowClear
          enterButton={
            <span
              className="search-button"
              style={{
                width: "auto",
                padding: "0 1rem",
              }}
            >
              Search
            </span>
          }
          size="large"
          onSearch={onSearch}
          style={{
            width: "100%",
            maxWidth: "550px",
            minWidth: "250px",
            overflow: "hidden",
          }}
        />
      </div>
    
          </motion.div>
        </div>
      </div>

      <Icons />
      <FloridaProperties />
      <RecognitionSlide />
      <FeatureListing />
      <Neighborhoods />
      <OurStory />
      <Team />
      <LetTalk />
    </>
  );
}

export default Home;
