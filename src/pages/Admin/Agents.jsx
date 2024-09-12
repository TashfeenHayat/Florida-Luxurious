import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Space, Card, Button, Table, Input, Popconfirm } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAgents, deleteAgent } from "../../api/Agents";

const { Search } = Input;

function Agents() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, { firstName, lastName, photo }) => (
        <Space>
          <Avatar src={photo} size="small" icon={<UserOutlined />} />
          {firstName} {lastName}
        </Space>
      ),
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
          <Link to={`/admin/agent/edit/${record._id}`}>Edit</Link>
          <Popconfirm
            title="Delete this task"
            description="Are you sure to delete this agent ?"
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

  const { isLoading, isError, data } = useSelector((s) => s.getAgentsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAgents({
        page: tableParams.current,
        limit: tableParams.pageSize,
      })
    );
    if (isError) {
      console.log(isError);
    }
  }, [tableParams.current, tableParams.pageSize, isError, dispatch]);

  const onSearch = (key) => {
    setKey(key);
    setTableParams({
      current: 1,
      pageSize: tableParams.pageSize,
    });
    dispatch(getAgents({ key }));
  };

  const onDelete = (id) => {
    dispatch(deleteAgent(id));
  };

  const handleTableChange = (pagination) => {
    setTableParams({
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
    dispatch(
      getAgents({
        key,
        page: pagination.current,
        limit: pagination.pageSize,
      })
    );
  };

  return (
    <Card
      title="Agents"
      extra={
        <Space
          style={{
            marginBottom: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            allowClear
            style={{ width: "100%", maxWidth: 300 }}
          />
          <Button type="primary" style={{ marginTop: 16 }}>
            <Link to="/admin/agent/add">
              <PlusOutlined />
              Add
            </Link>
          </Button>
        </Space>
      }
      style={{ padding: 0, margin: "0 auto", maxWidth: "1800px" }}
    >
      <Table
        columns={columns}
        loading={isLoading}
        pagination={{ ...tableParams, total: data?.totalCount }}
        dataSource={data?.agents}
        onChange={handleTableChange}
        scroll={{ x: "max-content" }}
        style={{ margin: "0 auto", maxWidth: "100%" }}
      />
    </Card>
  );
}

export default Agents;
