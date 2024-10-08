import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LoadingOutlined,
  PlusOutlined,
  FilePdfOutlined,
  EyeOutlined,
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
      key: "cover",
      render: (_, record) => (
        <Avatar
          style={{
            verticalAlign: "middle",
            maxWidth: "100px",
            maxHeight: "100px",
          }}
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
        setPdf(property.file || "");
        console.log(property.file);
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

  const uploadButton = (
    <div style={{ textAlign: "center" }}>
      {photoUploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const handlePreview = async (file) => {
    const fileURL =
      file.url || file.thumbUrl || URL.createObjectURL(file.originFileObj);

    if (file.type === "application/pdf") {
      // Open PDF in a new tab
      window.open(fileURL, "_blank");
    } else {
      // Handle other file previews if necessary
    }
  };
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
        style={{ padding: 0, margin: "0 auto", maxWidth: "100%" }}
      >
        <Table
          columns={columns}
          loading={isLoading}
          pagination={{ ...tableParams, total: data?.totalCount }}
          dataSource={data?.posts}
          onChange={handleTableChange}
          scroll={{ x: "max-content" }} // Ensure horizontal scrolling
        />
      </Card>
      <Modal
        title="Add Press Info"
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
            loading={photoUploading}
            showUploadList={false}
            headers={{
              Authorization: `Bearer ${localStorage.token}`,
            }}
            action={`${api_base_URL}upload`}
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
            style={{ width: "100%" }}
          >
            {photo ? (
              <img
                src={photo}
                alt="avatar"
                style={{
                  width: "100%",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
              />
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
            listType="picture-card"
            className="pdf-uploader"
            action={`${api_base_URL}upload`}
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
            onPreview={() =>
              handlePreview({ url: pdf, type: "application/pdf" })
            }
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
        <div id="summernote" style={{ minHeight: "200px" }}></div>
      </Modal>
    </>
  );
}

export default Press;
