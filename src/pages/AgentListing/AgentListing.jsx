import React, { useState } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import BoatImage from "../../assets/boatowner.png";
import { Container } from "react-bootstrap";
import { Col, Row, Typography, Flex, Spin, Pagination } from "antd";
import Property from "../../assets/property.png";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import useProperties from "../../hooks/useProperties";
import { useParams, useNavigate } from "react-router";
const { Title, Paragraph, Text } = Typography;

function AgentListing() {
  const { id, name } = useParams();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const { data, isLoading } = useProperties(id, itemsPerPage, page);

  const handlePageChange = (page) => {
    setPage(page);
  };

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
            {data?.properties?.map((item, index) => (
              <Col lg={12} md={12} sm={24}>
                <div
                  className="displayy-teamimg-center"
                  onClick={() => navigate(`/features/${item._id}`)}
                >
                  <img src={Property} width="100%" className="img-op" />
                  <div className="info">
                    <Flex justify={"space-between"} align={"center"}>
                      <button className="button-view">View All</button>
                      <Flex>
                        <IoLocationOutline color="white" size={20} />
                        <Text
                          className="f-14 f-bold text-white"
                          style={{ textAlign: "right" }}
                        >
                          {item?.addressLine1}
                          <br />
                          <IoPricetagOutline size={20} /> $ {item?.salePrice}
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
                          {item?.addressLine1}
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
        <Flex justify={"center"} align="center" className="my-4">
          <Pagination
            defaultCurrent={1}
            total={data?.totalCount}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
          />
        </Flex>
      </Container>
    </div>
  );
}

export default AgentListing;
