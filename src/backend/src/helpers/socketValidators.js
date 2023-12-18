import { players } from "../models/Player.js";
import { rooms, Room } from "../models/Room.js";

const createRoomArgsValid = (socket, roomName) => {
  let valid = false;
  let message = "";

  if (!players.some((player) => player.socketId === socket.id)) {
    message = "Seems you not chose the username, please refresh the page";
  } else if (Room.anyByName(roomName)) {
    message = "This room name already in use";
  } else if (playerAlreadyInRoom(socket.id)) {
    message =
      "This user cannot create new room, cause he is already in room. " +
      "First leave from room";
  } else {
    valid = true;
  }

  return { valid, message };
};

const exitRoomArgsValid = (room, player) => {
  return (
    player &&
    room &&
    // player must be in provided room
    room.players.some((item) => item.username === player.username)
  );
};

const enterRoomArgsValid = (room, player) => {
  if (!player || !room) {
    return false;
  }

  if (playerAlreadyInRoom(player.socketId)) {
    return false;
  }

  if (room.isSolo) {
    // Room must be solo, and there should be exactly one player
    return room.players.length === 0;
  }

  return true;
};

const startGameArgsValid = (room, player) => {
  if (!room || !player) return false;
  if (!player.isAdmin) return false;

  return true;
};

const playerAlreadyInRoom = (socketId) => {
  return rooms.some((room) =>
    room.players.some((player) => player.socketId === socketId)
  );
};

export {
  createRoomArgsValid,
  enterRoomArgsValid,
  exitRoomArgsValid,
  startGameArgsValid,
};
