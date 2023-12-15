const { players } = require("./Player");
const { rooms, Room } = require("./Room");

class Game {
  name;

  constructor(name) {
    this.name = name;
  }

  static getWaitingRooms() {
    return rooms.filter(
      (room) => !room.gameStarted && !room.gameover && room.name !== "solo"
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

module.exports = { Game };
