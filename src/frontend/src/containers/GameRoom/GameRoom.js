import { useEffect, useState } from "react";
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
  const [isWinner, setIsWinner] = useState(false);
  const [restartBtnEnable, setRestartBtnEnable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on(SOCKETS.UPDATE_ROOM_PLAYERS, ({ players }) => {
      updateCurrentPlayers([...players]);
    });

    socket.on(SOCKETS.GAME_STARTED, () => setGameStarted(true));

    socket.on(SOCKETS.RESTART_GAME, () => {
      setGameStarted(false);
      setRestartBtnEnable(false);
    });

    socket.emit(SOCKETS.ENTER_ROOM, { roomName });

    return () => {
      socket.off(SOCKETS.UPDATE_ROOM_PLAYERS);
      socket.off(SOCKETS.GAME_STARTED);
      socket.off(SOCKETS.RESTART_GAME);
    };
  }, []);

  const updateCurrentPlayers = (players) => {
    setRoomPlayers(players);
    setIsCurrPlayerAdmin(
      players.some((player) => player.username === playerName && player.isAdmin)
    );
    setIsWinner(
      players.some(
        (player) => player.username === playerName && player.isWinner
      )
    );
  };

  const launchGame = () => {
    socket.emit(SOCKETS.START_GAME);
  };

  const handleExit = () => {
    socket.emit(SOCKETS.EXIT_ROOM);
    navigate("#rooms");
  };

  const restartGame = () => {
    setRestartBtnEnable(false);
    socket.emit(SOCKETS.RESTART_GAME);
  };

  return (
    <div>
      <h1>Game Room</h1>
      <h4>Room Name: {roomName}</h4>
      <h4>Player Name: {playerName}</h4>
      {isWinner && <h5>Congrats you're winner!</h5>}
      <button onClick={handleExit}>Exit from room</button>
      {restartBtnEnable && isCurrPlayerAdmin && (
        <button onClick={restartGame}>Restart Game</button>
      )}

      {gameStarted ? (
        <MainGameForm
          playerName={playerName}
          socket={socket}
          players={roomPlayers}
          updateCurrentPlayers={updateCurrentPlayers}
          setPlayers={setRoomPlayers}
          setRestartBtnEnable={setRestartBtnEnable}
        />
      ) : (
        <WaitingRoom
          players={roomPlayers}
          isAdmin={isCurrPlayerAdmin}
          launchGame={launchGame}
        />
      )}
    </div>
  );
}

export default GameRoomForm;
