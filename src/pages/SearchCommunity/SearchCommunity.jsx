import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackgroundImage from "../../components/BackgroundImage";
import { Typography, Row, Col, Flex, Pagination, Spin, Image } from "antd";
import FeaturedPropertiesImage from "../../assets/Agent.png";
import Icons from "../../components/Icons";
import { Container } from "react-bootstrap";
import useCommunities from "../../hooks/useCommunities";

const { Title, Text } = Typography;
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchCommunity() {
  let query = useQuery();
  console.log(query.get("name"));
  const { data, isLoading } = useCommunities(30, 1, query.get("name"));
  console.log(data);
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
        <Container className="pt-5">
          <Title level={3}>Search Result = {data.totalCount}</Title>
          <div>
            {data?.filters?.map((item, index) => (
              <Row key={index} gutter={[30, 30]} className="py-5">
                {" "}
                <Col lg={10}>
                  <Image src={item?.photo} />
                </Col>
                <Col lg={14}>
                  <Flex vertical gap={10}>
                    <Text>{item?.description}</Text>

                    <button
                      className="button-view"
                      onClick={() => navigate(`/community/${item?._id}`)}
                    >
                      View
                    </button>
                  </Flex>
                </Col>
              </Row>
            ))}
          </div>
        </Container>
      )}
      <Icons />
    </>
  );
}

export default SearchCommunity;
