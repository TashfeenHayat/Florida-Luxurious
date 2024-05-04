import React, { useState, useEffect, useMemo } from "react";
import {
  Row,
  Col,
  Form,
  Card,
  Button,
  Image,
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
import {
  getProperties,
  addProperty,
  getProperty,
  updateProperty,
} from "../../api/Properties";
import { getAgents } from "../../api/Agents";
import { getFilters } from "../../api/Filters";

const { TextArea } = Input;

const statusList = [
  { value: "for_sale", label: "For Sale" },
  { value: "for_rent", label: "For Rent" },
  { value: "unavailable", label: "Unavailable" },
  { value: "sold", label: "Sold" },
  { value: "upcoming", label: "Upcoming" },
];

function AddProperty() {
  const getAgentsReducer = useSelector((s) => s.getAgentsReducer);
  const getPropertiesReducer = useSelector((s) => s.getPropertiesReducer);
  const getFiltersReducer = useSelector((s) => s.getFiltersReducer);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [initialVlues, setInitialValue] = useState({});
  const [photo, setPhoto] = useState();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

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
    dispatch(getAgents({ page: 1, limit: 50 }));
    dispatch(getFilters({ page: 1, limit: 50 }));
    dispatch(getProperties({ mlsOnly: true }));
    if (id) {
      setLoading(true);
      dispatch(getProperty(params.id)).then((agent) => {
        console.log(agent);
        setLoading(false);
        setPhoto(agent.payload?.photo);
        setInitialValue(agent.payload);
      });
    }
  }, []);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    if (id) {
      const res = await dispatch(
        updateProperty({
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
      setTimeout(navigate("/admin/property"), 1000);
    } else {
      const res = await dispatch(
        addProperty({
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
      setTimeout(navigate("/admin/property"), 1000);
    }
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  function validator(_, { valid }) {
    if (valid()) return Promise.resolve(); // non-strict validation
    return Promise.reject("Invalid phone number");
  }

  return (
    <Card title={id ? "Edit Property" : "Add Property"} loading={loading}>
      {contextHolder}
      <Form
        initialValues={initialVlues}
        name="add_property"
        onFinish={onFinish}
      >
        <Row justify="center">
          <Col span={24} className="gutter-row">
            <Form.Item name="media">
              <Upload
                name="media"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                headers={{
                  Authorization: `Bearer ${localStorage.token}`,
                }}
                action={`${api_base_URL}upload`}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: "none",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="Name"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}
            >
              <Input size="large" placeholder="Name" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="agentId"
              rules={[
                {
                  required: true,
                  message: "Agent is required",
                },
              ]}
            >
              <Select
                showSearch
                size="large"
                filterOption={filterOption}
                loading={getAgentsReducer.isLoading}
                options={getAgentsReducer.data?.agents.map((i) => ({
                  value: i._id,
                  label: i.firstName + " " + i.lastName,
                }))}
                placeholder="Search agent"
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item name="status">
              <Select
                size="large"
                options={statusList}
                placeholder="Select status"
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item name="mlsId">
              <Select
                showSearch
                size="large"
                filterOption={filterOption}
                loading={getPropertiesReducer.isLoading}
                options={getPropertiesReducer.data?.properties.map((i) => ({
                  value: i._id,
                  label: i.listingId + " - " + i.address.full,
                }))}
                placeholder="Search MLS property"
              />
            </Form.Item>
          </Col>

          <Col span={12} className="gutter-row">
            <Form.Item name="filters">
              <Select
                showSearch
                size="large"
                filterOption={filterOption}
                loading={getFiltersReducer.isLoading}
                options={getFiltersReducer.data?.filters.map((i) => ({
                  value: i._id,
                  label: i.name + " - " + i.code,
                }))}
                placeholder="Search filters"
              />
            </Form.Item>
            <Form.Item name="neighbour">
              <Input size="large" placeholder="Neighbour" />
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
            <Form.Item name="phoneNumber" rules={[{ validator }]}>
              <PhoneInput size="large" enableSearch />
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
                getAgentsReducer.isLoading ||
                getPropertiesReducer.isLoading ||
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

export default AddProperty;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
