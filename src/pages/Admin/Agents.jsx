import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Space, Card, Button, Table, Input, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAgents, deleteAgent } from "../../api/Agents";

const { Search } = Input;

function Agents() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, { firstName, lastName }) => `${firstName} ${lastName}`,
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
          <Button type="primary" href="/admin/agent/add">
            <PlusOutlined />
            Add
          </Button>
        </Space>
      }
      style={{ padding: 0 }}
    >
      <Table
        columns={columns}
        loading={isLoading}
        isError={isError}
        dataSource={data}
      />
    </Card>
  );
}

export default Agents;
