import cors from "cors";
import express, { json } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { SOCKETS } from "./const.js";
import { initDB, Leaderboard } from "./database.js";
import {
  addLeaderArgsValid,
  createRoomArgsValid,
  enterRoomArgsValid,
  exitRoomArgsValid,
  gameoverArgsValid,
  restartGameArgsValid,
  updateScoreArgsValid,
  updateSpectrumArgsValid,
} from "./helpers/socketValidators.js";
import { createStage, random20Tetrominos } from "./helpers/tetrominos.js";
import { Game } from "./models/Game.js";
import { Player, players } from "./models/Player.js";
import { Room } from "./models/Room.js";

const PORT = process.env.BACKEND_PORT || 5000;

const app = express();
const server = createServer(app);

app.use(cors());
app.use(json());

app.get("/rooms", (_, res) => {
  res.send(Game.getWaitingRoomNames());
});

app.get("/leaderboard", async (_, res) => {
  const users = await Leaderboard.findAll();
  res.send(users);
});

app.post("/leaderboard", async (req, res) => {
  const { username, score } = req.body;

  const findUser = await Leaderboard.findOne({ where: { username } });

  if (findUser && findUser.score < score) {
    //res.status(400).send({ message: "Player with this name already exists" });
    await Leaderboard.update({ score }, { where: { username } });
  } else {
    await Leaderboard.create({ username, score });
  }

  res.sendStatus(201);
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  path: "/socket",
});

const playerExit = (room, player, wasAdmin) => {
  if (room.players.length === 0) {
    Game.removeRoom(room.name);
    io.emit(SOCKETS.DELETE_WAITING_ROOM, { name: room.name });
  } else if (room.gameStarted) {
    if (wasAdmin) {
      room.players[0].isAdmin = true;
      io.to(room.players[0].socketId).emit(SOCKETS.SET_ADMIN_STATUS);
    }

    if (!room.gameover) {
      room.gameover =
        room.players.filter((player) => !player.gameover).length < 2;
      if (room.gameover) {
        const winner = room.assignWinner();
        io.to(winner.socketId).emit(SOCKETS.ASSIGN_WINNER);
        io.to(room.name).emit(SOCKETS.GAMEOVER);
        console.log(`Game ${room.name} finished!`);
      }
    }

    io.to(room.name).emit(SOCKETS.DELETE_ROOM_PLAYER, {
      username: player.username,
    });
  } else {
    if (wasAdmin) {
      room.players[0].isAdmin = true;
      io.to(room.players[0].socketId).emit(SOCKETS.SET_ADMIN_STATUS);
    }
    io.to(room.name).emit(SOCKETS.DELETE_ROOM_PLAYER, {
      username: player.username,
    });
  }
};

