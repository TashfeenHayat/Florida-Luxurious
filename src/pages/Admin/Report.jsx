import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
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

  const { isLoading, isError, data } = useSelector((s) => s.getReportsReducer);
  console.log(data);
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
      getreports({
        page: pagination.current,
        limit: pagination.pageSize,
      })
    );
  };

  const extractBase64Data = (content) => {
    const regex = /data:image\/[a-zA-Z]+;base64,([^\"]*)/;
    const match = content.match(regex);
    return match
      ? match[0].replace(/^data:image\/[a-zA-Z]+;base64,/, "")
      : null;
  };

  const base64ToBlobURL = (base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" }); // Adjust type as needed
    return URL.createObjectURL(blob);
  };

  const showModal = (property) => {
    setIsModalOpen(true);
    if (property._id) {
      setTimeout(() => {
        setSelectedProp(property);
        setTitle(property.title);
        const base64Data = extractBase64Data(property.content);
        if (base64Data) {
          setPhoto(base64ToBlobURL(base64Data));
        } else {
          setPhoto(property.cover); // Fallback to default if no base64 data
        }
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
      setTimeout(() => {
        const parser = new DOMParser();
        const decodedHtml = parser.parseFromString("", "text/html").body
          .textContent;
        window.$("#summernote").summernote("code", decodedHtml);
      }, 1000);
    }
  };

  const beforeUpload = (e) => {
    setPhotoUploading(true);
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      setPhotoUploading(false);
      setPhoto(info.file.response.url);
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
      if (selectedProp._id) {
        await dispatch(
          updateReport({
            id: selectedProp._id,
            title,

            content: markupStr,
          })
        ).unwrap();
        openNotification("success", "Report updated successfully.");
        setSelectedProp({});
        setIsModalOpen(false);

        dispatch(
          getReports({
            page: tableParams.current,
            limit: tableParams.pageSize,
          })
        );
      } else {
        await dispatch(
          addReport({
            title,

            content: markupStr,
          })
        ).unwrap();
        openNotification("success", "Report added successfully.");
        setIsModalOpen(false);

        // Refresh the posts list
        dispatch(
          getReports({
            page: tableParams.current,
            limit: tableParams.pageSize,
          })
        );
      }
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
        title="Report Info"
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
        <Input
          value={title}
          placeholder="Enter title"
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <div id="summernote"></div>
      </Modal>
    </>
  );
}

export default Report;
