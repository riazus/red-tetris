import { players } from "./Player.js";
import { rooms } from "./Room.js";

class Game {
  name;

  constructor(name) {
    this.name = name;
  }

  static getWaitingRooms() {
    return rooms.filter(
      (room) => !room.gameStarted && !room.gameover && !room.isSolo
    );
  }

  static getWaitingRoomNames() {
    const roomObjects = this.getWaitingRooms();
    return roomObjects?.map((room) => room.name);
  }

  static removeRoom(roomName) {
    const index = rooms.findIndex((room) => room.name === roomName);

    if (index !== -1) {
      rooms.splice(index, 1);
      return true;
    }
    return false;
  }

  // removes player only if he exists in the room
  static removePlayer(socketId, room) {
    const index = room.players.findIndex(
      (player) => player.socketId === socketId
    ); // player's index in room.players[]
    const index2 = players.findIndex((player) => player.socketId === socketId); // player's index in const players[]

    if (index !== -1 && index2 !== -1) {
      room.players.splice(index, 1);
      players.splice(index2, 1);
      return true;
    }

    return false;
  }
}

export { Game };
