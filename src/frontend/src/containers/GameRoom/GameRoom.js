import { useEffect } from "react";
import { SOCKETS } from "../../const";
import WaitingRoom from "../WaitingRoom/WaitingRoom";
import MainGameForm from "../MainGameForm/MainGameForm";
import useNavigate from "../../hooks/useNavigate";
import { emitAppSocketEvent } from "../../sockets/socket";
import {
  gameListeners,
  removeGameListeners,
} from "../../sockets/listeners/gameListeners";
import { useDispatch, useSelector } from "react-redux";
import { exitRoom } from "../../app/slices/playerSlice";
import { clearRoom } from "../../app/slices/gameSlice";

function GameRoomForm({ roomName, playerName }) {
  const { players, isStarted, isGameover, isSolo } = useSelector(
    (root) => root.game
  );
  const { isAdmin, isWinner } = useSelector((root) => root.player);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    gameListeners(dispatch);

    emitAppSocketEvent(SOCKETS.ENTER_ROOM, { roomName });

    return () => {
      removeGameListeners();
    };
  }, []);

  const handleExit = () => {
    emitAppSocketEvent(SOCKETS.EXIT_ROOM);
    dispatch(exitRoom());
    dispatch(clearRoom());
    navigate("#rooms");
  };

  const restartGame = () => {
    emitAppSocketEvent(SOCKETS.RESTART_GAME);
  };

  const isRestartBtnEnable = () => isGameover && isStarted && isAdmin;

  return (
    <div>
      <h1>Game Room</h1>
      <h4>Room Name: {roomName}</h4>
      <h4>Player Name: {playerName}</h4>
      {isWinner && !isSolo && <h5>Congrats you're winner!</h5>}
      <button onClick={handleExit}>Exit from room</button>
      {isRestartBtnEnable() && (
        <button onClick={restartGame}>Restart Game</button>
      )}

      {isStarted ? (
        <MainGameForm players={players} />
      ) : (
        <WaitingRoom players={players} isAdmin={isAdmin} isSolo={isSolo} />
      )}
    </div>
  );
}

export default GameRoomForm;
