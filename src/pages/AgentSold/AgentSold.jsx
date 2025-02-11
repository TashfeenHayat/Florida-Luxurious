import React, { useState } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import BoatImage from "../../assets/boatowner.png";
import { Container } from "react-bootstrap";
import { Col, Row, Typography, Flex, Spin, Pagination } from "antd";

import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import useProperties from "../../hooks/useProperties";
import { useParams, useNavigate } from "react-router";
import Icons from "../../components/Icons";
const { Title, Text, Paragraph } = Typography;
function AgentSold() {
  const { id, name } = useParams();
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;
  const status = "sold";
  const { data, isLoading } = useProperties(id, null, null, status);

  const handlePageChange = (page) => {
    setPage(page);
  };
  const currencySymbols = {
    usd: "$",
    eur: "€",
    pound: "£",
  };

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
    if (isNaN(numericPrice)) return "N/A";
    // Return the formatted price with commas
    return numericPrice.toLocaleString("en-US");
  };

  // Function to get the correct currency symbol
  const getCurrencySymbol = (currencyCode) => {
    return (
      currencySymbols[currencyCode?.toLowerCase()] ||
      currencyCode?.toUpperCase()
    ); // Default to currency code if no symbol found
  };
  const sortedProperties = data?.properties?.slice().sort((a, b) => {
    const priceA = Number(a?.salePrice?.slice(1).replace(/,/g, "") || 0);
    const priceB = Number(b?.salePrice?.slice(1).replace(/,/g, "") || 0);
    return priceB - priceA;
  });
  const startIndex = (page - 1) * itemsPerPage;

  const currentProperties = sortedProperties?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div>
      {" "}
      <BackgroundImage Image={BoatImage}>
        <Title
          style={{ color: "white", lineHeight: "14px", letterSpacing: "2px" }}
          className="text-upper f-50 f-100"
        >
          My Sales
        </Title>
      </BackgroundImage>
      <Container>
        <div className="py-5 text-center">
          <Text className="text-black text-upper f-40 f-100"> {name}</Text>
        </div>
        {isLoading ? (
          <Spin
            size="large"
            className="d-flex w-100 justify-content-center align-items-center py-5"
          />
        ) : (
          <Row gutter={[60, 60]}>
            {currentProperties?.map((properties, index) => (
              <Col lg={12} md={12} sm={24}>
                <div className="displayy-teamimg-center">
                  <img
                    src={
                      properties?.media?.[0]?.mdUrl ||
                      "https://placehold.co/618x489"
                    }
                    width="100%"
                    style={{ aspectRatio: "5/4" }}
                    className=""
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
                          {properties?.addressLine1} {properties?.addressLine2}
                        </Text>
                      </Flex>
                      <Flex vertical>
                        <Text className="text-center text-upper f-24 f-bold text-white">
                          last list price
                        </Text>
                        <Text className="text-center text-upper f-24 f-100 text-gray">
                          {getCurrencySymbol(properties?.currency)}
                          {formatPrice(properties?.salePrice)}
                        </Text>
                      </Flex>
                      <Flex vertical>
                        <Text className="text-center text-upper f-24 f-bold text-white">
                          agent listings
                        </Text>
                        <Text className="text-center text-upper f-24 f-100 text-gray">
                          {name}
                        </Text>
                      </Flex>
                      {/* <Flex vertical>
                        <button
                          className="let-talk-btn"
                          onClick={() =>
                            navigate(`/features/${properties._id}`)
                          }
                        >
                          View Property
                        </button>
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
                          {properties?.addressLine1} {properties?.addressLine2}{" "}
                          <br />
                          <IoPricetagOutline size={20} />{" "}
                          {getCurrencySymbol(properties?.currency)}
                          {formatPrice(properties?.salePrice)}
                        </Text>
                      </Flex>
                    </Flex>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
        {!isLoading && data?.properties.length === 0 && (
          <Title>No Sold Property Listed</Title>
        )}
        {!isLoading && data?.properties.length === 0 ? null : (
          <Flex justify={"center"} align="center" className="my-4">
            <Pagination
              defaultCurrent={1}
              total={data?.totalCount}
              pageSize={itemsPerPage}
              onChange={handlePageChange}
            />
          </Flex>
        )}
      </Container>
      <Icons />
    </div>
  );
}

export default AgentSold;
