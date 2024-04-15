// Import the functions to be tested
import { io } from "socket.io-client";
import { API_BASE_URL } from "../const.js";
import { getSocket } from "./core.js";
import {
  connectAppSocket,
  disconnectAppSocket,
  emitAppSocketEvent,
  getAppSocket,
  initializeAppSocket,
} from "./socket.js";

// Mock the socket.io-client module
jest.mock("socket.io-client", () => ({
  io: jest.fn(),
}));

// Mock the constant API_BASE_URL
jest.mock("../const", () => ({
  API_BASE_URL: "http://localhost:3000", // Example URL
}));

jest.mock("./core", () => ({
  getSocket: jest.fn(),
  setSocket: jest.fn(),
}));

describe("Socket functions", () => {
  beforeEach(() => {
    io.mockImplementation(() => () => ({
      on: jest.fn(),
      connect: jest.fn(),
      disconnect: jest.fn(),
      emit: jest.fn(),
      connected: false,
    }));
  });

  it("initializeAppSocket initializes socket correctly", () => {
    initializeAppSocket();

    expect(io).toHaveBeenCalledWith(API_BASE_URL, {
      path: "/socket",
      autoConnect: false,
    });
  });

  it("connectAppSocket resolves when socket is already connected", async () => {
    const on = jest.fn();
    on.mockImplementation((event, cb) => cb());
    const connect = jest.fn();
    getSocket.mockImplementation(() => ({
      connected: false,
      on,
      connect,
    }));

    await connectAppSocket();
    expect(connect).toHaveBeenCalled();
  });

  it("disconnectAppSocket disconnects socket when connected", () => {
    const disconnect = jest.fn();
    getSocket.mockImplementation(() => ({ connected: true, disconnect }));

    disconnectAppSocket();
    expect(disconnect).toHaveBeenCalled();
  });

  it("getAppSocket throws error when socket is not initialized or connected", () => {
    expect(getAppSocket).toThrow("Cannot find socket connection");
  });

  it("getAppSocket returns socket when initialized and connected", () => {
    const mockSocket = { connected: true };
    getSocket.mockImplementation(() => mockSocket);
    expect(getAppSocket).toBe(getAppSocket);
  });

  it("emitAppSocketEvent emits event when socket is connected", () => {
    const event = "test-event";
    const payload = "payload";
    const callback = jest.fn();
    const emit = jest.fn();
    getSocket.mockImplementation(() => ({ connected: true, emit }));

    emitAppSocketEvent(event, payload, callback);
    expect(emit).toHaveBeenCalled();
  });
});
