import React from "react";
import { Flex, Col, Row, Typography, Form, Input, Card } from "antd";
import { Container } from "react-bootstrap";
import Icons from "../../components/Icons";
import Logo from "../../assets/logoicon.png";
import { CiMap, CiPhone, CiMail } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { contactUs } from "../../api/Inquiry";
import bootomvideo from "../../assets/videos/contactus.mp4";
const { Title, Text } = Typography;

function ContactUs() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loading } = useSelector((s) => s.contactUsReducer);
  // Form validation rules
  const onFinish = (values) => {
    dispatch(contactUs(values));
    form.resetFields(); // This resets the form fields
  };
  const handlePhoneInput = (e) => {
    // Only allow numeric characters (0-9)
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className="contact-us-banner"></div>
      <div className="contact-us-form-bg">
        <div className="contact-us-shadow-gray">
          <Container>
            <Row align={"middle"}>
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
                  <Form layout="vertical" onFinish={onFinish}>
                    <Row gutter={[8, 16]} className="py-4">
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          name="firstName"
                          label="First Name"
                          className="contact-us-form"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your first name!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col lg={12} md={12} sm={24}>
                        <Form.Item
                          name="lastName"
                          label="Last Name"
                          className="contact-us-form"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your first name!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col lg={24} md={24} sm={24}>
                        <Form.Item
                          name="email"
                          label="Email Address"
                          className="contact-us-form"
                          rules={[
                            {
                              type: "email",
                              message: "The input is not a valid email!",
                            },
                            {
                              required: true,
                              message: "Please input your email!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col lg={24} md={24} sm={24}>
                        <Form.Item
                          name="phoneNumber"
                          label="Phone"
                          className="contact-us-form"
                          rules={[
                            {
                              required: true,
                              message: "This field is required.",
                            },
                            {
                              pattern: /^[0-9]+$/,
                              message: "Please input a valid number",
                            },
                          ]}
                        >
                          <Input onKeyPress={handlePhoneInput} />
                        </Form.Item>
                      </Col>
                      <Col lg={24} md={24} sm={24}>
                        <Form.Item
                          name="message"
                          label="Message"
                          className="contact-us-form"
                          rules={[
                            {
                              required: true,
                              message: "Please input your message!",
                            },
                          ]}
                        >
                          <Input.TextArea />
                        </Form.Item>
                      </Col>
                    </Row>
                    <button
                      className="button-view1"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending" : "Send"}
                    </button>
                  </Form>
                </div>
              </Col>
              <Col lg={10} md={10} sm={24} align="middle">
                <Card
                  bordered={false}
                  style={{ backgroundColor: "black" }}
                  className="contact-us-card-margin"
                >
                  <Flex vertical>
                    <Flex justify={"center"} align="center" className="py-3">
                      <img src={Logo} width={"30%"} preview={false} />
                    </Flex>
                    <Text className="text-upper text-white text-center f-16 f-200">
                      {" "}
                      Florida
                    </Text>
                    <Text className="text-upper text-white text-center f-24 f-bold">
                      {" "}
                      LUXURIOUS
                    </Text>
                    <Text className="text-upper text-white text-center f-16  f-200">
                      {" "}
                      properties
                    </Text>

                    <Flex
                      justify={"flex-start"}
                      align="flex-start"
                      vertical
                      className="py-4"
                      gap={10}
                    >
                      <Flex align={"center"} gap={5}>
                        <CiMap color="#838383" size={15} />
                        <Text className="text-white text-upper">
                          2438 East Las Olas Boulevard Fort Lauderdale, FL 33301
                        </Text>
                      </Flex>
                      <Flex align={"center"} gap={5}>
                        <CiMail color="#838383" size={15} />
                        <Text className="text-white text-upper">
                          info@floridaluxurious.com
                        </Text>
                      </Flex>
                      <Flex align={"center"} gap={5}>
                        <CiPhone color="#838383" size={15} />
                        <Text className="text-white text-upper">
                          954.870.4080
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </Card>
              </Col>
            </Row>
          </Container>
          <Icons />
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <div className="background-video-container" style={{ height: "70vh" }}>
          <video autoPlay muted loop className="background-video">
            <source
              src="https://firebasestorage.googleapis.com/v0/b/florida-lux-e66c2.firebasestorage.app/o/short2.mp4?alt=media&token=8b881d1d-dd33-4910-b460-f33c5ef3d688"
              //src="https://firebasestorage.googleapis.com/v0/b/floridaluxrious.appspot.com/o/contactus.mp4?alt=media&token=e7a90eec-4b56-4882-b2b2-04697ad777f2"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="content-hero w-100">
          <div className="hero-bg-img-shadow "></div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
