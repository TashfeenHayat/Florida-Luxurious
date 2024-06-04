import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Space, Card, Button, Table, Input, Popconfirm } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getInquiries } from "../../api/Inquiry";

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
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    // {
    //   title: "",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <Link to={`/admin/agent/edit/${record._id}`}>Edit</Link>
    //       <Popconfirm
    //         title="Delete this task"
    //         description="Are you sure to delete this agent ?"
    //         okText="Yes"
    //         cancelText="No"
    //         onConfirm={() => onDelete(record._id)}
    //       >
    //         <Button type="link">Delete</Button>
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ];
  const [tableParams, setTableParams] = useState({
    current: 1,
    pageSize: 10,
  });

  const [key, setKey] = useState();

  const { isLoading, isError, data } = useSelector((s) => s.getInquiryReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getInquiries({
        page: tableParams.current,
        limit: tableParams.pageSize,
      })
    );
    if (isError) {
      console.log(isError);
    }
  }, []);

  //   const onSearch = (key) => {
  //     setKey(key);
  //     setTableParams({
  //       pagination: {
  //         ...tableParams,
  //         current: 1,
  //       },
  //     });
  //     dispatch(getAgents({ key }));
  //   };

  //   const onDelete = (id) => {
  //     dispatch(deleteAgent(id));
  //   };

  const handleTableChange = (pagination) => {
    console.log(pagination);
    setTableParams(pagination);
    dispatch(
      getInquiries({
        key,
        page: pagination.current,
      })
    );
  };
  console.log(data);
  return (
    <Card title="Inquiries" style={{ padding: 0 }}>
      <Table
        columns={columns}
        loading={isLoading}
        isError={isError}
        pagination={{ ...tableParams, total: data?.totalCount }}
        dataSource={data?.inquiries}
        onChange={handleTableChange}
      />
    </Card>
  );
}

export default Agents;
