import React, { useEffect, useRef } from "react";
import { Typography, Row, Col, Spin } from "antd";
import { Container } from "react-bootstrap";
import useReportDetail from "../../hooks/useReportDetail";
import { useParams } from "react-router-dom";
import { decode } from "html-entities";

const { Title } = Typography;

function ReportDetail() {
  const { id } = useParams();
  const { data, isLoading } = useReportDetail(id);
  const refHtml = useRef(null);

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
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <iframe
                    src={data.file}
                    style={{
                      width: "100%", // Set to 100% to ensure full-width
                      height: "calc(150vh - 200px)", // Dynamically set the height relative to viewport height
                    }}
                    frameBorder="0"
                    title="PDF Viewer"
                  />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default ReportDetail;
