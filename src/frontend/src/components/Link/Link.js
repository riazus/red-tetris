import React from "react";
import { useSelector } from "react-redux";

function Link({ to, children }) {
  const { username } = useSelector((state) => state.player);

  const handleClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", to);
    const ev = new CustomEvent("linkClick", { detail: { username } });
    window.dispatchEvent(ev);
  };

  return (
    <a data-testid="link-id" href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
