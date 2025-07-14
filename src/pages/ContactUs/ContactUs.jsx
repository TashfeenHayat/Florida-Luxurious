import React,{useState} from "react";
import { Flex, Col, Row, Typography, Form, Input, Card } from "antd";
import { Container } from "react-bootstrap";
import Icons from "../../components/Icons";
import Logo from "../../assets/logoicon.png";
import { CiMap, CiPhone, CiMail } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { contactUs } from "../../api/Inquiry";
import ReCAPTCHA from "react-google-recaptcha";
const { Title, Text } = Typography;
const RECAPTCHA_SITE_KEY = "6Lfo0oIrAAAAAASYr7BEI9Hxeq1Y7aC7AU8iON54";
function ContactUs() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loading } = useSelector((s) => s.contactUsReducer);
const [captchaToken, setCaptchaToken] = useState(null);

  const generateHtmlTemplate = (values) => {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
      submittedAt = new Date().toLocaleString(),
    } = values;

    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; color: #333; border: 1px solid #eee;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://firebasestorage.googleapis.com/v0/b/florida-lux-e66c2.firebasestorage.app/o/footerlogo.png?alt=media&token=5a4dc8bb-7f7e-4272-953a-4ca28c57e4b6" alt="Company Logo" style="max-height: 60px;" />
        </div>

        <h2 style="text-align: center; color: #2c3e50;">📩 New Client Inquiry Received</h2>

        <p style="margin-bottom: 20px;">You’ve received a new message from the contact form:</p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px;"><strong>👤 Name:</strong></td>
            <td style="padding: 8px;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px;"><strong>📧 Email:</strong></td>
            <td style="padding: 8px;"><a href="mailto:${email}" style="color: #3498db;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px;"><strong>📞 Phone:</strong></td>
            <td style="padding: 8px;">${phoneNumber}</td>
          </tr>
          <tr>
            <td style="padding: 8px; vertical-align: top;"><strong>💬 Message:</strong></td>
            <td style="padding: 8px;">${message}</td>
          </tr>
          <tr>
            <td style="padding: 8px;"><strong>🕒 Submitted At:</strong></td>
            <td style="padding: 8px;">${submittedAt}</td>
          </tr>
        </table>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;" />

        <p style="font-size: 13px; color: #888;">This message was sent from your website.</p>
      </div>
    `;
  };

  // ✅ Form Submission
  const onFinish = (values) => {
     if (!captchaToken) {
      alert("Please complete the captcha to continue.");
      return;
    }
    const html = generateHtmlTemplate(values);

    const payload = {
      ...values,
      html,
    };

    dispatch(contactUs(payload));
    form.resetFields();
      setCaptchaToken(null);
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
            <Row gutter={[16, 32]} align={"middle"}>
              <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                <div className="contact-us-content">
                  <Flex justify={"center"} align="center" vertical>
                    <Title
                      className="contact-us-title site-section-title"
                      style={{ color: "black" }}
                    >
                      <Text className="contact-us-title">Contact</Text>
                      <br />
                      <Text className="contact-us-sub f-100">us</Text>
                      <i className="title-line"></i>
                    </Title>
                    <Flex>
                      <Text className="text-upper f-16 f-bold ">
                        We would love to hear from you! Send us a message and
                        we’ll get right back in touch
                      </Text>
                    </Flex>
                  </Flex>
                  <Form form={form} layout="vertical" onFinish={onFinish}>
                    <Row gutter={[16, 16]} className="py-4">
                      <Col xs={24} sm={24} md={22} lg={12}>
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
                      <Col xs={24} sm={24} md={22} lg={12}>
                        <Form.Item
                          name="lastName"
                          label="Last Name"
                          className="contact-us-form"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your last name!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={18} sm={32} md={22} lg={24}>
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
                      <Col xs={24} md={22}>
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
                      <Col xs={24} md={22}>
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
                         <Col xs={24} md={22}>
                        <Form.Item>
                          <ReCAPTCHA
                            sitekey={RECAPTCHA_SITE_KEY}
                            onChange={(token) => setCaptchaToken(token)}
                            onExpired={() => setCaptchaToken(null)}
                          />
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
              <Col xs={24} sm={24} md={10} lg={10} xl={10}>
                <Card
                  bordered={false}
                  style={{ backgroundColor: "black" }}
                  className="contact-us-card-margin"
                >
                  <Flex vertical>
                    <Flex justify={"center"} align="center" className="py-3">
                      <img src={Logo} width={"30%"} preview={false} />
                    </Flex>
                    <Flex
                      vertical
                      align="center"
                      justify="center"
                      style={{ padding: "16px", textAlign: "center" }}
                    >
                      <Text className="logotext1">Florida</Text>
                      <Text className="logotext2">LUXURIOUS</Text>
                      <Text className="logotext3">properties</Text>
                    </Flex>

                    <Flex vertical className="py-4" gap={10}>
                      <Flex align="center" gap={5}>
                        <CiMap color="#838383" size={20} />
                        <Text
                          className="text-white text-upper"
                          style={{ fontSize: "14px" }}
                        >
                          2438 East Las Olas Boulevard Fort Lauderdale, FL 33301
                        </Text>
                      </Flex>

                      <Flex align="center" gap={5}>
                        <CiMail color="#838383" size={18} />
                        <Text
                          className="text-white text-upper"
                          style={{ fontSize: "14px" }}
                        >
                          info@floridaluxurious.com
                        </Text>
                      </Flex>

                      <Flex align="center" gap={5}>
                        <CiPhone color="#838383" size={18} />
                        <Text
                          className="text-white text-upper"
                          style={{ fontSize: "14px" }}
                        >
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
              src="https://firebasestorage.googleapis.com/v0/b/florida-lux-e66c2.firebasestorage.app/o/contactus.mp4?alt=media&token=77547d74-277e-4285-9725-561eb49e27d3"
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
