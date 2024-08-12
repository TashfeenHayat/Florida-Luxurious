import React, { useEffect, useRef } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import { Typography, Row, Col, Spin } from "antd";
import useBlog from "../../hooks/useBlog";
import { useParams } from "react-router-dom";
import Agent from "../../assets/Agent.png";
import { Container } from "react-bootstrap";
import parse from "html-react-parser";

const { Title } = Typography;

function AgentBlog() {
  const { id } = useParams();
  const { data, isLoading } = useBlog(id);
  console.log(data);
  const htmlContent = `${data?.content}`;
  const refHtml = useRef(null);

  useEffect(() => {
    if (refHtml.current) {
      refHtml.current.innerHTML = parse(htmlContent);
     /*const iframes = refHtml.current.querySelectorAll("iframe");
      iframes.forEach((iframe) => {
       iframe.style.maxWidth = "550px";
      
    })*/}
  }, [htmlContent]);

  return (
    <div>
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
        <Row  style={{ minHeight: "50vh" }}>
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      ) : (
        <Container className="mt-4" style={{  maxWidth:"950px" }}>
          <Row >
            <Col xs={18} sm={20} md={16} lg={12} xl={10} className="youtube">
              <div   ref={refHtml} />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default AgentBlog;
