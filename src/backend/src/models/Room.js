const rooms = [];

class Room {
  name;
  players;
  gameStarted;
  gameOver;
  isSolo;

  constructor(name, isSolo) {
    this.name = name;
    this.players = [];
    this.gameStarted = false;
    this.gameOver = false;
    this.isSolo = isSolo;
    rooms.push(this);
  }

  addPlayer(player) {
    player.addRoomName(this.name);
    this.players.push(player);
  }

  static create(roomName) {
    if (rooms.some((room) => name === roomName)) {
      return;
    }

    return new Room(roomName);
  }

  static getByName(roomName) {
    return rooms.find((room) => room.name === roomName);
  }

  static anyByName(roomName) {
    return rooms.some((room) => room.name === roomName);
  }
}

module.exports = { rooms, Room };
