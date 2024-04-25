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
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
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
        console.log(agent);
        setLoading(false);
        setPhoto(agent.payload?.photo);
        setInitialValue(agent.payload);
      });
    }

    return () => dispatch(resetAgent());
  }, []);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
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

  function validator(_, { valid }) {
    if (valid()) return Promise.resolve(); // non-strict validation
    return Promise.reject("Invalid phone number");
  }

  const beforeUpload = (e) => {
    console.log(e);
    setPhotoUplaoding(true);
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      console.log(info.file.response.url);
      setPhotoUplaoding(false);
      setPhoto(info.file.response.url);
    }
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
                headers={{
                  Authorization: `Bearer ${localStorage.token}`,
                }}
                action={`${api_base_URL}upload`}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {photo ? (
                  <img src={photo} alt="avatar" style={{ width: "100%" }} />
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
