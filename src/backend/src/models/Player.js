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
}

module.exports = { players, Player };
