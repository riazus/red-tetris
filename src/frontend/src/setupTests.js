import "@testing-library/jest-dom";

const TETROMINOS = ["I", "J", "L", "O", "S", "T", "Z"];

global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

global.matchMedia =
  global.matchMedia ||
  (() => ({
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));

global.random20Tetrominos = () => {
  const res = [];

  for (var i = 0; i < 20; i++) {
    res.push(TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)]);
  }

  return res;
};
