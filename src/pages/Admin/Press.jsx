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
  notification,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, addPost, updatePost } from "../../api/Press";
import customAxios from "../../api/Axios";

function Press() {
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
          <Link onClick={() => showModal(record)}>Edit</Link>
          <Popconfirm
            title="Delete this task"
            description="Are you sure to delete this property?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleOk(record._id)}
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
  const [modalProps, setModalProps] = useState([]);
  const [modalSearch, setModalSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProp, setSelectedProp] = useState({});

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
  }, []);

  const handleTableChange = (pagination) => {
    console.log(pagination);
    setTableParams(pagination);
    dispatch(
      getPosts({
        page: pagination.current,
      })
    );
  };

  const handleChange = (newValue) => {
    setModalSearch(modalSearch);
    const property = modalProps.find((i) => i._id == newValue);
    setSelectedProp(property);

    var parser = new DOMParser();
    var decodedHtml = parser.parseFromString(property?.press, "text/html").body
      .textContent;
    window.$("#summernote").summernote("code", decodedHtml);
  };

  const showModal = (property) => {
    console.log(property);
    setIsModalOpen(true);
    if (property._id) {
      setTimeout(() => {
        setSelectedProp(property);
        setTitle(property.title);
        var parser = new DOMParser();
        var decodedHtml = parser.parseFromString(property?.content, "text/html")
          .body.textContent;
        window.$("#summernote").summernote("code", decodedHtml);
      }, 1000);
    } else {
      setTitle("");
      setTimeout(() => {
        var parser = new DOMParser();
        var decodedHtml = parser.parseFromString("", "text/html").body
          .textContent;
        window.$("#summernote").summernote("code", decodedHtml);
      }, 1000);
    }
  };

  const handleOk = async (ok) => {
    console.log(ok);
    var markupStr = $("#summernote").summernote("code");
    if (selectedProp._id) {
      const res = await dispatch(
        updatePost({
          id: selectedProp._id,
          content: markupStr,
        })
      ).unwrap();
      openNotification("success", res);
      setSelectedProp({});
      dispatch(
        getPosts({
          page: tableParams.current,
          limit: tableParams.pageSize,
        })
      );
    } else {
      const res = await dispatch(
        addPost({
          title,
          content: markupStr,
        })
      ).unwrap();
      openNotification("success", res);
      dispatch(
        getPosts({
          page: tableParams.current,
          limit: tableParams.pageSize,
        })
      );
    }
    setIsModalOpen(false);
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
