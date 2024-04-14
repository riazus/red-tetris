import { Flex } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Link from "../Link/Link";
import "./NavBar.css";

const NavBar = ({ links }) => {
  const { username } = useSelector((state) => state.player);
  const { isStarted } = useSelector((root) => root.game);

  if (username.length > 0 && !isStarted)
    return (
      <Flex
        data-testid="navbar-id"
        justify="end"
        gap={16}
        className={"barContainer"}
      >
        {links.map((link, i) => (
          <Flex key={i} gap={8}>
            {link.icon}
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          </Flex>
        ))}
      </Flex>
    );
};
export default NavBar;