io.on("connection", async (socket) => {
  console.log(`On client with socket id ${socket.id} connected`);

  /**
   * Create user
   */
  socket.on(SOCKETS.CREATE_USER, async ({ username }, callback) => {
    const existsInLocal = players.some(
      (player) => player.username === username
    );
    const existsInDB = await Leaderboard.findOne({ where: { username } });

    const isUsernameValid = !existsInLocal && !existsInDB;

    if (isUsernameValid) {
      console.log(
        "Create new player with username",
        username,
        "and socket",
        socket.id
      );
      new Player(socket.id, username);
    }

    callback({ isUsernameValid });
  });

  /**
   * Create new room
   */
  socket.on(SOCKETS.CREATE_ROOM, ({ roomName, isSolo }, callback) => {
    const { valid, message } = createRoomArgsValid(socket, roomName);

    if (valid) {
      const { name } = new Room(roomName, isSolo);
      if (isSolo) socket.emit(SOCKETS.ADD_WAITING_ROOM, { name, isSolo });
      else io.emit(SOCKETS.ADD_WAITING_ROOM, { name, isSolo });
    }

    callback({ valid, message });
  });

  /**
   * Enter to the room
   */
  socket.on(SOCKETS.ENTER_ROOM, ({ roomName }) => {
    const player = Player.getBySocketId(socket.id);
    const room = Room.getByName(roomName);
    if (!enterRoomArgsValid(room, player)) return;

    room.addPlayer(player);
    if (room.players.length === 1) player.isAdmin = true;

    socket.join(room.name);
    console.log(
      `Player ${player.username} with socket ${socket.id} joined ${room.name} room`
    );

    socket.emit(SOCKETS.ENTER_ROOM, {
      isAdmin: player.isAdmin,
      roomName: room.name,
      isSolo: room.isSolo,
      roomPlayers: room.players.filter((p) => p.username !== player.username),
    });

    // Send players and room info when new player joins
    socket.broadcast.to(room.name).emit(SOCKETS.ADD_ROOM_PLAYER, { player });

    if (room.isSolo || room.players.length == 2) {
      room.gameStarted = true;
      console.log(`In the room ${room.name} game started!`);

      io.emit(SOCKETS.DELETE_WAITING_ROOM, { name: room.name });

      // Send to the players that game started
      io.to(room.name).emit(SOCKETS.GAME_STARTED, random20Tetrominos());
    }
  });

  /**
   * Exit from room
   */
  socket.on(SOCKETS.EXIT_ROOM, () => {
    const player = Player.getBySocketId(socket.id);
    const room = Room.getByName(player?.roomName);
    const wasAdmin = player.isAdmin;

    if (!exitRoomArgsValid(room, player)) return;

    console.log("On player", player.username, "leave room:", room.name);

    room.removePlayer(player.username);
    player.roomName = "";
    player.score = 0;
    player.spectrum = createStage();
    player.gameover = false;
    player.isWinner = false;

    if (player.isAdmin) {
      player.isAdmin = false;
    }

    socket.leave(room.name);
    playerExit(room, player, wasAdmin);
  });

  /**
   * Gameover for player
   */
  socket.on(SOCKETS.PLAYER_GAMEOVER, () => {
    const player = Player.getBySocketId(socket.id);
    const room = Room.getByName(player.roomName);

    if (!gameoverArgsValid(room, player)) return;

    player.gameover = true;
    room.gameover =
      room.players.filter((player) => !player.gameover).length < 2;

    socket
      .to(room.name)
      .emit(SOCKETS.PLAYER_GAMEOVER, { username: player.username });

    if (room.gameover) {
      const winner = room.players.length === 1 ? player : room.assignWinner();
      io.to(winner.socketId).emit(SOCKETS.ASSIGN_WINNER);
      io.to(room.name).emit(SOCKETS.GAMEOVER);
      console.log(`Game ${room.name} finished!`);
    }
  });

  /**
   * Restart the game
   */
  socket.on(SOCKETS.RESTART_GAME, () => {
    const player = Player.getBySocketId(socket.id);
    const room = Room.getByName(player.roomName);

    if (!restartGameArgsValid(room, player)) return;

    room.restartGame();

    room.players.forEach((p) => {
      io.to(p.socketId).emit(SOCKETS.RESTART_GAME, {
        isAdmin: p.isAdmin,
        players: room.players.filter((el) => el.socketId !== p.socketId),
      });
    });

    room.gameStarted = true;
    console.log(`In the room ${room.name} game started!`);

    // Send to the players that game started
    io.to(room.name).emit(SOCKETS.GAME_STARTED, random20Tetrominos());
  });

  /**
   * Update spectrum
   */
  socket.on(SOCKETS.UPDATE_SPECTRUM, ({ spectrum }) => {
    const player = Player.getBySocketId(socket.id);
    const room = Room.getByName(player.roomName);

    if (!updateSpectrumArgsValid(room, player, spectrum)) return;

    player.spectrum = spectrum;

    socket.broadcast
      .to(room.name)
      .emit(SOCKETS.UPDATE_SPECTRUM, { username: player.username, spectrum });
  });

  /**
   * Update score
   */
  socket.on(SOCKETS.UPDATE_SCORE, ({ score }, callback) => {
    const player = Player.getBySocketId(socket.id);
    const room = Room.getByName(player.roomName);

    if (!updateScoreArgsValid(room, player, score)) return;

    player.score = score;

    callback({ score });

    socket.broadcast
      .to(room.name)
      .emit(SOCKETS.UPDATE_SCORE, { username: player.username, score });
  });

  /**
   * Add player to leaderboard
   */
  socket.on(SOCKETS.ADD_LEADER, async ({ score }) => {
    const player = Player.getBySocketId(socket.id);
    const room = Room.getByName(player.roomName);

    if (!addLeaderArgsValid(room, player, score)) return;

    const username = player.username;

    // Check player in db
    const findUser = await Leaderboard.findOne({
      where: { username },
    });

    if (findUser && findUser.score < score) {
      await Leaderboard.update({ score }, { where: { username } });
    } else {
      await Leaderboard.create({ username, score });
    }

    io.emit(SOCKETS.ADD_LEADER, { username, score });
  });

  socket.on("disconnect", () => {
    console.log(`On client with socket id ${socket.id} disconnected`);

    const player = Player.getBySocketId(socket.id);
    if (!player) return;

    const room = Room.getByName(player.roomName);
    if (!room) {
      Player.deletePlayer(player.socketId);
    } else {
      const wasAdmin = player.isAdmin;
      socket.leave(room.name);
      Game.removePlayer(player.socketId, room);
      playerExit(room, player, wasAdmin);
    }

    console.log("On player", player.username, "leave game");
  });
});

server.listen(PORT, async () => {
  await initDB();
  console.log(`Server is running on port ${PORT}`);
});
