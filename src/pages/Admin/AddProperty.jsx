import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  Radio,
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
  Space,
} from "antd";
import dayJs from "dayjs";
import { api_base_URL, google_api_key } from "../../api/Axios";
import { Loader } from "@googlemaps/js-api-loader";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router";
import countryList from "react-select-country-list";
// import {
//   Editor,
//   EditorState,
//   ContentState,
//   convertFromHTML,
//   CompositeDecorator,
//   convertToRaw,
//   getDefaultKeyBinding,
//   compositeDecorator,
// } from "draft-js";

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
  const [showSecondaryAgent, setShowSecondaryAgent] = useState(false);
  const [addSecondaryAgent, setAddSecondaryAgent] = useState(false);

  const handleSecondaryAgentChange = (e) => {
    setAddSecondaryAgent(e.target.value === "yes");
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
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
    loadMap(loader, coordinates);
    dispatch(getAgents({ page: 1, limit: 50 }));
    dispatch(getFilters({ page: 1, limit: 50 }));
    dispatch(getProperties({ mlsOnly: true }));
    if (id) {
      setLoading(true);
      dispatch(getProperty(params.id)).then(({ payload }) => {
        console.log(payload);
        const { property } = payload;
        setLoading(false);

        // Decode HTML
        var parser = new DOMParser();
        var decodedHtml = parser.parseFromString(property.press, "text/html")
          .body.textContent;
        window.$("#summernote").summernote("code", decodedHtml);
        setFileList(property?.media?.map((media) => ({ url: media.mdUrl })));
        console.log(fileList);
        const coords = {
          lat: parseFloat(property.latitude),
          lng: parseFloat(property.longitude),
        };
        setCoordinates(coords);
        loadMap(loader, coords);
        form.resetFields();
        form.setFieldsValue({
          ...property,
          mlsId: parseInt(property?.mlsId),
          Primary_agentId: property.agentId?._id,
          Secondary_agentId: property.agentId?._id,
          filters: property.filters?.map((i) => i._id),
          yearBuilt: dayJs(property.yearBuilt),
        });
      });
    } else {
      window.$("#summernote").summernote();
    }
    return () => {
      window.$("#summernote").summernote("destroy");
    };
  }, []);

  // const loadSumernote = (value = "") => {
  //   console.log("calling", value);
  //   try {
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const loadMap = (loader, coordinates) => {
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
  };

  const onFinish = async (values) => {
    console.log(fileList);
    var markupStr = $("#summernote").summernote("code");
    values.media = fileList.map((media) => ({
      mdUrl: media.response ? media.response.url : media.url,
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
          press: markupStr,
          ...values,
        })
      ).unwrap();
      setInitialValue({});
      openNotification("success", res);
      setTimeout(navigate("/admin/property"), 1000);
    } else {
      const res = await dispatch(
        addProperty({
          currency,
          areaUnit,
          longitude: String(coordinates.lng),
          latitude: String(coordinates.lat),
          press: markupStr,
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

  return (
    <>
      <Card
        title={id ? "Edit Property" : "Add Property"}
        style={{ maxWidth: "1800px" }}
      >
        {contextHolder}
        <Form
          form={form}
          initialValues={initialVlues}
          name="add_property"
          onFinish={onFinish}
          {...layout}
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
                  {fileList?.length >= 8 ? null : uploadButton}
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
                label="Name"
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
                name="Primary_agentId"
                label="Primary Agent"
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
            </Col>{" "}
            <Col span={12} className="gutter-row">
              <Form.Item name="status" label="Status">
                <Select
                  size="large"
                  options={statusList}
                  placeholder="Select status"
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item label="Add Secondary Agent">
                <Radio.Group
                  onChange={handleSecondaryAgentChange}
                  value={addSecondaryAgent ? "yes" : "no"}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row"></Col>
            {/*  Conditional Secondary Agent Field */}
            {addSecondaryAgent && (
              <Col span={12}>
                <Form.Item
                  name="Secondary_agentId"
                  label="Secondary Agent"
                  rules={[
                    {
                      required: true,
                      message: "Secondary Agent is required",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    size="large"
                    filterOption={filterOption}
                    loading={getAgentsReducer.isLoading}
                    options={getAgentsReducer.data?.agents.map((agent) => ({
                      value: agent._id,
                      label: `${agent.firstName} ${agent.lastName}`,
                    }))}
                    placeholder="Search agent"
                  />
                </Form.Item>
              </Col>
            )}
            <Row>
              {" "}
              <Col span={12} className="gutter-row">
                <Form.Item name="filters" label="Commuities">
                  <Select
                    mode="multiple"
                    showSearch
                    size="large"
                    loading={getFiltersReducer.isLoading}
                    options={getFiltersReducer.data?.filters.map((i) => ({
                      value: i._id,
                      label: i.name + " - " + i.code,
                    }))}
                    placeholder="Search filters"
                  />
                </Form.Item>
                <Form.Item name="neighborhood" label="Neighborhood">
                  <Input size="large" placeholder="Neighborhood" />
                </Form.Item>
              </Col>
              <Col span={12} className="gutter-row">
                <Form.Item name="description" label="Description">
                  <TextArea size="large" rows={4} placeholder="Description" />
                </Form.Item>
              </Col>
              <Col span={12} className="gutter-row">
                <Form.Item
                  name={["addressLine1"]}
                  label="Address Line 1"
                  rules={[
                    {
                      required: true,
                      message: "Address Line 1 is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Address Line 1" />
                </Form.Item>
                <Form.Item name={["addressLine2"]} label="Address Line 2">
                  <Input size="large" placeholder="Address Line 2" />
                </Form.Item>
                <Form.Item
                  name={["city"]}
                  label="City"
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
                  label="State"
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
                  label="Country"
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
                  label="Zip Code"
                  rules={[
                    {
                      required: true,
                      message: "Zip Code is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Zip Code" />
                </Form.Item>
                <Form.Item
                  name="area"
                  label="Area"
                  rules={[
                    {
                      required: true,
                      message: "Area is required",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    addonAfter={selectAfter}
                    placeholder="Area"
                  />
                </Form.Item>
                <Form.Item
                  name="salePrice"
                  label="Sale Price"
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
                <Form.Item name="compensation" label="Compensation">
                  <Input size="large" placeholder="Compensation" />
                </Form.Item>
                <Form.Item
                  name="visitHours"
                  label="Visiting Hours"
                  placeholder="Visiting Hours"
                  rules={[
                    {
                      required: true,
                      message: "Visiting Hours is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Visiting Hours" />
                </Form.Item>
                <Form.Item
                  name="reducedPrice"
                  label="Reduced Price"
                  placeholder="Reduced Price"
                  rules={[
                    {
                      required: true,
                      message: "Price is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Reduced Price" />
                </Form.Item>
                <Form.Item
                  name="yearBuilt"
                  label="Built Year"
                  placeholder="Built Year"
                  format="YYYY"
                  showTime={false}
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
                <Form.Item
                  name="foundation"
                  label="Foundation"
                  placeholder="Foundation"
                  rules={[
                    {
                      required: true,
                      message: "Foundation is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Foundation" />
                </Form.Item>
                <Form.Item
                  name="bedroomCount"
                  label="Bedroom Count"
                  rules={[
                    {
                      required: true,
                      message: "Bedroom Count is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Bedroom Count" />
                </Form.Item>
                <Form.Item
                  name="bathCount"
                  label="Bathroom Count"
                  placeholder="Bathroom Count"
                  rules={[
                    {
                      required: true,
                      message: "Bathroom Count is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Bathroom Count" />
                </Form.Item>
                <Form.Item
                  name="stories"
                  label="Stories"
                  placeholder="Stories"
                  rules={[
                    {
                      required: true,
                      message: "Stories is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Stories" />
                </Form.Item>
                <Form.Item
                  name="roof"
                  label="Roof"
                  rules={[
                    {
                      required: true,
                      message: "Roof is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Roof" />
                </Form.Item>
                <Form.Item
                  name="flooring"
                  label="Flooring"
                  placeholder="Flooring"
                  rules={[
                    {
                      required: true,
                      message: "Flooring is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Flooring" />
                </Form.Item>
                <Form.Item
                  name="cooling"
                  label="Cooling"
                  placeholder="Cooling"
                  rules={[
                    {
                      required: true,
                      message: "Cooling is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Cooling" />
                </Form.Item>
                <Form.Item
                  name="heating"
                  label="Heating"
                  placeholder="Heating"
                  rules={[
                    {
                      required: true,
                      message: "Heating is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Heating" />
                </Form.Item>
                <Form.Item
                  name="fireplace"
                  label="Water Front"
                  placeholder="Water Front"
                  rules={[
                    {
                      required: true,
                      message: "Water Front is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Fire Place" />
                </Form.Item>
                <Form.Item
                  name="style"
                  label="Style"
                  placeholder="Style"
                  rules={[
                    {
                      required: true,
                      message: "Style is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Style" />
                </Form.Item>
                <Form.Item
                  name="pool"
                  label="Pool"
                  placeholder="Pool"
                  rules={[
                    {
                      required: true,
                      message: "Pool is required",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Pool" />
                </Form.Item>
                <Form.Item
                  name="parking"
                  label="Parking"
                  placeholder="Parking"
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
                <Col span={12} className="gutter-row">
                  <Form.Item name="mlsId" label="MLS ID">
                    <Input
                      showSearch
                      size="large"
                      filterOption={filterOption}
                      loading={getPropertiesReducer.isLoading}
                      options={getPropertiesReducer.data?.properties.map(
                        (i) => ({
                          value: i.mlsId,
                          label: i.mlsId + " - " + i.address?.full,
                        })
                      )}
                      placeholder=" MLS property"
                    />
                  </Form.Item>
                </Col>
                <Form.Item>
                  <div
                    ref={mapRef}
                    style={{ width: "100%", height: "400px" }}
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
                              <Input placeholder="Name" />
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
            </Row>{" "}
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
    </>
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
