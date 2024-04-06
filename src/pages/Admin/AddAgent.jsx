import React, { useEffect, useMemo } from "react";
import {
  Row,
  Col,
  Form,
  Card,
  Button,
  Input,
  Select,
  notification,
} from "antd";
import countryList from "react-select-country-list";
import PhoneInput from "antd-phone-input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAgent, getAgent, updateAgent } from "../../api/Agents";

const { TextArea } = Input;

function AddAgent() {
  const { isLoading, isError, data } = useSelector((s) => s.addAgentReducer);
  const options = useMemo(() => countryList().getData(), []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, description) => {
    api[type]({ description });
  };

  useEffect(() => {
    // dispatch(getAgent());
  }, []);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    const res = await dispatch(
      addAgent({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber:
          values.phoneNumber.countryCode +
          values.phoneNumber.areaCode +
          values.phoneNumber.phoneNumber,
        code: values.code,
        reference: values.reference,
        description: values.description,
        address: {
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          country: values.country,
        },
      })
    ).unwrap();
    console.log(res);
    openNotification("success", res);
    navigate("/admin/agents");
  };

  const validator = (_, { valid }) => {
    if (valid()) return Promise.resolve(); // non-strict validation
    return Promise.reject("Invalid phone number");
  };

  return (
    <Card title="Add Agent">
      {contextHolder}
      <Form name="add_agent" onFinish={onFinish}>
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
              name="addressLine1"
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
            <Form.Item name="addressLine2">
              <Input size="large" placeholder="Address Line 2" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="state"
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
              name="city"
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
              name="country"
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
              name="zipCode"
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
              loading={isLoading}
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
