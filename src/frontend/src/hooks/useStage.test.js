import { renderHook } from "@testing-library/react";
import { createStage } from "../gameHelpers";
import { emitAppSocketEvent } from "../sockets/socket";
import { TETROMINOS } from "../tetrominos";
import { useStage } from "./useStage";

jest.mock("../sockets/socket", () => {
  return { emitAppSocketEvent: jest.fn() };
});

describe("useStage", () => {
  it("should work as expected", () => {
    const player = {
      pos: { x: 0, y: 0 },
      tetromino: TETROMINOS[0].shape,
      ind: 0,
      collided: false,
    };

    const resetPlayer = jest.fn();

    const { result } = renderHook(() => useStage(player, resetPlayer));

    const [stage, , rowsCleared] = result.current;

    expect(stage).toStrictEqual(createStage());
    expect(rowsCleared).toBe(0);
  });

  it("should change values while collided", () => {
    const player = {
      pos: { x: 0, y: 0 },
      tetromino: TETROMINOS[0].shape,
      ind: 0,
      collided: false,
    };

    const resetPlayer = jest.fn();

    const { result, rerender } = renderHook(() =>
      useStage(player, resetPlayer)
    );

    const [stage, , rowsCleared] = result.current;

    expect(stage).toStrictEqual(createStage());
    expect(rowsCleared).toBe(0);

    player.collided = true;
    rerender({ player, resetPlayer });
    expect(resetPlayer).toBeCalled();
    expect(emitAppSocketEvent).toBeCalled();
  });

  it("should change values while updated pos", () => {
    const player = {
      pos: { x: 0, y: 0 },
      tetromino: TETROMINOS[0].shape,
      ind: 0,
      collided: false,
    };

    const resetPlayer = jest.fn();

    const { result, rerender } = renderHook(() =>
      useStage(player, resetPlayer)
    );

    const [stage, , rowsCleared] = result.current;

    expect(stage).toStrictEqual(createStage());
    expect(rowsCleared).toBe(0);

    player.pos = { x: 3, y: 1 };
    rerender({ player, resetPlayer });
  });
});
