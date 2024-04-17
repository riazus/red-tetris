import { random20Tetrominos } from "../helpers/tetrominos";

describe("tetrominos", () => {
  it("should return randomn 20 tetromino", () => {
    const tetrominos = random20Tetrominos();

    expect(tetrominos).not.toBe(undefined);
  });
});
