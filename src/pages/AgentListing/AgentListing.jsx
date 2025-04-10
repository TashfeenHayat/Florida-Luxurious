import React, { useState } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import BoatImage from "../../assets/listing.jpg";
import { Container } from "react-bootstrap";
import { Col, Row, Typography, Flex, Spin, Pagination } from "antd";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import useProperties from "../../hooks/useProperties";
import { useParams, useNavigate } from "react-router";
import Icons from "../../components/Icons";
const { Title, Paragraph, Text } = Typography;

function AgentListing() {
  const { id, name } = useParams();
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const itemsPerPage = 6;
  const { data, isLoading } = useProperties(id, itemsPerPage, page, "for_sale");

  const handlePageChange = (page) => {
    setPage(page);
  };
  const currencySymbols = {
    usd: "$",
    eur: "€",
    pound: "£",
  };
  const formatPrice = (price) => {
    if (!price || isNaN(price.toString().replace(/[^0-9.]/g, ""))) return "N/A"; // Handle invalid cases

    // Remove existing $ sign and convert to number
    const numericPrice = Number(price.toString().replace(/[^0-9.]/g, ""));

    return `${numericPrice.toLocaleString("en-US")}`;
  };
  const getCurrencySymbol = (currencyCode) => {
    return (
      currencySymbols[currencyCode.toLowerCase()] || currencyCode.toUpperCase()
    ); // Default to currency code if no symbol found
  };
  //Sorted highest to lowest
  const sortedProperties = data?.properties?.slice().sort((a, b) => {
    const priceA = Number(a?.salePrice?.slice(1).replace(/,/g, "") || 0);
    const priceB = Number(b?.salePrice?.slice(1).replace(/,/g, "") || 0);
    return priceB - priceA;
  });

  // Slice the data based on current page
  const startIndex = (page - 1) * itemsPerPage;
  const currentProperties = sortedProperties?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <div>
      <BackgroundImage Image={BoatImage}>
        <Title
          style={{ color: "white", lineHeight: "14px", letterSpacing: "2px" }}
          className="text-upper f-50 f-100"
        >
          My Listings
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
          <Row gutter={[60, 60]} className="pb-5">
            {currentProperties?.map((item, index) => (
              <Col lg={12} md={12} sm={24}>
                <div
                  className="displayy-teamimg-center"
                  onClick={() => navigate(`/features/${item._id}`)}
                >
                  <img
                    src={
                      item?.media?.[0]?.mdUrl || "https://placehold.co/618x489"
                    }
                    width="100%"
                    className="img-op"
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
                          {item?.addressLine1} {item?.addressLine2}
                          <br />
                          <IoPricetagOutline size={20} />{" "}
                          {getCurrencySymbol(item?.currency)}
                          {formatPrice(item?.salePrice)}
                          {/* {Number(properties?.salePrice).toLocaleString()} */}
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
                          {" "}
                          {item?.addressLine1} {item?.addressLine2}
                        </Text>
                        <div className="prop-info">
                          <Text
                            style={{ color: "white" }}
                            className="text-upper"
                          >
                            {" "}
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
        )}
        {!isLoading && data?.properties.length === 0 && (
          <Title>No Property Listed</Title>
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

export default AgentListing;
