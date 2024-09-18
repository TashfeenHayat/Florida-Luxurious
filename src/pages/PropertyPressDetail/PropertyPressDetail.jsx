import React, { useEffect, useRef } from "react";
import { Typography, Row, Col, Spin } from "antd";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { decode } from "html-entities";

import usePressDetail from "../../hooks/usePressDetail";
const { Title } = Typography;
// Import PDF.js core
import * as pdfjs from "pdfjs-dist/build/pdf";

// Manually load the worker for Vite compatibility
const pdfjsWorker = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
);

// Set the workerSrc
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.href;
function PropertyPressDetail() {
  const { id } = useParams();
  const { data, isLoading } = usePressDetail(id);
  const refHtml = useRef(null);
  const flipbookRef = useRef(null);

  useEffect(() => {
    if (refHtml.current && data?.content) {
      const decodedContent = decode(data.content);
      refHtml.current.innerHTML = decodedContent;

      const iframes = refHtml.current.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
        iframe.style.maxWidth = "100%";
        iframe.style.width = "100%";
        iframe.style.height = "100vh";
      });

      const images = refHtml.current.querySelectorAll("img");
      images.forEach((img) => {
        img.style.maxWidth = "100%";
        img.style.height = "auto";
      });
    }
  }, [data?.content]);

  useEffect(() => {
    if (data?.file && flipbookRef.current) {
      renderPDFAsFlipbook(data?.file);
    }
  }, [data?.file]);

  const renderPDFAsFlipbook = async (pdfUrl) => {
    console.log(pdfUrl);
    const pdf = await pdfjs.getDocument(pdfUrl).promise;
    console.log(pdf);
    const flipbook = flipbookRef.current;

    // Clear any previous content
    flipbook.innerHTML = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const viewport = page.getViewport({ scale: 1.5 });

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport,
      };

      await page.render(renderContext).promise;

      const pageDiv = document.createElement("div");
      pageDiv.style.width = "100%";
      pageDiv.style.height = "auto";
      pageDiv.appendChild(canvas);
      flipbook.appendChild(pageDiv);
    }

    // Initialize the flipbook using Turn.js
    $(flipbook).turn({
      width: 800,
      height: 600,
      autoCenter: true,
      elevation: 50,
    });
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
            }}
          >
            <Title className="text-upper text-white f-50 f-100">
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
          <Row justify="center">
            <Col xs={24} md={20} lg={16}>
              <div ref={refHtml} />
              {data?.file && (
                <div
                  ref={flipbookRef}
                  className="flipbook-container"
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                  }}
                />
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default PropertyPressDetail;
