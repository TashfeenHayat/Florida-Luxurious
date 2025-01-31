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
  Spin,
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

  const [coordinates, setCoordinates] = useState({
    lat: 47.7511,
    lng: 120.7401,
  });
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

    if (!mapRef.current) {
      console.error("mapRef is not yet set");
      return;
    }

    const loadMap = async () => {
      await loader.load();
      const google = window.google;

      const map = new google.maps.Map(mapRef.current, {
        center: coordinates,
        zoom: 9,
      });

      const marker = new google.maps.Marker({
        map,
        position: coordinates,
        draggable: false,
      });

      const autocomplete = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          componentRestrictions: { country: "us" },
        }
      );

      autocomplete.addListener("place_changed", () => {
        const selectedPlace = autocomplete.getPlace();
        if (!selectedPlace.geometry) {
          console.error("Place not found");
          return;
        }

        const location = selectedPlace.geometry.location;
        const bounds = new google.maps.LatLngBounds();

        if (selectedPlace.geometry.viewport) {
          bounds.union(selectedPlace.geometry.viewport);
        } else {
          bounds.extend(location);
        }

        map.fitBounds(bounds);
        marker.setPosition(location);

        // **Set geo with the selected location's lat, lng, and formatted address**
        setGeo({
          location: {
            lat: location.lat(),
            lng: location.lng(),
          },
          address: selectedPlace.formatted_address,
        });
      });
    };

    const fetchData = async () => {
      if (id) {
        setLoading(true);
        const filter = await dispatch(getFilter(id));
        setLoading(false);
        setPhoto(filter.payload?.photo);
        setInitialValue(filter.payload);
        const geo = filter.payload?.geo;

        if (geo) {
          setCoordinates(geo.location);
        }
      }

      const intervalId = setInterval(async () => {
        try {
          await loadMap();
          clearInterval(intervalId);
        } catch (error) {
          console.error("Error loading map:", error);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    };

    fetchData();
  }, [dispatch, id, google_api_key]);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    console.log("Photo data: ", photo);
    console.log("Geo data: ", geo);

    if (id) {
      const res = await dispatch(
        updateFilter({
          id,
          ...values,

          photo,
          geo,
        })
      ).unwrap();

      console.log("Update result: ", res);
      openNotification("success", res);
      setTimeout(() => navigate("/admin/community"), 1000);
    } else {
      const res = await dispatch(
        addFilter({
          ...values,

          photo,
          geo: geo ? geo : null,
        })
      ).unwrap();

      console.log("Add result: ", res);
      openNotification("success", res);
      setTimeout(() => navigate("/admin/community"), 1000);
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
            <Form.Item name="other_description">
              <TextArea
                size="large"
                rows={5}
                placeholder="Why choose this community"
              />
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
            {/*<Form.Item name="condominiumOptions">
              <TextArea
                size="large"
                rows={4}
                placeholder="Condominium Options"
              />
            </Form.Item>*/}
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
