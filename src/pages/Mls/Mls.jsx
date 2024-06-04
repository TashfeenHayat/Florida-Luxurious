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
import { useSelector } from "react-redux";
import useMls from "../../hooks/useMls";
import Property from "../../assets/property.png";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
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
  const [price, setPrice] = useState(0);
  const [propertyType, setPropertyType] = useState("Select property type");
  const [minBathRooms, setMinBathRooms] = useState("min Bathrooms");
  const [maxBathRooms, setMaxBathRooms] = useState("Max Bathrooms");
  const [minBedRooms, setMinBedRooms] = useState("min BedRooms");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const navigate = useNavigate();

  const { data: MLS, isLoading } = useMls(true, itemsPerPage, currentPage);

  const { data } = useSelector((s) => s.getFiltersReducer);

  const handlePrice = (price) => {
    setPrice(price);
  };

  const handleMenuClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    setPropertyType(selectedItem.label.props.children);
  };

  const handleMenuMinBathRoom = (e) => {
    const selectedItem = minBathRoom.find((item) => item.key === e.key);
    setMinBathRooms(selectedItem.label.props.children);
  };

  const handleMenuMaxBathRoom = (e) => {
    const selectedItem = maxBathRoom.find((item) => item.key === e.key);
    setMaxBathRooms(selectedItem.label.props.children);
  };
  const handleMenuMinBedRoom = (e) => {
    const selectedItem = minBedRoom.find((item) => item.key === e.key);
    setMinBedRooms(selectedItem.label.props.children);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Calculate the properties for the current page

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
            search active LISTING
          </Title>
          <Row gutter={[60, 60]}>
            <Col lg={12}>
              <Text className="text-white f-bold f-14">Price</Text>
              <Slider
                className="custom-slider"
                defaultValue={price}
                trackStyle={{ backgroundColor: "black" }}
                handleStyle={{
                  borderColor: "#838383",
                  backgroundColor: "#838383",
                }}
                tooltip={{ open: false }}
                max={20}
                value={price}
                onChange={handlePrice}
              />
              <Flex justify={"space-between"}>
                <Text className="text-white f-bold f-14">{price} M</Text>
                <Text className="text-white f-bold f-14">20 M</Text>
              </Flex>
            </Col>
            <Col lg={12}>
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
            </Col>
            <Col lg={12}>
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
            <Col lg={12}>
              <Dropdown
                menu={{
                  items: minBathRoom,
                  onClick: handleMenuMinBathRoom,
                }}
                className="custom-dropdown"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {minBathRooms}
                    <DownOutlined style={{ color: "white" }} />
                  </Space>
                </a>
              </Dropdown>
            </Col>
            <Col lg={12}>
              <Dropdown
                menu={{
                  items: maxBathRoom,
                  onClick: handleMenuMaxBathRoom,
                }}
                className="custom-dropdown"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {maxBathRooms}
                    <DownOutlined style={{ color: "white" }} />
                  </Space>
                </a>
              </Dropdown>
            </Col>
            <Col lg={12}>
              <Dropdown
                menu={{
                  items: minBedRoom,
                  onClick: handleMenuMinBedRoom,
                }}
                className="custom-dropdown"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {minBedRooms}
                    <DownOutlined style={{ color: "white" }} />
                  </Space>
                </a>
              </Dropdown>
            </Col>
            <Col lg={24}>
              <Flex justify={"start"} wrap>
                <Flex justify={"space-around"} gap={10} wrap>
                  {data?.filters.map((item, index) => (
                    <Checkbox
                      className="text-white f-16 text-upper"
                      key={index}
                    >
                      {item.name}
                    </Checkbox>
                  ))}
                </Flex>
              </Flex>
            </Col>
            <Col lg={24} align="middle">
              <button
                className="button-secondary text-upper mt-32"
                style={{ width: "20%" }}
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
                      style={{ aspectRatio: "5/4", objectFit: "cover" }}
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
    </div>
  );
}

export default Mls;
