import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import userReducer from "./app/slices/playerSlice";
import { store } from "./app/store";

it("should have home page text", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/home page/i)).toBeInTheDocument();
});

it("should show greeting text and two link while username is not empty", () => {
  const testStore = configureStore({
    reducer: { player: userReducer },
    preloadedState: {
      player: {
        username: "test-username",
      },
    },
  });

  render(
    <Provider store={testStore}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/hello, test-username/i)).toBeInTheDocument();
});
