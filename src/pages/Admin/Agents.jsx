import React, { useEffect } from "react";
import { Space, Card, Button, Flex, Table, Input, Popconfirm } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { getAgents } from "../../api/Agents";

const { Search } = Input;

function Agents() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Phone No",
      dataIndex: "phoneNumber",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, { address }) => { 
        if(address) return `${address.addressLine1} ${address.addressLine2} ${address.city} ${address.state} ${address.zipCode} ${address.country}`
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "address",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" href={`/agent/edit/${record._id}`}>Edit</Button>
          <Popconfirm
            title="Delete this task"
            description="Are you sure to delete this agent?"
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
  const { isLoading, isError, data } = useSelector((s) => s.agentreducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAgents());
  }, []);

  const onSearch = (text) => {
    dispatch(getAgents(text));
  }

  const onDelete = (id) => {
    console.log(id);
    // dispatch(getAgents(text));
  }

  return (
    <Card 
      title="Agents" 
      extra={
        <Space>
          <Search placeholder="input search text" onSearch={onSearch} enterButton allowClear />
          <Button type="primary" href="/agents/add"><PlusOutlined />Add</Button>
        </Space>
      }
      style={{ padding: 0 }}
    >
      <Table columns={columns} loading={isLoading} isError={isError} dataSource={data} />
    </Card>
  );
}

export default Agents;
