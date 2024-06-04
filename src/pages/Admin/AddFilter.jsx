import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Form,
  Card,
  Button,
  Input,
  Upload,
  notification,
  Space,
} from "antd";
import { api_base_URL, google_api_key } from "../../api/Axios";
import { Loader } from "@googlemaps/js-api-loader";
import {
  LoadingOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFilter, updateFilter, addFilter } from "../../api/Filters";

const { TextArea } = Input;

function AddFilter() {
  const addAgentReducer = useSelector((s) => s.addAgentReducer);
  const getAgentReducer = useSelector((s) => s.getAgentReducer);

  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const [initialVlues, setInitialValue] = useState({});
  const [photo, setPhoto] = useState("");
  const [geo, setGeo] = useState({});
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
    const loader = new Loader({
      apiKey: google_api_key,
      libraries: ["places"],
    });
    loadMap(loader);
    if (id) {
      setLoading(true);
      dispatch(getFilter(params.id)).then((filter) => {
        console.log(filter.payload);
        setLoading(false);
        setPhoto(filter.payload?.photo);
        setInitialValue(filter?.payload);
        loadMap(loader, filter.payload?.geo);
        // setGeo(place);
        //   console.log(place);

        //   if (!place.geometry) {
        //     console.error("Place not found");
        //     return;
        //   }

        //   var bounds = new google.maps.LatLngBounds();
        //   if (place.geometry.viewport) {
        //     bounds.union(place.geometry.viewport);
        //   } else if (place.geometry.bounds) {
        //     bounds.extend(place.geometry.bounds.getNorthEast());
        //     bounds.extend(place.geometry.bounds.getSouthWest());
        //   }

        //   map.fitBounds(bounds);
        //   marker.setPosition(place.geometry.location);
      });
    }
  }, []);

  const loadMap = (loader, place) => {
    loader.load().then(() => {
      if (inputRef.current && mapRef.current) {
        let google = window.google;
        const map = new google.maps.Map(mapRef.current, {
          center: place
            ? place.geometry?.location
            : { lat: 37.7749, lng: -122.4194 }, // Default center (San Francisco)
          zoom: 9,
        });

        const marker = new google.maps.Marker({
          map,
          draggable: false,
        });

        const autocomplete = new google.maps.places.Autocomplete(
          inputRef.current,
          {
            componentRestrictions: { country: "us" },
          }
        );

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          setGeo(place);
          console.log(place);

          if (!place.geometry) {
            console.error("Place not found");
            return;
          }

          var bounds = new google.maps.LatLngBounds();
          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else if (place.geometry.bounds) {
            bounds.extend(place.geometry.bounds.getNorthEast());
            bounds.extend(place.geometry.bounds.getSouthWest());
          }

          map.fitBounds(bounds);
          marker.setPosition(place.geometry.location);
        });
      }
    });
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values, photo);
    if (id) {
      const res = await dispatch(
        updateFilter({
          id,
          ...values,
          photo,
          geo,
        })
      ).unwrap();
      // setInitialValue({});
      openNotification("success", res);
      setTimeout(navigate("/admin/community"), 1000);
    } else {
      const res = await dispatch(
        addFilter({
          ...values,
          photo,
          geo,
        })
      ).unwrap();
      // setInitialValue({});
      openNotification("success", res);
      setTimeout(navigate("/admin/community"), 1000);
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
    <Card title={id ? "Edit Community" : "Add Community"} loading={loading}>
      {contextHolder}
      <Form initialValues={initialVlues} name="add_agent" onFinish={onFinish}>
        <Row justify="center">
          <Col span={4} className="gutter-row">
            <Form.Item name="1">
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
          <Col span={12} className="gutter-row">
            <Form.Item>
              <div className="ant-form-item-control-input">
                <div className="ant-form-item-control-input-content">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search a community"
                    className="ant-input ant-input-lg ant-input-outlined css-dev-only-do-not-override-1kuana8"
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item>
              <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item name="condominiumOptions">
              <TextArea
                size="large"
                rows={4}
                placeholder="Condominium Options"
              />
            </Form.Item>
            <Card title="Features">
              <Form.List name="features">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, i) => (
                      <Space
                        key={field.key}
                        style={{ display: "flex", marginBottom: 8 }}
                      >
                        <Form.Item
                          {...field}
                          name={[field.name, "name"]}
                          fieldKey={[field.fieldKey, "name"]}
                          key={i + field.name}
                        >
                          <Input placeholder="Item Code" />
                        </Form.Item>

                        <Form.Item
                          {...field}
                          name={[field.name, "description"]}
                          fieldKey={[field.fieldKey, "description"]}
                          key={i + 1 + field.name}
                        >
                          <TextArea
                            size="large"
                            rows={2}
                            placeholder="Description"
                          />
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add item
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Card>
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
