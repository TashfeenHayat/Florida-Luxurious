import React, { useState } from "react";
import { Typography, Row, Col, Flex, Pagination, Spin, Image } from "antd";
import BackgroundImage from "../../components/BackgroundImage";
import FeaturedPropertiesImage from "../../assets/Agent.png";
import { Container } from "react-bootstrap";
import Property from "../../assets/property.png";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Icons from "../../components/Icons";
import LetTalk from "../../components/LetTalk";
import useProperties from "../../hooks/useProperties";

const { Title, Text } = Typography;

function Properties() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { data, isLoading } = useProperties(
    null,
    itemsPerPage,
    currentPage,
    null
  );

  const check = data?.properties?.filter((item) => item.status !== "sold");
  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <BackgroundImage Image={FeaturedPropertiesImage}>
        <Title className="text-white text-upper f-50 f-100">
          Featured properties
        </Title>
      </BackgroundImage>
      {isLoading ? (
        <Spin
          size="large"
          className="d-flex w-100 justify-content-center align-items-center py-5"
        />
      ) : (
        <Container className="pt-4 pb-4">
          <Row gutter={[16, 16]} justify="center">
            {check?.map((property, index) => (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={6}
                key={index}
                onClick={() => navigate(`/features/${property?._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="property-card">
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
                      direction="column"
                      align="center"
                      justify="center"
                      style={{ height: "100%" }}
                      gap={16}
                    >
                      <Flex direction="column">
                        <Text className="text-center text-upper f-18 f-bold text-white">
                          Address
                        </Text>
                        <Text className="text-center text-upper f-16 f-100 text-gray">
                          {property?.addressLine1} {property?.addressLine2}
                        </Text>
                      </Flex>
                      <Flex direction="column">
                        <Text className="text-center text-upper f-18 f-bold text-white">
                          Last List Price
                        </Text>
                        <Text className="text-center text-upper f-16 f-100 text-gray">
                          {property?.salePrice}
                        </Text>
                      </Flex>
                      <Flex direction="column">
                        <button className="let-talk-btn">View Property</button>
                      </Flex>
                    </Flex>
                  </div>

                  <div className="info">
                    <Flex justify="end" align="center">
                      <Flex direction="row" align="center">
                        <IoLocationOutline color="white" size={20} />
                        <Text
                          className="f-14 f-bold text-white"
                          style={{ textAlign: "right", marginLeft: 8 }}
                        >
                          {property?.addressLine1} {property?.addressLine2} <br />
                          <IoPricetagOutline size={20} style={{ marginLeft: 8 }} /> ${property?.salePrice}
                        </Text>
                      </Flex>
                    </Flex>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          {data?.properties.length === 0 ? null : (
            <Flex justify="center" align="center" className="my-4">
              <Pagination
                current={currentPage}
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

      <LetTalk />
      <Icons />
    </>
  );
}

export default Properties;
