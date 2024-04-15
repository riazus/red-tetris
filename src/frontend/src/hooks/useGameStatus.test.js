import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import playerReducer from "../app/slices/playerSlice";
import { useGameStatus } from "./useGameStatus";

jest.mock("../sockets/socket", () => ({ emitAppSocketEvent: jest.fn() }));

describe("useGameStatus", () => {
  it("should set level", () => {
    const testStore = configureStore({
      reducer: { player: playerReducer },
      preloadedState: {
        player: {
          score: 50,
        },
      },
    });

    const rowsCleared = 0;

    const { result } = renderHook(() => useGameStatus(rowsCleared), {
      wrapper: ({ children }) => (
        <Provider store={testStore}>{children}</Provider>
      ),
    });

    const [rows, , level] = result.current;

    expect(rows).toBe(0);
    expect(level).toBe(0);
  });
});
