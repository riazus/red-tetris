import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import gameReducer from "../../app/slices/gameSlice";
import { store } from "../../app/store";
import { SOCKETS } from "../../const";
import { gameListeners } from "../../sockets/listeners/gameListeners";
import { emitAppSocketEvent } from "../../sockets/socket";
import GameRoom from "./GameRoom";

jest.mock("../../sockets/socket.js", () => ({ emitAppSocketEvent: jest.fn() }));

jest.mock("../../sockets/listeners/gameListeners.js", () => ({
  gameListeners: jest.fn(),
  removeGameListeners: jest.fn(),
}));

jest.mock(
  "../Tetris/Tetris",
  () =>
    function Tetris() {
      return <p>Tetris</p>;
    }
);
jest.mock(
  "../SaveScoreModal/SaveScoreModal",
  () =>
    function SaveScoreModal({ isOpen, setIsOpen }) {
      return isOpen ? (
        <p>SaveScoreModal is open</p>
      ) : (
        <p>SaveScoreModal is closed</p>
      );
    }
);

describe("GameRoom", () => {
  it("should subscribe to events on mounting stage", () => {
    render(
      <Provider store={store}>
        <GameRoom />
      </Provider>
    );

    expect(gameListeners).toHaveBeenCalled();
  });

  it("should emit enter to the room event on mounting stage", async () => {
    render(
      <Provider store={store}>
        <GameRoom roomName={"test-roomName"} />
      </Provider>
    );

    await waitFor(() =>
      expect(emitAppSocketEvent).toHaveBeenCalledWith(SOCKETS.ENTER_ROOM, {
        roomName: "test-roomName",
      })
    );
  });

  it("should render game in solo mode game", () => {
    const testStore = configureStore({
      reducer: { game: gameReducer },
      preloadedState: {
        game: {
          isStarted: true,
          isSolo: true,
        },
      },
    });

    render(
      <Provider store={testStore}>
        <GameRoom />
      </Provider>
    );

    expect(screen.getByText(/Tetris/i)).toBeInTheDocument();
  });

  it("should render game in multiplayer mode game", () => {
    const testStore = configureStore({
      reducer: { game: gameReducer },
      preloadedState: {
        game: {
          isStarted: true,
          isSolo: false,
          players: [{}],
        },
      },
    });

    render(
      <Provider store={testStore}>
        <GameRoom />
      </Provider>
    );

    expect(screen.getByText(/Tetris/i)).toBeInTheDocument();
  });

  it("should render waiting text", () => {
    const testStore = configureStore({
      reducer: { game: gameReducer },
      preloadedState: {
        game: {
          isStarted: false,
          isSolo: false,
          players: [{}],
        },
      },
    });

    render(
      <Provider store={testStore}>
        <GameRoom />
      </Provider>
    );

    expect(
      screen.getByText(/Waiting for second player.../i)
    ).toBeInTheDocument();
  });

  it("should open dialog on gameover", () => {
    const testStore = configureStore({
      reducer: { game: gameReducer },
      preloadedState: {
        game: {
          isStarted: true,
          isSolo: true,
          isGameover: true,
        },
      },
    });

    render(
      <Provider store={testStore}>
        <GameRoom />
      </Provider>
    );

    expect(screen.getByText(/SaveScoreModal is open/i)).toBeInTheDocument();
  });

  it("should dialog be closed while game session", () => {
    const testStore = configureStore({
      reducer: { game: gameReducer },
      preloadedState: {
        game: {
          isStarted: true,
          isSolo: true,
          isGameover: false,
        },
      },
    });

    render(
      <Provider store={testStore}>
        <GameRoom />
      </Provider>
    );

    expect(screen.getByText(/SaveScoreModal is closed/i)).toBeInTheDocument();
  });
});
