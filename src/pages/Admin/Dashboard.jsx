import React, { useState, useEffect } from "react";
import axios from "axios";

import { Layout, Menu, Button, theme, Avatar, Dropdown } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PropertySafetyOutlined,
  BarChartOutlined,
  FunnelPlotOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

function Dashboard({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
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
    navigate(key);
  };

  useEffect(() => {
    let accessToken = localStorage.token;
    console.log(accessToken);
    if (accessToken) {
      axios.interceptors.request.use(
        (config) => {
          // Modify the request configuration or add headers
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        },
        (error) => {
          // Handle request errors
          return Promise.reject(error);
        }
      );
    } else {
      navigate("/admin/login");
    }
  }, []);

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
              key: "/admin/dashboard",
              icon: <BarChartOutlined />,
              label: "Dashboard",
            },
            {
              key: "/admin/filter",
              icon: <FunnelPlotOutlined />,
              label: "Filter",
            },
            {
              key: "/admin/agent",
              icon: <UsergroupAddOutlined />,
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
