import { io } from "socket.io-client";
import { API_BASE_URL } from "../const";

let appSocket;

export const initializeAppSocket = () => {
  if (!appSocket) {
    appSocket = io(API_BASE_URL, { path: "/socket", autoConnect: false });
  }
  return appSocket;
};

export const connectAppSocket = () => {
  return new Promise((resolve, reject) => {
    if (appSocket && !appSocket.connected) {
      appSocket.on("connect", () => {
        resolve();
      });

      appSocket.on("connect_error", (error) => {
        reject(error);
      });

      appSocket.connect();
    }

    resolve();
  });
};

export const disconnectAppSocket = () => {
  if (appSocket && appSocket.connected) {
    appSocket.disconnect();
  }
};

export const getAppSocket = () => {
  if (!appSocket || !appSocket.connected) {
    throw new Error("Cannot find socket connection");
  }

  return appSocket;
};

export const emitAppSocketEvent = (event, payload, callback) => {
  const appSocket = getAppSocket();
  if (appSocket && appSocket.connected) {
    appSocket.emit(event, payload, callback);
  }
};
