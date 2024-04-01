import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Home from "./Home";

it("should be home page text", () => {
  render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(screen.getByText(/home page/i)).toBeInTheDocument();
});
