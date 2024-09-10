import React, { useEffect, useState } from "react";
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
  Form,
  Upload,
} from "antd";
import { PlusOutlined, FilePdfOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, addBlog, updateBlog, deleteBlog } from "../../api/Blogs";
import customAxios from "../../api/Axios";
import { api_base_URL } from "../../api/Axios";

const { Search } = Input;

function Blog() {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Agent",
      dataIndex: "status",
      key: "status",
      render: (_, record) =>
        `${record?.agentId?.firstName} ${record?.agentId?.lastName} `,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link onClick={() => showModal(record)}>Edit</Link>
          <Popconfirm
            title="Delete this blog"
            description="Are you sure to delete this?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, description) => {
    api[type]({ description });
  };

  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
  });
  const [key, setKey] = useState("");
  const [modalProps, setModalProps] = useState([]);
  const [modalSearch, setModalSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProp, setSelectedProp] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [pdf, setPdf] = useState("");
  const [pdfUploading, setPdfUploading] = useState(false);
  const { isLoading, isError, data } = useSelector((s) => s.getBlogsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getBlogs({
        page: tableParams.current,
        limit: tableParams.pageSize,
      })
    );
    if (isError) {
      console.log(isError);
    }
  }, [dispatch, tableParams.current, tableParams.pageSize, isError]);

  const onSearch = (agentId) => {
    setKey(agentId);
    setTableParams((prev) => ({
      ...prev,
      current: 1,
    }));
    dispatch(getBlogs({ agentId }));
  };

  const handleTableChange = (pagination) => {
    setTableParams(pagination);
    dispatch(
      getBlogs({
        agentId: key,
        page: pagination.current,
        limit: pagination.pageSize,
      })
    );
  };

  const handleSearch = async (key) => {
    try {
      const res = await customAxios.get(`agent`, {
        params: { key },
      });
      const data = res.data;
      setModalProps(data.agents);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const handleChange = (newValue) => {
    const property = modalProps.find((i) => i._id === newValue);
    setSelectedProp(property);
    setModalSearch(`${property?.firstName} ${property?.lastName}`);
  };

  const showModal = (property) => {
    setIsModalOpen(true);
    if (property._id) {
      setSelectedBlog(property);
      setSelectedProp(property.agentId);
      setTitle(property.title);
      setPdf(property.pdf || "");

      setModalSearch(
        `${property?.agentId?.firstName} ${property?.agentId?.lastName}`
      );

      setTimeout(() => {
        const parser = new DOMParser();
        const decodedHtml = parser.parseFromString(
          property?.content,
          "text/html"
        ).body.textContent;
        window.$("#summernote").summernote("code", decodedHtml);
      }, 1000);
    } else {
      setSelectedBlog(null);
      setSelectedProp(null);
      setTitle("");
      setModalSearch("");
      setPdf("");
      setTimeout(() => {
        window.$("#summernote").summernote("code", "");
      }, 1000);
    }
  };

  const beforeUpload = (file) => {
    if (file.type === "application/pdf") {
      setPdfUploading(true);
      return true; // Allow the upload
    } else {
      setPdfUploading(false);
      return false; // Prevent the upload for non-PDF files
    }
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      if (info.file.type === "application/pdf") {
        setPdfUploading(false);
        setPdf(info.file.response.url);
      }
    } else if (info.file.status === "error") {
      setPdfUploading(false);
      openNotification("error", "Failed to upload PDF.");
    }
  };

  const handleOk = async () => {
    const markupStr = $("#summernote").summernote("code");

    if (!pdf && !markupStr.trim()) {
      openNotification("error", "Please provide either a PDF or content.");
      return;
    }

    try {
      if (!selectedBlog?._id) {
        const res = await dispatch(
          addBlog({
            agentId: selectedProp._id,
            title,
            content: markupStr,
            file: pdf || "",
          })
        ).unwrap();
        openNotification("success", res);
      } else {
        const res = await dispatch(
          updateBlog({
            agentId: selectedProp._id,
            title,
            content: markupStr,
            id: selectedBlog._id,
            pdf,
          })
        ).unwrap();
        openNotification("success", res);
      }
      dispatch(
        getBlogs({
          page: tableParams.current,
          limit: tableParams.pageSize,
        })
      );
    } catch (error) {
      openNotification("error", "Failed to save blog.");
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  return (
    <>
      {contextHolder}
      <Card
        title="Blogs"
        extra={
          <Space>
            <Button onClick={() => showModal({})} type="primary">
              <PlusOutlined />
              Add
            </Button>
          </Space>
        }
        style={{ padding: 0 }}
      >
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={data?.blogs}
          pagination={{ ...tableParams, total: data?.totalCount }}
          onChange={handleTableChange}
        />
      </Card>
      <Modal
        title="Add Blog"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Select
          showSearch
          value={modalSearch}
          placeholder={"Select agent"}
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
        <Input
          value={title}
          placeholder="Title "
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: 20 }}
        />
        <div style={{ marginBottom: "20px" }}>
          <Upload
            name="file"
            listType="text"
            className="pdf-uploader"
            showUploadList={false}
            headers={{
              Authorization: `Bearer ${localStorage.token}`,
            }}
            action={`${api_base_URL}upload`}
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
          >
            {pdf ? (
              <a href={pdf} target="_blank" rel="noopener noreferrer">
                <FilePdfOutlined /> PDF Uploaded
              </a>
            ) : (
              <Button type="primary">Upload PDF</Button>
            )}
          </Upload>
        </div>
        <div>
          <div>Content</div>
          <div
            id="summernote"
            style={{ border: "1px solid #d9d9d9", borderRadius: "4px" }}
          ></div>
        </div>
      </Modal>
    </>
  );
}

export default Blog;
