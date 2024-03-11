import React from "react";
import Logo from "../assets/Logo.svg";
import { Flex, Image } from "antd";
import { useEffect } from "react";
import { useRef } from "react";

function Header() {
  const navbar = useRef(null);
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
  return (
    <nav ref={navbar} id="navbar_main">
      <Flex justify={"space-between"} align="center" gap={0}>
        <Image src={Logo} width={150} preview={false} />
        <Flex>
          <a href="#">Our offerings</a>
          <a href="#">Search by location</a>
          <a href="#">About</a>
          <a href="#">For Boat Owners</a>
          <a href="#">Contact Us</a>
        </Flex>

        <Flex>
          <span>
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
        </Flex>

        {/* -- -- */}
      </Flex>
    </nav>
  );
}

export default Header;
