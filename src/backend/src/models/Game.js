const { rooms } = require("./Room");

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
}

module.exports = { Game };
