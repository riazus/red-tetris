import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import gameReducer from "../../app/slices/gameSlice";
import userReducer from "../../app/slices/playerSlice";
import { SOCKETS } from "../../const";
import { createStage } from "../../gameHelpers";
import { useGameStatus } from "../../hooks/useGameStatus";
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";
import { emitAppSocketEvent } from "../../sockets/socket";
import { TETROMINOS } from "../../tetrominos";
import Tetris from "./Tetris";

jest.mock("../../sockets/socket.js", () => ({ emitAppSocketEvent: jest.fn() }));

jest.mock("../../hooks/usePlayer", () => ({ usePlayer: jest.fn() }));

jest.mock("../../hooks/useStage", () => ({ useStage: jest.fn() }));

jest.mock("../../hooks/useGameStatus", () => ({ useGameStatus: jest.fn() }));

describe("Tetris", () => {
  beforeEach(() => {
    const defaultPlayer = {
      pos: { x: 0, y: 0 },
      tetromino: TETROMINOS[0].shape,
      ind: 0,
      collided: false,
    };
    usePlayer.mockImplementation(() => [
      defaultPlayer,
      jest.fn(),
      jest.fn(),
      jest.fn(),
    ]);
    useStage.mockImplementation(() => [createStage(), jest.fn(), 0]);
    useGameStatus.mockImplementation(() => [0, jest.fn(), 0, jest.fn()]);
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
        <Tetris />
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
        <Tetris />
      </Provider>
    );

    expect(screen.getByTestId("restart-game-button")).toBeInTheDocument();
  });

  it("should have possibility to exit from room", () => {
    const stage = global.random20Tetrominos();
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
          tetrominos: stage,
        },
      },
    });

    render(
      <Provider store={testStore}>
        <Tetris />
      </Provider>
    );

    const exitButton = screen.getByTestId("exit-room-button");
    act(() => exitButton.click());
    expect(emitAppSocketEvent).toHaveBeenCalledWith(SOCKETS.EXIT_ROOM);
  });

  it("should have possibility to restart the game", () => {
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
    const setStage = jest.fn();
    const cleanStage = createStage();
    useStage.mockImplementation(() => [cleanStage, setStage, 0]);

    render(
      <Provider store={testStore}>
        <Tetris />
      </Provider>
    );

    const restartButton = screen.getByTestId("restart-game-button");
    act(() => restartButton.click());
    expect(emitAppSocketEvent).toHaveBeenCalledWith(SOCKETS.RESTART_GAME);
    expect(setStage).toHaveBeenCalledWith(cleanStage);
  });
});
