import React from "react";
import { useSelector } from "react-redux";

function Link({ to, children }) {
  const { username } = useSelector((state) => state.userState);

  const onClick = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", to);
    const ev = new CustomEvent("linkClick", { detail: { username } });
    window.dispatchEvent(ev);
  };

  return (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  );
}

export default Link;
