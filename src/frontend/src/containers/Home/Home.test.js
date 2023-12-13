import React from "react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { render } from "@testing-library/react";
import Home from "./Home";

it("should be home page text", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );
  expect(getByText(/home page/i)).toBeInTheDocument();
});
