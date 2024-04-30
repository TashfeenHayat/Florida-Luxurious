import React, { useState } from "react";
import { Typography, Row, Col, Flex, Pagination } from "antd";
import BackgroundImage from "../../components/BackgroundImage";
import FeaturedPropertiesImage from "../../assets/Agent.png";
import { Container } from "react-bootstrap";
import Property from "../../assets/property.png";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Icons from "../../components/Icons";
import LetTalk from "../../components/LetTalk";
const { Title, Text } = Typography;
function Properties() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const navigate = useNavigate();

  const properties = [
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
    { address: "2572 Mercedes Drive", price: "$15,000,000" },
  ];

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <BackgroundImage Image={FeaturedPropertiesImage}>
        <Title className="text-white text-upper f-50">
          Featured properties
        </Title>
      </BackgroundImage>
      <Container className="pt-98 pb-98">
        <Row gutter={[60, 60]}>
          {currentItems.map((property, index) => (
            <Col lg={12} key={index} onClick={() => navigate(`/features`)}>
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
                    <div className="for-sale-properites ">
                      <Text className="text-center text-upper f-24 f-bold">
                        for sale
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

                <div className="info">
                  <Flex justify={"end"} align={"center"}>
                    <Flex>
                      <IoLocationOutline color="white" size={20} />
                      <Text
                        className="f-14 f-bold text-white"
                        style={{ textAlign: "right" }}
                      >
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
            total={properties.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            responsive
          />
        </Flex>
      </Container>
      <LetTalk />
      <Icons />
    </>
  );
}

export default Properties;
