import React, { useState, useEffect, useMemo } from "react";
import {
  Row,
  Col,
  Form,
  Card,
  Button,
  Input,
  Select,
  Upload,
  notification,
} from "antd";
import { api_base_URL } from "../../api/Axios";
import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router";
import countryList from "react-select-country-list";
import PhoneInput from "antd-phone-input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAgent, getAgent, updateAgent, resetAgent } from "../../api/Agents";

const { TextArea } = Input;

function AddAgent() {
  const addAgentReducer = useSelector((s) => s.addAgentReducer);
  const getAgentReducer = useSelector((s) => s.getAgentReducer);

  const [initialVlues, setInitialValue] = useState({});
  const [photo, setPhoto] = useState();
  const [photoUplaoding, setPhotoUplaoding] = useState(false);
  const [loading, setLoading] = useState(false);

  const options = useMemo(() => countryList().getData(), []);
  const params = useParams();
  const { id } = params;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, description) => {
    api[type]({ description });
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(getAgent(params.id)).then((agent) => {
        //console.log("agent url", agent);
        setLoading(false);
        setPhoto(agent.payload?.photo);
        setInitialValue(agent.payload);
      });
    }

    return () => dispatch(resetAgent());
  }, []);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    console.log("Phone Number object: ", values.phoneNumber);
    if (id) {
      const res = await dispatch(
        updateAgent({
          id,
          ...values,
          photo,
          phoneNumber:
            values.phoneNumber.countryCode +
            values.phoneNumber.areaCode +
            values.phoneNumber.phoneNumber,
        })
      ).unwrap();
      setInitialValue({});
      openNotification("success", res);
      setTimeout(navigate("/admin/agent"), 1000);
    } else {
      const res = await dispatch(
        addAgent({
          ...values,
          photo,
          phoneNumber:
            values.phoneNumber.countryCode +
            values.phoneNumber.areaCode +
            values.phoneNumber.phoneNumber,
        })
      ).unwrap();
      setInitialValue({});
      openNotification("success", res);
      setTimeout(navigate("/admin/agent"), 1000);
    }
  };
  // function validator(_, value) {
  //   // value is the phone number object passed by Form.Item
  //   console.log("Phone input value", value); // Add logging to inspect the structure

  //   if (!value) {
  //     return Promise.reject("Phone number is required");
  //   }

  //   const { countryCode, areaCode, phoneNumber } = value;

  //   console.log("countryCode", countryCode);
  //   console.log("areaCode", areaCode);
  //   console.log("phoneNumber", phoneNumber);

  //   // Check if any part of the phone number is missing
  //   if (!countryCode || !areaCode || !phoneNumber) {
  //     return Promise.reject("Phone number is incomplete");
  //   }

  //   // Combine all parts of the phone number into one string
  //   const fullPhoneNumber = countryCode + areaCode + phoneNumber;

  //   // Example regex to validate phone number (adjust as needed)
  //   const phonePattern = /^[0-9]{10,15}$/; // Modify based on your expected format

  //   // Validate phone number using the pattern
  //   if (phonePattern.test(fullPhoneNumber)) {
  //     return Promise.resolve();
  //   } else {
  //     return Promise.reject("Invalid phone number");
  //   }
  // }

  // function validator(_, { valid }) {
  //   console.log("valid", valid());
  //   if (valid()) return Promise.resolve(); // non-strict validation
  //   return Promise.reject("Invalid phone number");
  // }
  // function validator(_, { phoneNumber }) {
  //   const phonePattern = /^[0-9]{10,15}$/; // Example pattern: validates numbers of 10-15 digits
  //   if (phonePattern.test(phoneNumber)) {
  //     return Promise.resolve();
  //   } else {
  //     return Promise.reject("Invalid phone number");
  //   }
  // }
  function validator(_, value) {
    // Log the value for debugging
    console.log("Phone input value", value);

    if (!value) {
      return Promise.reject("Phone number is required");
    }

    // Check if the value is a single phone number string (like "17863541311")
    if (typeof value === "string") {
      // If the value is a plain string, assume it's the full phone number
      const phoneNumber = value.trim();

      // Set default values for countryCode and areaCode based on assumptions
      const countryCode =
        phoneNumber.length >= 11 ? phoneNumber.substring(0, 1) : ""; // Adjust based on actual format
      const areaCode =
        phoneNumber.length >= 11 ? phoneNumber.substring(1, 4) : ""; // Adjust based on actual format
      const number = phoneNumber.substring(4); // The remaining part is the phone number

      value = { countryCode, areaCode, phoneNumber: number }; // Set the value in the expected format
      console.log("Updated value", value);
    }

    const { countryCode, areaCode, phoneNumber } = value;

    console.log("countryCode", countryCode);
    console.log("areaCode", areaCode);
    console.log("phoneNumber", phoneNumber);

    // Check if any part of the phone number is missing
    if (!countryCode || !areaCode || !phoneNumber) {
      return Promise.reject("Phone number is incomplete");
    }

    // Combine all parts of the phone number into one string
    const fullPhoneNumber = countryCode + areaCode + phoneNumber;

    // Example regex to validate phone number (adjust as needed)
    const phonePattern = /^[0-9]{10,15}$/; // Modify based on your expected format

    // Validate phone number using the pattern
    if (phonePattern.test(fullPhoneNumber)) {
      return Promise.resolve();
    } else {
      return Promise.reject("Invalid phone number");
    }
  }

  const beforeUpload = (e) => {
    console.log(e);
    setPhotoUplaoding(true);
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      console.log("agent photo ", info.file.response.url);
      setPhotoUplaoding(false);
      setPhoto(info.file.response.url);
    }
  };
  const removeImage = () => {
    setPhoto(null); // Remove the selected photo
  };

  const uploadButton = (
    <div>
      {photoUplaoding ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Card title={id ? "Edit Agent" : "Add Agent"} loading={loading}>
      {contextHolder}
      <Form initialValues={initialVlues} name="add_agent" onFinish={onFinish}>
        <Row justify="center">
          <Col span={4} className="gutter-row">
            <Form.Item name="photo">
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                loading={photoUplaoding}
                showUploadList={false}
                moveable="true"
                headers={{
                  Authorization: `Bearer ${localStorage.token}`,
                }}
                action={`${api_base_URL}upload`}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {photo ? (
                  <>
                    <div style={{ position: "relative" }}>
                      <img src={photo} alt="avatar" style={{ width: "100%" }} />
                      <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={removeImage}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          zIndex: 1,
                          background: "rgba(255, 255, 255, 0.6)",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  </>
                ) : photoUplaoding ? (
                  <LoadingOutlined />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "First Name is required",
                },
              ]}
            >
              <Input size="large" placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Last Name is required",
                },
              ]}
            >
              <Input size="large" placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Email is required",
                },
              ]}
            >
              <Input size="large" placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item name="phoneNumber" rules={[{ validator }]}>
              <PhoneInput size="large" enableSearch />
            </Form.Item>

            {/* <Form.Item name="phoneNumber" rules={[{ validator }]}>
              <PhoneInput size="large" enableSearch />
            </Form.Item> */}
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item name="code">
              <Input size="large" placeholder="Code" />
            </Form.Item>
            <Form.Item name="reference">
              <Input size="large" placeholder="Reference" />
            </Form.Item>
          </Col>

          <Col span={12} className="gutter-row">
            <Form.Item name="description">
              <TextArea size="large" rows={4} placeholder="Description" />
            </Form.Item>
          </Col>

          <Col span={12} className="gutter-row">
            <Form.Item
              name={["address", "addressLine1"]}
              rules={[
                {
                  required: true,
                  message: "Address Line 1 is required",
                },
              ]}
            >
              <Input size="large" placeholder="Address Line 1" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item name={["address", "addressLine2"]}>
              <Input size="large" placeholder="Address Line 2" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name={["address", "state"]}
              rules={[
                {
                  required: true,
                  message: "State is required",
                },
              ]}
            >
              <Input size="large" placeholder="State" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name={["address", "city"]}
              rules={[
                {
                  required: true,
                  message: "City is required",
                },
              ]}
            >
              <Input size="large" placeholder="City" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name={["address", "country"]}
              rules={[
                {
                  required: true,
                  message: "Country is required",
                },
              ]}
            >
              <Select
                showSearch
                size="large"
                options={options}
                placeholder="Search country"
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name={["address", "zipCode"]}
              rules={[
                {
                  required: true,
                  message: "Zip Code is required",
                },
              ]}
            >
              <Input size="large" placeholder="Zip Code" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item name={["social", "facebook"]}>
              <Input size="large" placeholder="Facebook" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item name={["social", "insta"]}>
              <Input size="large" placeholder="Instagram" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item name={["social", "linkedin"]}>
              <Input size="large" placeholder="Linkedin" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item name={["social", "twitter"]}>
              <Input size="large" placeholder="Twitter" />
            </Form.Item>
          </Col>
        </Row>
        <Col span={24} className="gutter-row">
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              size="large"
              block="true"
              type="primary"
              htmlType="submit"
              loading={
                addAgentReducer.isLoading ||
                getAgentReducer.isLoading ||
                photoUplaoding ||
                loading
              }
            >
              Save
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </Card>
  );
}

export default AddAgent;
