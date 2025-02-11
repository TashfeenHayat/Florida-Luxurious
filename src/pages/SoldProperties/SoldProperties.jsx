import { Typography, Row, Col, Flex, Pagination, Spin, Image } from "antd";
import { useState } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import FeaturedPropertiesImage from "../../assets/soldproperties.jpg";
import { Container } from "react-bootstrap";
import Property from "../../assets/property.png";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import Lettalk from "../../components/LetTalk";
import useProperties from "../../hooks/useProperties";
import { useNavigate } from "react-router-dom";
const { Title, Text } = Typography;

function SoldProperties() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data, isLoading } = useProperties(null, null, currentPage, "sold");

  const navigate = useNavigate();
  //console.log(data);
  // Dummy data for demonstration
  // const soldProperties = [
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },

  //   // Add more properties as needed
  // ];

  // Calculate the index range for the current page

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const currencySymbols = {
    usd: "$",
    eur: "€",
    pound: "£",
  };
  const formatPrice = (price) => {
    if (!price || isNaN(price.toString().replace(/[^0-9.]/g, ""))) return "N/A";

    const numericPrice = Number(price.toString().replace(/[^0-9.]/g, ""));

    return `${numericPrice.toLocaleString("en-US")}`;
  };
  const getCurrencySymbol = (currencyCode) => {
    return (
      currencySymbols[currencyCode.toLowerCase()] || currencyCode.toUpperCase()
    );
  };
  const sortedProperties = data?.properties?.slice().sort((a, b) => {
    const priceA = Number(a?.salePrice?.slice(1).replace(/,/g, "") || 0);
    const priceB = Number(b?.salePrice?.slice(1).replace(/,/g, "") || 0);
    return priceB - priceA;
  });
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = sortedProperties?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <>
      <BackgroundImage
        Image={FeaturedPropertiesImage}
        style={{ backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <Title className="text-white text-upper f-50 f-100">
          Sold properties
        </Title>
      </BackgroundImage>
      <Container className="pt-98 pb-98">
        {isLoading ? (
          <Spin
            size="large"
            className="d-flex w-100 justify-content-center align-items-center py-5"
          />
        ) : (
          <Row gutter={[60, 60]}>
            {currentProperties?.map((property, index) => (
              <Col lg={12} md={12} sm={24} key={index}>
                <div className="displayy-teamimg-center">
                  <Image
                    src={
                      property?.media?.[0]?.mdUrl ||
                      "https://placehold.co/618x489"
                    }
                    width="100%"
                    style={{ aspectRatio: "5/4" }}
                    className=""
                    fallback="https://placehold.co/618x489"
                    preview={false}
                  />
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
                          {property.addressLine1} {property.addressLine2}
                        </Text>
                      </Flex>
                      <Flex vertical>
                        <Text className="text-center text-upper f-24 f-bold text-white">
                          last list price
                        </Text>
                        <Text className="text-center text-upper f-24 f-100 text-gray">
                          {getCurrencySymbol(property.currency)}
                          {formatPrice(property?.salePrice)}

                          {/* {formatPrice(property.salePrice)}
                          {property.currency} */}
                        </Text>
                      </Flex>
                      {/* <Flex vertical>
                        <Text className="text-center text-upper f-24 f-bold text-white">
                          agent listing
                        </Text>
                        <Text className="text-center text-upper f-24 f-100 text-gray">
                          Abraham
                        </Text>
                      </Flex> */}
                      {/* <Flex vertical>
                        <button className="let-talk-btn">View Property</button>
                      </Flex> */}
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
                          {property.addressLine1} {property.addressLine2} <br />
                          <IoPricetagOutline size={20} />
                          {getCurrencySymbol(property.currency)}{" "}
                          {formatPrice(property.salePrice)}
                        </Text>
                      </Flex>
                    </Flex>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
        <Flex justify={"center"} align="center" className="my-4">
          {data?.properties?.length === 0 ? null : (
            <Pagination
              defaultCurrent={1}
              current={currentPage}
              total={data?.properties?.length || 0}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
            />
          )}
        </Flex>
        {!isLoading && data?.properties.length === 0 && (
          <Title>No Sold Property Listed</Title>
        )}
      </Container>
      <Lettalk />
    </>
  );
}

export default SoldProperties;
