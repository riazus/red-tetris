import { createStage } from "../helpers/tetrominos.js";

const rooms = [];

class Room {
  name;
  players;
  gameStarted;
  gameover;
  isSolo;

  constructor(name, isSolo) {
    this.name = name;
    this.players = [];
    this.gameStarted = false;
    this.gameover = false;
    this.isSolo = isSolo;
    rooms.push(this);
  }

  addPlayer(player) {
    player.addRoomName(this.name);
    this.players.push(player);
  }

  removePlayer(username) {
    this.players = [
      ...this.players.filter((player) => player.username !== username),
    ];
  }

  assignWinner() {
    const playersLeft = this.players.filter((player) => !player.gameover);

    if (playersLeft.length === 1) {
      const index = this.players.findIndex(
        (player) => player.socketId === playersLeft[0].socketId
      );

      this.players[index].isWinner = true;

      return this.players[index];
    }

    return;
  }

  restartGame() {
    const player1 = this.players[0];
    const player2 = this.players[1];

    const winnerSocketId = this.isSolo
      ? player1.socketId
      : player1.score > player2.score
      ? player1.socketId
      : player2.socketId;

    this.players.forEach((player) => {
      player.isWinner = false;
      player.gameover = false;
      player.score = 0;
      player.spectrum = createStage();
      player.isAdmin = player.socketId === winnerSocketId;
    });

    this.gameStarted = false;
    this.gameover = false;
  }

  static getByName(roomName) {
    return rooms.find((room) => room.name === roomName);
  }

  static anyByName(roomName) {
    return rooms.some((room) => room.name === roomName);
  }
}

export { Room, rooms };
