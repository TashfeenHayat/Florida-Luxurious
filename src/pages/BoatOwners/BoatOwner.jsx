import React from "react";
import { Col, Row, Typography, Card, Image, Table } from "antd";
import BackgroundImage from "../../components/BackgroundImage";
import BoatImage from "../../assets/boatowner.png";
import { Container } from "react-bootstrap";
import Bdiagram from "../../assets/Bdiagram.png";
const { Title, Paragraph, Text } = Typography;
const columns = [
  {
    title: <Text className="f-16 f-100">BAY COLONY</Text>,
    dataIndex: "bay",
    key: "1",
    render: (text) => (
      <Text className="f-16 f-100" style={{ color: "#838383" }}>
        {text}
      </Text>
    ),
  },
  {
    title: <Text className="f-16 f-100">CANAL WIDTH</Text>,
    dataIndex: "canal",
    render: (text) => (
      <Text className="f-16 f-100" style={{ color: "#838383" }}>
        {text}
      </Text>
    ),
  },

  {
    title: <Text className="f-16 f-100">SET BACKS</Text>,
    key: "set",
    dataIndex: "set",
    render: (text) => (
      <Text className="f-16 f-100" style={{ color: "#838383" }}>
        {text}
      </Text>
    ),
  },
];
const data = [
  {
    key: "1",
    bay: "North Compass Drive",
    canal: "90",
    set: "10'",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    bay: "Bay Colony Drive",
    canal: "90",
    set: "10'",
    tags: ["nice", "developer"],
  },
  {
    key: "3",
    bay: "Compass Isle",
    canal: "90",
    set: "10'",
    tags: ["nice", "developer"],
  },
  {
    key: "4",
    bay: "Compass Lane",
    canal: "90",
    set: "10'",
    tags: ["nice", "developer"],
  },
  {
    key: "5",
    bay: "Bay Colony Lane",
    canal: "100",
    set: "10'",
    tags: ["nice", "developer"],
  },
  {
    key: "6",
    bay: "Compass Road",
    canal: "90",
    set: "10'",
    tags: ["nice", "developer"],
  },
  {
    key: "7",
    bay: "Compass Drive",
    canal: "Open",
    set: "10'",
    tags: ["nice", "developer"],
  },
  {
    key: "8",
    bay: "Compass Point",
    canal: "90",
    set: "10'",
    tags: ["nice", "developer"],
  },
  {
    key: "9",
    bay: "Bay Colony Point",
    canal: "90",
    set: "10'",
    tags: ["nice", "developer"],
  },
];
const columns1 = [
  {
    title: (
      <Text className="f-16 f-100 text-upper">
        Collee hammock-Victoria park
      </Text>
    ),
    dataIndex: "bay",
    key: "1",
    render: (text) => (
      <Text
        className="f-16 f-100"
        style={{ color: "#838383", textTransform: "capitalize" }}
      >
        {text}
      </Text>
    ),
  },
  {
    title: <Text className="f-16 f-100 text-upper">CANAL WIDTH</Text>,
    dataIndex: "canal",
    render: (text) => (
      <Text
        className="f-16 f-100"
        style={{ color: "#838383", textTransform: "capitalize" }}
      >
        {text}
      </Text>
    ),
  },

  {
    title: <Text className="f-16 f-100">SET BACKS</Text>,
    key: "set",
    dataIndex: "set",
    render: (text) => (
      <Text className="f-16 f-100" style={{ color: "#838383" }}>
        {text}
      </Text>
    ),
  },
];
const data1 = [
  {
    key: "1",
    bay: "NE 17th avenue",
    canal: "N 103 s 135",
    set: "5'",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    bay: "20th Avenue",
    canal: "e 280",
    set: "5'",
    tags: ["nice", "developer"],
  },
  {
    key: "3",
    bay: "S Victoria park road",
    canal: "e 150 w 130",
    set: "5'",
    tags: ["nice", "developer"],
  },
  {
    key: "4",
    bay: "north Gordon",
    canal: "w 130 e 140",
    set: "5'",
    tags: ["nice", "developer"],
  },
  {
    key: "5",
    bay: "Victoria terrace",
    canal: "e 100",
    set: "5'",
    tags: ["nice", "developer"],
  },
  {
    key: "6",
    bay: "Brickell drive",
    canal: "new river open",
    set: "10'",
    tags: ["nice", "developer"],
  },
];
const columns2 = [
  {
    title: (
      <Text className="f-16 f-100 text-upper">
        Collee hammock-Victoria park
      </Text>
    ),
    dataIndex: "bay",
    key: "1",
    render: (text) => (
      <Text
        className="f-16 f-100"
        style={{ color: "#838383", textTransform: "capitalize" }}
      >
        {text}
      </Text>
    ),
  },
  {
    title: <Text className="f-16 f-100 text-upper">CANAL WIDTH</Text>,
    dataIndex: "canal",
    render: (text) => (
      <Text
        className="f-16 f-100"
        style={{ color: "#838383", textTransform: "capitalize" }}
      >
        {text}
      </Text>
    ),
  },

  {
    title: <Text className="f-16 f-100">SET BACKS</Text>,
    key: "set",
    dataIndex: "set",
    render: (text) => (
      <Text className="f-16 f-100" style={{ color: "#838383" }}>
        {text}
      </Text>
    ),
  },
];
const data2 = [
  {
    bay: "NE 25th street",
    canal: "S 110 N 100",
    set: "10'",
  },
  {
    bay: "NE 25th court",
    canal: "S 100 N 100",
    set: "10'",
  },
  {
    bay: "NE 26th street",
    canal: "S 100",
    set: "10'",
  },
  {
    bay: "NE 26th court",
    canal: "N 105",
    set: "10'",
  },
  {
    bay: "NE 26th place",
    canal: "S 105 N 110",
    set: "10'",
  },
  {
    bay: "NE 27th street",
    canal: "S 110 N 110",
    set: "10'",
  },
  {
    bay: "NE 28th street",
    canal: "S 110 N 110",
    set: "10'",
  },
  {
    bay: "NE 29th street",
    canal: "S 110 N 110",
    set: "10'",
  },
  {
    bay: "NE 30th street",
    canal: "S 110",
    set: "10'",
  },
  {
    bay: "NE 32nd street",
    canal: "N 110",
    set: "10'",
  },
  {
    bay: "NE 33rd court",
    canal: "S 110 N 110",
    set: "10'",
  },
  {
    bay: "NE 35th street",
    canal: "S 110 N 110",
    set: "10'",
  },
  {
    bay: "NE 35th court",
    canal: "S 110 N 110",
    set: "10'",
  },
  {
    bay: "NE 36th street",
    canal: "S 110 N 110",
    set: "10'",
  },
  {
    bay: "NE 37th street",
    canal: "S 110 N 110",
    set: "10'",
  },
  {
    bay: "NE 37th court",
    canal: "S 110 N 195",
    set: "10'",
  },
  {
    bay: "NE 38th street",
    canal: "S 195 N 80",
    set: "5'",
  },
  {
    bay: "NE 39th street",
    canal: "S 80 N 80",
    set: "5'",
  },
  {
    bay: "NE 40th street",
    canal: "S 80 N 80",
    set: "5'",
  },
  {
    bay: "NE 40th court",
    canal: "S 80 N 80",
    set: "5'",
  },
  {
    bay: "NE 41th street",
    canal: "S 80 N 80",
    set: "5'",
  },
  {
    bay: "NE 42nd street",
    canal: "S 80 N 80",
    set: "5'",
  },
  {
    bay: "NE 43rd street",
    canal: "S 80 N 80",
    set: "5'",
  },
  {
    bay: "NE 44th street",
    canal: "S 80 N 80",
    set: "5'",
  },
  {
    bay: "NE 45th street",
    canal: "S 80 N 80",
    set: "5'",
  },
  {
    bay: "NE 46th street",
    canal: "S 80 N 80",
    set: "5'",
  },
  {
    bay: "NE 47th street",
    canal: "S 80 N 80",
    set: "5'",
  },
  {
    bay: "NE 47th court",
    canal: "S 80 N 80",
    set: "5'",
  },
  {
    bay: "NE 48th street",
    canal: "S 80 N 80",
    set: "5'",
  },
  {
    bay: "NE 49th street",
    canal: "S 80",
    set: "5'",
  },
  {
    bay: "NE 51st street",
    canal: "N 80",
    set: "5'",
  },
];

