import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import {
  Typography,
  Row,
  Col,
  Flex,
  Pagination,
  Spin,
  Image,
  Input,
  AutoComplete,
} from "antd";
import BackgroundImage from "../../components/BackgroundImage";
import FeaturedPropertiesImage from "../../assets/Agent.png";
import Icons from "../../components/Icons";
import { Container } from "react-bootstrap";
import useProperties from "../../hooks/useProperties";
import useSearchSuggestions from "../../hooks/useSearchSuggestion";

const { Title, Text } = Typography;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const formatPrice = (price) => {
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
  if (isNaN(numericPrice)) return "N/A";
  return numericPrice.toLocaleString("en-US");
};

const getCurrencySymbol = (currencyCode) => {
  return (
    currencySymbols[currencyCode.toLowerCase()] || currencyCode.toUpperCase()
  );
};

const currencySymbols = { usd: "$", eur: "€", pound: "£" };

function SearchCommunity() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);
  const itemsPerPage = 6;
  const query = useQuery();
  const navigate = useNavigate();
  const searchQuery = query.get("name") || "";
  const { data, isLoading, isError } = useProperties(
    null,
    itemsPerPage,
    null,
    "for_sale",
    null,
    searchQuery,
    query.get("name")
  );
  const { suggestions } = useSearchSuggestions(searchValue);

  useEffect(() => {
    if (searchValue) {
   
  
      if (suggestions.properties) {
        console.log(setSuggestionsList(suggestions.properties));
        setSuggestionsList(suggestions.properties);
      } else {
        setSuggestionsList([]); // If suggestions is not valid, reset it to an empty array
      }
    } else {
      setSuggestionsList([]); // Reset if there's no search value
    }
  }, [searchValue, suggestions]); // Dependencies are searchValue and suggestions

  const onSearch = (value) => navigate(`/searchcommunity?name=${value}`);

  const handlePageChange = (page) => setCurrentPage(page);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (isError) {
    return <div>Error loading properties. Please try again later.</div>;
  }
  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion);
  };
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <>
      <BackgroundImage Image={FeaturedPropertiesImage}>
        <Title
          className="text-white text-upper f-50 f-100"
          style={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Search
        </Title>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "0 1rem",
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <AutoComplete
            options={suggestionsList?.map((suggestion) => ({
              value: suggestion.name, // Ensure 'name' is the property you want to display
            }))}
            style={{ width: "100%", maxWidth: "550px", minWidth: "250px" }}
            onSelect={handleSuggestionClick}
            onSearch={setSearchValue}
          >
            <Input.Search
              placeholder="Search properties..."
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </AutoComplete>
        </div>
      </BackgroundImage>

      {isLoading ? (
        <Flex justify="center" align="center" className="py-5">
          <Spin size="large" />
        </Flex>
      ) : (
        <Container className="pt-98 pb-98">
          <Title level={3}>Search Result = {data?.totalCount}</Title>
          <Row gutter={[60, 60]}>
            {data?.properties?.length ? (
              currentProperties.map((property, index) => (
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
                      alt={`Property at ${property?.addressLine1} ${property?.addressLine2}`}
                    />
                    <div className="more-info-property">
                      <Flex
                        vertical
                        align="center"
                        justify="center"
                        style={{ height: "100%" }}
                        gap={30}
                      >
                        <Flex vertical>
                          <Text className="text-center text-upper f-24 f-bold text-white">
                            Address
                          </Text>
                          <Text className="text-center text-upper f-24 f-100 text-gray">
                            {property?.addressLine1} {property?.addressLine2}
                          </Text>
                        </Flex>
                        <Flex vertical>
                          <Text className="text-center text-upper f-24 f-bold text-white">
                            Last List Price
                          </Text>
                          <Text className="text-center text-upper f-24 f-100 text-gray">
                            {getCurrencySymbol(property?.currency)}
                            {formatPrice(property?.salePrice)}
                          </Text>
                        </Flex>
                        <Flex vertical>
                          <button
                            className="let-talk-btn"
                            aria-label={`View property at ${property?.addressLine1}`}
                          >
                            View Property
                          </button>
                        </Flex>
                      </Flex>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <Title>No Properties Listed</Title>
            )}
          </Row>
          {data?.properties.length > 0 && (
            <Flex justify="center" align="center" className="my-4">
              <Pagination
                defaultCurrent={1}
                total={data?.properties?.length || 0}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                responsive
              />
            </Flex>
          )}
        </Container>
      )}
      <Icons />
    </>
  );
}

export default SearchCommunity;
