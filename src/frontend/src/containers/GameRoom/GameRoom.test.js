import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import gameReducer from "../../app/slices/gameSlice";
import userReducer from "../../app/slices/playerSlice";
import GameRoomForm from "./GameRoom";

jest.mock("../../sockets/socket.js", () => {
  return { emitAppSocketEvent: jest.fn() };
});

jest.mock("../../sockets/listeners/gameListeners.js", () => {
  const gameListeners = jest.fn();
  const removeGameListeners = jest.fn();

  return {
    gameListeners,
    removeGameListeners,
  };
});

it("should have exit room button", () => {
  const testStore = configureStore({
    reducer: { player: userReducer, game: gameReducer },
    preloadedState: {
      player: {
        isAdmin: true,
      },
      game: {
        isGameover: true,
        isStarted: true,
        players: [],
      },
    },
  });

  render(
    <Provider store={testStore}>
      <GameRoomForm />
    </Provider>
  );

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
        players: [],
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
