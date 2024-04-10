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
        // if (!address.addressLine2) address.addressLine2 = "";
        if (address)
          return `${address.addressLine1} 
        ${address.addressLine2 ? address.addressLine2 : ""} 
        ${address.city} ${address.state} 
        ${address.zipCode} ${address.country}`;
      },
    },
    {
      title: "Action",
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
    pagination: {
      current: 1,
      pageSize: 2,
    },
  });
  const { isLoading, isError, data } = useSelector((s) => s.getAgentsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAgents());
    if (isError) {
      console.log(isError);
    }
  }, []);

  const onSearch = (text) => {
    dispatch(getAgents(text));
  };

  const onDelete = (id) => {
    dispatch(deleteAgent(id));
  };

  const handleTableChange = (pagination) => {
    setTableParams(pagination);

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      // setData([]);
    }
  };

  return (
    <Card
      title="Agents"
      extra={
        <Space>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            allowClear
          />
          <Button type="primary">
            <Link to="/admin/agent/add">
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
        pagination={tableParams}
        dataSource={data.agents}
        onChange={handleTableChange}
      />
    </Card>
  );
}

export default Agents;
