import React from "react";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { render } from '@testing-library/react';

it("should be home page", () => {
  const { getByText } = render(
    (<Provider store={store}>
      <App />
    </Provider>) 
  );
  expect(getByText(/home page/i)).toBeInTheDocument();
});

it("should be username input", () => {
  const { getByRole } = render(
    (<Provider store={store}>
      <App />
    </Provider>) 
  );

  expect(getByRole("textbox")).toBeInTheDocument();
  expect(getByRole("button")).toBeInTheDocument();
});
