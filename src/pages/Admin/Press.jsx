import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
<<<<<<< HEAD
  Form,
  Row,
  Col,
=======
  Avatar,
>>>>>>> af9da7579b48def8622362648534ef6ab0611a7c
  Space,
  Card,
  Button,
  Table,
  Input,
  Popconfirm,
  Modal,
  Upload,
  notification,
  Upload
} from "antd";
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import { getPosts, addPost, updatePost, deletePost } from "../../api/Press";
import { api_base_URL } from "../../api/Axios";

// Define the stripHtml function
const stripHtml = (html) => {
  const element = document.createElement("div");
  element.innerHTML = html;
  return element.textContent || "";
};
=======
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, addPost, updatePost, deletePost } from "../../api/Press";
import { api_base_URL } from "../../api/Axios";
>>>>>>> af9da7579b48def8622362648534ef6ab0611a7c

function Press() {
  const [photo, setPhoto] = useState(); // Only one declaration here
  const [photoUploading, setPhotoUploading] = useState(false);

  const columns = [
    {
<<<<<<< HEAD
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text) => (
        <img
          src={text}
          alt="photo"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      )
=======
      title: "",
      key: "action",
      render: (_, record) => (
        <Avatar
          style={{ verticalAlign: "middle" }}
          shape="square"
          size={64}
          src={record.cover}
        ></Avatar>
      ),
>>>>>>> af9da7579b48def8622362648534ef6ab0611a7c
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    /* {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (content) => <span>{stripHtml(content)}</span>
    },*/
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
      )
    }
  ];

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, description) => {
    api[type]({ description });
  };

  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10
  });
  const [title, setTitle] = useState("");
  const [modalProps, setModalProps] = useState([]);
  const [modalSearch, setModalSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProp, setSelectedProp] = useState({});
<<<<<<< HEAD
=======
  const [photo, setPhoto] = useState();
  const [photoUplaoding, setPhotoUplaoding] = useState(false);

>>>>>>> af9da7579b48def8622362648534ef6ab0611a7c
  const { isLoading, isError, data } = useSelector((s) => s.getPostsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPosts({
        page: tableParams.current,
        limit: tableParams.pageSize
      })
    );
    if (isError) {
      console.log(isError);
    }
  }, [dispatch, tableParams.current, tableParams.pageSize, isError]);

  const handleTableChange = (pagination) => {
    console.log(pagination);
    setTableParams(pagination);
    dispatch(
      getPosts({
        page: pagination.current
      })
    );
  };

  const showModal = (property) => {
    console.log(property);
    setIsModalOpen(true);
    if (property._id) {
      setTimeout(() => {
        setSelectedProp(property);
        setTitle(property.title);
<<<<<<< HEAD
        setPhoto(property.photo);
=======
        setPhoto(property.cover);
>>>>>>> af9da7579b48def8622362648534ef6ab0611a7c
        var parser = new DOMParser();
        var decodedHtml = parser.parseFromString(property?.content, "text/html")
          .body.textContent;
        window.$("#summernote").summernote("code", decodedHtml);
      }, 1000);
    } else {
      setTitle("");
      setPhoto("");
      setTimeout(() => {
        var parser = new DOMParser();
        var decodedHtml = parser.parseFromString("", "text/html").body
          .textContent;
        window.$("#summernote").summernote("code", decodedHtml);
      }, 1000);
    }
  };

  const beforeUpload = (e) => {
    console.log(e);
    setPhotoUplaoding(true);
  };

  const handleChange = (info) => {
    if (info.file.status === "done") {
      console.log(info.file.response.url);
      setPhotoUplaoding(false);
      setPhoto(info.file.response.url);
    }
  };

  const uploadButton = (
    <div>
      {photoUplaoding ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleOk = async (ok) => {
    console.log(ok);
    var markupStr = $("#summernote").summernote("code");
<<<<<<< HEAD
    let res;
    try {
      if (selectedProp._id) {
        res = await dispatch(
          updatePost({
            id: selectedProp._id,
            content: markupStr,
            photo,
            title
          })
        ).unwrap();
      } else {
        res = await dispatch(
          addPost({
            photo,
            title,
            content: markupStr
          })
        ).unwrap();
      }
      openNotification("success", "Post saved successfully!");

      // Clear fields after a successful response
      setPhoto(null);
      setTitle("");
      $("#summernote").summernote("code", ""); // Clear summernote content

      // Reset the selected property and close the modal
=======
    if (selectedProp._id) {
      const res = await dispatch(
        updatePost({
          id: selectedProp._id,
          title,
          cover: photo,
          content: markupStr,
        })
      ).unwrap();
      openNotification("success", res);
>>>>>>> af9da7579b48def8622362648534ef6ab0611a7c
      setSelectedProp({});
      setIsModalOpen(false);

      // Refresh the posts list
      dispatch(
        getPosts({
          page: tableParams.current,
<<<<<<< HEAD
          limit: tableParams.pageSize
=======
          limit: tableParams.pageSize,
        })
      );
    } else {
      const res = await dispatch(
        addPost({
          title,
          cover: photo,
          content: markupStr,
        })
      ).unwrap();
      openNotification("success", res);
      dispatch(
        getPosts({
          page: tableParams.current,
          limit: tableParams.pageSize,
>>>>>>> af9da7579b48def8622362648534ef6ab0611a7c
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

  const beforeUpload = (e) => {
    console.log(e);
    setPhotoUploading(true);
  };

  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      console.log("agent photo ", info.file.response.url);
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

  return (
    <>
      <Card
        title="Press Info"
        extra={
          <Space>
            <Button onClick={showModal} type="primary">
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
          isError={isError}
          pagination={{ ...tableParams, total: data?.totalCount }}
          dataSource={data?.posts}
          onChange={handleTableChange}
        />
      </Card>
      <Modal
        title="Add Press Info"
        open={isModalOpen}
        onOk={() => handleOk("ok")}
        onCancel={handleCancel}
        width={1000}
      >
<<<<<<< HEAD
        <Form.Item name="photo">
          <Row justify="center">
            <Col span={4} className="gutter-row">
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                loading={photoUploading}
                showUploadList={false}
                headers={{
                  Authorization: `Bearer ${localStorage.token}`
                }}
                action={`${api_base_URL}upload`}
                beforeUpload={beforeUpload}
                onChange={handleFileChange}
              >
                {photo ? (
                  <img src={photo} alt="avatar" style={{ width: "100%" }} />
                ) : photoUploading ? (
                  <LoadingOutlined />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Col>
          </Row>
        </Form.Item>
=======
        <div style={{ marginBottom: "20px" }}>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            loading={photoUplaoding}
            showUploadList={false}
            headers={{
              Authorization: `Bearer ${localStorage.token}`,
            }}
            action={`${api_base_URL}upload`}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {photo ? (
              <img src={photo} alt="avatar" style={{ width: "100%" }} />
            ) : photoUplaoding ? (
              <LoadingOutlined />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>

>>>>>>> af9da7579b48def8622362648534ef6ab0611a7c
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

export default Press;
