import React, { useState } from "react";
import { Layout, Menu, Button, theme, Avatar, Dropdown, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  PropertySafetyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Agents from "./Agents";
import Property from "./Property";
const { Header, Sider, Content } = Layout;

function Dashboard() {
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
      case e.key === "1":
        return;
      case e.key === "2":
        localStorage.removeItem("s");
    }
  };

  const handleSideMenu = ({ key }) => {
    switch (key) {
      case "/admin/agent":
        setPage(<Agents />);
        break;
      case "/property":
        setPage(<Property />);
    }
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
              key: "/admin/agent",
              icon: <UserOutlined />,
              label: "Agent",
            },
            {
              key: "/property",
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
                onClick: (e) => console.log(typeof e.key),
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
          {page}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
