import React, { useState } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import BoatImage from "../../assets/boatowner.png";
import { Container } from "react-bootstrap";
import { Col, Row, Typography, Flex, Spin, Pagination } from "antd";
import Property from "../../assets/property.png";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import useProperties from "../../hooks/useProperties";
import { useParams, useNavigate } from "react-router";
import Icons from "../../components/Icons";
const { Title, Text, Paragraph } = Typography;
function AgentSold() {
  const { id, name } = useParams();
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 6;
  const status = "sold";
  const { data, isLoading } = useProperties(id, itemsPerPage, page, status);
  console.log(data?.properties, "sold");
  const handlePageChange = (page) => {
    setPage(page);
  };

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
            {data?.properties.map((properties, index) => (
              <Col
                lg={12}
                md={12}
                sm={24}
                onClick={() => navigate(`features/660719a7b27711bbbdc092b6`)}
              >
                <div className="displayy-teamimg-center">
                  <img
                    src={
                      properties?.media?.[0]?.mdUrl ||
                      "https://placehold.co/618x489"
                    }
                    width="100%"
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
                          {properties?.addressLine1}
                        </Text>
                      </Flex>
                      <Flex vertical>
                        <Text className="text-center text-upper f-24 f-bold text-white">
                          last list price
                        </Text>
                        <Text className="text-center text-upper f-24 f-100 text-gray">
                          $ {properties?.salePrice}
                        </Text>
                      </Flex>
                      <Flex vertical>
                        <Text className="text-center text-upper f-24 f-bold text-white">
                          agent listing
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
                          {properties?.addressLine1} <br />
                          <IoPricetagOutline size={20} /> ${" "}
                          {properties?.salePrice}
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
