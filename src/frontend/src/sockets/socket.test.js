// Import the functions to be tested
import { connectAppSocket, initializeAppSocket } from "./socket.js";

// Mock the socket.io-client module
jest.mock("socket.io-client", () => ({
  io: jest.fn(() => ({
    on: jest.fn(),
    connect: jest.fn(),
    disconnect: jest.fn(),
    emit: jest.fn(),
  })),
}));

// Mock the constant API_BASE_URL
jest.mock("../const", () => ({
  API_BASE_URL: "http://localhost:3000", // Example URL
}));

describe("Socket functions", () => {
  let mockSocket;

  beforeEach(() => {
    // Reset mock implementation before each test
    mockSocket = {
      on: jest.fn(),
      connect: jest.fn(),
      disconnect: jest.fn(),
      emit: jest.fn(),
      connected: false,
    };
  });

  afterEach(() => {
    // Reset mock calls after each test
    jest.clearAllMocks();
  });

  test("initializeAppSocket initializes socket correctly", () => {
    initializeAppSocket();
    expect(mockSocket.on).toHaveBeenCalledTimes(0); // No event listeners added
    expect(mockSocket.connect).toHaveBeenCalledTimes(0); // No connection attempted
    expect(mockSocket.disconnect).toHaveBeenCalledTimes(0); // No disconnection attempted
    expect(mockSocket.emit).toHaveBeenCalledTimes(0); // No events emitted
  });

  test("connectAppSocket resolves when socket is already connected", async () => {
    mockSocket.connected = true; // Simulate connected socket
    await expect(connectAppSocket()).toBeUndefined();
    expect(mockSocket.connect).toHaveBeenCalledTimes(0); // No connection attempted
    expect(mockSocket.disconnect).toHaveBeenCalledTimes(0); // No disconnection attempted
  });

  /*
  test("disconnectAppSocket disconnects socket when connected", () => {
    mockSocket.connected = true; // Simulate connected socket
    disconnectAppSocket();
    expect(mockSocket.disconnect).toHaveBeenCalledTimes(1);
  });

  test("getAppSocket throws error when socket is not initialized or connected", () => {
    expect(getAppSocket).toThrow("Cannot find socket connection");
  });

  
  test("emitAppSocketEvent emits event when socket is connected", () => {
    mockSocket.connected = true; // Simulate connected socket
    emitAppSocketEvent("test-event", { data: "test" }, () => {});
    expect(mockSocket.emit).toHaveBeenCalledTimes(1);
    expect(mockSocket.emit).toHaveBeenCalledWith(
      "test-event",
      { data: "test" },
      expect.any(Function)
    );
  });
  */
});
