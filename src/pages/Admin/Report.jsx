import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LoadingOutlined,
  PlusOutlined,
  FilePdfOutlined,
  EyeOutlined,
  CameraOutlined,
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
import {
  getReports,
  addReport,
  updateReport,
  deleteReport,
} from "./../../api/Report";
import { api_base_URL } from "../../api/Axios";

function Report() {
  const columns = [
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
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this task"
            description="Are you sure to delete this Report?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => dispatch(deleteReport(record._id))}
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
  const { isLoading, isError, data } = useSelector((s) => s.getReportsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getReports({
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
      getReports({
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

  const handleImageUpload = ({ file }) => {
    setPhotoUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    fetch(`${api_base_URL}upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setPhoto(data.url);
        openNotification("success", "Image uploaded successfully.");
      })
      .catch(() => {
        openNotification("error", "Image upload failed.");
      })
      .finally(() => {
        setPhotoUploading(false);
      });
  };

  const handlePdfUpload = ({ file }) => {
    setPdfUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    fetch(`${api_base_URL}upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setPdf(data.url);
        openNotification("success", "PDF uploaded successfully.");
      })
      .catch(() => {
        openNotification("error", "PDF upload failed.");
      })
      .finally(() => {
        setPdfUploading(false);
      });
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
          updateReport({
            id: selectedProp._id,
            ...postData,
          })
        ).unwrap();
        openNotification("success", "Post updated successfully.");
        setSelectedProp({});
        setIsModalOpen(false);
      } else {
        await dispatch(addReport(postData)).unwrap();
        openNotification("success", "Post added successfully.");
        setIsModalOpen(false);
      }

      // Refresh the posts list
      dispatch(
        getReports({
          page: tableParams.current,
          limit: tableParams.pageSize,
        })
      );
    } catch (error) {
      console.error("Failed to save the post:", error);
      openNotification("error", "Failed to save the post.");
    }
  };
const beforeUpload2 = (file) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.error("You can only upload image files (JPG/PNG/JPEG etc.)!");
  }
  return isImage || Upload.LIST_IGNORE;
};
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProp({});
  };

  return (
    <>
      {contextHolder}
      <Card
        title="Report Info"
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
          dataSource={data?.Reports}
          onChange={handleTableChange}
        />
      </Card>
      <Modal
        title="Add Report Info"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <div>
          <Upload
            listType="picture-card"
            showUploadList={false}
            customRequest={handleImageUpload}
            beforeUpload={beforeUpload2}
          >
            {photo ? (
              <img src={photo} alt="uploaded" style={{ width: "100%" }} />
            ) : (
              <div>
                {photoUploading ? (
                  <LoadingOutlined />
                ) : (
                  <CameraOutlined style={{ fontSize: "40px", color: "#ccc" }} />
                )}
                <div style={{ marginTop: 8 }}>Upload Image</div>
              </div>
            )}
          </Upload>
        </div>
        <div style={{ paddingTop: "20px" }}>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: 20 }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Upload
            name="file"
            listType="picture-card"
            className="pdf-uploader"
            action={`${api_base_URL}upload`}
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
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
                      <FilePdfOutlined style={{ marginRight: "8px" }} />
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
              // Placeholder content when no PDF is uploaded
              <div
                style={{ display: "flex", alignItems: "center", color: "#aaa" }}
              >
                <FilePdfOutlined
                  style={{ marginRight: "8px", fontSize: "24px" }}
                />
              </div>
            )}
          </Upload>
        </div>

        <div
          id="summernote"
          style={{ minHeight: "200px", fontSize: "40px", color: "#ccc" }}
        ></div>
      </Modal>
    </>
  );
}

export default Report;
