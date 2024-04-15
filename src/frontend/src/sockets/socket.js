import { io } from "socket.io-client";
import { API_BASE_URL } from "../const";
import { getSocket, setSocket } from "./core";

// export let appSocket;

export const initializeAppSocket = () => {
  const socket = getSocket();
  if (!socket) {
    const newSocket = io(API_BASE_URL, { path: "/socket", autoConnect: false });
    setSocket(newSocket);
    return newSocket;
  }
};

export const connectAppSocket = () => {
  return new Promise((resolve, reject) => {
    const appSocket = getSocket();
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
  const appSocket = getSocket();
  if (appSocket && appSocket.connected) {
    appSocket.disconnect();
  }
};

export const getAppSocket = () => {
  const appSocket = getSocket();
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
