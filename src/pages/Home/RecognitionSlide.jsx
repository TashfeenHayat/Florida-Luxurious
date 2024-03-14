import React from "react";
import Slider from "react-slick";
import Business from "../../assets/business.svg";
import { Flex } from "antd";
function RecognitionSlide() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6, // Default number of slides to show
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
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
