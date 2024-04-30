import { Typography, Row, Col, Flex, Pagination } from "antd";
import { useState } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import FeaturedPropertiesImage from "../../assets/Agent.png";
import { Container } from "react-bootstrap";
import Property from "../../assets/property.png";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import Lettalk from "../../components/LetTalk";
const { Title, Text } = Typography;

function SoldProperties() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Number of items to display per page

  // Dummy data for demonstration
  const soldProperties = [
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },

    // Add more properties as needed
  ];

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = soldProperties.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <BackgroundImage Image={FeaturedPropertiesImage}>
        <Title className="text-white text-upper f-50">Sold properties</Title>
      </BackgroundImage>
      <Container className="pt-98 pb-98">
        <Row gutter={[60, 60]}>
          {currentItems.map((property, index) => (
            <Col lg={12} key={index}>
              <div className="displayy-teamimg-center">
                <img src={Property} width="100%" className="" />
                <div className="more-info-property">
                  <Flex
                    vertical
                    align={"center"}
                    justify="center"
                    style={{ height: "100%" }}
                    gap={30}
                  >
                    <div className="for-sale-properites">
                      <Text className="text-center text-upper f-24 f-bold">
                        sold
                      </Text>
                    </div>
                    <Flex vertical>
                      <Text className="text-center text-upper f-24 f-bold text-white">
                        address
                      </Text>
                      <Text className="text-center text-upper f-24 f-100 text-gray">
                        {property.address}
                      </Text>
                    </Flex>
                    <Flex vertical>
                      <Text className="text-center text-upper f-24 f-bold text-white">
                        last list price
                      </Text>
                      <Text className="text-center text-upper f-24 f-100 text-gray">
                        {property.price}
                      </Text>
                    </Flex>
                    <Flex vertical>
                      <Text className="text-center text-upper f-24 f-bold text-white">
                        represented
                      </Text>
                      <Text className="text-center text-upper f-24 f-100 text-gray">
                        seller
                      </Text>
                    </Flex>
                    <Flex vertical>
                      <button className="let-talk-btn">View Property</button>
                    </Flex>
                  </Flex>
                </div>
                {/* <div className="p-absoulte right-0 top-0 for-sale-more">
                  <div
                    style={{
                      height: "45px",
                      width: "150px",
                      background: "black",
                    }}
                  >
                    <Flex
                      justify={"center"}
                      align="center"
                      style={{ height: "inherit" }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textTransform: "uppercase",
                          lineHeight: "23.8px",
                          letterSpacing: "1px",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        Sold
                      </Text>
                    </Flex>
                  </div>
                </div> */}
                <div className="info">
                  <Flex justify={"end"} align={"center"}>
                    <Flex>
                      <IoLocationOutline color="white" size={20} />
                      <Text className="f-14 f-bold text-white">
                        2572 Mercedes Drive <br />
                        <IoPricetagOutline size={20} /> $15,000,0000
                      </Text>
                    </Flex>
                  </Flex>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <Flex justify={"center"} align="center" className="my-4">
          <Pagination
            defaultCurrent={1}
            total={soldProperties.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </Flex>
      </Container>
      <Lettalk />
    </>
  );
}

export default SoldProperties;
