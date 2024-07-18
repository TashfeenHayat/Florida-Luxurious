import React, { useEffect, useRef } from "react";
import BackgroundImage from "../../components/BackgroundImage";
import { Typography, Row, Col, Image, Flex, Spin, Skeleton, Card } from "antd";
import useBlog from "../../hooks/useBlog";
import { useParams, useNavigate } from "react-router-dom";
import Agent from "../../assets/Agent.png";
import { Container } from "react-bootstrap";
import parse from "html-react-parser";
const { Title, Paragraph, Text } = Typography;

function AgentBlog() {
  const { id } = useParams();
  const { data, isLoading } = useBlog(id);
  console.log(data);
  const htmlContent = `${data?.content}`;
  const refHtml = useRef(null);

  useEffect(() => {
    if (refHtml) {
      refHtml.current.innerHTML = parse(htmlContent);
    }
  }, [htmlContent]);

  return (
    <div>
      {isLoading ? (
        <Flex justify={"center"} align="center">
          {" "}
          <Spin size={"large"} />
        </Flex>
      ) : (
        <>
          <BackgroundImage Image={Agent}>
            <Title className="text-white text-upper f-50 f-100">
              Agent Blog
            </Title>
          </BackgroundImage>
          <Container>
            <div ref={refHtml} />
          </Container>
        </>
      )}
    </div>
  );
}

export default AgentBlog;
