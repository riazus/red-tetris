import "@testing-library/jest-dom";

jest.mock("./sockets/socket.js", () => {
  const socket = {
    on: jest.fn(),
    emit: jest.fn(),
    connected: true,
  };

  const initializeAppSocket = jest.fn(() => socket);
  const getAppSocket = jest.fn(() => socket);
  const connectAppSocket = jest.fn();
  const disconnectAppSocket = jest.fn();
  const emitAppSocketEvent = jest.fn();

  return {
    initializeAppSocket,
    getAppSocket,
    connectAppSocket,
    emitAppSocketEvent,
    disconnectAppSocket
  };
});
