import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Space, Card, Button, Table, Input, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
      title: "",
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
      current: 1,
      pageSize: 10,
  });
  const [key, setKey] = useState();

  const { isLoading, isError, data } = useSelector((s) => s.getFiltersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getFilters({
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
    dispatch(getFilters({ key }));
  };

  const onDelete = (id) => {
    dispatch(deleteFilter(id));
  };

  const handleTableChange = (pagination) => {
    setTableParams(pagination);
    dispatch(
      getFilters({
        key,
        page: pagination.current,
      })
    );
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
        pagination={{ ...tableParams, total: data?.totalCount }}
        dataSource={data?.filters}
        onChange={handleTableChange}
      />
    </Card>
  );
}

export default Filters;
