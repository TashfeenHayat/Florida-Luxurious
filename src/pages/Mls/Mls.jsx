import React, { useState } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import {
  Typography,
  Row,
  Col,
  Slider,
  Flex,
  Dropdown,
  Space,
  Checkbox,
  Pagination,
  Spin,
  Image,
} from "antd";
import MLSBG from "../../assets/MLS.png";
import { Container } from "react-bootstrap";
import Icons from "../../components/Icons";
import { DownOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import useMls from "../../hooks/useMls";
import Property from "../../assets/property.png";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import LetTalk from "../../components/LetTalk";
import { getProperties } from "../../api/Property";
const { Title, Text } = Typography;

const items = [
  { key: "1", label: <Text className="text-black">Residential</Text> },
  { key: "2", label: <Text className="text-black">Condominium</Text> },
  { key: "3", label: <Text className="text-black">Rental</Text> },
];
const minBathRoom = [
  { key: "1", label: <Text className="text-black">1</Text> },
  { key: "2", label: <Text className="text-black">2</Text> },
  { key: "3", label: <Text className="text-black">3</Text> },
  { key: "4", label: <Text className="text-black">4</Text> },
  { key: "5", label: <Text className="text-black">5</Text> },
  { key: "6", label: <Text className="text-black">6</Text> },
  { key: "7", label: <Text className="text-black">7</Text> },
  { key: "8", label: <Text className="text-black">8</Text> },
  { key: "9", label: <Text className="text-black">9</Text> },
  { key: "10", label: <Text className="text-black">10</Text> },
];
const maxBathRoom = [
  { key: "1", label: <Text className="text-black">1</Text> },
  { key: "2", label: <Text className="text-black">2</Text> },
  { key: "3", label: <Text className="text-black">3</Text> },
  { key: "4", label: <Text className="text-black">4</Text> },
  { key: "5", label: <Text className="text-black">5</Text> },
  { key: "6", label: <Text className="text-black">6</Text> },
  { key: "7", label: <Text className="text-black">7</Text> },
  { key: "8", label: <Text className="text-black">8</Text> },
  { key: "9", label: <Text className="text-black">9</Text> },
  { key: "10", label: <Text className="text-black">10</Text> },
];
const minBedRoom = [
  { key: "1", label: <Text className="text-black">1</Text> },
  { key: "2", label: <Text className="text-black">2</Text> },
  { key: "3", label: <Text className="text-black">3</Text> },
  { key: "4", label: <Text className="text-black">4</Text> },
  { key: "5", label: <Text className="text-black">5</Text> },
  { key: "6", label: <Text className="text-black">6</Text> },
  { key: "7", label: <Text className="text-black">7</Text> },
  { key: "8", label: <Text className="text-black">8</Text> },
  { key: "9", label: <Text className="text-black">9</Text> },
  { key: "10", label: <Text className="text-black">10</Text> },
];
const maxBedRoom = [
  { key: "1", label: <Text className="text-black">1</Text> },
  { key: "2", label: <Text className="text-black">2</Text> },
  { key: "3", label: <Text className="text-black">3</Text> },
  { key: "4", label: <Text className="text-black">4</Text> },
  { key: "5", label: <Text className="text-black">5</Text> },
  { key: "6", label: <Text className="text-black">6</Text> },
  { key: "7", label: <Text className="text-black">7</Text> },
  { key: "8", label: <Text className="text-black">8</Text> },
  { key: "9", label: <Text className="text-black">9</Text> },
  { key: "10", label: <Text className="text-black">10</Text> },
];

function Mls() {
  const dispatch = useDispatch();
  const itemsPerPage = 20;
  const mlsOnly = true;
  const [currentPage, setCurrentPage] = useState(1);
  useMls(true, itemsPerPage, currentPage, null, null, null, null, 600000);

  const { isLoading, data: MLS } = useSelector((s) => s.getPropertiesReducer);
  console.log({ isLoading, data: MLS });
  const [minprice, setPrice] = useState(600000);
  const [propertyType, setPropertyType] = useState("Select property type");
  const [minBathCount, setMinBathCount] = useState("min Bathrooms");
  const [maxBathCount, setMaxBathCount] = useState("Max Bathrooms");
  const [minBedCount, setMinBedCount] = useState("min BedRooms");
  const [maxBedCount, setMaxBedCount] = useState("Max BedRooms");

  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  const { data } = useSelector((s) => s.getFiltersReducer);
  console.log("data", data);
  const handlePrice = (price) => {
    setPrice(price);
  };

  const handleMenuClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    setPropertyType(selectedItem.label.props.children);
  };

  const handleMenuMinBathRoom = (e) => {
    const selectedItem = minBathRoom.find((item) => item.key === e.key);
    setMinBathCount(selectedItem.label.props.children);
  };

  const handleMenuMaxBathRoom = (e) => {
    const selectedItem = maxBathRoom.find((item) => item.key === e.key);
    setMaxBathCount(selectedItem.label.props.children);
  };
  const handleMenuMinBedRoom = (e) => {
    const selectedItem = minBedRoom.find((item) => item.key === e.key);
    setMinBedCount(selectedItem.label.props.children);
  };
  const handleMenumaxBedRoom = (e) => {
    const selectedItem = maxBedRoom.find((item) => item.key === e.key);
    setMaxBedCount(selectedItem.label.props.children);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 600,
      behavior: "smooth",
    });
  };

  const handleSearchButton = () => {
    dispatch(
      getProperties({
        mlsOnly,
        minBedCount,
        minBathCount,
        cities,
        maxBathCount,
        minprice,
      })
    );
  };

  const handleCities = (e) => {
    const { checked, name } = e.target;
    setCities((prevCities) => {
      if (checked) {
        return [...prevCities, name];
      } else {
        return prevCities.filter((city) => city !== name);
      }
    });
  };
  // Calculate the properties for the current page
  const formatPrice = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(0)}M`;
    }
    return num.toString();
  };

  return (
    <div>
      <BackgroundImage Image={MLSBG}>
        <Title
          style={{ lineHeight: "14px", letterSpacing: "2px" }}
          className="text-upper f-50 f-100 text-white"
        >
          MLS
        </Title>
      </BackgroundImage>
      <div className="mls-body">
        <Container className="py-5">
          <Title className="text-center text-white f-40 f-100 text-upper">
            search active LISTINGS
          </Title>
          <Row gutter={[60, 60]} align="middle">
            <Col xs={24} sm={12} lg={12}>
              <Text className="text-white f-bold f-14">Price</Text>
              <Slider
                className="custom-slider"
                defaultValue={minprice}
                trackStyle={{ backgroundColor: "black" }}
                handleStyle={{
                  borderColor: "#838383",
                  backgroundColor: "#838383",
                }}
                tooltip={{ open: false }}
                min={600000}
                max={50000000}
                value={minprice}
                onChange={handlePrice}
              />
              <Flex justify={"space-between"}>
                <Text className="text-white f-bold f-14">
                  {formatPrice(minprice)}{" "}
                </Text>
                <Text className="text-white f-bold f-14">50 M</Text>{" "}
              </Flex>
            </Col>

            {/* <Col lg={12}>
              <Text className="text-white f-bold f-14">LIVING AREA</Text>
              <Slider
                className="custom-slider"
                defaultValue={30}
                trackStyle={{ backgroundColor: "black" }}
                handleStyle={{
                  borderColor: "#838383",
                  backgroundColor: "#838383",
                }}
                tooltip={{ open: false }}
              />
            </Col> */}
            <Col lg={12} xs={18} sm={18}>
              <Dropdown
                menu={{
                  items,
                  onClick: handleMenuClick,
                }}
                className="custom-dropdown"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {propertyType}
                    <DownOutlined style={{ color: "white" }} />
                  </Space>
                </a>
              </Dropdown>
            </Col>
            <Col lg={12} xs={9} sm={18}>
              <Dropdown
                menu={{
                  items: minBathRoom,
                  onClick: handleMenuMinBathRoom,
                }}
                className="custom-dropdown"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {minBathCount}
                    <DownOutlined style={{ color: "white" }} />
                  </Space>
                </a>
              </Dropdown>
            </Col>
            <Col lg={12} xs={9} sm={18}>
              <Dropdown
                menu={{
                  items: maxBathRoom,
                  onClick: handleMenuMaxBathRoom,
                }}
                className="custom-dropdown"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {maxBathCount}
                    <DownOutlined style={{ color: "white" }} />
                  </Space>
                </a>
              </Dropdown>
            </Col>
            <Col lg={12} xs={9} sm={18}>
              <Dropdown
                menu={{
                  items: minBedRoom,
                  onClick: handleMenuMinBedRoom,
                }}
                className="custom-dropdown"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {minBedCount}
                    <DownOutlined style={{ color: "white" }} />
                  </Space>
                </a>
              </Dropdown>
            </Col>
            <Col lg={12} xs={9} sm={18}>
              <Dropdown
                menu={{
                  items: maxBedRoom,
                  onClick: handleMenumaxBedRoom,
                }}
                className="custom-dropdown"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {maxBedCount}
                    <DownOutlined style={{ color: "white" }} />
                  </Space>
                </a>
              </Dropdown>
            </Col>

               <Col lg={18} xs={24} sm={18}>
              <Row gutter={[16, 16]} justify="start">
                {data?.filters?.map((item, index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={6} xl={6}>
                    <Checkbox
                      className="text-white f-16 text-upper"
                      onChange={handleCities}
                      name={item.name}
                    >
                      {item.name}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={24} xs={24} sm={18} align="middle">
              <button
                className="button-secondary text-upper mt-32"
                style={{ width: "20%" }}
                onClick={handleSearchButton}
              >
                Search
              </button>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="pt-98 pb-98">
        {isLoading ? (
          <Spin
            size="large"
            className="d-flex w-100 justify-content-center align-items-center py-5"
          />
        ) : (
          <>
            <Row gutter={[60, 60]}>
              {MLS?.properties?.map((item, index) => (
                <Col
                  key={index}
                  lg={12}
                  md={12}
                  sm={24}
                  onClick={() => navigate(`/mls-detail/${item?.mlsId}`)}
                >
                  <div className="displayy-teamimg-center">
                    <Image
                      src={
                        item?.photos?.[2] ||
                        item?.photos?.[0] ||
                        "https://placehold.co/618x489"
                      }
                      width="100%"
                      className="img-op"
                      fallback="https://placehold.co/618x489"
                      preview={false}
                      style={{
                        aspectRatio: "5/4 !important",
                        objectFit: "cover",
                      }}
                    />

                    <div className="info">
                      <Flex justify={"space-between"} align={"center"}>
                        <button className="button-view">View All</button>
                        <Flex>
                          <IoLocationOutline color="white" size={20} />
                          <Text
                            className="f-14 f-bold text-white"
                            style={{ textAlign: "right" }}
                          >
                            {item?.address?.full}
                            <br />
                            <IoPricetagOutline size={20} /> $ {item?.listPrice}
                          </Text>
                        </Flex>
                      </Flex>
                    </div>

                    <div className="show-info">
                      <div style={{ background: "#fff", height: "50px" }}>
                        <Flex
                          justify={"space-between"}
                          align={"center"}
                          style={{ height: "100%" }}
                        >
                          <Text className="mx-4 f-16 f-bold">
                            {item?.address?.full}
                          </Text>
                          <div className="prop-info">
                            <Text
                              style={{ color: "white" }}
                              className="text-upper"
                            >
                              View More +
                            </Text>
                          </div>
                        </Flex>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <Flex justify={"center"} align="center" className="my-4">
              {MLS?.properties?.length > 0 && (
                <Pagination
                  current={currentPage}
                  total={MLS?.totalCount}
                  pageSize={itemsPerPage}
                  onChange={handlePageChange}
                  responsive
                  showSizeChanger={false}
                />
              )}
            </Flex>
          </>
        )}
      </Container>
      <Icons />
      <LetTalk />
    </div>
  );
}

export default Mls;
