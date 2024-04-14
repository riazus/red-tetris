import React from "react";
import { createRoot } from "react-dom/client";
import { HiUserGroup } from "react-icons/hi";
import { MdLeaderboard } from "react-icons/md";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import NavBar from "./components/NavBar/NavBar";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

const links = [
  {
    href: "#leaderboard",
    label: "Leaderboard",
    icon: <MdLeaderboard />,
  },
  {
    href: "#",
    label: "Lobby",
    icon: <HiUserGroup />,
  },
];

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <NavBar links={links} />
    <App />
  </Provider>
  // </React.StrictMode>
);
