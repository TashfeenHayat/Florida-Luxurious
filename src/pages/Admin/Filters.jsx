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
          <Link to={`/admin/community/edit/${record._id}`}>Edit</Link>
          <Popconfirm
            title="Delete this filter"
            description="Are you sure to delete this filter?"
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
  }, [dispatch, tableParams.current, tableParams.pageSize, isError]);

  const onSearch = (key) => {
    setKey(key);
    setTableParams({
      current: 1,
      pageSize: tableParams.pageSize,
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
        limit: pagination.pageSize,
      })
    );
  };

  return (
    <Card
      title="Filters"
      extra={
        <Space
          direction="vertical"
          style={{
            display: "flex",
            alignItems: "flex-end",
            marginBottom: "16px",
          }}
        >
          <Search
            placeholder="Search filters"
            onSearch={onSearch}
            enterButton
            allowClear
            style={{ width: "100%", maxWidth: "400px" }}
          />
          <Button type="primary" style={{ width: "100%", maxWidth: "200px" }}>
            <Link
              to="/admin/community/add"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <PlusOutlined style={{ marginRight: "8px" }} />
              Add
            </Link>
          </Button>
        </Space>
      }
      style={{
        padding: 0,
        width: "100%",
        maxWidth: "1800px",
        margin: "0 auto",
      }}
    >
      <Table
        columns={columns}
        loading={isLoading}
        isError={isError}
        pagination={{
          ...tableParams,
          total: data?.totalCount,
          pageSizeOptions: ["10", "20", "50"],
        }}
        dataSource={data?.filters}
        onChange={handleTableChange}
        style={{ width: "100%" }}
        scroll={{ x: true }} // Allows horizontal scrolling on small screens
      />
    </Card>
  );
}

export default Filters;
