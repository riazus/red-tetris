import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import NavBar from "./components/NavBar";
import "./index.css";
import { MdLeaderboard } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";

const container = document.getElementById("root");
const root = createRoot(container);

const links = [
  {
    href: "#leaderboard",
    label: "Leaderboard",
    icon: <MdLeaderboard/>,
  },
  {
    href: "#rooms",
    label: "Lobby",
    icon: <HiUserGroup/>
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