function BoatOwner() {
  return (
    <>
      <BackgroundImage Image={BoatImage}>
        <Title
          style={{ color: "white", lineHeight: "14px", letterSpacing: "2px" }}
          className="text-upper f-50 f-100"
        >
          Boat owners
        </Title>
      </BackgroundImage>
      <Container>
        <Row gutter={[10, 20]} align="middle">
          <Col lg={12} md={12} sm={24} xs={24}>
            <Card className="card-feature boxshadow-section">
              <Title
                style={{ textAlign: "center", lineHeight: 2 }}
                className="text-upper"
              >
                FOR BOAT OWNERS
              </Title>
              <Paragraph className="f-16 f-100" style={{ lineHeight: 2 }}>
                Known as the “Venice of America” Fort Lauderdale offers 165
                miles of waterways with endless options to make your home where
                your yacht is. Whether you are looking for a single-family
                residence or a condominium there are many waterfront
                neighborhoods located on private canals, the Intracoastal
                Waterway, direct oceanfront, the New River or lakefront that
                provide unrestricted access to the sparkling Atlantic Ocean.
              </Paragraph>
              <Paragraph className="f-24 f-100" style={{ lineHeight: 1.5 }}>
                <Text className="f-16 f-bold">
                  Ocean Access:
                  <Text className="f-100">
                    {" "}
                    Check distance to nearest inlet for timely access to open
                    waters.
                  </Text>
                </Text>
                <br />
                <Text className="f-16 f-bold">
                  Fixed Bridges:
                  <Text className="f-100">
                    {" "}
                    Ensure bridge clearance at high and low tides for vessel
                    height and draft.
                  </Text>
                </Text>
                <br />
                <Text className="f-16 f-bold">
                  Set-Backs:
                  <Text className="f-100">
                    {" "}
                    Understand view corridor restrictions for vessel length
                    beyond property lines.
                  </Text>
                </Text>
                <br />
                <Text className="f-16 f-bold">
                  Canal Width:
                  <Text className="f-100">
                    {" "}
                    Confirm vessel beam doesn't exceed 30% past property line,
                    including dock.
                  </Text>
                </Text>
                <br />
                <Text className="f-16 f-bold">
                  Canal Depth:
                  <Text className="f-100">
                    {" "}
                    Know vessel draft for tide changes and ensure adequate water
                    depth at dock.
                  </Text>
                </Text>
                <br />
                <Text className="f-16 f-bold">
                  Hoists and Lifts:
                  <Text className="f-100">
                    {" "}
                    Verify weight capacity for watercraft and toys.
                  </Text>
                </Text>
              </Paragraph>
            </Card>
          </Col>
          <Col lg={12} md={12} sm={24} xs={24}>
            <Image src={Bdiagram} preview={false} />
          </Col>
        </Row>
        <div className="my-124">
          <Title
            style={{ color: "black", lineHeight: "14px", letterSpacing: "2px" }}
            className="text-upper f-50 f-100 text-center"
          >
            Boat owners
          </Title>
          <Row>
            <Col lg={4}></Col>
            <Col lg={16} className="pt-5">
              <Table
                columns={columns}
                dataSource={data}
                className="box-shadow-table custom-table"
                pagination={false}
                rowHoverable={false}
              />
              <Table
                columns={columns1}
                dataSource={data1}
                className="boxshadow-section custom-table"
                pagination={false}
                rowHoverable={false}
              />
              <Table
                columns={columns2}
                dataSource={data2}
                className="boxshadow-section custom-table"
                pagination={false}
                rowHoverable={false}
              />
            </Col>
            <Col lg={4}></Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default BoatOwner;
