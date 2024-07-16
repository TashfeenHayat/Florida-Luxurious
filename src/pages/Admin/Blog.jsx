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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, addBlog, getBlog, updateBlog, deleteBlog } from "../../api/Blogs";
import customAxios from "../../api/Axios";

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
            title="Delete this task"
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
  const [title, setTitle] = useState();
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, description) => {
    api[type]({ description });
  };

  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
  });
  const [key, setKey] = useState();
  const [modalProps, setModalProps] = useState([]);
  const [modalSearch, setModalSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProp, setSelectedProp] = useState();
  const [selectedBlog, setSelectedBlog] = useState();

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
  }, []);

  const onSearch = (agentId) => {
    setKey(agentId);
    setTableParams({
      pagination: {
        ...tableParams,
        current: 1,
      },
    });
    dispatch(getBlogs({ agentId }));
  };

  const handleTableChange = (pagination) => {
    console.log(pagination);
    setTableParams(pagination);
    dispatch(
      getBlogs({
        agentId,
        page: pagination.current,
      })
    );
  };

  const handleSearch = async (key) => {
    const res = await customAxios.get(`agent`, {
      params: { key },
    });
    const data = res.data;
    setModalProps(data.agents);
  };

  const handleChange = (newValue) => {
    const property = modalProps.find((i) => i._id == newValue);
    setSelectedProp(property);
    setModalSearch(`${property?.firstName} ${property?.lastName}`);
  };

  const showModal = (property) => {
    console.log(property);
    setIsModalOpen(true);
    if (property._id) {
      setSelectedBlog(property);
      setSelectedProp(property.agentId);
      setTitle(property.title);
      setModalSearch(
        `${property?.agentId?.firstName} ${property?.agentId?.lastName}`
      );
      setTimeout(() => {
        var parser = new DOMParser();
        var decodedHtml = parser.parseFromString(property?.content, "text/html")
          .body.textContent;
        window.$("#summernote").summernote("code", decodedHtml);
      }, 1000);
    } else {
      setSelectedBlog("");
      setSelectedProp("");
      setTitle("");
      setModalSearch("");
      setTimeout(() => {
        var parser = new DOMParser();
        var decodedHtml = parser.parseFromString("", "text/html").body
          .textContent;
        window.$("#summernote").summernote("code", decodedHtml);
      }, 1000);
    }
  };

  const handleOk = async (ok) => {
    console.log(selectedProp);
    if (selectedProp?._id) {
      var markupStr = $("#summernote").summernote("code");

      if (ok === "ok" && !selectedBlog?._id) {
        const res = await dispatch(
          addBlog({
            agentId: selectedProp._id,
            title: title,
            content: markupStr,
          })
        ).unwrap();
        openNotification("success", res);
        dispatch(
          getBlogs({
            page: tableParams.current,
            limit: tableParams.pageSize,
          })
        );
      } else {
        const res = await dispatch(
          updateBlog({
            agentId: selectedProp._id,
            title: title,
            content: markupStr,
            id: selectedBlog._id,
          })
        ).unwrap();
        openNotification("success", res);
        dispatch(
          getBlogs({
            page: tableParams.current,
            limit: tableParams.pageSize,
          })
        );
      }
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  }

  return (
    <>
      <Card
        title="Blogs"
        extra={
          <Space>
            {/* <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
              allowClear
            /> */}
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
          dataSource={data?.blogs}
          onChange={handleTableChange}
        />
      </Card>
      <Modal
        title="Add Blog"
        open={isModalOpen}
        onOk={() => handleOk("ok")}
        onCancel={handleCancel}
        width={1000}
      >
        <Select
          showSearch
          value={modalSearch}
          placeholder={"Select agent"}
          style={{ width: "100%", marginBottom: 20 }}
          suffixIcon={null}
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

        <div id="summernote"></div>
      </Modal>
    </>
  );
}

export default Blog;
