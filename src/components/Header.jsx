import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/Logonew.svg";
import { Link, useNavigate } from "react-router-dom";
import { Flex, Image, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Drawer from "../components/Drawer";

const contentStyle = {
  padding: 0,
  backgroundColor: "#000",
  borderRadius: 0,
};

const menuStyle = {
  padding: 0,
  backgroundColor: "#000",
  borderRadius: 0,
  boxShadow: "none",
};

function Header() {
  const navbar = useRef(null);
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollYOffset = window.scrollY > 100;
      navbar.current?.classList.toggle("sticky", scrollYOffset);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <nav ref={navbar} id="navbar_main">
      <Flex justify={"space-between"} align="center" gap={0}>
        <Link to="/" style={{ borderRight: "none", padding: "0px" }}>
          <Image src={Logo} width={"85%"} preview={false} />
        </Link>
        <Flex className="flex-hidden">
          <Dropdown
            overlay={
              <Menu style={menuStyle}>
                <Menu.Item style={contentStyle}>
                  <Link
                    rel="noopener noreferrer"
                    className="text-upper f-10"
                    to="/properties"
                  >
                    Featured properties
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="https://www.antgroup.com"
                    rel="noopener noreferrer"
                    className="text-upper  f-10"
                  >
                    Featured neighborhood
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    rel="noopener noreferrer"
                    className="text-upper f-10"
                    to="/sold-properties"
                  >
                    Sold Properties
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Our Offerings
            </a>
          </Dropdown>
          <Dropdown
            overlay={
              <Menu style={menuStyle}>
                <Menu.Item style={contentStyle}>
                  <Link
                    to="mls-listing"
                    target="_blank"
                    rel="noopener noreferrer "
                    className="f-10"
                  >
                    MLS
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to="/global"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="f-10"
                  >
                    Global Partner
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Other offerings
            </a>
          </Dropdown>
          <Dropdown
            overlay={
              <Menu style={menuStyle}>
                <Menu.Item style={contentStyle}>
                  <Link
                    rel="noopener noreferrer"
                    className="text-upper f-10"
                    to="/our-story"
                  >
                    Our story
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link className="text-upper f-10" to="/meet-the-team">
                    Meet the team
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link rel="noopener noreferrer" className="text-upper f-10">
                    Property press
                  </Link>
                </Menu.Item>
              </Menu>
            }
          >
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              About
            </a>
          </Dropdown>

          <Link to="/boat-owner" className="ant-dropdown-link">
            For Boat Owners
          </Link>
          <Link to="/contact-us">Contact Us</Link>
        </Flex>

        <Flex onClick={handleDrawer}>
          <span className="hamburger-icon">
            <svg
              width="26"
              height="21"
              viewBox="0 0 26 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="13" y="0.0195312" width="13" height="2" fill="white" />
              <rect y="9.01953" width="26" height="2" fill="white" />
              <rect x="8" y="18.0195" width="18" height="2" fill="white" />
            </svg>
          </span>
          <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
        </Flex>
      </Flex>
    </nav>
  );
}

export default Header;
