import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import userReducer from "../../app/slices/playerSlice";
import { store } from "../../app/store";
import Home from "./Home";

jest.mock(
  "../RoomList/RoomList",
  () =>
    function RoomList() {
      return <p>Lobby</p>;
    }
);

describe("Home", () => {
  it("should render username form while username length is 0", () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText(/Welcome to 42 Tetris/i)).toBeInTheDocument();
  });

  it("should render lobby while username length is more than 0", () => {
    const testStore = configureStore({
      reducer: { player: userReducer },
      preloadedState: {
        player: {
          username: "test-name",
        },
      },
    });

    render(
      <Provider store={testStore}>
        <Home />
      </Provider>
    );

    expect(screen.getByText("Lobby")).toBeInTheDocument();
  });
});
