import React, { useEffect, useRef, useState } from "react";
import BackgroundImage from "../../components/BackgroundImage"; // Adjust the path as necessary
import { Typography, Row, Col, Spin, Alert, Button } from "antd";
import useBlog from "../../hooks/useBlog"; // Adjust the path as necessary
import { useParams } from "react-router-dom";
import { decode } from "html-entities";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import HTMLFlipBook from "react-pageflip"; // Import the react-pageflip package
import Agent from "../../assets/Agent_profile.jpg";
import Flogo from "../../assets/flipbook.png";
import { Container } from "react-bootstrap";

// Set the workerSrc for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const { Title } = Typography;

// Flipbook component using react-pageflip
const Flipbook = ({ pages, flipbookRef }) => {
  const isMobile = window.innerWidth < 600;
  const flipbookWidth = isMobile ? window.innerWidth * 0.9 : 500; // 90% of screen width on mobile
  const flipbookHeight = isMobile ? flipbookWidth * 1.4 : 700; // Maintain aspect ratio

  return (
    <HTMLFlipBook
      width={flipbookWidth}
      height={flipbookHeight}
      size="stretch"
      minWidth={300}
      maxWidth={600}
      minHeight={400}
      maxHeight={500}
      drawShadow={true}
      flippingTime={1000}
      useMouseEvents={true}
      ref={flipbookRef}
      style={{
        margin: "0 auto",
        background: "transparent",
        borderRadius: "10px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        maxWidth: "100%", // Ensure flipbook is responsive
      }}
    >
      {pages.map((page, index) => (
        <div
          key={index}
          className="page"
          style={{
            padding: "10px",
            display: index === 0 ? "none" : "block",
          }}
        >
          <img
            src={page}
            alt={`Page ${index + 1}`}
            className="flipbook"
            style={{
              width: "100%", // Make images responsive
              height: "auto",
              borderRadius: "20px",
            }}
          />
        </div>
      ))}
    </HTMLFlipBook>
  );
};

function AgentBlog() {
  const { id } = useParams();
  const { data, isLoading, isError } = useBlog(id);

  const refHtml = useRef(null);
  const flipbookRef = useRef(null); // Create a ref for the flipbook
  const [pages, setPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);
  const [isCoverPage, setIsCoverPage] = useState(true);

  // Decode HTML content
  useEffect(() => {
    if (refHtml.current && data?.content) {
      const decodedContent = decode(data.content);
      refHtml.current.innerHTML = decodedContent;

      const images = refHtml.current.querySelectorAll("img");
      images.forEach((img) => {
        img.style.maxWidth = "100%";
        img.style.height = "auto";
      });
    }
  }, [data?.content]);

  // Handle PDF pages loading
  useEffect(() => {
    if (!data?.file) {
      setLoadingPages(false);
    } else {
      setLoadingPages(true);
      const url = data?.file;
      const loadingTask = pdfjsLib.getDocument(url);
      loadingTask.promise.then((pdf) => {
        const totalPages = pdf.numPages;
        const pageImages = [];

        const loadPage = async (pageNumber) => {
          const page = await pdf.getPage(pageNumber);
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;

          // Convert canvas to image URL
          const imgData = canvas.toDataURL("image/png");
          pageImages.push(imgData);

          if (pageImages.length === totalPages) {
        
              setPages([Flogo,...pageImages]); 
            
            setLoadingPages(false);
          }
        };

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
          loadPage(pageNumber);
        }
      });
    }
  }, [data?.file]);

  const handlePrevPage = () => {
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNextPage = () => {
    if (flipbookRef.current) {
      if (isCoverPage) {
        setIsCoverPage(false);
        flipbookRef.current.pageFlip().flipNext();
      } else {
        flipbookRef.current.pageFlip().flipNext();
      }
    }
  };

  return (
    <div>
      <BackgroundImage Image={Agent}>
        <Row justify="center" align="middle">
          <Col xs={24}>
            <Title
              style={{
                color: "white",
                textTransform: "uppercase",
                fontSize: "clamp(24px, 5vw, 50px)", // Responsive font size
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Agent Blog
            </Title>
          </Col>
        </Row>
      </BackgroundImage>
      {isLoading ? (
        <Row style={{ minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      ) : isError ? (
        <Row style={{ minHeight: "50vh" }}>
          <Col>
            <Alert message="Failed to load blog content" type="error" />
          </Col>
        </Row>
      ) : (
        <Container style={{ padding: "15px", flex: "1", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div ref={refHtml} className="press-market" style={{ flexDirection: "column", width: "100%" }} />
          {loadingPages ? (
            <Row style={{ minHeight: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Col>
                <Spin size="large" />
              </Col>
            </Row>
          ) : (
            pages.length > 1 && (
              <>
                <Flipbook pages={pages} flipbookRef={flipbookRef} />
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%" }}>
                  <Button
                    className="button-preview"
                    onClick={handlePrevPage}
                    style={{
                      marginRight: "10px",
                      padding: "10px 20px",
                      fontSize: "16px",
                    }}
                  >
                    Previous Page
                  </Button>
                  <Button
                    className="button-next"
                    onClick={handleNextPage}
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                    }}
                  >
                    Next Page
                  </Button>
                </div>
              </>
            )
          )}
        </Container>
      )}
    </div>
  );
}

export default AgentBlog;
