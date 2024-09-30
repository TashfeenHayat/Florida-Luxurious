import React, { useEffect, useRef, useState } from "react";
<<<<<<< HEAD
import { Typography, Row, Col, Spin } from "antd";
=======
import { Typography, Row, Col, Spin, Button } from "antd";
>>>>>>> 56264c876973ebccfa89965679c8bf00366068b4
import { Container } from "react-bootstrap";
import useReportDetail from "../../hooks/useReportDetail";
import { useParams } from "react-router-dom";
import { decode } from "html-entities";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import HTMLFlipBook from "react-pageflip";

const { Title } = Typography;

// Set the workerSrc for PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

// Flipbook component using react-pageflip
const Flipbook = React.forwardRef(({ pages }, ref) => {
  return (
    <HTMLFlipBook
<<<<<<< HEAD
      width={window.innerWidth > 768 ? 500 : 300} // Adjust based on screen size
      height={window.innerWidth > 768 ? 700 : 420}
=======
      width={500}
      height={750}
>>>>>>> 56264c876973ebccfa89965679c8bf00366068b4
      size="stretch"
      minWidth={300}
      maxWidth={600}
      minHeight={400}
      maxHeight={1000}
      drawShadow={true}
      flippingTime={1000}
      useMouseEvents={true}
      ref={ref} // Pass ref to HTMLFlipBook
      style={{
        margin: "0 auto",
        background: "#f5f5f5",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        overflow: "hidden", // Ensure that content doesn't overflow
      }}
    >
      {pages.map((page, index) => (
        <div key={index} className="page" style={{ padding: "20px" }}>
          <img
            src={page}
            alt={`Page ${index + 1}`}
            style={{
<<<<<<< HEAD
              width: "100%",
=======
              width: "100%", // Make the image responsive
>>>>>>> 56264c876973ebccfa89965679c8bf00366068b4
              height: "auto",
              borderRadius: "20px",
            }}
          />
        </div>
      ))}
    </HTMLFlipBook>
  );
<<<<<<< HEAD
};
=======
});
>>>>>>> 56264c876973ebccfa89965679c8bf00366068b4

function ReportDetail() {
  const { id } = useParams();
  const { data, isLoading } = useReportDetail(id);
  const refHtml = useRef(null);
  const flipbookRef = useRef(null); // Ref for the Flipbook instance
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (refHtml.current && data?.content) {
      // Decode HTML entities
      const decodedContent = decode(data.content);

      // Set the innerHTML with decoded content
      refHtml.current.innerHTML = decodedContent;

      // Ensure iframes are responsive
      const iframes = refHtml.current.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        iframe.style.maxWidth = "100%";
        iframe.style.width = "100%";
        iframe.style.height = "auto";
      });

      // Ensure images are responsive
      const images = refHtml.current.querySelectorAll("img");
      images.forEach((img) => {
        img.style.maxWidth = "100%";
        img.style.height = "auto";
      });
    }
  }, [data?.content]);

  useEffect(() => {
    if (data?.file) {
      const url = data.file;
      const loadingTask = pdfjsLib.getDocument(url);
      loadingTask.promise.then((pdf) => {
        const totalPages = pdf.numPages;
        const pageImages = [];

        const loadPage = async (pageNumber) => {
          const page = await pdf.getPage(pageNumber);
          const scale = window.innerWidth > 768 ? 1.5 : 1; // Adjust scaling based on screen size
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvasContext: context, viewport }).promise;

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

<<<<<<< HEAD
=======
  // Handler for flipping to the next page
  const handleNextPage = () => {
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().flipNext();
    }
  };

  // Handler for flipping to the previous page
  const handlePrevPage = () => {
    if (flipbookRef.current) {
      flipbookRef.current.pageFlip().flipPrev();
    }
  };

>>>>>>> 56264c876973ebccfa89965679c8bf00366068b4
  return (
    <>
      <div className="team-banner">
        <div className="team-banner-shadow">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px", // Add padding for better spacing
            }}
          >
            <Title
              className="text-upper text-white f-50 f-100"
<<<<<<< HEAD
              style={{ fontSize: window.innerWidth > 768 ? "50px" : "30px" }} // Responsive font size
=======
              style={{ fontSize: "clamp(24px, 5vw, 50px)" }}
>>>>>>> 56264c876973ebccfa89965679c8bf00366068b4
            >
              {data?.title}
            </Title>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Row
          style={{
            minHeight: "50vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </Row>
      ) : (
        <Container
          className="mt-4"
          style={{ maxWidth: "100%", padding: "0 15px" }}
        >
          <Row justify="center" style={{ paddingBottom: "40px" }}>
            <Col xs={24} md={20} lg={16}>
<<<<<<< HEAD
              <div ref={refHtml} />

              {pages.length > 0 && <Flipbook pages={pages} />}
=======
              <div ref={refHtml} style={{ marginBottom: "20px" }} />

              {pages.length > 0 && (
                <>
                  <Flipbook ref={flipbookRef} pages={pages} />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={handlePrevPage}
                      style={{ marginRight: "10px" }}
                    >
                      Previous Page
                    </Button>
                    <Button type="primary" onClick={handleNextPage}>
                      Next Page
                    </Button>
                  </div>
                </>
              )}
>>>>>>> 56264c876973ebccfa89965679c8bf00366068b4
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default ReportDetail;
