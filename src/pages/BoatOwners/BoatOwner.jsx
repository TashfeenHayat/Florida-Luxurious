import React from "react";
import { Col, Row, Typography, Card, Image, Table } from "antd";
import BackgroundImage from "../../components/BackgroundImage";
import BoatImage from "../../assets/boatowner.png";
import { Container } from "react-bootstrap";
import Bdiagram from "../../assets/Bdiagram.png";
import LetTalk from "../../components/LetTalk";
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
const columns3 = [
  {
    title: <Text className="f-16 f-100 text-upper">harbor beach</Text>,
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
const data3 = [
  {
    bay: "East Lake Drive",
    canal: "N 220+",
    set: "10’",
  },
  {
    bay: "River Lane Drive",
    canal: "W 85′",
    set: "10’",
  },
  {
    bay: "West Lake Drive",
    canal: "E 220",
    set: "10’",
  },
  {
    bay: "Mercedes Drive",
    canal: "S 130 N 150",
    set: "10’",
  },
  {
    bay: "Lucille Drive",
    canal: "S 150 N 110",
    set: "10’",
  },
  {
    bay: "Laguna Drive",
    canal: "S 110 N 120-Open",
    set: "10’",
  },
  {
    bay: "Laguna Terrace",
    canal: "S 120-150-Open",
    set: "10’",
  },
  {
    bay: "Del Lago Drive",
    canal: "S 150 N 120",
    set: "10’",
  },
  {
    bay: "Isla Bahia Drive",
    canal: "S 120-open N 110-open",
    set: "10’",
  },
  {
    bay: "Harborage Isle Drive",
    canal: "N 110-open",
    set: "10’",
  },
  {
    bay: "Isla Bahia Terrace",
    canal: null,
    set: "10’",
  },
];
const columns4 = [
  {
    title: <Text className="f-16 f-100 text-upper">harbor MILE</Text>,
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
const data4 = [
  {
    bay: "Hillsboro Mile",
    canal: "ICW Open",
    set: "10’",
  },
];
const columns5 = [
  {
    title: (
      <Text className="f-16 f-100 text-upper">IDLEWYLD - RIVIERA ISLES</Text>
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
const data5 = [
  {
    bay: "Solar Plaza Drive",
    canal: "W 90-180 E 100",
    set: "10’",
  },
  {
    bay: "Flamingo Drive",
    canal: "W 90-180 E 90",
    set: "10’",
  },
  {
    bay: "Solar Isle Drive",
    canal: "W 100 E 85",
    set: "10’",
  },
  {
    bay: "Riviera Isles Drive",
    canal: "W 85 E 100",
    set: "10’",
  },
  {
    bay: "Poinciana Drive",
    canal: "W 110",
    set: "10’",
  },
  {
    bay: "Idlewyld Drive",
    canal: "E Open",
    set: "10’",
  },
];
const columns6 = [
  {
    title: <Text className="f-16 f-100 text-upper">The Landings</Text>,
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
const data6 = [
  {
    bay: "Bayview Drive",
    canal: "E 90",
    set: "5’",
  },
  {
    bay: "NE 31st Avenue",
    canal: "W 90 E 90",
    set: "5’",
  },
  {
    bay: "NE 55th Court",
    canal: "S 90 N Open",
    set: "5’",
  },
  {
    bay: "NE 32nd Avenue",
    canal: "W 90 E 90",
    set: "5’",
  },
  {
    bay: "NE 33rd Avenue",
    canal: "W 90 E Intracostal",
    set: "5’",
  },
  {
    bay: "NE 56th Court",
    canal: "S 90 N 90",
    set: "5’",
  },
  {
    bay: "NE 57th Street",
    canal: "S 90 N 90",
    set: "5’",
  },
  {
    bay: "NE 57th Court",
    canal: "S 90 N 100",
    set: "5’",
  },
  {
    bay: "NE 58th Street",
    canal: "S 100 N 100",
    set: "5’",
  },
  {
    bay: "NE 59th Street",
    canal: "S 100 N 100",
    set: "5’",
  },
];
const columns7 = [
  {
    title: <Text className="f-16 f-100 text-upper">The Landings</Text>,
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

const data7 = [
  {
    bay: "Mola Avenue",
    canal: null,
    set: "5’",
  },
  {
    bay: "Isle of Capri",
    canal: "W 110 E 105",
    set: "5’",
  },
  {
    bay: "Bontana Avenue",
    canal: "W 105 E 95",
    set: "5’",
  },
  {
    bay: "Coconut Isle",
    canal: "W 95 E 90",
    set: "5’",
  },
  {
    bay: "Lido Drive",
    canal: "W 90 E 86",
    set: "10’",
  },
  {
    bay: "San Marco Drive",
    canal: "W 85 E 85",
    set: "10’",
  },
  {
    bay: "Coral Way",
    canal: "W 85 E 90",
    set: "10’",
  },
  {
    bay: "Royal Plaza Drive",
    canal: "W 85 E 90‐180",
    set: "10’",
  },
  {
    bay: "Isles of Palms",
    canal: "W 90‐180 E 85",
    set: "10’",
  },
  {
    bay: "Gordon Road",
    canal: "W 150 E 300",
    set: "5’",
  },
  {
    bay: "Hendricks Isle",
    canal: "W 300 E 160",
    set: "10’",
  },
  {
    bay: "Isle of Venice",
    canal: "W 160 E 110",
    set: "10’",
  },
  {
    bay: "Fiesta Way",
    canal: "W 110 E 110",
    set: "10’",
  },
  {
    bay: "Nurmi Drive",
    canal: "W 110 E 110",
    set: "10’",
  },
  {
    bay: "Royal Palm Drive",
    canal: "W 110 E 110",
    set: "10’",
  },
  {
    bay: "Seven Isles",
    canal: "W 100",
    set: "10’",
  },
  {
    bay: "Del Mar Place",
    canal: "S 100 N 90",
    set: "10’",
  },
  {
    bay: "Castilla Place",
    canal: "S 90 N 90",
    set: "10’",
  },
  {
    bay: "Pelican Drive",
    canal: "S 90 N 100",
    set: "10’",
  },
  {
    bay: "Sea Island Drive",
    canal: "S 100 N 100",
    set: "10’",
  },
  {
    bay: "Barcelona Drive",
    canal: "S 100 N 95",
    set: "10’",
  },
  {
    bay: "Aqua Vista Boulevard",
    canal: "S 95 N Open",
    set: "10’",
  },
  {
    bay: "Desota Drive",
    canal: "N 100",
    set: "10’",
  },
];
const columns8 = [
  {
    title: <Text className="f-16 f-100 text-upper">LAUDERDALE-BY-THE-SEA</Text>,
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
const data8 = [
  {
    bay: "West Tradewinds",
    canal: "Open",
    set: "5’",
  },
  {
    bay: "East Tradewinds",
    canal: "90",
    set: "5’",
  },
  {
    bay: "South Tradewinds",
    canal: "100",
    set: "5’",
  },
  {
    bay: "Tropic Drive",
    canal: "100",
    set: "5’",
  },
  {
    bay: "Imperial Lane",
    canal: "90",
    set: "5’",
  },
  {
    bay: "Codrington Drive",
    canal: "90",
    set: "5’",
  },
  {
    bay: "NE 42nd Court",
    canal: "110",
    set: "5’",
  },
  {
    bay: "NE 34th Avenue",
    canal: "100",
    set: "10’",
  },
  {
    bay: "Castle Harbor Isles",
    canal: "E 100 S 110",
    set: "5’",
  },
  {
    bay: "Fort Royal Isle",
    canal: "E 100 S 110",
    set: "5’",
  },
];
const columns9 = [
  {
    title: (
      <Text className="f-16 f-100 text-upper">
        LAUDERDALE HARBOR - RIO VISTA
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
const data9 = [
  {
    bay: "SE 14th Street",
    canal: "S 140 N 155",
    set: "5’",
  },
  {
    bay: "SE 13th Street",
    canal: "S 155 N 140",
    set: "5’",
  },
  {
    bay: "SE 12th Court",
    canal: "S 140 N 110",
    set: "5’",
  },
  {
    bay: "SE 12th Street",
    canal: "S 110 N 110",
    set: "North 10' / South 5'",
  },
  {
    bay: "SE 11th Street",
    canal: "S 110 N 105",
    set: "10’",
  },
  {
    bay: "SE 10th Street",
    canal: "S 105 N 120",
    set: "10’",
  },
  {
    bay: "SE 9th Street",
    canal: "S 120 N 120-300",
    set: "10’",
  },
  {
    bay: "SE 8th Street",
    canal: "S 120-300 N 120",
    set: "10’",
  },
  {
    bay: "SE 7th Street",
    canal: "S 125 N open",
    set: "10’",
  },
  {
    bay: "Cordova Road",
    canal: "E 80-110",
    set: "5’",
  },
  {
    bay: "Ponce De Leon Drive",
    canal: "70-120",
    set: "5’",
  },
  {
    bay: "Rio Vista Boulevard",
    canal: "70-120",
    set: "5’",
  },
];
const columns10 = [
  {
    title: <Text className="f-16 f-100 text-upper">SUNRISE KEY</Text>,
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
const data10 = [
  {
    bay: "Sunrise Key Boulevard",
    canal: "S 290 N 110",
    set: "10’",
  },
  {
    bay: "1st Key Drive",
    canal: "N 120 E 120",
    set: "10’",
  },
  {
    bay: "2nd Key Drive",
    canal: "W 100 E 94",
    set: "10’",
  },
  {
    bay: "3rd Key Drive",
    canal: "W 94 E 100",
    set: "10’",
  },
  {
    bay: "4th Key Drive",
    canal: "W 100 E 97",
    set: "10’",
  },
  {
    bay: "5th Key Drive",
    canal: "W 97 E 300 Open",
    set: "10’",
  },
  {
    bay: "Karen Drive",
    canal: "E 120",
    set: "10’",
  },
  {
    bay: "Middle River Drive",
    canal: "S Open",
    set: "10’",
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
        <Row gutter={[80, 80]} align="middle">
          <Col lg={12} md={12} sm={24} xs={24}>
            <Card
              className="card-feature boxshadow-section"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
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
          <Col
            lg={12}
            md={12}
            sm={24}
            xs={24}
            data-aos="fade-left"
            data-aos-duration="1500"
          >
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
                align="center"
                data-aos="fade-left"
                data-aos-duration="1500"
              />
              <Table
                columns={columns1}
                dataSource={data1}
                className="boxshadow-section custom-table"
                pagination={false}
                rowHoverable={false}
                data-aos="fade-left"
                data-aos-duration="1500"
              />
              <Table
                columns={columns2}
                dataSource={data2}
                className="boxshadow-section custom-table"
                pagination={false}
                rowHoverable={false}
                data-aos="fade-left"
                data-aos-duration="1500"
              />
              <Table
                columns={columns3}
                dataSource={data3}
                className="boxshadow-section custom-table"
                pagination={false}
                rowHoverable={false}
                data-aos="fade-left"
                data-aos-duration="1500"
              />
              <Table
                columns={columns4}
                dataSource={data4}
                className="boxshadow-section custom-table"
                pagination={false}
                rowHoverable={false}
                data-aos="fade-left"
                data-aos-duration="1500"
              />
              <Table
                columns={columns4}
                dataSource={data4}
                className="boxshadow-section custom-table"
                pagination={false}
                rowHoverable={false}
                data-aos="fade-left"
                data-aos-duration="1500"
              />
              <Table
                columns={columns5}
                dataSource={data5}
                className="boxshadow-section custom-table"
                pagination={false}
                rowHoverable={false}
                data-aos="fade-left"
                data-aos-duration="1500"
              />
              <Table
                columns={columns6}
                dataSource={data6}
                className="boxshadow-section custom-table"
                pagination={false}
                rowHoverable={false}
                data-aos="fade-left"
                data-aos-duration="1500"
              />
              <Table
                columns={columns7}
                dataSource={data7}
                className="boxshadow-section custom-table"
                pagination={false}
                rowHoverable={false}
                data-aos="fade-left"
                data-aos-duration="1500"
              />
              <Table
                columns={columns8}
                dataSource={data8}
                className="boxshadow-section custom-table"
                pagination={false}
                rowHoverable={false}
                data-aos="fade-left"
                data-aos-duration="1500"
              />
              <Table
                columns={columns9}
                dataSource={data9}
                className="boxshadow-section custom-table"
                pagination={false}
                rowHoverable={false}
                data-aos="fade-left"
                data-aos-duration="1500"
              />
              <Table
                columns={columns10}
                dataSource={data10}
                className="boxshadow-section custom-table"
                pagination={false}
                rowHoverable={false}
                data-aos="fade-left"
                data-aos-duration="1500"
              />
            </Col>
            <Col lg={4}></Col>
          </Row>
        </div>
      </Container>
      <div style={{ background: "black" }}>
        <div style={{ paddingTop: 96, paddingBottom: 96 }}>
          <Title className="text-white text-center text-upper">
            Local Marinas
          </Title>
          <Row>
            <Col lg={4}></Col>
            <Col lg={16} className="pt-5">
              <Row>
                <Col
                  lg={12}
                  md={12}
                  sm={24}
                  data-aos="fade-right"
                  data-aos-duration="1500"
                >
                  <Paragraph
                    className="f-16 f-bold text-white"
                    style={{ textTransform: "capitalize" }}
                  >
                    <Text className="f-24 f-bold text-white">Marina</Text>
                    <br />
                    <Text className="f-24 f-bold text-white">
                      Las Olas Marina
                    </Text>
                    <br />
                    <Text className="f-24 f-bold text-white">
                      Lauderdale Marina
                    </Text>
                    <br />
                    <Text className="f-24 f-bold text-white">
                      Bahia Mar Yachting Center
                    </Text>
                    <br />
                    <Text className="f-24 f-bold text-white">Marina Bay</Text>
                    <br />
                    <Text className="f-24 f-bold text-white">
                      Boathouse Yacht Facility
                    </Text>
                    <br />
                    <Text className="f-24 f-bold text-white">
                      Hall of Fame Marina
                    </Text>
                    <br />
                    <Text className="f-24 f-bold text-white">
                      Riverfront Marina
                    </Text>
                    <br />
                    <Text className="f-24 f-bold text-white">
                      Sunrise Harbor Marina
                    </Text>
                    <br />
                    <Text className="f-24 f-bold text-white">
                      Pier Sixty-Six Marina
                    </Text>
                    <br />
                    <Text className="f-24 f-bold text-white">
                      River Bend Marina
                    </Text>
                    <br />
                    <Text className="f-24 f-bold text-white">
                      The Port Marina
                    </Text>
                    <br />
                    <Text className="f-24 f-bold text-white">
                      City of Fort Lauderdale Marine Faciities
                    </Text>
                  </Paragraph>
                </Col>
                <Col lg={3} md={3} sm={0}></Col>
                <Col lg={1} md={3} sm={0}></Col>

                <Col
                  lg={8}
                  md={8}
                  sm={24}
                  data-aos="fade-left"
                  data-aos-duration="1500"
                >
                  <Paragraph
                    className="f-16 f-100 text-white"
                    style={{ textTransform: "capitalize" }}
                  >
                    <Text className="f-24 f-100 text-white">Website</Text>
                    <br />
                    <Text className="f-24 f-100 text-white">
                      LasOlasMarina.com
                    </Text>
                    <br />
                    <Text className="f-24 f-100 text-white">
                      LauderdaleMarina.com
                    </Text>{" "}
                    <br />
                    <Text className="f-24 f-100 text-white">
                      BahiaMarYachtingCenter.com
                    </Text>{" "}
                    <br />
                    <Text className="f-24 f-100 text-white">
                      marinabay-fl.com
                    </Text>{" "}
                    <br />
                    <Text className="f-24 f-100 text-white">
                      BoathouseYachtFacility.com
                    </Text>{" "}
                    <br />
                    <Text className="f-24 f-100 text-white">
                      HallofFameMarina.net
                    </Text>{" "}
                    <br />
                    <Text className="f-24 f-100 text-white">
                      RiverfrontMarina.com
                    </Text>{" "}
                    <br />
                    <Text className="f-24 f-100 text-white">
                      SunriseHarborMarina.net
                    </Text>{" "}
                    <br />
                    <Text className="f-24 f-100 text-white">
                      66Marina.com
                    </Text>{" "}
                    <br />
                    <Text className="f-24 f-100 text-white">
                      LauderdaleMarineCenter.com
                    </Text>{" "}
                    <br />
                    <Text className="f-24 f-100 text-white">
                      ThePortMarina.com
                    </Text>{" "}
                    <br />
                    <Text className="f-24 f-100 text-white">954-828-5423</Text>
                  </Paragraph>
                </Col>
              </Row>
            </Col>
            <Col lg={4}></Col>
          </Row>
        </div>
        <LetTalk />
      </div>
    </>
  );
}

export default BoatOwner;
