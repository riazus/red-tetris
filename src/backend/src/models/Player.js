const players = [];

class Player {
  socketId;
  username;
  roomName;
  isAdmin;
  score;

  constructor(socketId, username) {
    this.socketId = socketId;
    this.username = username;
    this.score = 0;
    this.isAdmin = false;
    this.roomName = "";
    players.push(this);

    return this;
  }

  addRoomName(roomName) {
    this.roomName = roomName;
  }

  static getByName(username) {
    return players.find((player) => player.username === username);
  }

  static getBySocketId(socketId) {
    return players.find((player) => player.socketId === socketId);
  }

  static deletePlayer(socketId) {
    const index = players.findIndex((player) => player.socketId === socketId);

    if (index !== -1) {
      players.splice(index, 1);
      return true;
    }

    return false;
  }
}

module.exports = { players, Player };
