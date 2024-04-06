import React, { useState } from "react";
import { Layout, Menu, Button, theme, Avatar, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PropertySafetyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Agents from "./Agents";
import Property from "./Property";
const { Header, Sider, Content } = Layout;

function Dashboard({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [page, setPage] = useState("");
  const items = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Logout",
    },
  ];

  const handleMenu = (e) => {
    switch (e.key) {
      case "1":
        return;
      case "2":
        localStorage.removeItem("token");
        navigate("/admin/login");
    }
  };

  const handleSideMenu = ({ key }) => {
    navigate(key)
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={handleSideMenu}
          items={[
            {
              key: "/admin/filter",
              icon: <UserOutlined />,
              label: "Filter",
            },
            {
              key: "/admin/agent",
              icon: <UserOutlined />,
              label: "Agent",
            },
            {
              key: "/admin/property",
              icon: <PropertySafetyOutlined />,
              label: "Property",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex-between">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />

            <Dropdown
              menu={{
                items,
                onClick: (e) => handleMenu(e),
              }}
              placement="bottomLeft"
            >
              <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
