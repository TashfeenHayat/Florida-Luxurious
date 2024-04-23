import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Space, Card, Button, Table, Input, Popconfirm } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getFilters, deleteFilter } from "../../api/Filters";

const { Search } = Input;

function Filters() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/admin/filter/edit/${record._id}`}>Edit</Link>
          <Popconfirm
            title="Delete this task"
            description="Are you sure to delete this filter ?"
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
  const { isLoading, isError, data } = useSelector((s) => s.getFiltersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilters());
    if (isError) {
      console.log(isError);
    }
  }, []);

  const onSearch = (text) => {
    dispatch(getFilters(text));
  };

  const onDelete = (id) => {
    dispatch(deleteFilter(id));
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
      title="Filters"
      extra={
        <Space>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
            allowClear
          />
          <Button type="primary">
            <Link to="/admin/filter/add">
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
        dataSource={data}
        onChange={handleTableChange}
      />
    </Card>
  );
}

export default Filters;
