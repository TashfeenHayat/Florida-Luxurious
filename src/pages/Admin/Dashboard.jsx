import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  theme,
  Avatar,
  Dropdown,
  notification,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  PropertySafetyOutlined,
  BarChartOutlined,
  FileTextOutlined,
  FunnelPlotOutlined,
  UsergroupAddOutlined,
  QuestionCircleOutlined,
  PrinterOutlined,
  EditOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../api/Axios";
const { Header, Sider, Content } = Layout;

function Dashboard() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    // {
    //   key: "1",
    //   label: <span style={{ color: "black" }}>Profile</span>,
    // },
    {
      key: "2",
      label: <span style={{ color: "black" }}>Logout</span>,
    },
  ];
  useEffect(() => {
    // Check if the token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // If token is not found, show logout notification
      notification.warning({
        message: "Session Expired",
        description:
          "You have been logged out due to inactivity or session expiration.",
      });

      // Redirect user to login page
      navigate("/admin/login");
    }
  }, [navigate]);
  const handleMenu = async (e) => {
    switch (e.key) {
      case "2":
        try {
          const token = localStorage.getItem("token"); // Get token from localStorage
          if (!token) {
            notification.error({
              message: "Logout Failed",
              description: "Token not found. Unable to logout.",
            });
            return;
          }

          // Send the token to the backend API for logout
          const response = await customAxios.post("user/logout", { token });

          if (response.status === 200) {
            localStorage.removeItem("token");

            // Navigate to login page first
            navigate("/admin/login", {
              state: { fromLogout: true }, // Pass a state indicating logout
            });
          }
        } catch (error) {
          console.error(
            "Logout Failed:",
            error.response?.data?.message || error.message
          );

          // Show error notification if logout fails
          notification.error({
            message: "Logout Failed",
            description: error.response?.data?.message || error.message,
          });
        }
        break;
      default:
        return;
    }
  };

  const handleSideMenu = ({ key }) => {
    navigate(key);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={handleSideMenu}
          items={[
            // {
            //   key: "/admin/dashboard",
            //   icon: <BarChartOutlined />,
            //   label: "Dashboard",
            // },
            {
              key: "/admin/community",
              icon: <FunnelPlotOutlined />,
              label: "Communities",
            },
            {
              key: "/admin/agent",
              icon: <UsergroupAddOutlined />,
              label: "Agents",
            },
            {
              key: "/admin/property",
              icon: <PropertySafetyOutlined />,
              label: "Properties",
            },
            {
              key: "/admin/press",
              icon: <PrinterOutlined />,
              label: "Press",
            },
            {
              key: "/admin/inquiry",
              icon: <QuestionCircleOutlined />,
              label: "Inquiries",
            },
            {
              key: "/admin/blog",
              icon: <EditOutlined />,
              label: "Blogs",
            },
            {
              key: "/admin/report",
              icon: <FileTextOutlined />,
              label: "Reports",
            },
            {
              key: "/admin/Testimonial",
              icon: <StarOutlined />,
              label: "Testimonial",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            className="flex-between"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 16px",
            }}
          >
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
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            minHeight: "calc(100vh - 112px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
