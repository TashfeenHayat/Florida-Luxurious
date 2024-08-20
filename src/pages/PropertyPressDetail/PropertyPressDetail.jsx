import React, { useEffect, useRef } from "react";
import { Typography, Row, Col, Spin } from "antd";
import { Container } from "react-bootstrap";
import usePressDetail from "../../hooks/usePressDetail";
import { useParams } from "react-router-dom";
import { decode } from "html-entities";

const { Title } = Typography;

function PropertyPressDetail() {
  const { id } = useParams();
  const { data, isLoading } = usePressDetail(id);
  const refHtml = useRef(null);

  useEffect(() => {
    if (refHtml.current && data?.content) {
      // Decode HTML entities
      const decodedContent = decode(data.content);

      // Set the innerHTML with decoded content
      refHtml.current.innerHTML = decodedContent;

      // Uncomment the following block to set the max width of iframes
      // const iframes = refHtml.current.querySelectorAll('iframe');
      // iframes.forEach((iframe) => {
      //   iframe.style.maxWidth = '550px';
      // });
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
            }}
          >
            <Title className="text-upper text-white f-50 f-100">
              {data?.title}
            </Title>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Row style={{ minHeight: "50vh" }}>
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      ) : (
        <Container className="mt-4" style={{ maxWidth: "950px" }}>
          <Row>
            <Col xs={18} sm={20} md={16} lg={12} xl={10} className="youtube">
              <div ref={refHtml} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default PropertyPressDetail;
