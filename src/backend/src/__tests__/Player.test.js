import { Player } from "../models/Player";

describe("Player", () => {
  const newPlayer = new Player("test_socket_id", "test_username");

  it("should create new Player", () => {
    expect(newPlayer).toEqual({
      socketId: "test_socket_id",
      username: "test_username",
      roomName: "",
      score: 0,
      isAdmin: false,
    });
  });

  it("should return undefined for getByName", () => {
    expect(Player.getByName("no-such-username")).toEqual(undefined);
  });

  it("should return valid player for getByName", () => {
    expect(Player.getByName("test_username")).toEqual(newPlayer);
  });

  it("should return undefined for getBySocketId", () => {
    expect(Player.getBySocketId("no-such-socket-id")).toEqual(undefined);
  });

  it("should return valid player for getBySocketId", () => {
    expect(Player.getBySocketId("test_socket_id")).toEqual(newPlayer);
  });

  it("should add roomName to player", () => {
    expect(newPlayer.addRoomName("room-name")).toEqual({...newPlayer, roomName: "room-name"});
  })

  it("should return false for deletePlayer with invalid socketId", () => {
    expect(Player.deletePlayer("no-such-socket-id")).toEqual(false);
  })

  it("should return true for deletePlayer with valid socketId", () => {
    expect(Player.deletePlayer("test_socket_id")).toEqual(true);
  })
});
