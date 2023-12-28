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
    let winner;

    if (this.players.length > 1) {
      const winners = [...this.players]
        .sort((a, b) => b.score - a.score)
        .slice(0, 2);
      winner = !winners[0].isAdmin ? winners[0] : winners[1];
    } else {
      winner = this.players[0];
    }

    this.players.forEach((player) => {
      player.isWinner = false;
      player.gameover = false;
      player.score = 0;
      // TODO:
      player.spectrum = "";
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
