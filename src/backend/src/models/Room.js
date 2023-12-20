import { players } from "./Player.js";

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
        (player) => player.id === playersLeft[0].id
      );
      const index2 = this.players.findIndex(
        (player) => player.id === playersLeft[0].id
      );

      this.players[index].isWinner = true;

      console.log(this.players[index].isWinner, players[index2].isWinner);

      return this.players[index];
    }

    return;
  }

  restartGame() {
    const winner = [...this.players].sort((a, b) => b.score - a.score)[0];

    this.players.forEach((player) => {
      player.isWinner = false;
      player.gameover = false;
      // TODO:
      player.specter = "";
      player.isAdmin = player.socketId === winner.socketId;
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

export { rooms, Room };
