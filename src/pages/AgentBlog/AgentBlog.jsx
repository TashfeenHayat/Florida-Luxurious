// Import necessary libraries and components
import React, { useEffect, useRef, useState } from "react";
import BackgroundImage from "../../components/BackgroundImage"; // Adjust the path as necessary
import { Typography, Row, Col, Spin, Alert } from "antd";
import useBlog from "../../hooks/useBlog"; // Adjust the path as necessary
import { useParams } from "react-router-dom";
import { decode } from "html-entities";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import HTMLFlipBook from "react-pageflip"; // Import the react-pageflip package
import Agent from "../../assets/Agent_profile.jpg";

// Set the workerSrc for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const { Title } = Typography;

// Flipbook component using react-pageflip
const Flipbook = ({ pages }) => {
  return (
    <HTMLFlipBook
      width={500}
      height={700}
      size="stretch"
      minWidth={315}
      maxWidth={600}
      minHeight={400}
      maxHeight={1533}
      drawShadow={true}
      flippingTime={1000}
      useMouseEvents={true}
      style={{
        margin: "0 auto",
        background: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      }}
    >
      {pages.map((page, index) => (
        <div key={index} className="page" style={{ padding: "20px" }}>
          <img
            src={page}
            alt={`Page ${index + 1}`}
            style={{
              width: "600px",
              height: "100%",
             
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
  const [pages, setPages] = useState([]);

  // Decode HTML content and adjust iframes and images for better rendering
  useEffect(() => {
    if (refHtml.current && data?.content) {
      const decodedContent = decode(data.content);
      refHtml.current.innerHTML = decodedContent;

      const iframes = refHtml.current.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        iframe.style.maxWidth = "100%";
        iframe.style.width = "100%";
        iframe.style.height = "auto";
      });

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

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <BackgroundImage Image={Agent}>
        <Row justify="center" align="middle">
          <Col>
            <Title
              style={{
                color: "white",
                textTransform: "uppercase",
                fontSize: "50px",
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
        <div style={{ padding: "15px", flex: "1" }}>
          <div ref={refHtml} />
          {pages.length > 1 && <Flipbook pages={pages} />}
        </div>
      )}
    </div>
  );
}

export default AgentBlog;
