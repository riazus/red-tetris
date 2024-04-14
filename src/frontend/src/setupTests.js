import "@testing-library/jest-dom";

global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

global.matchMedia =
  global.matchMedia ||
  (() => ({
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
