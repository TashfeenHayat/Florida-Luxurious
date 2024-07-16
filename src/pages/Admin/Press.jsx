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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getProperties,
  addProperty,
  getProperty,
  updateProperty,
} from "../../api/Properties";
import customAxios from "../../api/Axios";

const { Search } = Input;

function Press() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, address) => {
        if (address)
          return `${address.addressLine1} 
        ${address.addressLine2 ? address.addressLine2 : ""} 
        ${address.city} ${address.state} 
        ${address.zipCode} ${address.country}`;
      },
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
  const [key, setKey] = useState();
  const [modalProps, setModalProps] = useState([]);
  const [modalSearch, setModalSearch] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProp, setSelectedProp] = useState();

  const { isLoading, isError, data } = useSelector(
    (s) => s.getPropertiesReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProperties({
        page: tableParams.current,
        limit: tableParams.pageSize,
        fromPress: true,
      })
    );
    if (isError) {
      console.log(isError);
    }
  }, []);

  const onSearch = (key) => {
    setKey(key);
    setTableParams({
      pagination: {
        ...tableParams,
        current: 1,
      },
    });
    dispatch(getProperties({ key, fromPress: true }));
  };

  const handleTableChange = (pagination) => {
    console.log(pagination);
    setTableParams(pagination);
    dispatch(
      getProperties({
        key,
        page: pagination.current,
        fromPress: true,
      })
    );
  };

  const handleSearch = async (key) => {
    const res = await customAxios.get(`property`, {
      params: { key, withoutPress: true },
    });
    const data = res.data;
    setModalProps(data.properties);
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
      setSelectedProp(property);
      setModalSearch(property.name);
      setTimeout(() => {
        var parser = new DOMParser();
        var decodedHtml = parser.parseFromString(property?.press, "text/html")
          .body.textContent;
        window.$("#summernote").summernote("code", decodedHtml);
      }, 1000);
    } else {
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
    if (ok === "ok") {
      var markupStr = $("#summernote").summernote("code");
      const res = await dispatch(
        updateProperty({
          id: selectedProp._id,
          press: markupStr,
        })
      ).unwrap();
      openNotification("success", res);
      dispatch(
        getProperties({
          page: tableParams.current,
          limit: tableParams.pageSize,
          fromPress: true,
        })
      );
    } else {
      const res = await dispatch(
        updateProperty({
          id: ok,
          press: undefined,
        })
      ).unwrap();
      openNotification("success", res);
      dispatch(
        getProperties({
          page: tableParams.current,
          limit: tableParams.pageSize,
          fromPress: true,
        })
      );
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        title="Press Info"
        extra={
          <Space>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
              allowClear
            />
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
          dataSource={data?.properties}
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
        <Select
          showSearch
          value={modalSearch}
          placeholder={"Select property"}
          style={{ width: "100%", marginBottom: 20 }}
          suffixIcon={null}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChange}
          notFoundContent={null}
          options={(modalProps || []).map((d) => ({
            value: d._id,
            label: d.name,
          }))}
        />

        <div id="summernote"></div>
      </Modal>
    </>
  );
}

export default Press;
