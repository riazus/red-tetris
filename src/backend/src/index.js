const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const { initDB, User } = require("./database.js");

const PORT = process.env.BACKEND_PORT || 5000;

const app = express();
const server = http.createServer(app);
let rooms = [];
let players = [];

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization"],
  },
  path: "/socket",
});

app.use(cors());
app.use(express.json());

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.send([users]);
});

app.post("/users", async (req, res) => {
  const { username, score } = req.body;
  await User.create({ username, score });
  res.statusCode = 201;
  return res;
});

server.listen(PORT, async () => {
  await initDB();
  console.log(`Server is running on port ${PORT}`);
});
