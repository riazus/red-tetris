import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import GameRoomForm from "./GameRoom";

jest.mock("../../sockets/listeners/gameListeners.js", () => {
  const gameListeners = jest.fn();
  const removeGameListeners = jest.fn();

  return {
    gameListeners,
    removeGameListeners,
  };
});

it("should have exit room button", () => {
  render(
    <Provider store={store}>
      <GameRoomForm />
    </Provider>
  );

  expect(screen.getByRole("button")).toBeInTheDocument();
});
