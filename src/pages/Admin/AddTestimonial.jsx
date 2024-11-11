import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Space,
  Card,
  Button,
  Table,
  Input,
  Popconfirm,
  Modal,
  Select,
  notification,
  Rate,
  Form,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../../api/Testimonial";
import customAxios from "../../api/Axios";

const { TextArea } = Input;

const AddTestimonial = () => {
  const columns = [
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Username",
      dataIndex: "Username",
      key: "Username",
    },
    {
      title: "Agent",
      dataIndex: "agentId",
      key: "agentId",
      render: (agent) => `${agent.firstName} ${agent.lastName}`,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => <Rate disabled value={rating} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button  onClick={() => showModal(record)}>Edit</Button>
          <Popconfirm
            title="Delete this testimonial?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [Username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(null);
  const { isLoading, isError, data } = useSelector(
    (state) => state.getTestimonialsReducer
  );

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, description) => {
    api[type]({ description });
  };

  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
  });

  const [modalProps, setModalProps] = useState([]);
  const [modalSearch, setModalSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedProp, setSelectedProp] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        await dispatch(
          getTestimonials({
            page: tableParams.current,
            limit: tableParams.pageSize,
          })
        ).unwrap();
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, [dispatch, tableParams.current, tableParams.pageSize]);

  const handleTableChange = (pagination) => {
    setTableParams(pagination);
  };

  const showModal = (testimonial) => {
    setIsModalOpen(true);
    if (testimonial._id) {
      setCurrentTestimonial(testimonial); // Set current testimonial for editing
      setSelectedAgent(testimonial.agentId);
      setContent(testimonial.content);
      setUsername(testimonial.Username);
      setRating(testimonial.rating);
      setModalSearch(
        `${testimonial?.agentId?.firstName} ${testimonial?.agentId?.lastName}`
      );
    } else {
      setCurrentTestimonial(null); // Reset for adding a new testimonial
      setSelectedAgent(null);
      setContent("");
      setUsername("");
      setRating(0);
      setModalSearch("");
    }
  };

  const handleOk = async () => {
    try {
      if (!selectedAgent) {
        openNotification("error", "Please select an agent.");
        return;
      }

      const testimonialData = {
        agentId: selectedAgent._id,
        Username,
        content,
        rating,
      };

      if (currentTestimonial) {
        // Check if we're updating
        testimonialData.id = currentTestimonial._id; // Add ID to the data
        await dispatch(updateTestimonial(testimonialData)).unwrap();
        openNotification("success", "Testimonial updated successfully.");
      } else {
        await dispatch(addTestimonial(testimonialData)).unwrap();
        openNotification("success", "Testimonial added successfully.");
      }

      await dispatch(
        getTestimonials({
          page: tableParams.current,
          limit: tableParams.pageSize,
        })
      );

      setIsModalOpen(false);
      setCurrentTestimonial(null); // Reset current testimonial
    } catch (error) {
      openNotification("error", "Failed to save testimonial.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedAgent(null);
    setContent("");
    setUsername("");
    setRating(0);
    setModalSearch("");
    setCurrentTestimonial(null); // Reset current testimonial
  };

  const handleDelete = async (id) => {
    await dispatch(deleteTestimonial(id));
    openNotification("success", "Testimonial deleted successfully.");
  };

  const handleSearch = async (key) => {
    try {
      const res = await customAxios.get(`agent`, {
        params: { key, limit: 30, page: 1 },
      });
      const data = res.data;
      console.log(res.data);
      setModalProps(data.agents);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };
  console.log("search", handleSearch);
  const handleChange = (newValue) => {
    const property = modalProps.find((i) => i._id === newValue);
    setSelectedAgent(property);
    setModalSearch(`${property?.firstName} ${property?.lastName}`);
  };
  return (
    <>
      {contextHolder}
      <Card
        title="Testimonials"
        extra={
          <Space>
            <Button onClick={() => showModal({})} type="primary">
              <PlusOutlined />
              Add
            </Button>
          </Space>
        }
        style={{
          padding: 0,
          margin: "0 auto",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching testimonials.</p>
        ) : (
          <div>
            <Table
              columns={columns}
              dataSource={data?.testmonials} // Fixed typo from testmonials to testimonials
              pagination={{ ...tableParams, total: data?.totalCount || 0 }}
              onChange={handleTableChange}
              rowKey="_id"
              scroll={{ x: "true" }}
              style={{ width: "100%" }}
            />
          </div>
        )}
      </Card>
      <Modal
        title="Add Testimonial"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="90%"
        style={{ maxWidth: "600px" }}
        bodyStyle={{ padding: "20px" }}
      >
        <Select
          showSearch
          value={modalSearch}
          placeholder="Select agent"
          style={{ width: "100%", marginBottom: 20 }}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChange}
          notFoundContent={null}
          options={(modalProps || []).map((d) => ({
            value: d._id,
            label: `${d.firstName} ${d.lastName}`,
          }))}
        />

        <Form layout="vertical">
          <Form.Item label="Username">
            <Input
              placeholder="Enter username"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Content">
            <TextArea
              rows={4}
              placeholder="Enter testimonial content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Rating">
            <Rate
              value={rating}
              onChange={(value) => setRating(value)}
              style={{ fontSize: "20px" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTestimonial;
