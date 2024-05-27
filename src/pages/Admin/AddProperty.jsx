import React, { useRef, useState, useEffect, useMemo } from "react";
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
  DatePicker,
  notification,
} from "antd";
import { api_base_URL, google_api_key } from "../../api/Axios";
import { Loader } from "@googlemaps/js-api-loader";
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

const { Option } = Select;

const statusList = [
  { value: "for_sale", label: "For Sale" },
  { value: "for_rent", label: "For Rent" },
  { value: "unavailable", label: "Unavailable" },
  { value: "sold", label: "Sold" },
  { value: "upcoming", label: "Upcoming" },
  { value: "featured", label: "Featured" },
];

function AddProperty() {
  const inputRef = useRef(null);
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: 47.7511,
    lng: 120.7401,
  });

  const getAgentsReducer = useSelector((s) => s.getAgentsReducer);
  const getPropertiesReducer = useSelector((s) => s.getPropertiesReducer);
  const getFiltersReducer = useSelector((s) => s.getFiltersReducer);

  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [areaUnit, setAreaUnit] = useState("SqFt");
  const [initialVlues, setInitialValue] = useState({});
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    console.log(newFileList);
    setFileList(newFileList);
  };

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
    const loader = new Loader({
      apiKey: google_api_key,
      libraries: ["places"],
    });

    loader.load().then(() => {
      if (inputRef.current && mapRef.current) {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: coordinates,
          zoom: 9,
        });
        setMap(mapInstance);

        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            componentRestrictions: { country: "us" },
          }
        );
        const addressComponets = {
          street_number: "short_name",
          route: "long_name",
          locality: "long_name",
          administrative_area_level_1: "short_name",
          country: "long_name",
          postal_code: "short_name",
        };
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            const location = place.geometry.location;
            setCoordinates({
              lat: location.lat(),
              lng: location.lng(),
            });
            console.log(place);
            for (var i = 0; i < place.address_components.length; i++) {
              var addressType = place.address_components[i].types[0];
              if (addressComponets[addressType]) {
                var val =
                  place.address_components[i][addressComponets[addressType]];

                switch (addressType) {
                  case "street_number":
                    form.setFieldsValue({
                      addressLine1: val,
                    });
                    break;
                  case "administrative_area_level_1":
                    form.setFieldsValue({
                      state: val,
                    });
                    break;
                  case "locality":
                    form.setFieldsValue({
                      city: val,
                    });
                    break;
                  case "country":
                    form.setFieldsValue({
                      country: val,
                    });
                    break;
                  case "postal_code":
                    form.setFieldsValue({
                      zipCode: val,
                    });
                    break;
                  case "street_number":
                  case "route":
                    form.setFieldsValue({
                      addressLine2: val,
                    });
                    break;
                }
              }
            }
            mapInstance.setCenter(location);
            new window.google.maps.Marker({
              position: location,
              map: mapInstance,
            });
          }
        });
      }
    });
    dispatch(getAgents({ page: 1, limit: 50 }));
    dispatch(getFilters({ page: 1, limit: 50 }));
    dispatch(getProperties({ mlsOnly: true }));
    if (id) {
      setLoading(true);
      dispatch(getProperty(params.id)).then((prop) => {
        console.log(prop);
        setLoading(false);
        setFileList(prop.payload?.media.map((media) => ({ url: media.mdUrl })));
        setCoordinates({
          lat: prop.payload.latitude,
          lng: prop.payload.longitude,
        });
        setInitialValue({
          agentId: prop.payload.agentId?._id,
          filters: prop.payload.filters.map((i) => i._id),
          ...prop.payload,
        });
      });
    }
  }, []);

  const onFinish = async (values) => {
    values.media = fileList.map((media) => ({
      mdUrl: media.response ? media.response.url : media.mdUrl,
    }));
    console.log("Received values of form: ", values);
    if (id) {
      const res = await dispatch(
        updateProperty({
          id,
          currency,
          areaUnit,
          longitude: String(coordinates.lng),
          latitude: String(coordinates.lat),
          ...values,
        })
      ).unwrap();
      setInitialValue({});
      openNotification("success", res);
      // setTimeout(navigate("/admin/property"), 1000);
    } else {
      const res = await dispatch(
        addProperty({
          currency,
          areaUnit,
          longitude: String(coordinates.lng),
          latitude: String(coordinates.lat),
          ...values,
        })
      ).unwrap();
      setInitialValue({});
      openNotification("success", res);
      setTimeout(navigate("/admin/property"), 1000);
    }
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const selectAfter = (
    <Select defaultValue="SqFt" onChange={(e) => setAreaUnit(e)}>
      <Option value="SqFt">SqFt</Option>
      <Option value="Yard">Yard</Option>
      <Option value="Mt">Mt</Option>
      <Option value="Acre">Acre</Option>
    </Select>
  );

  const curencyAfter = (
    <Select defaultValue="usd" onChange={(e) => setCurrency(e)}>
      <Option value="usd">USD</Option>
      <Option value="euro">Euro</Option>
      <Option value="pound">Pound</Option>
    </Select>
  );

  console.log(form.getFieldsValue());

  return (
    <Card title={id ? "Edit Property" : "Add Property"} loading={loading}>
      {contextHolder}
      <Form
        form={form}
        initialValues={initialVlues}
        name="add_property"
        onFinish={onFinish}
      >
        <Row justify="center">
          <Col span={24} className="gutter-row">
            <Form.Item name="media">
              <Upload
                name="file"
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
                  value: i.listingId,
                  label: i.listingId + " - " + i.address?.full,
                }))}
                placeholder="Search MLS property"
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item name="filters">
              <Select
                mode="multiple"
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
            <Form.Item name="neighborhood">
              <Input size="large" placeholder="Neighborhood" />
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
                    placeholder="Search a location"
                    className="ant-input ant-input-lg ant-input-outlined css-dev-only-do-not-override-1kuana8"
                  />
                </div>
              </div>
            </Form.Item>
            <Form.Item
              name={["addressLine1"]}
              rules={[
                {
                  required: true,
                  message: "Address Line 1 is required",
                },
              ]}
            >
              <Input size="large" placeholder="Address Line 1" />
            </Form.Item>
            <Form.Item name={["addressLine2"]}>
              <Input size="large" placeholder="Address Line 2" />
            </Form.Item>
            <Form.Item
              name={["city"]}
              rules={[
                {
                  required: true,
                  message: "City is required",
                },
              ]}
            >
              <Input size="large" placeholder="City" />
            </Form.Item>
            <Form.Item
              name={["state"]}
              rules={[
                {
                  required: true,
                  message: "State is required",
                },
              ]}
            >
              <Input size="large" placeholder="State" />
            </Form.Item>
            <Form.Item
              name={["country"]}
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
            <Form.Item
              name={["zipCode"]}
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
            <div ref={mapRef} style={{ width: "100%", height: "90%" }} />
          </Col>
          <Col span={12} className="gutter-row"></Col>
          <Col span={12} className="gutter-row"></Col>
          <Col span={12} className="gutter-row"></Col>
          <Col span={12} className="gutter-row"></Col>
          <Col span={12} className="gutter-row"></Col>
          <Col span={12} className="gutter-row"></Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="area"
              rules={[
                {
                  required: true,
                  message: "Area is required",
                },
              ]}
            >
              <Input size="large" addonAfter={selectAfter} placeholder="Area" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="salePrice"
              rules={[
                {
                  required: true,
                  message: "Price is required",
                },
              ]}
            >
              <Input
                size="large"
                addonAfter={curencyAfter}
                placeholder="Sale Price"
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="visitHours"
              rules={[
                {
                  required: true,
                  message: "Visiting Hours is required",
                },
              ]}
            >
              <Input size="large" placeholder="Visiting Hours" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="reducedPrice"
              rules={[
                {
                  required: true,
                  message: "Price is required",
                },
              ]}
            >
              <Input size="large" placeholder="Reduced Price" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="yearBuilt"
              rules={[
                {
                  required: true,
                  message: "Built Year is required",
                },
              ]}
            >
              <DatePicker
                size="large"
                picker="year"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="foundation"
              rules={[
                {
                  required: true,
                  message: "Foundation is required",
                },
              ]}
            >
              <Input size="large" placeholder="Foundation" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="bedroomCount"
              rules={[
                {
                  required: true,
                  message: "Bedroom Count is required",
                },
              ]}
            >
              <Input size="large" placeholder="Bedroom Count" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="bathCount"
              rules={[
                {
                  required: true,
                  message: "Bathroom Count is required",
                },
              ]}
            >
              <Input size="large" placeholder="Bathroom Count" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="stories"
              rules={[
                {
                  required: true,
                  message: "Stories is required",
                },
              ]}
            >
              <Input size="large" placeholder="Stories" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="roof"
              rules={[
                {
                  required: true,
                  message: "Roof is required",
                },
              ]}
            >
              <Input size="large" placeholder="Roof" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="flooring"
              rules={[
                {
                  required: true,
                  message: "Flooring is required",
                },
              ]}
            >
              <Input size="large" placeholder="Flooring" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="cooling"
              rules={[
                {
                  required: true,
                  message: "Cooling is required",
                },
              ]}
            >
              <Input size="large" placeholder="Cooling" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="heating"
              rules={[
                {
                  required: true,
                  message: "Heating is required",
                },
              ]}
            >
              <Input size="large" placeholder="Heating" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="fireplace"
              rules={[
                {
                  required: true,
                  message: "Fire Place is required",
                },
              ]}
            >
              <Input size="large" placeholder="Fire Place" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="style"
              rules={[
                {
                  required: true,
                  message: "Style is required",
                },
              ]}
            >
              <Input size="large" placeholder="Style" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="pool"
              rules={[
                {
                  required: true,
                  message: "Pool is required",
                },
              ]}
            >
              <Input size="large" placeholder="Pool" />
            </Form.Item>
          </Col>
          <Col span={12} className="gutter-row">
            <Form.Item
              name="parking"
              rules={[
                {
                  required: true,
                  message: "Parking is required",
                },
              ]}
            >
              <Input size="large" placeholder="Parking" />
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
