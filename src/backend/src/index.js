const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const { initDB, Leaderboard } = require("./database.js");
const { SOCKETS } = require("./const.js");
const { Player, players } = require("./models/Player.js");
const { Room, rooms } = require("./models/Room.js");
const { Game } = require("./models/Game.js");

const PORT = process.env.BACKEND_PORT || 5000;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get("/rooms", (req, res) => {
  res.send(rooms.filter((room) => !room.isSolo));
});

app.get("/leaderboard", async (req, res) => {
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

const io = socketio(server, {
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

const exitRoomArgsValid = (room, player) => {
  return (
    player &&
    room &&
    room.players.some((item) => item.username === player.username) // player must be in room
  );
};

const enterRoomArgsValid = (room, player) => {
  if (!player || !room) {
    return false;
  }

  const isPlayerAlreadyInRoom = room.players.some(
    (item) => item.username === player.username
  );

  if (isPlayerAlreadyInRoom) {
    // Player must not be in the room
    return false;
  }

  if (room.isSolo) {
    // Room must be solo, and there should be exactly one player
    return room.players.length === 0;
  }

  return true;
};

const errorHandler = (socket, message) => {
  socket.emit(SOCKETS.ON_ERROR, { message });
};

io.on("connection", async (socket) => {
  socket.use((packet, next) => {
    next();
  });

  /**
   * Create user
   */
  socket.on(SOCKETS.CREATE_USER, ({ username }) => {
    const isUsernameInvalid = players.some(
      (player) => player.username === username
    );

    if (!isUsernameInvalid) {
      console.log("Create new player with username", username);
      new Player(socket.id, username);
    }

    socket.emit(SOCKETS.CREATE_USER_RESPONSE, { isUsernameInvalid });
  });

  /**
   * Create new room
   */
  socket.on(SOCKETS.CREATE_ROOM, ({ roomName, isSolo }) => {
    if (!players.some((player) => player.socketId === socket.id)) {
      errorHandler(
        socket,
        "Seems you not chose the username, please refresh the page"
      );
      return;
    }

    if (Room.anyByName(roomName)) {
      sendResponseAfterCreateRoom(
        socket,
        false,
        "This room name already in use"
      );
    } else {
      new Room(roomName, isSolo);
      updateWaitingRooms(socket);
      sendResponseAfterCreateRoom(socket, true);
    }
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
    console.log("Player joined to the room", player.username);

    socket.join(room.name);
    console.log(`Socket ${socket.id} joined ${room.name}`);

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

    room.players = [
      ...room.players.filter((player) => player.username !== username),
    ];

    if (player.isAdmin) {
      player.isAdmin = false;
    }

    socket.leave(room.name);

    if (room.players.length === 0) {
      Game.removeRoom(roomName);
    } else {
      room.players[0].isAdmin = true;
      // Send players and room info when new player joins
      io.to(room.name).emit(SOCKETS.UPDATE_ROOM_PLAYERS, {
        room: room.name,
        players: room.players,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client Disconnected", socket.handshake.headers.host);
  });
});

server.listen(PORT, async () => {
  await initDB();
  console.log(`Server is running on port ${PORT}`);
});
