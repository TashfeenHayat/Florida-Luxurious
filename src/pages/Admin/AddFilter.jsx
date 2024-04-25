import React, { useState, useEffect, useMemo } from "react";
import {
  Row,
  Col,
  Form,
  Card,
  Button,
  Input,
  Upload,
  notification,
} from "antd";
import { api_base_URL } from "../../const/Const";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFilter, updateFilter, addFilter } from "../../api/Filters";

const { TextArea } = Input;

function AddFilter() {
  const addAgentReducer = useSelector((s) => s.addAgentReducer);
  const getAgentReducer = useSelector((s) => s.getAgentReducer);

  const [initialVlues, setInitialValue] = useState({});
  const [photo, setPhoto] = useState();
  const [photoUplaoding, setPhotoUplaoding] = useState(false);
  const [loading, setLoading] = useState(false);

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
      dispatch(getFilter(params.id)).then((agent) => {
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
        updateFilter({
          id,
          ...values,
          photo,
        })
      ).unwrap();
      setInitialValue({});
      openNotification("success", res);
      setTimeout(navigate("/admin/filter"), 1000);
    } else {
      const res = await dispatch(
        addFilter({
          ...values,
          photo,
        })
      ).unwrap();
      setInitialValue({});
      openNotification("success", res);
      setTimeout(navigate("/admin/filter"), 1000);
    }
  };

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
    <Card title={id ? "Edit Filter" : "Add Filter"} loading={loading}>
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
              name="name"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
              ]}
            >
              <Input size="large" placeholder="Name" />
            </Form.Item>
            <Form.Item name="code">
              <Input size="large" placeholder="Code" />
            </Form.Item>
          </Col>

          <Col span={12} className="gutter-row">
            <Form.Item name="description">
              <TextArea size="large" rows={4} placeholder="Description" />
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

export default AddFilter;
