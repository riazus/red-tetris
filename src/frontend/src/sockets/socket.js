import { Socket, io } from "socket.io-client";
import { API_BASE_URL } from "../const";

let appSocket = Socket | undefined;

export const initializeAppSocket = () => {
  if (!appSocket) {
    appSocket = io(API_BASE_URL, { path: "/socket", autoConnect: false });
  }
  return appSocket;
};

export const connectAppSocket = () => {
  return new Promise((resolve, reject) => {
    if (appSocket && !appSocket.connected) {
      appSocket.connect();

      appSocket.on("connect", () => {
        resolve();
      });

      appSocket.on("connect_error", (error) => {
        reject(error);
      });
    }
    resolve();
  });
};

export const disconnectAppSocket = () => {
  if (appSocket && appSocket.connected) {
    appSocket.disconnect();
  }
};

export const getAppSocket = () => appSocket;

export const emitAppSocketEvent = (event, payload, callback) => {
  const appSocket = getAppSocket();
  if (appSocket && appSocket.connected) {
    appSocket.emit(event, payload, callback);
  }
};
