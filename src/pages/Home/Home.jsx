import React, { useEffect, useState } from "react";
import { Typography, Input, AutoComplete } from "antd";
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
import useSearchSuggestions from "../../hooks/useSearchSuggestion";
const { Title, Text } = Typography;
const { Search } = Input;

function Home() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);
  const { suggestions } = useSearchSuggestions(searchValue);
  const onSearch = (value) => navigate(`/searchcommunity?name=${value}`);
  useEffect(() => {
    if (searchValue) {
      if (suggestions.properties) {
 
        setSuggestionsList(suggestions.properties);
      } else {
        setSuggestionsList([]); // If suggestions is not valid, reset it to an empty array
      }
    } else {
      setSuggestionsList([]); // Reset if there's no search value
    }
  }, [searchValue, suggestions]);
  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion);
  };
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
            src="https://firebasestorage.googleapis.com/v0/b/florida-lux-e66c2.firebasestorage.app/o/HOMES.mp4?alt=media&token=4256bff0-c138-491c-b79a-2f6eb88744a9"
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

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
                width: "100%",
                padding: "0 1rem",
              }}
            >
              <AutoComplete
                options={suggestionsList?.map((suggestion) => ({
                  value: suggestion.name, // Ensure 'name' is the property you want to display
                }))}
                style={{ width: "100%", maxWidth: "550px", minWidth: "250px" }}
                onSelect={handleSuggestionClick}
                onSearch={setSearchValue}
              >
                <Input.Search
                  placeholder="Search communities..."
                  allowClear
                  enterButton="Search"
                  size="large"
                  onSearch={onSearch}
                />
              </AutoComplete>
            </div>
          </motion.div>
        </div>
      </div>

      <div style={{ overflow: "hidden" }}>
        <Icons />
        <FloridaProperties />
        <RecognitionSlide />
        <FeatureListing />
        <Neighborhoods />
        <OurStory />
        <Team />
        <LetTalk />
      </div>
    </>
  );
}

export default Home;
