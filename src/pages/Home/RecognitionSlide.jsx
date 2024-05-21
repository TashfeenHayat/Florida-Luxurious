import React from "react";
import Slider from "react-slick";
// import Business from "../../assets/business.svg";
import Zillow from "../../assets/ads/zillow.png";
import Youtube from "../../assets/ads/youtube.png";
import Washington from "../../assets/ads/washington.png";
import Wall from "../../assets/ads/wall.png";
import Robb from "../../assets/ads/robb.png";
import Realtor from "../../assets/ads/realtor.png";
import Point from "../../assets/ads/point.png";
import Newyork from "../../assets/ads/newyork.png";
import Man from "../../assets/ads/man.png";
import Juwai from "../../assets/ads/juwai.png";
import Homes from "../../assets/ads/homes.png";
import Fort from "../../assets/ads/fort.png";

import { Flex } from "antd";
function RecognitionSlide() {
  const imgRecognition = [
    Zillow,
    Youtube,
    Washington,
    Wall,
    Robb,
    Realtor,
    Point,
    Newyork,
    Man,
    Juwai,
    Homes,
    Fort,
  ];
  const settings = {
    loop: true,
    dots: false,
    infinite: true,
    slidesToShow: 6, // Default number of slides to show
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 1000,
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
