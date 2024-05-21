import React from "react";
import Slider from "react-slick";
import Business from "../../assets/business.svg";
import Ad1 from "../../assets/ads/1.png";
import Ad2 from "../../assets/ads/2.png";
import Ad3 from "../../assets/ads/3.png";
import Ad4 from "../../assets/ads/4.png";
import Ad5 from "../../assets/ads/5.png";
import Ad6 from "../../assets/ads/6.png";
import Ad7 from "../../assets/ads/7.png";
import Ad8 from "../../assets/ads/8.png";
import Ad9 from "../../assets/ads/9.png";
import Ad10 from "../../assets/ads/10.png";
import Ad11 from "../../assets/ads/11.png";
import Ad12 from "../../assets/ads/12.png";

import { Flex } from "antd";
function RecognitionSlide() {
  const imgRecognition = [
    Ad1,
    Ad2,
    Ad3,
    Ad4,
    Ad5,
    Ad6,
    Ad7,
    Ad8,
    Ad9,
    Ad10,
    Ad11,
    Ad12,
  ];
  const settings = {
    loop: true,
    dots: false,
    infinite: true,
    slidesToShow: 6, // Default number of slides to show
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 6000,
    cssEase: "linear", // Enable autoplay
    responsive: [
      {
        breakpoint: 1200, // Adjust the number of slides for screens less than 1200px wide
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992, // Adjust the number of slides for screens less than 992px wide
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Adjust the number of slides for screens less than 768px wide
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, // Adjust the number of slides for screens less than 576px wide
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Flex
      justify={"center"}
      align={"center"}
      style={{ height: "250px", width: "98%" }}
    >
      <Slider {...settings}>
        {imgRecognition.map((img, index) => (
          <div>
            <img src={img} width="60%" />
          </div>
        ))}
      </Slider>
    </Flex>
  );
}

export default RecognitionSlide;
