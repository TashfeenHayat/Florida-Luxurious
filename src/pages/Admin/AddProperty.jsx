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
import {
  MinusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
  InboxOutlined,
} from "@ant-design/icons";
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
import { debounce } from "lodash";
const { TextArea } = Input;
const { Dragger } = Upload;
const { Option } = Select;

const statusList = [
  { value: "for_sale", label: "For Sale(featured)" },
  { value: "for_rent", label: "For Rent" },
  { value: "unavailable", label: "Unavailable" },
  { value: "sold", label: "Sold" },
  { value: "upcoming", label: "Upcoming" },
  // { value: "featured", label: "Featured" },
];
const Compensation = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
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
  const [fileListVideo, setFileListVideo] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [showSecondaryAgent, setShowSecondaryAgent] = useState(false);
  const [addSecondaryAgent, setAddSecondaryAgent] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const handleSecondaryAgentChange = (e) => {
    setAddSecondaryAgent(e.target.value === "yes");
  };

  const handleChange = ({ file, fileList }) => {
    console.log(fileList);
    setFileList(fileList);
    if (file.status === "uploading") {
      setIsUploading(true); // Mark as uploading
    } else if (file.status === "done" || file.status === "error") {
      setIsUploading(false); // Mark as done or error
    }
  };

  const handleChangeVideo = debounce(({ file, fileList }) => {
    setFileListVideo(fileList);
    if (file.status === "uploading") {
      setIsUploading(true); // Mark as uploading
    } else if (file.status === "done" || file.status === "error") {
      setIsUploading(false); // Mark as done or error
    }
  }, 500);

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const fromIndex = e.dataTransfer.getData("text/plain");
    const newFileList = [...fileList];
    const [movedItem] = newFileList.splice(fromIndex, 1);
    newFileList.splice(index, 0, movedItem);
    setFileList(newFileList);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const uploadButton = (
    <div>
      {isUploading ? (
        <LoadingOutlined />
      ) : (
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
      )}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
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
  const [marker, setMarker] = useState(null);

  const handleExit = () => {
    navigate("/admin/property"); // Navigate to the /admin/property page
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
        //console.log(payload);
        const { property } = payload;

        setLoading(false);
        // Decode HTML
        var parser = new DOMParser();
        var decodedHtml = parser.parseFromString(property.press, "text/html")
          .body.textContent;
        window.$("#summernote").summernote("code", decodedHtml);
        setFileList(
          property?.media?.map((media) => ({
            url: media.mdUrl,
            name: media.name || media.mdUrl.split("/").pop(), // Fallback name if missing
            uid: media._id || media.mdUrl, // Unique identifier
          }))
        );

      
         setFileListVideo(
          property?.video?.map((video) => ({
            url: video.mdUrl,
            name: video.name || video.mdUrl.split("/").pop(), // Fallback name if missing
            uid: video._id || video.mdUrl, // Unique identifier
          }))
        );
        //console.log(fileList);
        const coords = {
          lat: parseFloat(property.latitude),
          lng: parseFloat(property.longitude),
        };
        setCoordinates(coords);
        loadMap(loader, coords);
        form.resetFields();
        form.setFieldsValue({
          ...property,

          mlsId: property.mlsId,
          Primary_agentId: property.Primary_agentId?._id,
          Secondary_agentId: property.Secondary_agentId?._id,
          filters: property.filters?.map((i) => i._id),
          yearBuilt: dayJs(property.yearBuilt),
          addressLine1: property.addressLine1,
        });

        // Determine if a secondary agent exists
        setAddSecondaryAgent(!!property.Secondary_agentId);

        // Populate location input
        if (inputRef.current) {
          inputRef.current.value = `${property?.addressLine1 || ""}, ${
            property?.city || ""
          }, ${property?.state || ""}, ${property?.country || ""}`;
        }
      });
    } else {
      window.$("#summernote").summernote();
    }
    return () => {
      window.$("#summernote").summernote("destroy");
    };
  }, [dispatch, id]);

  const loadMap = (loader, coordinates) => {
    loader.load().then(() => {
      if (inputRef.current && mapRef.current) {
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: coordinates,
          zoom: 9,
        });
        setMap(mapInstance);

        // Check if a marker already exists, if so, update its position
        if (!marker) {
          const newMarker = new window.google.maps.Marker({
            position: coordinates,
            map: mapInstance,
          });
          setMarker(newMarker); // Save the marker reference in state
        } else {
          marker.setPosition(coordinates); // Update the existing marker position
        }

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
            mapInstance.setCenter(location);

            // Update the marker position if it exists
            if (marker) {
              marker.setPosition(location);
            } else {
              new window.google.maps.Marker({
                position: location,
                map: mapInstance,
              });
            }

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
          }
        });
      }
    });
  };

  const onFinish = async (values) => {
     values.media = fileList?.reduce((acc, media) => {
      const mediaUrl = media?.url || media?.mdUrl || media?.response?.urls[0]; // Correct URL assignment
      const mediaName =
        media?.name || `Unnamed Media for ${mediaUrl?.split("/").pop()}`; // Default name if missing

      console.log(mediaUrl, mediaName); // Debugging output

      if (mediaUrl) {
        // Only add if a valid media URL exists
        acc.push({
          mdUrl: mediaUrl, // Save the URL
          name: mediaName, // Save the name
        });
      }

      return acc;
    }, []); // Initialize as an empty array

    values.video = (fileListVideo || [])?.reduce((acc, video) => {
      const videoUrl = video?.response?.url || video?.url;
      const videoName =
        video?.name || `Unnamed video for ${videoUrl?.split("/").pop()}`;
      if (videoUrl) {
        // Only add if a valid video URL exists
        acc.push({
          mdUrl: videoUrl,
          name: videoName,
        });
      }

      return acc;
    }, []); 

    try {
      let res;
      if (id) {
        console.log("hello", values.media);

        res = await dispatch(
          updateProperty({
            id,
            currency,
            areaUnit,
            longitude: String(coordinates.lng),
            latitude: String(coordinates.lat),
            ...values,
          })
        ).unwrap();
        setInitialValue({
          ...values,
          id: res.propertyId,
        });
        openNotification("success", res.message);

        navigate(`/admin/property/edit/${res.updatedProperty._id}`);
      } else {
        res = await dispatch(
          addProperty({
            currency,
            areaUnit,
            longitude: String(coordinates.lng),
            latitude: String(coordinates.lat),
            ...values,
          })
        ).unwrap();
        setInitialValue({
          ...values,
          id: res.propertyId,
        });
        openNotification("success", res.message);

        navigate(`/admin/property/edit/${res.propertyId}`);
      }

      // Scroll to the top after the operation completes successfully
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Smooth scrolling
      });
    } catch (error) {
      console.error("Error:", error);
      // Optionally handle errors here
    }
  };

  const [value, setValue] = useState("");
  const handleNumericInput = (e) => {
    let inputValue = e.target.value;

    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };
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
  const filterOption = (input, option) => {
    const value = option?.label?.toLowerCase() || "";
    return value.includes(input.toLowerCase());
  };

  const sortedFilters = getFiltersReducer.data?.filters
    .map((i) => ({
      value: i._id,
      label: `${i.name} - ${i.code}`, // Label combining name and code
    }))
    .sort((a, b) => a.label.localeCompare(b.label)); // Sorting from A to Z by label

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
        >
          <Row justify="center">
            <Col span={24} className="gutter-row">
              <Form.Item name="media">
                <Dragger
                  name="files"
                  listType="file"
                  showUploadList={"removeIcon"}
                  fileList={fileList}
                  multiple
                  onPreview={handlePreview}
                  onChange={handleChange}
                  moveable="true"
                  headers={{
                    Authorization: `Bearer ${localStorage.token}`,
                  }}
                  action={`${api_base_URL}upload/bulk`}
                  accept="image/*"
                >
                  {fileList.length >= 500 ? null : uploadButton}
                </Dragger>
                <div>
                  <h5>Reorder the images </h5>
                  {fileList.map((file, index) => (
                    <div
                      key={file.uid}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragOver={handleDragOver}
                      style={{
                        display: "inline-block",
                        margin: "8px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        padding: "4px",
                        cursor: "move",
                      }}
                    >
                      <Image
                        src={
                          file.url || URL.createObjectURL(file.originFileObj)
                        }
                        alt={file.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {previewOpen && previewImage && (
                  <Image
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
          <Row justify="center">
            <Col span={24} className="gutter-row">
              <h5>Video upload</h5>
              <Form.Item name="videos">
                <Dragger
                  name="file"
                  
                  listType="file"
                  fileList={fileListVideo}
                  onPreview={handlePreview}
                  onChange={handleChangeVideo}
                  moveable="true"
                  headers={{
                    Authorization: `Bearer ${localStorage.token}`,
                  }}
                  action={`${api_base_URL}upload`}
                  accept="video/*" // This will restrict the files to video types
                >
                  {fileListVideo.length >= 4 ? null : uploadButton}
                </Dragger>
                <div>
                  <h5>Reorder the videos </h5>
                  {fileListVideo.map((file, index) => (
                    <div
                      key={file.uid}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragOver={handleDragOver}
                      style={{
                        display: "inline-block",
                        margin: "8px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                        padding: "4px",
                        cursor: "move",
                      }}
                    >
                      <video
                        controls
                        src={
                          file.url || URL.createObjectURL(file.originFileObj)
                        } // Render video content
                        alt={file.name}
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  ))}
                </div>

                {previewOpen && previewImage && (
                  <Image
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
              <Form.Item
                name="status"
                label="Status"
                rules={[
                  {
                    required: true,
                    message: "Status is required",
                  },
                ]}
              >
                <Select
                  size="large"
                  options={statusList}
                  placeholder="Select status"
                />
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <Form.Item label="Add Secondary Agent">
                <Radio.Group
                  onChange={handleSecondaryAgentChange}
                  value={addSecondaryAgent ? "yes" : "no"}
                >
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
              {addSecondaryAgent && (
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
              )}
            </Col>
          </Row>
          <Row>
            <Col span={12} className="gutter-row">
              <Form.Item
                name="filters"
                label="Communities"
                rules={[
                  {
                    required: true,
                    message: "Communities  is required",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  showSearch
                  size="large"
                  loading={getFiltersReducer.isLoading}
                  filterOption={filterOption}
                  options={sortedFilters}
                  // options={getFiltersReducer.data?.filters.map((i) => ({
                  //   value: i._id,
                  //   label: `${i.name} - ${i.code}`, // Label combining name and code
                  // }))}
                  placeholder="Search filters"
                />
              </Form.Item>
              <Form.Item name="neighborhood" label="Neighborhood">
                <Input size="large" placeholder="Neighborhood" />
              </Form.Item>
            </Col>
            <Col span={12} className="gutter-row">
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Description is required",
                  },
                ]}
              >
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
                <Input
                  size="large"
                  value={value}
                  placeholder="Zip Code"
                  style={{ width: "100%" }}
                  onChange={handleNumericInput}
                />
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
                  style={{ width: "100%" }}
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
                  style={{ width: "100%" }}
                  value={value}
                  onChange={handleNumericInput}
                />
              </Form.Item>
              <Form.Item name="compensation" label="Compensation">
                <Select
                  size="large"
                  options={Compensation}
                  placeholder={"Compensation"}
                ></Select>
              </Form.Item>
              {/* <Form.Item
                name="visitHours"
                label="Visiting Hours"
                placeholder="Visiting Hours"
              >
                <Input size="large" placeholder="Visiting Hours" />
              </Form.Item> */}
              <Form.Item
                name="reducedPrice"
                label="Reduced Price"
                placeholder="Reduced Price"
                rules={[
                  {
                    // required: true,
                    message: "Price is required",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Reduced Price"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                name="yearBuilt"
                label="Built Year"
                placeholder="Built Year"
                format="YYYY"
                showTime={false}
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
                    // required: true,
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
                    // required: true,
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
                    // required: true,
                    message: "Bathroom Count is required",
                  },
                ]}
              >
                <Input size="large" placeholder="Bathroom Count" />
              </Form.Item>
              {/*<Form.Item
                name="stories"
                label="Stories"
                placeholder="Stories"
                rules={[
                  {
                    // required: true,
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
                    // required: true,
                    message: "Roof is required",
                  },
                ]}
              >
                <Input size="large" placeholder="Roof" />
              </Form.Item>
              <Form.Item
                name="cooling"
                label="Cooling"
                placeholder="Cooling"
                rules={[
                  {
                    // required: true,
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
                    // required: true,
                    message: "Heating is required",
                  },
                ]}
              >
                <Input size="large" placeholder="Heating" />
              </Form.Item> <Form.Item
                name="flooring"
                label="Flooring"
                placeholder="Flooring"
                rules={[
                  {
                    // required: true,
                    message: "Flooring is required",
                  },
                ]}
              >
                <Input size="large" placeholder="Flooring" />
              </Form.Item>
             */}
              <Form.Item
                name="waterfront"
                label="Water Front"
                placeholder="Water Front"
                rules={[
                  {
                    // required: true,
                    message: "Water Front is required",
                  },
                ]}
              >
                <Input size="large" placeholder="waterfront" />
              </Form.Item>
              <Form.Item
                name="style"
                label="Style"
                placeholder="Style"
                rules={[
                  {
                    // required: true,
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
                    // required: true,
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
                    // required: true,
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
                    options={getPropertiesReducer.data?.properties.map((i) => ({
                      value: i.mlsId,
                      label: i.mlsId + " - " + i.address?.full,
                    }))}
                    placeholder=" MLS property"
                  />
                </Form.Item>
              </Col>
              <Form.Item>
                <div ref={mapRef} style={{ width: "100%", height: "400px" }} />
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
          </Row>
          <Row
            gutter={{ 40: 40 }}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Col span={24} lg={10} className="gutter-row">
              <Form.Item style={{ marginBottom: "0px" }}>
                <Button
                  size="large"
                  block="true"
                  type="primary"
                  htmlType="submit"
                  loading={
                    getAgentsReducer.isLoading ||
                    getPropertiesReducer.isLoading ||
                    loading ||
                    isUploading
                  }
                  disabled={isUploading}
                >
                  Save
                </Button>
              </Form.Item>{" "}
            </Col>
            <Col span={24} lg={10} className="gutter-row">
              {" "}
              <Form.Item>
                <Button
                  size="large"
                  block="true"
                  type="primary"
                  onClick={handleExit} // Trigger navigate on click
                >
                  Exit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}

export default AddProperty;
