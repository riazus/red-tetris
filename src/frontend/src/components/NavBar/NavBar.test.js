import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { HiUserGroup } from "react-icons/hi";
import { MdLeaderboard } from "react-icons/md";
import { Provider } from "react-redux";
import gameReducer from "../../app/slices/gameSlice";
import userReducer from "../../app/slices/playerSlice";
import NavBar from "./NavBar";

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

describe("NavBar", () => {
  it("should render navbar while username and game are valid", () => {
    const testStore = configureStore({
      reducer: { player: userReducer, game: gameReducer },
      preloadedState: {
        player: {
          username: "test",
        },
        game: {
          isStarted: false,
        },
      },
    });

    render(
      <Provider store={testStore}>
        <NavBar links={links} />
      </Provider>
    );

    expect(screen.getByTestId("navbar-id")).toBeInTheDocument();
  });

  it("should not render navbar while username and game are valid", () => {
    const testStore = configureStore({
      reducer: { player: userReducer, game: gameReducer },
      preloadedState: {
        player: {
          username: "",
        },
        game: {
          isStarted: false,
        },
      },
    });

    render(
      <Provider store={testStore}>
        <NavBar links={links} />
      </Provider>
    );

    expect(screen.queryByTestId("navbar-id")).not.toBeInTheDocument();
  });
});
