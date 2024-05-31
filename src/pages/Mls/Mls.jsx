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
} from "antd";
import MLS from "../../assets/MLS.png";
import { Container } from "react-bootstrap";
import Icons from "../../components/Icons";
import { DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
const { Title, Text } = Typography;

const items = [
  {
    key: "1",
    label: <Text className="text-black">Residential</Text>,
  },
  {
    key: "2",
    label: <Text className="text-black">Condominium</Text>,
  },
  {
    key: "3",
    label: <Text className="text-black">Rental</Text>,
  },
];
const bathRoom = [
  {
    key: "1",
    label: <Text className="text-black">1</Text>,
  },
  {
    key: "2",
    label: <Text className="text-black">2</Text>,
  },
  {
    key: "3",
    label: <Text className="text-black">3</Text>,
  },
  {
    key: "4",
    label: <Text className="text-black">4</Text>,
  },
  {
    key: "5",
    label: <Text className="text-black">5</Text>,
  },
  {
    key: "6",
    label: <Text className="text-black">6</Text>,
  },
  {
    key: "7",
    label: <Text className="text-black">7</Text>,
  },
  {
    key: "8",
    label: <Text className="text-black">8</Text>,
  },
  {
    key: "9",
    label: <Text className="text-black">9</Text>,
  },
  {
    key: "10",
    label: <Text className="text-black">10</Text>,
  },
];
const bedRoom = [
  {
    key: "1",
    label: <Text className="text-black">1</Text>,
  },
  {
    key: "2",
    label: <Text className="text-black">2</Text>,
  },
  {
    key: "3",
    label: <Text className="text-black">3</Text>,
  },
  {
    key: "4",
    label: <Text className="text-black">4</Text>,
  },
  {
    key: "5",
    label: <Text className="text-black">5</Text>,
  },
  {
    key: "6",
    label: <Text className="text-black">6</Text>,
  },
  {
    key: "7",
    label: <Text className="text-black">7</Text>,
  },
  {
    key: "8",
    label: <Text className="text-black">8</Text>,
  },
  {
    key: "9",
    label: <Text className="text-black">9</Text>,
  },
  {
    key: "10",
    label: <Text className="text-black">10</Text>,
  },
];
function Mls() {
  const [price, setPrice] = useState(0);
  const [propertyType, setPropertyType] = useState("Select property type");
  const [bathRooms, setBathRooms] = useState("Bathrooms");
  const [bedRooms, setBedRooms] = useState("BedRooms");

  const { data } = useSelector((s) => s.getFiltersReducer);
  console.log(data?.filters);

  const handlePrice = (price) => {
    setPrice(price);
  };

  const handleMenuClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    setPropertyType(selectedItem.label.props.children);
  };

  const handleMenuBathRoom = (e) => {
    const selectedItem = bathRoom.find((item) => item.key === e.key);
    setBathRooms(selectedItem.label.props.children);
  };

  const handleMenuBedRoom = (e) => {
    const selectedItem = bedRoom.find((item) => item.key === e.key);
    setBedRooms(selectedItem.label.props.children);
  };
  return (
    <div>
      <BackgroundImage Image={MLS}>
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
                  items: bathRoom,
                  onClick: handleMenuBathRoom,
                }}
                className="custom-dropdown"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {bathRooms}
                    <DownOutlined style={{ color: "white" }} />
                  </Space>
                </a>
              </Dropdown>
            </Col>
            <Col lg={12}>
              <Dropdown
                menu={{
                  items: bedRoom,
                  onClick: handleMenuBedRoom,
                }}
                className="custom-dropdown"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {bedRooms}
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
          </Row>
        </Container>
      </div>
      <Icons />
    </div>
  );
}

export default Mls;
