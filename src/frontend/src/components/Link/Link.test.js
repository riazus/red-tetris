import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import userReducer from "../../app/slices/playerSlice";
import Link from "./Link";

describe("Link", () => {
  it("should render the link", () => {
    const testStore = configureStore({
      reducer: { player: userReducer },
      preloadedState: {
        player: {
          username: "test",
        },
      },
    });

    render(
      <Provider store={testStore}>
        <Link />
      </Provider>
    );

    expect(screen.getByTestId("link-id")).toBeInTheDocument();
  });

  it("should be clickable", () => {
    const testStore = configureStore({
      reducer: { player: userReducer },
      preloadedState: {
        player: {
          username: "test",
        },
      },
    });

    render(
      <Provider store={testStore}>
        <Link />
      </Provider>
    );

    const link = screen.getByTestId("link-id");
    act(() => link.click());
  });
});
