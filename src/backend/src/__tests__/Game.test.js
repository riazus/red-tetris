import { Game } from "../models/Game";
import { Player } from "../models/Player";
import { Room, rooms } from "../models/Room";

describe("Game", () => {
  const newGame = new Game("test-game");

  it("should create new Game", () => {
    expect(newGame).toEqual({ name: "test-game" });
  });

  it("should return empty waiting rooms array", () => {
    expect(Game.getWaitingRooms()).toEqual(rooms);
  });

  it("should return waiting rooms array", () => {
    rooms.length = 0;
    const room1 = new Room("room1", false);
    const room2 = new Room("room2", false);
    const room3 = new Room("room3", false);

    expect(Game.getWaitingRooms()).toEqual([room1, room2, room3]);
  });

  it("should return waiting rooms array containing solo room", () => {
    rooms.length = 0;
    const room1 = new Room("room1", false);
    const room3 = new Room("room3", false);
    new Room("room2", true);

    expect(Game.getWaitingRooms()).toEqual([room1, room3]);
  });

  // TODO: Tanya create test for getWaitingRoomNames

  it("should not remove room with invalid name", () => {
    rooms.length = 0;
    new Room("room1", false);
    Game.removeRoom("no-such-roomName");
    expect(rooms.length).toEqual(1);
  });

  it("should remove room with valid name", () => {
    rooms.length = 0;
    new Room("room1", false);
    Game.removeRoom("room1");
    expect(rooms.length).toEqual(0);
  });

  it("should not remove player with invalid socketId and room", () => {
    new Player("testSocketId", "testUsername");
    const room = new Room("testRoomName", false);

    expect(Game.removePlayer("no-such-socketId", room)).toEqual(false);
  });

  it("should remove player with valid socketId and room", () => {
    const room = new Room("testRoomName", false);
    const player = new Player("testSocketId", "testUsername");
    room.addPlayer(player);

    expect(Game.removePlayer("testSocketId", room)).toEqual(true);
  });
});
