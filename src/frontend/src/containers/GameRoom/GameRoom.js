import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SOCKETS } from "../../const";
import {
  gameListeners,
  removeGameListeners,
} from "../../sockets/listeners/gameListeners";
import { emitAppSocketEvent } from "../../sockets/socket";
import SaveScoreModal from "../SaveScoreModal/SaveScoreModal";
import Tetris from "../Tetris/Tetris";

function GameRoomForm({ roomName, playerName }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isStarted, isGameover } = useSelector((root) => root.game);

  useEffect(() => {
    if (isGameover) {
      setIsModalOpen(true);
    }
  }, [isGameover]);

  useEffect(() => {
    gameListeners(dispatch);

    emitAppSocketEvent(SOCKETS.ENTER_ROOM, { roomName });

    return () => {
      removeGameListeners();
    };
  }, [dispatch, roomName]);

  return (
    <div>
      <h1>Game Room</h1>
      <h4>Room Name: {roomName}</h4>
      <h4>Player Name: {playerName}</h4>

      {isStarted ? (
        <div>
          <SaveScoreModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
          <Tetris />
        </div>
      ) : (
        <p>Waiting for second player...</p>
      )}
    </div>
  );
}

export default GameRoomForm;
