import React from "react";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { render } from '@testing-library/react';

it("should be loading first", () => {
  const { getByText } = render(
    (<Provider store={store}>
      <App />
    </Provider>) 
  );
  expect(getByText(/loading.../i)).toBeInTheDocument();
});
