import React, { useEffect, useRef, useState } from "react";
import { Typography, Row, Col, Spin, Button, Alert } from "antd";
import { Container } from "react-bootstrap";
import usePressDetail from "../../hooks/usePressDetail";
import { useParams } from "react-router-dom";
import { decode } from "html-entities";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import Flogo from "../../assets/flipbook.png";
const { Title } = Typography;

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const Flipbook = React.forwardRef(
  ({ pages, onPageChange, flipbookRef }, ref) => {
    const isMobile = window.innerWidth < 600;
    const flipbookWidth = isMobile ? window.innerWidth * 0.9 : 500;
    const flipbookHeight = isMobile ? flipbookWidth * 1.4 : 700;
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
          maxWidth: "100%",
        }}
        onFlip={onPageChange}
      >
        {pages?.length > 0 && (
          <div
            className="pageblank"
            key="blank"
            style={{
              display: "none",
              width: "100%",
              height: "auto",
            }}
          >
            <img
              src={pages[0] || ""}
              alt="Cover Page"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "20px",
              }}
            />
          </div>
        )}

        {pages?.length > 0 && (
          <div className="page cover" key="cover">
            <img
              src={pages[0] || ""}
              alt="Cover Page"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "20px",
              }}
            />
          </div>
        )}

        {pages.slice(1)?.map((page, index) => (
          <div className="page" key={index + 1}>
            <img
              src={page}
              alt={`Page ${index + 2}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "20px",
              }}
            />
          </div>
        ))}
      </HTMLFlipBook>
    );
  }
);

function PropertyPressDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = usePressDetail(id);
  const refHtml = useRef(null);
  const flipbookRef = useRef(null);

  const [pages, setPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(true);
  const [isCoverPage, setIsCoverPage] = useState(true);
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

          const imgData = canvas.toDataURL("image/png");
          if (imgData) {
            pageImages.push(imgData);
          }
          console.log(pages); // Add this before returning Flipbook component

          if (pageImages.length === totalPages) {
            setPages([...pageImages]);
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
    <>
      <div className="team-banner">
        <div className="team-banner-shadow">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <Title
              className="text-upper text-white f-50 f-100 press-title"
              style={{ fontSize: "clamp(24px, 5vw, 50px)" }}
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
          <div ref={refHtml} className="press-market" />
          {loadingPages ? (
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
            pages?.length > 1 && (
              <>
                <Flipbook pages={pages} flipbookRef={flipbookRef} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    width: "100%",
                  }}
                >
                  <Button
                    className="button-preview"
                    onClick={handlePrevPage}
                    style={{
                      marginRight: "10px",
                      padding: "10px 20px",
                      
                    }}
                  >
                    Previous Page
                  </Button>
                  <Button
                    className="button-next"
                    onClick={handleNextPage}
                    style={{
                      padding: "10px 20px",
                      
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
    </>
  );
}

export default PropertyPressDetail;
