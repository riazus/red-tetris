import { Player } from "../models/Player";
import { Room, rooms } from "../models/Room";

describe("Room", () => {
  const newRoom = new Room("test_name", false);

  it("should create new Room", () => {
    expect(newRoom).toEqual({
      name: "test_name",
      players: [],
      gameStarted: false,
      gameover: false,
      isSolo: false,
    });

    expect(rooms.length).toEqual(1);
  });

  it("should return undefined for getByName", () => {
    expect(Room.getByName("no-such-name")).toEqual(undefined);
  });

  it("should return valid room for getByName", () => {
    expect(Room.getByName("test_name")).toEqual(newRoom);
  });

  it("should return false for anyByName with invalid name", () => {
    expect(Room.anyByName("no-such-name")).toEqual(false);
  });

  it("should return true for anyByName with valid name", () => {
    expect(Room.anyByName("test_name")).toEqual(true);
  });

  it("should add new player to the room", () => {
    const player = new Player("test", "test");

    newRoom.addPlayer(player);

    expect(newRoom.players.length).toEqual(1);
    expect(newRoom.players).toEqual([player]);
  });

  it("should not remove player with invalid name", () => {
    newRoom.removePlayer("no-such-name");
    expect(newRoom.players.length).toEqual(1);
  });

  it("should remove player with valid name", () => {
    newRoom.removePlayer("test");
    expect(newRoom.players.length).toEqual(0);
  });
});
