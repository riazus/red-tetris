import React from "react";

function Link({ to, children }) {
  const onClick = (event) => {
    event.preventDefault();
    console.log(to);
    window.history.pushState({}, "", to);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <a href={to} onClick={onClick}>
      {children}
    </a>
  );
}

export default Link;
