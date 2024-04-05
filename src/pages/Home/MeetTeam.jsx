import React from "react";
import { Flex, Typography, Button } from "antd";
import Slider from "react-slick";
import Team from "../../assets/team.png";
import Filp from "../../components/Flip";
import BackArrow from "../../assets/backArrow.svg";
import NextArrow from "../../assets/nextArrow.svg";
import LetTalk from "../../components/LetTalk";

const { Title, Text } = Typography;
function MeetTeam() {
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", zIndex: 10 }}
        onClick={onClick}
      >
        <img src={BackArrow} alt="Previous" width="45px" />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", zIndex: 10 }}
        onClick={onClick}
      >
        <img src={NextArrow} alt="Next" width="45px" />
      </div>
    );
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: false,
          nextArrow: false,
        },
      },
      // Add more breakpoints as needed
    ],
  };

  return (
    <>
      <div style={{ background: "black" }}>
        <div style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Title level={1} className="meet-team-heading">
            Meet The Team
          </Title>
          <Flex
            justify={"center"}
            align={"center"}
            style={{
              marginTop: 60,
              marginBottom: 60,
            }}
            className="features_section_slider"
          >
            <div className="meet-slider-width">
              <Slider {...settings}>
                <Filp />
                <Filp />
                <Filp />
                <Filp />
                <Filp />
              </Slider>
            </div>
          </Flex>
        </div>
      </div>
      <LetTalk />
    </>
  );
}

export default MeetTeam;
