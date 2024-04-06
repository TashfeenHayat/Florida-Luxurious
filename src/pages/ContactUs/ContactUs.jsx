import React from "react";
import { Flex, Col, Row, Typography, Form, Input } from "antd";
import { Container } from "react-bootstrap";

const { Title, Text } = Typography;
function ContactUs() {
  return (
    <>
      <div className="contact-us-banner"></div>
      <div className="contact-us-form-bg">
        <div className="contact-us-shadow-gray">
          <Container>
            <Row>
              <Col lg={14} md={14} sm={24}>
                <div className="contact-us-content">
                  <Flex justify={"center"} align="center" vertical>
                    <Title
                      className="contact-us-title site-section-title"
                      style={{ color: "black" }}
                    >
                      <Text className="contact-us-title">Contact</Text>
                      <br />
                      <Text className="contact-us-sub f-100">us</Text>
                      <i class="title-line"></i>
                    </Title>
                    <Flex>
                      <Text className="text-upper f-16 f-bold ">
                        We would love to hear from you! Send us a message and
                        we’ll get right back in touch
                      </Text>
                    </Flex>
                  </Flex>
                  <Form layout="vertical">
                    <Row gutter={[8, 16]} className="py-4">
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="First Name"
                          className="contact-us-form"
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          label="Last Name"
                          className="contact-us-form"
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col lg={24} md={24} sm={24}>
                        <Form.Item
                          label="Email Address"
                          className="contact-us-form"
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col lg={24} md={24} sm={24}>
                        <Form.Item label="Phone" className="contact-us-form">
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col lg={24} md={24} sm={24}>
                        <Form.Item label="Message" className="contact-us-form">
                          <Input />
                        </Form.Item>
                      </Col>
                      
                    </Row>
                  </Form>
                </div>
              </Col>
              <Col lg={10} md={10} sm={24}></Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
