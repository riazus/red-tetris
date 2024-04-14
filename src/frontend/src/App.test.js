import { render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import {
  connectAppSocket,
  disconnectAppSocket,
  initializeAppSocket,
} from "./sockets/socket";

jest.mock("./sockets/socket", () => ({
  connectAppSocket: jest.fn(),
  disconnectAppSocket: jest.fn(),
  initializeAppSocket: jest.fn(),
}));

describe("App", () => {
  it("should connect to the socket while mounting", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(initializeAppSocket).toHaveBeenCalled();
    expect(connectAppSocket).toHaveBeenCalled();
    expect(disconnectAppSocket).not.toHaveBeenCalled();
  });
});
