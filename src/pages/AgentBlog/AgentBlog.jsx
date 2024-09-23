import React, { useEffect, useRef } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import { Typography, Row, Col, Spin, Alert } from "antd";
import useBlog from "../../hooks/useBlog";
import { useParams } from "react-router-dom";
import Agent from "../../assets/Agent.png";
import { Container } from "react-bootstrap";
import { decode } from "html-entities";

const { Title } = Typography;

function AgentBlog() {
  const { id } = useParams();
  const { data, isLoading, isError } = useBlog(id);
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
        iframe.style.height = "100vh";
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
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <BackgroundImage Image={Agent}>
        <Container>
          <Row justify="center" align="middle">
            <Col>
              <Title className="text-white text-upper f-50 f-100 text-center">
                Agent Blog
              </Title>
            </Col>
          </Row>
        </Container>
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
        <Container
          className="mt-4"
          style={{ maxWidth: "100%", padding: "0 15px", flex: "1" }}
        >
          <Row style={{ flexDirection: "column", height: "100%" }}>
            <Col xs={24} md={20} lg={16}>
              <div ref={refHtml} />
              {data?.file && (
                <div
                  style={{
                    marginTop: "20px",
                    textAlign: "center",
                    height: "100%",
                  }}
                >
                  <iframe
                    src={data.file}
                    style={{
                      width: "100%",
                      height: "100vh", // Full viewport height
                      border: "none",
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
    </div>
  );
}

export default AgentBlog;
