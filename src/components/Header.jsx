import React, { useState } from "react";
import Logo from "../assets/Logo.svg";
import { Link } from "react-router-dom";
import { Flex, Image } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Divider } from "antd";
import { useEffect, useRef } from "react";
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
          <Image src={Logo} width={150} preview={false} />
        </Link>
        <Flex className="flex-hidden">
          <Dropdown
            menu={{ items }}
            dropdownRender={(menu) => (
              <div style={contentStyle}>
                {React.cloneElement(menu, { style: menuStyle })}
              </div>
            )}
          >
            <a onClick={(e) => e.preventDefault()}>
              <a href="#">Our offerings</a>
            </a>
          </Dropdown>
          <Dropdown
            menu={{ items }}
            dropdownRender={(menu) => (
              <div style={contentStyle}>
                {React.cloneElement(menu, { style: menuStyle })}
              </div>
            )}
          >
            <a onClick={(e) => e.preventDefault()}>
              <a href="#">Search by location</a>
            </a>
          </Dropdown>
          <Dropdown
            menu={{ items }}
            dropdownRender={(menu) => (
              <div style={contentStyle}>
                {React.cloneElement(menu, { style: menuStyle })}
              </div>
            )}
          >
            <a onClick={(e) => e.preventDefault()}>
              <a href="#">About</a>
            </a>
          </Dropdown>
          <Dropdown
            menu={{ items }}
            dropdownRender={(menu) => (
              <div style={contentStyle}>
                {React.cloneElement(menu, { style: menuStyle })}
              </div>
            )}
          >
            <a onClick={(e) => e.preventDefault()}>
              <a href="#">For Boat Owners</a>
            </a>
          </Dropdown>
          <a href="#">Contact Us</a>
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

        {/* -- -- */}
      </Flex>
    </nav>
  );
}

export default Header;

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Other Offering
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Other Offering
      </a>
    ),
  },
];
