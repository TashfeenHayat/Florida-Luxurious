import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Space, Card, Button, Table, Input, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getProperties, deleteProperty } from "../../api/Properties";

const { Search } = Input;

function Properties() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No",
      dataIndex: "phoneNumber",
      key: "phone",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, { address }) => {
        // if (!address.addressLine2) address.addressLine2 = "";
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
          <Link to={`/admin/property/edit/${record._id}`}>Edit</Link>
          <Popconfirm
            title="Delete this task"
            description="Are you sure to delete this property?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => onDelete(record._id)}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
  });

  const [key, setKey] = useState();

  const { isLoading, isError, data } = useSelector(
    (s) => s.getPropertiesReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getProperties({
        page: tableParams.current,
        limit: tableParams.pageSize,
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
    dispatch(getProperties({ key }));
  };

  const onDelete = (id) => {
    dispatch(deleteProperty(id));
  };

  const handleTableChange = (pagination) => {
    console.log(pagination);
    setTableParams(pagination);
    dispatch(
      getProperties({
        key,
        page: pagination.current,
      })
    );
  };

  return (
    <Card
      title="Properties"
      extra={
        <Space>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            allowClear
          />
          <Button type="primary">
            <Link to="/admin/property/add">
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
  );
}

export default Properties;
