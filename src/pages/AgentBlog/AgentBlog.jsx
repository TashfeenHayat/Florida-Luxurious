import React, { useEffect, useRef, useState } from "react";
import BackgroundImage from "../../components/BackgroundImage"; // Adjust the path as necessary
import { Typography, Row, Col, Spin, Alert, Button } from "antd";
import useBlog from "../../hooks/useBlog"; // Adjust the path as necessary
import { useParams } from "react-router-dom";
import { decode } from "html-entities";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import HTMLFlipBook from "react-pageflip"; // Import the react-pageflip package
import Agent from "../../assets/Agent_profile.jpg";
import { Container } from "react-bootstrap";
// Set the workerSrc for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const { Title } = Typography;

// Flipbook component using react-pageflip
const Flipbook = ({ pages, flipbookRef }) => {
  return (
    <HTMLFlipBook
      width={500}
      height={700}
      size="stretch"
      minWidth={300} // Adjusted minWidth for smaller screens
      maxWidth={600}
      minHeight={400}
      maxHeight={800} // Adjusted maxHeight for better aspect ratio
      drawShadow={true}
      flippingTime={1000}
      useMouseEvents={true}
      ref={flipbookRef} // Attach the ref here
      style={{
        margin: "0 auto",
        background: "#f5f5f5",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        maxWidth: "100%", // Ensure flipbook is responsive
      }}
    >
      {pages.map((page, index) => (
        <div key={index} className="page" style={{ padding: "10px" }}>
          <img
            src={page}
            alt={`Page ${index + 1}`}
            style={{
<<<<<<< HEAD
              width: "600px",
              height: "100%",
=======
              width: "100%", // Make images responsive
              height: "auto",
>>>>>>> 56264c876973ebccfa89965679c8bf00366068b4
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

  // Decode HTML content and adjust images for better rendering
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

  // Load PDF and convert pages to images
  useEffect(() => {
    if (data?.file) {
      const url = data.file;
      const loadingTask = pdfjsLib.getDocument(url);
      loadingTask.promise.then((pdf) => {
        const totalPages = pdf.numPages;
        const pageImages = [];

        const loadPage = async (pageNumber) => {
          const page = await pdf.getPage(pageNumber);
          const scale = 1.5; // Adjust scale for better quality
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
            setPages(pageImages);
          }
        };

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
          loadPage(pageNumber);
        }
      });
    }
  }, [data?.file]);

  // Handlers for flip actions
  const handlePrevPage = () => {
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().flipPrev(); // Use pageFlip().flipPrev() correctly
    }
  };

  const handleNextPage = () => {
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().flipNext(); // Use pageFlip().flipNext() correctly
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
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
        <Row
          style={{
            minHeight: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
        <Container style={{ padding: "15px", flex: "1" }} justify="center">
          <div ref={refHtml} />
          {isLoading ? (
            <Row
              style={{
                minHeight: "50vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Col>
                <Spin size="large" />
              </Col>
            </Row>
          ) : (
            pages.length > 1 && (
              <>
                <Flipbook pages={pages} flipbookRef={flipbookRef} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    onClick={handlePrevPage}
                    style={{ marginRight: "10px" }}
                  >
                    Previous Page
                  </Button>
                  <Button onClick={handleNextPage}>Next Page</Button>
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
