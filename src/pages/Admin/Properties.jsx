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
      title: "Price",
      dataIndex: "salePrice",
      key: "salePrice",
      render: (_, data) => {
        return `${data.currency} ${data.salePrice}`;
      },
    },
    {
      title: "Area",
      dataIndex: "area",
      key: "area",
      render: (_, data) => {
        return `${data.areaUnit} ${data.area}`;
      },
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
          <Link to={`/admin/property/edit/${record._id}`}>Edit</Link>
          <Popconfirm
            title="Delete this property"
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
  }, [dispatch, isError, tableParams.current, tableParams.pageSize]);

  const onSearch = (key) => {
    setKey(key);
    setTableParams({
      ...tableParams,
      current: 1,
    });
    dispatch(getProperties({ key }));
  };

  const onDelete = (id) => {
    dispatch(deleteProperty(id));
  };

  const handleTableChange = (pagination) => {
    setTableParams(pagination);
    dispatch(
      getProperties({
        key,
        page: pagination.current,
      })
    );
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
  };

  const cardStyle = {
    width: "100%",
    overflowX: "auto",
  };

  return (
    <div style={containerStyle}>
      <Card
        title="Properties"
        extra={
          <Space style={{ flexWrap: "wrap" }}>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
              allowClear
              style={{ width: "100%", maxWidth: "300px", marginBottom: "10px" }}
            />
            <Button type="primary" style={{ marginBottom: "10px" }}>
              <Link to="/admin/property/add">
                <PlusOutlined />
                Add
              </Link>
            </Button>
          </Space>
        }
        style={cardStyle}
      >
        <Table
          columns={columns}
          loading={isLoading}
          isError={isError}
          pagination={{ ...tableParams, total: data?.totalCount }}
          dataSource={data?.properties}
          onChange={handleTableChange}
          scroll={{ x: "max-content" }} // Ensure horizontal scrolling
        />
      </Card>
    </div>
  );
}

export default Properties;
