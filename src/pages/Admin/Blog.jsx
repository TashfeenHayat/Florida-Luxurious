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
import {
  PlusOutlined,
  FilePdfOutlined,
  LoadingOutlined,
  EyeOutlined,
} from "@ant-design/icons";
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
        `${record?.agentId?.firstName} ${record?.agentId?.lastName}`,
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
  const [photo, setPhoto] = useState("");
  const [pdfUploading, setPdfUploading] = useState(false);
  const { isLoading, isError, data } = useSelector((s) => s.getBlogsReducer);
  const [photoUploading, setPhotoUploading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getBlogs({ page: tableParams.current, limit: tableParams.pageSize })
    );
    if (isError) {
      console.log(isError);
    }
  }, [dispatch, tableParams.current, tableParams.pageSize, isError]);

  const onSearch = (agentId) => {
    setKey(agentId);
    setTableParams((prev) => ({ ...prev, current: 1 }));
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
        params: { key, limit: 30, page: 1 },
      });
      setModalProps(res.data.agents);
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
      setPhoto(property.cover || "");
      setPdf(property.file || "");
      setModalSearch(
        `${property?.agentId?.firstName} ${property?.agentId?.lastName}`
      );
      const parser = new DOMParser();
      const decodedHtml = parser.parseFromString(property?.content, "text/html")
        .body.textContent;
      window.$("#summernote").summernote("code", decodedHtml);
    } else {
      setSelectedBlog(null);
      setSelectedProp(null);
      setTitle("");
      setModalSearch("");
      setPhoto("");
      setPdf("");
      window.$("#summernote").summernote("code", "");
    }
  };

  const beforeUploadPhoto = (file) => {
    setPhotoUploading(true);
    return true; // Allow the upload
  };

  const handlePhotoChange = (info) => {
    if (info.file.status === "done") {
      setPhotoUploading(false);
      setPhoto(info.file.response.url);
    } else if (info.file.status === "error") {
      setPhotoUploading(false);
      openNotification("error", "Failed to upload photo.");
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
    if (info.file.status === "uploading") {
      setPdfUploading(true);
    }

    if (info.file.status === "done") {
      if (info.file.type === "application/pdf") {
        setPdfUploading(false);
        setPdf(info.file.response.url);
        openNotification("success", "PDF uploaded successfully.");
      }
    } else if (info.file.status === "error") {
      setPdfUploading(false);
      openNotification("error", "Failed to upload PDF.");
    }
  };

  const handlePreview = async (file) => {
    const fileURL =
      file.url || file.thumbUrl || URL.createObjectURL(file.originFileObj);
    if (file.type === "application/pdf") {
      window.open(fileURL, "_blank");
    }
  };

  const handleOk = async () => {
    const markupStr = $("#summernote").summernote("code");
    if (!pdf && !markupStr.trim()) {
      openNotification("error", "Please provide either a PDF or content.");
      return;
    }

    // Extract cover image from content if not provided
    let coverImage = photo;
    // || extractImageFromContent(markupStr)
    try {
      const payload = {
        agentId: selectedProp?._id,
        title,
        content: markupStr,
        cover: coverImage || "",
        file: pdf || "",
      };

      if (!selectedBlog?._id) {
        const res = await dispatch(addBlog(payload)).unwrap();
        openNotification("success", res);
      } else {
        payload.id = selectedBlog._id;
        const res = await dispatch(updateBlog(payload)).unwrap();
        openNotification("success", res);
      }

      dispatch(
        getBlogs({ page: tableParams.current, limit: tableParams.pageSize })
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

  const uploadButton = (
    <div>
      {photoUploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // const extractImageFromContent = (content) => {
  //   const regex = /<img.*?src="(.*?)"/;
  //   return match ? match[1] : "";
  // };

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
        style={{
          padding: 0,
          margin: "0 auto",
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
      >
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={data?.blogs}
          pagination={{ ...tableParams, total: data?.totalCount }}
          onChange={handleTableChange}
          scroll={{ x: "max-content" }}
          style={{ width: "100%" }}
        />
      </Card>
      <Modal
        title="Add Blog"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="90%"
        style={{ maxWidth: "1000px" }}
        bodyStyle={{ padding: "20px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={`${api_base_URL}upload`}
            beforeUpload={beforeUploadPhoto}
            onChange={handlePhotoChange}
            headers={{ Authorization: `Bearer ${localStorage.token}` }}
          >
            {photo ? (
              <img
                src={photo}
                alt="avatar"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
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
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "100%", marginBottom: 20 }}
        />
        <div style={{ marginBottom: "20px" }}>
          <Upload
            name="file"
            listType="picture-card"
            className="pdf-uploader"
            action={`${api_base_URL}upload`}
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
            onPreview={false}
            showUploadList={false}
            headers={{
              Authorization: `Bearer ${localStorage.token}`,
            }}
          >
            {pdf ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <a
                  href={pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: pdfUploading ? "grey" : "#1890ff",
                    marginRight: "8px",
                  }}
                >
                  {pdfUploading ? (
                    <>
                      <LoadingOutlined style={{ marginRight: "8px" }} />
                      Uploading...
                    </>
                  ) : (
                    <span>
                      <FilePdfOutlined />
                      Uploaded
                    </span>
                  )}
                </a>
                {!pdfUploading && (
                  <EyeOutlined
                    style={{ cursor: "pointer", color: "#1890ff" }}
                    onClick={() =>
                      handlePreview({ url: pdf, type: "application/pdf" })
                    }
                  />
                )}
              </div>
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
        <div>
          <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
            Content
          </div>
          <div
            id="summernote"
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              minHeight: "200px",
            }}
          ></div>
        </div>
      </Modal>
    </>
  );
}

export default Blog;
