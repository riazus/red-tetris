import { getSocket, setSocket } from "./core";

describe("core", () => {
  it("should return socket", () => {
    const res = getSocket();

    expect(res).toBeUndefined();
  });

  it("should set socket", () => {
    const newSocket = {};
    setSocket(newSocket);
  });
});
