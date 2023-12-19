//import { Room } from "./Room";

const players = [];

class Player {
  socketId;
  username;
  roomName;
  isAdmin;
  gameover;
  isWinner;
  score;
  // TODO:
  specter;

  constructor(socketId, username) {
    this.socketId = socketId;
    this.username = username;
    this.score = 0;
    this.isAdmin = false;
    this.gameover = false;
    this.isWinner = false;
    this.roomName = "";
    // TODO:
    this.specter = "";
    players.push(this);

    return this;
  }

  addRoomName(roomName) {
    this.roomName = roomName;
    return this;
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

export { players, Player };
