import express, { json } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { initDB, Leaderboard } from "./database.js";
import { SOCKETS } from "./const.js";
import { Player, players } from "./models/Player.js";
import { Room, rooms } from "./models/Room.js";
import { Game } from "./models/Game.js";
import {
  createRoomArgsValid,
  enterRoomArgsValid,
  exitRoomArgsValid,
  gameoverArgsValid,
  restartGameArgsValid,
  startGameArgsValid,
  updateScoreArgsValid,
  updateSpecterArgsValid,
} from "./helpers/socketValidators.js";

const PORT = process.env.BACKEND_PORT || 5000;

const app = express();
const server = createServer(app);

app.use(cors());
app.use(json());

app.get("/rooms", (_, res) => {
  res.send(rooms.filter((room) => !room.isSolo));
});

app.get("/leaderboard", async (_, res) => {
  const users = await Leaderboard.findAll();
  res.send(users);
});

app.post("/leaderboard", async (req, res) => {
  const { username, score } = req.body;

  const findUser = await Leaderboard.findOne({ where: { username } });

  if (findUser) {
    res.status(400).send({ message: "Player with this name already exists" });
  } else {
    await Leaderboard.create({ username, score });
    res.sendStatus(201);
  }
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  path: "/socket",
});

const updateWaitingRooms = (socket) => {
  const roomNames = Game.getWaitingRoomNames();
  socket.broadcast.emit(SOCKETS.UPDATE_WAITING_ROOMS, roomNames);
};

const sendResponseAfterCreateRoom = (socket, isSucces, message) => {
  socket.emit(SOCKETS.CREATE_ROOM_RESPONSE, { isSucces, message });
};

io.on("connection", async (socket) => {
  /**
   * Create user
   */
  socket.on(SOCKETS.CREATE_USER, ({ username }) => {
    const isUsernameInvalid = players.some(
      (player) => player.username === username
    );

    if (!isUsernameInvalid) {
      console.log(
        "Create new player with username",
        username,
        "and socket",
        socket.id
      );
      new Player(socket.id, username);
    }

    socket.emit(SOCKETS.CREATE_USER_RESPONSE, { isUsernameInvalid });
  });

  /**
   * Create new room
   */
  socket.on(SOCKETS.CREATE_ROOM, ({ roomName, isSolo }) => {
    const { valid, message } = createRoomArgsValid(socket, roomName);

    if (valid) {
      new Room(roomName, isSolo);
      updateWaitingRooms(socket);
    }

    sendResponseAfterCreateRoom(socket, valid, message);
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

    // Send players and room info when new player joins
    io.to(room.name).emit(SOCKETS.UPDATE_ROOM_PLAYERS, {
      room: room.name,
      players: room.players,
    });
  });

  /**
   * Exit from room
   */
  socket.on(SOCKETS.EXIT_ROOM, () => {
    const player = Player.getBySocketId(socket.id);
    const room = Room.getByName(player.roomName);

    if (!exitRoomArgsValid(room, player)) return;

    console.log("On player", player.username, "leave room:", room.name);

    room.removePlayer(player.username);

    if (player.isAdmin) {
      player.isAdmin = false;
    }

    socket.leave(room.name);

    if (room.players.length === 0) {
      Game.removeRoom(room.name);
    } else {
      room.players[0].isAdmin = true;
      // Send players and room info when player left
      io.to(room.name).emit(SOCKETS.UPDATE_ROOM_PLAYERS, {
        room: room.name,
        players: room.players,
      });
    }
  });

  /**
   * Start game
   */
  socket.on(SOCKETS.START_GAME, () => {
    const player = Player.getBySocketId(socket.id);
    const room = Room.getByName(player.roomName);

    if (!startGameArgsValid(room, player)) return;

    room.gameStarted = true;
    console.log(`In the room ${room.name} game started!`);
    // Send to the players that game started
    // TODO: Send to the player some stack of pieces
    io.to(room.name).emit(SOCKETS.GAME_STARTED);
  });

  /**
   * Gameover for player
   */
  socket.on(SOCKETS.GAMEOVER, () => {
    const player = Player.getBySocketId(socket.id);
    const room = Room.getByName(player.roomName);

    if (!gameoverArgsValid(room, player)) return;

    player.gameover = true;
    room.gameover =
      room.players.filter((player) => !player.gameover).length < 2;

    if (room.gameover) {
      room.assignWinner();
      console.log(`Game ${room.name} finished!`);
    }

    io.to(room.name).emit(SOCKETS.GAMEOVER, {
      players: room.players,
      endGame: room.gameover,
    });
  });

  /**
   * Restart the game
   */
  socket.on(SOCKETS.RESTART_GAME, () => {
    const player = Player.getBySocketId(socket.id);
    const room = Room.getByName(player.roomName);

    if (!restartGameArgsValid(room, player)) return;

    room.restartGame();
    updateWaitingRooms(socket);

    io.to(room.name).emit(SOCKETS.RESTART_GAME);
  });

  /**
   * Update specter
   */
  socket.on(SOCKETS.UPDATE_SPECTER, ({ specter }) => {
    const player = Player.getBySocketId(socket.id);
    const room = Room.getByName(player.roomName);

    if (!updateSpecterArgsValid(room, player, specter)) return;

    player.specter = specter;

    socket.broadcast
      .to(room.name)
      .emit(SOCKETS.UPDATE_SPECTER, { username: player.username, specter });
  });

  /**
   * Update score
   */
  socket.on(SOCKETS.UPDATE_SCORE, ({ score }) => {
    const player = Player.getBySocketId(socket.id);
    const room = Room.getByName(player.roomName);

    if (!updateScoreArgsValid(room, player, score)) return;

    player.score = score;
    console.log(
      players[players.findIndex((player) => player.socketId === socket.id)]
        .score
    );

    socket.broadcast
      .to(room.name)
      .emit(SOCKETS.UPDATE_SCORE, { username: player.username, score });
  });

  socket.on("disconnect", () => {
    const player = Player.getBySocketId(socket.id);
    if (!player) return;

    const room = Room.getByName(player.roomName);
    if (!room) {
      Player.deletePlayer(player.socketId);
    } else {
      socket.leave(room.name);
      Game.removePlayer(player.socketId, room);

      if (room.players.length === 0) {
        Game.removeRoom(room.name);
      } else {
        room.players[0].isAdmin = true;
        // Send players and room info when player left
        io.to(room.name).emit(SOCKETS.UPDATE_ROOM_PLAYERS, {
          room: room.name,
          players: room.players,
        });
      }
    }

    console.log("On player", player.username, "leave game");
  });
});

server.listen(PORT, async () => {
  await initDB();
  console.log(`Server is running on port ${PORT}`);
});
