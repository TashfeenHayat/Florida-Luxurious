import React from "react";
import Slider from "react-slick";
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
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Flex justify="center" align="center" className="rec-slide">
      <Slider {...settings}>
        {imgRecognition.map((img, index) => (
          <div key={index} className="slide-item">
            <img src={img} alt={`Recognition ${index}`} />
          </div>
        ))}
      </Slider>

      {/* Internal CSS */}
      <style>
        {`
          .rec-slide {
            width: 100%;
       
            padding: 20px 0;
            overflow: hidden;
          }

          .slide-item {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
          }

          .slide-item img {
            width: 100%;
            max-width: 150px;
            height: auto;
            object-fit: contain;
          }

          @media (max-width: 992px) {
            .slide-item img {
              max-width: 150px;
            }
          }

          @media (max-width: 768px) {
            .slide-item img {
              max-width: 150px;
            }
          }

          @media (max-width: 576px) {
            .slide-item img {
              max-width: 150px;
            }
          }
        `}
      </style>
    </Flex>
  );
}

export default RecognitionSlide;
