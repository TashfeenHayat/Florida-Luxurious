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
      setPdf("");
      setTimeout(() => {
        const parser = new DOMParser();
        const decodedHtml = parser.parseFromString("", "text/html").body
          .textContent;
        window.$("#summernote").summernote("code", decodedHtml);
      }, 1000);
    }
  };

  const beforeUpload = (file) => {
    if (file.type === "application/pdf") {
      setPdfUploading(true);
    } else {
      setPhotoUploading(true);
    }
    return true;
  };

  const handleFileChange = (info) => {
    if (info.file.status === "uploading") {
      if (info.file.type === "application/pdf") {
        setPdfUploading(true);
      } else {
        setPhotoUploading(true);
      }
    }

    if (info.file.status === "done") {
      if (info.file.type === "application/pdf") {
        setPdf(info.file.response.url);
        openNotification("success", "PDF uploaded successfully.");
        setPdfUploading(false);
      } else {
        setPhoto(info.file.response.url);
        openNotification("success", "Image uploaded successfully.");
        setPhotoUploading(false);
      }
    } else if (info.file.status === "error") {
      if (info.file.type === "application/pdf") {
        setPdfUploading(false);
        openNotification("error", "Failed to upload PDF.");
      } else {
        setPhotoUploading(false);
        openNotification("error", "Failed to upload image.");
      }
    }
  };

  const handlePreview = (file) => {
    const fileURL =
      file.url || file.thumbUrl || URL.createObjectURL(file.originFileObj);
    window.open(fileURL, "_blank");
  };

  const handleOk = async () => {
    try {
      const markupStr = $("#summernote").summernote("code");
      const postData = {
        title,
        cover: photo,
        content: markupStr,
        file: pdf || "",
      };

      if (selectedProp._id) {
        await dispatch(
          updatePost({
            id: selectedProp._id,
            ...postData,
          })
        ).unwrap();
        openNotification("success", "Post updated successfully.");
      } else {
        await dispatch(addPost(postData)).unwrap();
        openNotification("success", "Post added successfully.");
      }

      setIsModalOpen(false);
      dispatch(
        getPosts({
          page: tableParams.current,
          limit: tableParams.pageSize,
        })
      );
    } catch (error) {
      openNotification("error", "Failed to save the post.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProp({});
  };

  const uploadButton = (uploading) => (
    <div style={{ textAlign: "center" }}>
      {uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      {contextHolder}
      <Card
        title="Press Info"
        extra={
          <Button onClick={() => showModal({})} type="primary">
            <PlusOutlined /> Add
          </Button>
        }
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
      >
        <Upload
          name="file"
          listType="picture-card"
          showUploadList={false}
          action={`${api_base_URL}upload`}
          beforeUpload={beforeUpload}
          onChange={handleFileChange}
          headers={{
            Authorization: `Bearer ${localStorage.token}`,
          }}
        >
          {photo ? (
            <img src={photo} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton(photoUploading)
          )}
        </Upload>

        <Input
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          style={{ margin: "20px 0" }}
        />

        <Upload
          name="file"
          listType="picture-card"
          showUploadList={false}
          action={`${api_base_URL}upload`}
          beforeUpload={beforeUpload}
          onChange={handleFileChange}
          headers={{
            Authorization: `Bearer ${localStorage.token}`,
          }}
        >
          {pdf ? (
            <div style={{ display: "flex", alignItems: "center" }}>
              <a href={pdf} target="_blank" rel="noopener noreferrer">
                <FilePdfOutlined /> View PDF
              </a>
            </div>
          ) : (
            uploadButton(pdfUploading)
          )}
        </Upload>

        <div id="summernote" style={{ minHeight: "200px" }}></div>
      </Modal>
    </>
  );
}

export default Press;
