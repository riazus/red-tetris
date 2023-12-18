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
  socket.on(SOCKETS.ENTER_ROOM, ({ username, roomName }) => {
    const player = Player.getByName(username);
    const room = Room.getByName(roomName);
    if (!enterRoomArgsValid(room, player)) return;

    room.addPlayer(player);
    if (room.players.length === 1) player.isAdmin = true;

    socket.join(room.name);
    console.log(
      `Player ${username} with socket ${socket.id} joined ${room.name} room`
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
  socket.on(SOCKETS.EXIT_ROOM, ({ username, roomName }) => {
    const player = Player.getByName(username);
    const room = Room.getByName(roomName);

    if (!exitRoomArgsValid(room, player)) return;

    console.log("On player", player.username, "leave room:", room.name);

    room.removePlayer(username);

    if (player.isAdmin) {
      player.isAdmin = false;
    }

    socket.leave(room.name);

    if (room.players.length === 0) {
      Game.removeRoom(roomName);
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
  socket.on(SOCKETS.START_GAME, ({ username, roomName }) => {
    const player = Player.getByName(username);
    const room = Room.getByName(roomName);

    if (!startGameArgsValid(room, player)) return;

    room.gameStarted = true;

    // Send to the players that game started
    io.to(room.name).emit(SOCKETS.GAME_STARTED);
  });

  /**
   * Restart game
   */
  socket.on(SOCKETS.RESTART_GAME, ({ roomName }) => {});

  /**
   * End game
   */
  socket.on(SOCKETS.END_GAME, ({ roomName }) => {});

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
