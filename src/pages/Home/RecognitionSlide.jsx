import React from "react";
import Slider from "react-slick";
import Business from "../../assets/business.svg";
import { Flex } from "antd";
function RecognitionSlide() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear", // Enable autoplay
  };

  return (
    <Flex
      justify={"center"}
      align={"center"}
      style={{ height: "250px", width: "98%" }}
    >
      <Slider {...settings}>
        <div>
          <img src={Business} />
        </div>
        <div>
          <img src={Business} />
        </div>
        <div>
          <img src={Business} />
        </div>
        <div>
          <img src={Business} />
        </div>
        <div>
          <img src={Business} />
        </div>
        <div>
          <img src={Business} />
        </div>
        <div>
          <img src={Business} />
        </div>
      </Slider>
    </Flex>
  );
}

export default RecognitionSlide;
