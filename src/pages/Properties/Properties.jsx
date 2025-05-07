import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Flex, Pagination, Spin, Image } from "antd";
import BackgroundImage from "../../components/BackgroundImage";
import FeaturedPropertiesImage from "../../assets/featureproperties.jpg";
import { Container } from "react-bootstrap";
//import Property from "../../assets/property.png";
import { IoLocationOutline, IoPricetagOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Icons from "../../components/Icons";
import LetTalk from "../../components/LetTalk";
import useProperties from "../../hooks/useProperties";
import { motion, AnimatePresence } from "framer-motion";
//import useAgent from "../../hooks/useAgent";
const { Title, Text } = Typography;
function Properties() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data, isLoading } = useProperties(null, null, null, "for_sale");

  // const pageVariants = {
  //   initial: { opacity: 0, x: 100 },
  //   animate: { opacity: 1, x: 0 },
  //   exit: { opacity: 0, x: -100 },
  // };
  //console.log("dara", data);
  {
    /*const check = data?.properties?.filter((item) => item.status !== "sold");
  console.log(check);*/
  }
  const navigate = useNavigate();
  // const properties = [
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  //   { address: "2572 Mercedes Drive", price: "$15,000,000" },
  // ];
  // // Calculate the index range for the current page
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = properties.slice(indexOfFirstItem, indexOfLastItem);
  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  // const formatPrice = (price) => {
  //   if (!price || isNaN(price.toString().replace(/[^0-9.]/g, ""))) return "N/A"; // Handle invalid cases

  //   // Remove existing $ sign and convert to number
  //   const numericPrice = Number(price.toString().replace(/[^0-9.]/g, ""));

  //   return `${numericPrice.toLocaleString("en-US")}`;
  // };
  const currencySymbols = {
    usd: "$",
    eur: "€",
    pound: "£",
  };

  // Function to format price (remove unwanted characters, add commas)
  const getCurrencySymbol = (currencyCode) => {
    if (!currencyCode) return currencyCode; // Avoid calling toLowerCase on undefined or null
    return (
      currencySymbols[currencyCode.toLowerCase()] || currencyCode.toUpperCase()
    );
  };

  const formatPrice = (price) => {
    if (!price || isNaN(price.replace(/[^0-9.]/g, ""))) return "N/A"; // Handle invalid or empty price
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
    return numericPrice.toLocaleString("en-US");
  };

  //Sorted highest to lowest
  const sortedProperties = data?.properties?.slice().sort((a, b) => {
    const priceA = Number(a?.salePrice?.slice(1).replace(/,/g, "") || 0);
    const priceB = Number(b?.salePrice?.slice(1).replace(/,/g, "") || 0);
    return priceB - priceA;
  });

  // Slice the data based on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = sortedProperties?.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mobile-visible");
            console.log("visible");
          } else {
            entry.target.classList.remove("mobile-visible");
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    // Delay observer setup to allow DOM to fully render after Slider
    const timeoutId = setTimeout(() => {
      const items = document.querySelectorAll(".displayy-teamimg-center");
      items.forEach((item) => observer.observe(item));
    }, 500); // can tweak to 300-800ms based on render delay

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [isMobile]);

  return (
    <>
      <BackgroundImage Image={FeaturedPropertiesImage} style={"back"}>
        <Title
          className="text-white text-upper f-50 f-100"
          style={{
            textAlign: "center",
          }}
        >
          Featured properties
        </Title>
      </BackgroundImage>
      {isLoading ? (
        <Spin
          size="large"
          className="d-flex w-100 justify-content-center align-items-center py-5"
        />
      ) : (
        <Container className="pt-98 pb-98">
          <Row gutter={[60, 60]}>
            {currentProperties?.map((property, index) => (
              <Col
                lg={12}
                md={12}
                sm={24}
                key={index}
                onClick={() => navigate(`/features/${property?._id}`)}
                style={{ cursor: "pointer" }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }} // Normal size and fully visible
                  exit={{ opacity: 0, scale: 0.9 }} // Exit with the same transformation
                  transition={{ duration: 0.3 }} // Adjust duration for card animations
                  className={`displayy-teamimg-center ${
                    isMobile ? "always-show-info" : ""
                  }`}
                >
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
                  <div
                    className={`${
                      isMobile ? "always-show-info" : ""
                    } more-info-property`}
                  >
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
                          {/*property?.salePrice.slice(1).replace(/,/g, "")*/}
                          {/*                           

                          {/*                          
 
                          &nbsp;
                          {property?.currency} */}
                          {/* {Number(
                            property?.salePrice?.slice(1).replace(/,/g, "") || 0
                          ).toLocaleString()}{" "} */}
                          {/* {formatPrice(property?.salePrice)}
                          {property?.currency} */}
                          {getCurrencySymbol(property?.currency)}
                          {formatPrice(property?.salePrice)}
                        </Text>
                      </Flex>
                      {/* <Flex vertical>
                        <Text className="text-center text-upper f-24 f-bold text-white">
                          Agent Listing
                        </Text>
                        <Text className="text-center text-upper f-24 f-100 text-gray">
                          {property?.agent}
                        </Text>
                      </Flex> */}
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
                          <IoPricetagOutline size={20} />
                          {getCurrencySymbol(property?.currency)}
                          {formatPrice(property?.salePrice)}
                          {/* {property?.salePrice?.slice(1).replace(/,/g, "") || 0} */}
                        </Text>
                      </Flex>
                    </Flex>
                  </div>
                </motion.div>
              </Col>
            ))}
          </Row>

          <Flex justify={"center"} align="center" className="my-4">
            <Pagination
              defaultCurrent={1}
              current={currentPage}
              total={data?.properties?.length || 0} // Total number of properties
              pageSize={itemsPerPage} // Number of properties per page
              onChange={handlePageChange} // Handle page change
              responsive
            />
          </Flex>

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
