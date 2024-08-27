import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LoadingOutlined,
  PlusOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Space,
  Card,
  Button,
  Table,
  Input,
  Popconfirm,
  Modal,
  notification,
  Upload,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, addPost, updatePost, deletePost } from "../../api/Press";
import { api_base_URL } from "../../api/Axios";

function Press() {
  const columns = [
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Avatar
          style={{ verticalAlign: "middle" }}
          shape="square"
          size={64}
          src={record.cover}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link onClick={() => showModal(record)}>Edit</Link>
          <Popconfirm
            title="Delete this task"
            description="Are you sure to delete this post?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => dispatch(deletePost(record._id))}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, description) => {
    api[type]({ description });
  };

  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
  });
  const [title, setTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProp, setSelectedProp] = useState({});
  const [photo, setPhoto] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const [pdf, setPdf] = useState("");
  const [pdfUploading, setPdfUploading] = useState(false);

  const { isLoading, isError, data } = useSelector((s) => s.getPostsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPosts({
        page: tableParams.current,
        limit: tableParams.pageSize,
      })
    );
    if (isError) {
      console.log(isError);
    }
  }, [dispatch, tableParams.current, tableParams.pageSize, isError]);

  const handleTableChange = (pagination) => {
    setTableParams(pagination);
    dispatch(
      getPosts({
        page: pagination.current,
        limit: pagination.pageSize,
      })
    );
  };

  const showModal = (property) => {
    setIsModalOpen(true);
    if (property._id) {
      setTimeout(() => {
        setSelectedProp(property);
        setTitle(property.title);
        setPhoto(property.cover);
        setPdf(property.pdf || ""); // Set PDF URL or empty string
        const parser = new DOMParser();
        const decodedHtml = parser.parseFromString(
          property?.content,
          "text/html"
        ).body.textContent;
        window.$("#summernote").summernote("code", decodedHtml);
      }, 1000);
    } else {
      setTitle("");
      setPhoto("");
      setPdf(""); // Clear PDF URL
      setTimeout(() => {
        const parser = new DOMParser();
        const decodedHtml = parser.parseFromString("", "text/html").body
          .textContent;
        window.$("#summernote").summernote("code", decodedHtml);
      }, 1000);
    }
  };

  const beforeUpload = (e) => {
    if (e.type === "application/pdf") {
      setPdfUploading(true);
    } else {
      setPhotoUploading(true);
    }
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      if (info.file.type === "application/pdf") {
        setPdfUploading(false);
        setPdf(info.file.response.url);
      } else {
        setPhotoUploading(false);
        setPhoto(info.file.response.url);
      }
    }
  };

  const uploadButton = (
    <div>
      {photoUploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleOk = async () => {
    try {
      const markupStr = $("#summernote").summernote("code");
      const postData = {
        title,
        cover: photo,
        content: markupStr,
        file: pdf || "", // Include PDF URL if available
      };

      if (selectedProp._id) {
        await dispatch(
          updatePost({
            id: selectedProp._id,
            ...postData,
          })
        ).unwrap();
        openNotification("success", "Post updated successfully.");
        setSelectedProp({});
        setIsModalOpen(false);
      } else {
        await dispatch(addPost(postData)).unwrap();
        openNotification("success", "Post added successfully.");
        setIsModalOpen(false);
      }

      // Refresh the posts list
      dispatch(
        getPosts({
          page: tableParams.current,
          limit: tableParams.pageSize,
        })
      );
    } catch (error) {
      console.error("Failed to save the post:", error);
      openNotification("error", "Failed to save the post.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProp({});
  };

  return (
    <>
      <Card
        title="Press Info"
        extra={
          <Space>
            <Button onClick={() => showModal({})} type="primary">
              <Link>
                <PlusOutlined />
                Add
              </Link>
            </Button>
          </Space>
        }
        style={{ padding: 0 }}
      >
        <Table
          columns={columns}
          loading={isLoading}
          pagination={{ ...tableParams, total: data?.totalCount }}
          dataSource={data?.posts}
          onChange={handleTableChange}
        />
      </Card>
      <Modal
        title="Add Press Info"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <div style={{ marginBottom: "20px" }}>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            loading={photoUploading}
            showUploadList={false}
            headers={{
              Authorization: `Bearer ${localStorage.token}`,
            }}
            action={`${api_base_URL}upload`}
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
          >
            {photo ? (
              <img src={photo} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>

        <Input
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <div style={{ marginBottom: "20px" }}>
          <Upload
            name="file"
            listType="text"
            className="pdf-uploader"
            loading={pdfUploading}
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
                <FilePdfOutlined
                  style={{ fontSize: "32px", color: "#ff4d4f" }}
                />
                <span style={{ marginLeft: "8px" }}>View PDF</span>
              </a>
            ) : (
              <Button>
                <PlusOutlined /> Upload PDF
              </Button>
            )}
          </Upload>
        </div>
        <div id="summernote"></div>
      </Modal>
    </>
  );
}

export default Press;
