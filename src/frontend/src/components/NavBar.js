import React from "react";
import { Flex } from "antd";
import Link from "./Link";
import { useSelector } from "react-redux";
import "./styles/NavBar.css";

const NavBar = ({ links }) => {
  const { username } = useSelector((state) => state.player);
  if (username.length > 1)
    return (
      <>
        <Flex justify="end" gap={16} className={"barContainer"}>
          {links.map((link) => (
            <Flex gap={8}>
              {link.icon}
              <Link key={link.href} to={link.href}>
                {link.label}
              </Link>
            </Flex>
          ))}
        </Flex>
      </>
    );
};
export default NavBar;
