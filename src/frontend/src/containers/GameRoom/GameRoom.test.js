import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import gameReducer from "../../app/slices/gameSlice";
import userReducer from "../../app/slices/playerSlice";
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
  expect(screen.getByTestId("exit-room-button")).toBeInTheDocument();
});

it("should have restart game button", () => {
  const testStore = configureStore({
    reducer: { player: userReducer, game: gameReducer },
    preloadedState: {
      player: {
        isAdmin: true,
      },
      game: {
        isGameover: true,
        isStarted: true,
      },
    },
  });

  render(
    <Provider store={testStore}>
      <GameRoomForm />
    </Provider>
  );

  expect(screen.getByTestId("restart-game-button")).toBeInTheDocument();
});
