import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import gameReducer from "../app/slices/gameSlice";
import { TETROMINOS } from "../tetrominos";
import { usePlayer } from "./usePlayer";
import { act } from "react-dom/test-utils";

describe("usePlayer", () => {
  it("should correctly working", () => {
    const testStore = configureStore({
      reducer: { game: gameReducer },
      preloadedState: {
        game: {
          tetrominos: global.random20Tetrominos(),
        },
      },
    });

    const { result } = renderHook(() => usePlayer(), {
      wrapper: ({ children }) => (
        <Provider store={testStore}>{children}</Provider>
      ),
    });

    const [player, updatePlayerPos, resetPlayer, playerRotate] = result.current;

    expect(player).toStrictEqual({
      pos: { x: 0, y: 0 },
      tetromino: TETROMINOS[0].shape,
      ind: 0,
      collided: false,
    });

    act(() => updatePlayerPos({x: 2, y: 3, collided: false}));
    act(() => resetPlayer());
    act(() => playerRotate());
  });
});
