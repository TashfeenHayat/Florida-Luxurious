import React from "react";
import { Flex, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import talk from "../assets/videos/lettalk.mp4";
const { Title, Text, Paragraph } = Typography;

function LetTalk() {
  const navigate = useNavigate();
  return (
    <div className="background-video-container" style={{ height: "70vh" }}>
      <video autoPlay muted loop className="background-video">
        <source
          src="https://firebasestorage.googleapis.com/v0/b/florida-lux-e66c2.firebasestorage.app/o/contactus.mp4?alt=media&token=77547d74-277e-4285-9725-561eb49e27d3"
          //src="https://firebasestorage.googleapis.com/v0/b/floridaluxrious.appspot.com/o/talk.mp4?alt=media&token=859b58a0-8029-4b2c-8059-69a25f3ccd95"
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
            <Title
              level={3}
              className="meet-team-heading"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
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
                maxWidth: "550px",
                fontWeight: 100,
              }}
              data-aos="fade-left"
              data-aos-duration="1500"
            >
              Please contact a member of our specialized Team to discuss how we
              can help meet your real estate goals
            </Text>
            <div onClick={() => navigate("/contact-us")}>
              <button
                style={{
                  marginTop: "24px",
                  marginBottom: "24px",
                }}
                className="let-talk-btn"
                data-aos="fade-left"
                data-aos-duration="1500"
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
