import React from "react";
import { Drawer, Flex, Row, Col, Typography, Image } from "antd";
import { Link } from "react-router-dom";
import Close from "../assets/closeicon.svg";
import LogoMenu from "../assets/Logonew.svg";
import BG from "../assets/bg.svg";
import useCommunities from "../hooks/useCommunities";
const { Title, Text, Paragraph } = Typography;
function Drawers({ setOpenDrawer, openDrawer }) {
  const { data, isLoading } = useCommunities(20, 1);
  return (
    <Drawer
      placement="right"
      onClose={() => setOpenDrawer(false)}
      open={openDrawer}
      width="1200px"
      style={{ background: "black", cursor: "pointer" }}
    >
      <Flex justify={"space-between"} align={"center"}>
        <img src={LogoMenu} />
        <img src={Close} />
      </Flex>
      <div style={{ position: "relative" }}>
        <div className="d-flex justify-content-center align-items-center">
          <Image src={BG} preview={false} width="60%" />
        </div>
        <div className="drawer-option">
          <Row gutter={[60, 40]}>
            <Col lg={16} md={16} sm={24}>
              <Row gutter={[8, 20]}>
                <Col lg={12} md={12} sm={24}>
                  <Title className="text-white text-upper" level={3}>
                    our offerings
                  </Title>
                  <Flex className="pt-2" vertical gap={10}>
                    <Link
                      className="text-upper f-14 text-white"
                      style={{ textDecoration: "none" }}
                      to="/properties"
                    >
                      Featured properties
                    </Link>
                    <Link
                      className="text-upper f-14 text-white"
                      style={{ textDecoration: "none" }}
                    >
                      Featured NEIGHBORHOODS
                    </Link>
                    <Link
                      className="text-upper f-14 text-white"
                      style={{ textDecoration: "none" }}
                      to="sold-properties"
                    >
                      sold properties
                    </Link>
                  </Flex>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Title className="text-white text-upper" level={3}>
                    Search by location
                  </Title>
                  <Flex className="pt-2" vertical gap={10}>
                    <Link
                      className="text-upper f-14 text-white"
                      style={{ textDecoration: "none" }}
                    >
                      Other offering
                    </Link>
                    <Link
                      className="text-upper f-14 text-white"
                      style={{ textDecoration: "none" }}
                    >
                      Other offering
                    </Link>
                    <Link
                      className="text-upper f-14 text-white"
                      style={{ textDecoration: "none" }}
                    >
                      Other offering
                    </Link>
                  </Flex>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Title className="text-white text-upper" level={3}>
                    about
                  </Title>
                  <Flex className="pt-2" vertical gap={10}>
                    <Link
                      className="text-upper f-14 text-white"
                      style={{ textDecoration: "none" }}
                      to="/our-story"
                    >
                      our story
                    </Link>
                    <Link
                      className="text-upper f-14 text-white"
                      style={{ textDecoration: "none" }}
                      to="/meet-the-team"
                    >
                      meet the team
                    </Link>
                    <Link
                      className="text-upper f-14 text-white"
                      style={{ textDecoration: "none" }}
                    >
                      property press
                    </Link>
                  </Flex>
                </Col>
                <Col lg={12} md={12} sm={24}>
                  <Title className="text-white text-upper" level={3}>
                    for boat owners
                  </Title>
                </Col>
              </Row>
            </Col>

            <Col lg={8} md={8} sm={24}>
              <Title className="text-white text-upper" level={3}>
                Communities
              </Title>
              <Flex className="pt-2" vertical gap={10}>
                {data?.filters.map((item, index) => (
                  <Link
                    key={index}
                    className="text-upper f-14 text-white"
                    style={{ textDecoration: "none" }}
                    to={`/community/${item?._id}`}
                  >
                    {item?.name}
                  </Link>
                ))}
              </Flex>
            </Col>
          </Row>
        </div>
      </div>
      <Flex justify="flex-start" vertical align="flex-start">
        <Flex justify="space-between" align="center" className="w-100">
          <Paragraph className="f-24 text-white" style={{ fontWeight: 100 }}>
            BROWARD COUNTY'S <br />
            <Text className="f-bold f-24 text-white">#1 RANKED PRIVATE</Text>
            <br />
            PRIVATE LUXURIOUS BROKERAGE
          </Paragraph>

          <Flex vertical>
            <Title className="text-white f-24 f-bold text-upper text-center">
              Contact Us
            </Title>
            <Flex justify={"space-around"} align="center" gap={30}>
              <Flex vertical>
                <Text style={{ color: "#838383" }} className="f-14">
                  Address
                </Text>
                <Text className="text-white f-bold">
                  2438 East Las Olas
                  <br /> Boulevard <br />
                  Fort Lauderdale, FL 33301
                </Text>
              </Flex>
              <Flex vertical>
                <Text style={{ color: "#838383" }} className="f-14">
                  Schedule an appointment
                </Text>
                <Text className="text-white f-bold">954.870.080</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex justify="space-between" align="center" className="w-100">
          <Flex gap="25px">
            <Text className="f-bold f-24 text-white">Follow us</Text>
            <a
              href="https://www.facebook.com/FloridaLuxuriousProperties/"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="40"
                viewBox="0 0 43 43"
                fill="none"
              >
                <rect width="43" height="43" rx="21.5" fill="white" />
                <path
                  d="M26.5372 9.17407V13.0044H24.2593C23.4274 13.0044 22.8664 13.1785 22.5762 13.5268C22.2861 13.875 22.141 14.3973 22.141 15.0937V17.8359H26.3921L25.8262 22.1305H22.141V33.1428H17.7012V22.1305H14.0015V17.8359H17.7012V14.673C17.7012 12.8738 18.2042 11.4786 19.2102 10.4871C20.2161 9.49569 21.5558 8.99997 23.2291 8.99997C24.651 8.99997 25.7537 9.058 26.5372 9.17407Z"
                  fill="black"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/florida_luxurious/?hl=en"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="40"
                viewBox="0 0 43 43"
                fill="none"
              >
                <rect width="43" height="43" rx="21.5" fill="white" />
                <g clip-path="url(#clip0_808_2189)">
                  <path
                    d="M24.1161 23.6261C24.1161 23.6261 24.2975 23.4447 24.6602 23.082C25.0229 22.7193 25.2043 22.0253 25.2043 21C25.2043 19.9747 24.8416 19.0993 24.1161 18.3738C23.3907 17.6484 22.5153 17.2857 21.49 17.2857C20.4647 17.2857 19.5894 17.6484 18.8639 18.3738C18.1385 19.0993 17.7757 19.9747 17.7757 21C17.7757 22.0253 18.1385 22.9006 18.8639 23.6261C19.5894 24.3515 20.4647 24.7143 21.49 24.7143C22.5153 24.7143 23.3907 24.3515 24.1161 23.6261ZM25.538 16.952C25.538 16.952 25.8161 17.2301 26.3723 17.7862C26.9285 18.3424 27.2065 19.4137 27.2065 21C27.2065 22.5863 26.6504 23.9356 25.538 25.048C24.4257 26.1603 23.0763 26.7165 21.49 26.7165C19.9037 26.7165 18.5544 26.1603 17.442 25.048C16.3297 23.9356 15.7735 22.5863 15.7735 21C15.7735 19.4137 16.3297 18.0643 17.442 16.952C18.5544 15.8396 19.9037 15.2834 21.49 15.2834C23.0763 15.2834 24.4257 15.8396 25.538 16.952ZM28.3818 14.1082C28.3818 14.1082 28.4471 14.1735 28.5776 14.3041C28.7082 14.4347 28.7735 14.6837 28.7735 15.0513C28.7735 15.4189 28.6429 15.7332 28.3818 15.9944C28.1206 16.2555 27.8062 16.3861 27.4387 16.3861C27.0711 16.3861 26.7568 16.2555 26.4956 15.9944C26.2344 15.7332 26.1039 15.4189 26.1039 15.0513C26.1039 14.6837 26.2344 14.3694 26.4956 14.1082C26.7568 13.8471 27.0711 13.7165 27.4387 13.7165C27.8062 13.7165 28.1206 13.8471 28.3818 14.1082ZM22.6 11.8521C22.6 11.8521 22.4319 11.8533 22.0958 11.8557C21.7596 11.8581 21.5577 11.8593 21.49 11.8593C21.4223 11.8593 21.0523 11.8569 20.3801 11.8521C19.7078 11.8472 19.1976 11.8472 18.8494 11.8521C18.5012 11.8569 18.0345 11.8714 17.4493 11.8956C16.8641 11.9198 16.366 11.9682 15.9549 12.0407C15.5438 12.1132 15.198 12.2027 14.9175 12.3091C14.4338 12.5026 14.0083 12.7831 13.6407 13.1506C13.2731 13.5182 12.9926 13.9438 12.7992 14.4274C12.6928 14.7079 12.6033 15.0537 12.5308 15.4648C12.4582 15.8759 12.4099 16.374 12.3857 16.9592C12.3615 17.5444 12.347 18.0111 12.3421 18.3593C12.3373 18.7076 12.3373 19.2178 12.3421 19.89C12.347 20.5623 12.3494 20.9323 12.3494 21C12.3494 21.0677 12.347 21.4377 12.3421 22.1099C12.3373 22.7821 12.3373 23.2924 12.3421 23.6406C12.347 23.9888 12.3615 24.4555 12.3857 25.0407C12.4099 25.6259 12.4582 26.124 12.5308 26.5351C12.6033 26.9462 12.6928 27.292 12.7992 27.5725C12.9926 28.0561 13.2731 28.4817 13.6407 28.8493C14.0083 29.2169 14.4338 29.4974 14.9175 29.6908C15.198 29.7972 15.5438 29.8867 15.9549 29.9592C16.366 30.0318 16.8641 30.0801 17.4493 30.1043C18.0345 30.1285 18.5012 30.143 18.8494 30.1478C19.1976 30.1527 19.7078 30.1527 20.3801 30.1478C21.0523 30.143 21.4223 30.1406 21.49 30.1406C21.5577 30.1406 21.9277 30.143 22.6 30.1478C23.2722 30.1527 23.7824 30.1527 24.1306 30.1478C24.4789 30.143 24.9456 30.1285 25.5308 30.1043C26.116 30.0801 26.6141 30.0318 27.0252 29.9592C27.4363 29.8867 27.7821 29.7972 28.0626 29.6908C28.5462 29.4974 28.9718 29.2169 29.3394 28.8493C29.7069 28.4817 29.9874 28.0561 30.1809 27.5725C30.2873 27.292 30.3767 26.9462 30.4493 26.5351C30.5218 26.124 30.5702 25.6259 30.5944 25.0407C30.6186 24.4555 30.6331 23.9888 30.6379 23.6406C30.6427 23.2924 30.6427 22.7821 30.6379 22.1099C30.6331 21.4377 30.6306 21.0677 30.6306 21C30.6306 20.9323 30.6331 20.5623 30.6379 19.89C30.6427 19.2178 30.6427 18.7076 30.6379 18.3593C30.6331 18.0111 30.6186 17.5444 30.5944 16.9592C30.5702 16.374 30.5218 15.8759 30.4493 15.4648C30.3767 15.0537 30.2873 14.7079 30.1809 14.4274C29.9874 13.9438 29.7069 13.5182 29.3394 13.1506C28.9718 12.7831 28.5462 12.5026 28.0626 12.3091C27.7821 12.2027 27.4363 12.1132 27.0252 12.0407C26.6141 11.9682 26.116 11.9198 25.5308 11.8956C24.9456 11.8714 24.4789 11.8569 24.1306 11.8521C23.7824 11.8472 23.2722 11.8472 22.6 11.8521ZM32.5603 16.4006C32.6087 17.2518 32.6329 18.7849 32.6329 21C32.6329 23.215 32.6087 24.7481 32.5603 25.5993C32.4636 27.6112 31.8639 29.1685 30.7612 30.2712C29.6586 31.3738 28.1013 31.9736 26.0894 32.0703C25.2382 32.1186 23.7051 32.1428 21.49 32.1428C19.275 32.1428 17.7419 32.1186 16.8907 32.0703C14.8788 31.9736 13.3215 31.3738 12.2188 30.2712C11.1161 29.1685 10.5164 27.6112 10.4197 25.5993C10.3713 24.7481 10.3472 23.215 10.3472 21C10.3472 18.7849 10.3713 17.2518 10.4197 16.4006C10.5164 14.3887 11.1161 12.8314 12.2188 11.7288C13.3215 10.6261 14.8788 10.0264 16.8907 9.92965C17.7419 9.88129 19.275 9.85711 21.49 9.85711C23.7051 9.85711 25.2382 9.88129 26.0894 9.92965C28.1013 10.0264 29.6586 10.6261 30.7612 11.7288C31.8639 12.8314 32.4636 14.3887 32.5603 16.4006Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_808_2189">
                    <rect
                      width="22.3"
                      height="26"
                      fill="white"
                      transform="matrix(1 0 0 -1 10.3401 34)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/florida-luxurious-properties-585146a2"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="40"
                viewBox="0 0 43 43"
                fill="none"
              >
                <rect width="43" height="43" rx="21.5" fill="white" />
                <g clip-path="url(#clip0_808_2190)">
                  <path
                    d="M15.4108 17.0682V31.4465H10.6228V17.0682H15.4108ZM15.7155 12.6285C15.7251 13.3346 15.4809 13.9246 14.9828 14.3985C14.4846 14.8725 13.8293 15.1095 13.0168 15.1095H12.9878C12.1946 15.1095 11.5562 14.8725 11.0726 14.3985C10.589 13.9246 10.3472 13.3346 10.3472 12.6285C10.3472 11.9127 10.5962 11.3202 11.0944 10.8511C11.5925 10.382 12.243 10.1474 13.0458 10.1474C13.8487 10.1474 14.4919 10.382 14.9755 10.8511C15.4591 11.3202 15.7058 11.9127 15.7155 12.6285ZM32.6329 23.2055V31.4465H27.8594V23.7568C27.8594 22.7412 27.6636 21.9456 27.2718 21.3701C26.8801 20.7946 26.2683 20.5068 25.4365 20.5068C24.8271 20.5068 24.3168 20.6737 23.9058 21.0074C23.4947 21.3411 23.1876 21.7546 22.9844 22.2479C22.878 22.5381 22.8248 22.9298 22.8248 23.4231V31.4465H18.0514C18.0708 27.5872 18.0804 24.4581 18.0804 22.0593C18.0804 19.6604 18.0756 18.2289 18.0659 17.7646L18.0514 17.0682H22.8248V19.1575H22.7958C22.9893 18.8479 23.1876 18.5771 23.3907 18.345C23.5938 18.1128 23.8671 17.8613 24.2104 17.5905C24.5538 17.3197 24.9746 17.1093 25.4727 16.9594C25.9709 16.8094 26.5246 16.7345 27.134 16.7345C28.788 16.7345 30.118 17.2834 31.124 18.3812C32.1299 19.4791 32.6329 21.0872 32.6329 23.2055Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_808_2190">
                    <rect
                      width="22.3"
                      height="26"
                      fill="white"
                      transform="matrix(1 0 0 -1 10.3401 34)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </Flex>
        </Flex>
      </Flex>
    </Drawer>
  );
}

export default Drawers;
