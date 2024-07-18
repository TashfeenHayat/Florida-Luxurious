import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";

import BackgroundImage from "../../components/BackgroundImage";
import { Typography, Row, Col, Flex, Pagination, Spin, Image } from "antd";
import FeaturedPropertiesImage from "../../assets/Agent.png";
import Icons from "../../components/Icons";
import { Container } from "react-bootstrap";
import useProperties from "../../hooks/useProperties";

const { Title, Text } = Typography;
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchCommunity() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  let query = useQuery();
  console.log(query.get("name"));
  const { data, isLoading } = useProperties(
    null,
    itemsPerPage,
    currentPage,
    "for_sale",
    null,
    query.get("name")
  );
  console.log(data);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const navigate = useNavigate();

  return (
    <>
      <BackgroundImage Image={FeaturedPropertiesImage}>
        <Title className="text-white text-upper f-50 f-100">
          Search Communities
        </Title>
      </BackgroundImage>
      {isLoading ? (
        <Flex justify={"center"} align="center" className="py-5">
          <Spin size="large" />
        </Flex>
      ) : (
        <Container className="pt-98 pb-98">
          <Title level={3}>Search Result = {data?.totalCount}</Title>

          <Row gutter={[60, 60]}>
            {data?.properties?.map((property, index) => (
              <Col
                lg={12}
                md={12}
                sm={24}
                key={index}
                onClick={() => navigate(`/features/${property?._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="displayy-teamimg-center">
                  <Image
                    src={
                      property?.media?.[0]?.mdUrl ||
                      "https://placehold.co/618x489"
                    }
                    width="100%"
                    className="img-op"
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
                      <Flex vertical>
                        <Text className="text-center text-upper f-24 f-bold text-white">
                          address
                        </Text>
                        <Text className="text-center text-upper f-24 f-100 text-gray">
                          {property?.addressLine1} {property?.addressLine2}
                        </Text>
                      </Flex>
                      <Flex vertical>
                        <Text className="text-center text-upper f-24 f-bold text-white">
                          last list price
                        </Text>
                        <Text className="text-center text-upper f-24 f-100 text-gray">
                          ${property?.salePrice}
                        </Text>
                      </Flex>
                      <Flex vertical>
                        <Text className="text-center text-upper f-24 f-bold text-white">
                          Agent Listing
                        </Text>
                        <Text className="text-center text-upper f-24 f-100 text-gray">
                          Abraham
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
                          {property?.addressLine1} {property?.addressLine2}{" "}
                          <br />
                          <IoPricetagOutline size={20} /> ${property?.salePrice}
                        </Text>
                      </Flex>
                    </Flex>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          {data?.properties.length === 0 ? null : (
            <Flex justify={"center"} align="center" className="my-4">
              <Pagination
                defaultCurrent={1}
                total={data?.totalCount}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                responsive
              />
            </Flex>
          )}
          {!isLoading && data?.properties.length === 0 && (
            <Title>No Property Listed</Title>
          )}
        </Container>
      )}
      <Icons />
    </>
  );
}

export default SearchCommunity;
