import React, { useEffect, useState } from "react";
import { getSocket } from "../../app/api/api";
import { SOCKETS } from "../../const";
import WaitingRoom from "../WaitingRoom/WaitingRoom";
import MainGameForm from "../MainGameForm/MainGameForm";
import useNavigate from "../../hooks/useNavigate";

function GameRoomForm({ roomName, playerName }) {
  const [socket] = useState(getSocket());
  const [roomPlayers, setRoomPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCurrPlayerAdmin, setIsCurrPlayerAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on(SOCKETS.UPDATE_ROOM_PLAYERS, ({ players }) => {
      setRoomPlayers([...players]);
      setIsCurrPlayerAdmin(
        players.some(
          (player) => player.username === playerName && player.isAdmin
        )
      );
    });

    socket.on(SOCKETS.GAME_STARTED, () => setGameStarted(true));

    socket.emit(SOCKETS.ENTER_ROOM, { roomName });

    return () => {
      socket.off(SOCKETS.UPDATE_ROOM_PLAYERS);
      socket.off(SOCKETS.GAME_STARTED);
    };
  }, []);

  const handleExit = () => {
    socket.emit(SOCKETS.EXIT_ROOM);
    navigate("#rooms");
  };

  return (
    <div>
      <h1>Game Room</h1>
      <h4>Room Name: {roomName}</h4>
      <h4>Player Name: {playerName}</h4>
      <button onClick={handleExit}>Exit from room</button>

      {gameStarted ? (
        <MainGameForm />
      ) : (
        <WaitingRoom players={roomPlayers} isAdmin={isCurrPlayerAdmin} />
      )}
    </div>
  );
}

export default GameRoomForm;
