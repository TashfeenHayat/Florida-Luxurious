import React from "react";
import { Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

function LetTalk() {
  const navigate = useNavigate();
  return (
    <div className="background-video-container" style={{ height: "70vh" }}>
      <video autoPlay muted loop className="background-video">
        <source
          src="https://videos.pexels.com/video-files/3773486/3773486-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
      </video>
      <div className="content-hero w-100">
        <div className="hero-bg-img-shadow ">
          <Flex
            justify={"center"}
            align={"center"}
            vertical
            style={{ height: "100%" }}
          >
            <Title level={3} className="meet-team-heading">
              LET’S TALK
            </Title>
            <div
              style={{
                marginBottom: "10px",
                marginTop: "10px",
                width: "6%",
                borderBottom: "1px solid white",
              }}
            ></div>
            <Text
              style={{
                color: "white",
                lineHeight: "25.6px",
                letterSpacing: "1px",
                fontSize: "24px",
                textAlign: "center",
                width: "45%",
              }}
            >
              Reach out to us today and let's start turning your real estate
              dreams into reality
            </Text>
            <div onClick={() => navigate("/contact-us")}>
              <button
                style={{
                  marginTop: "24px",
                  marginBottom: "24px",
                }}
                className="let-talk-btn"
              >
                Contact Us
              </button>
            </div>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default LetTalk;
