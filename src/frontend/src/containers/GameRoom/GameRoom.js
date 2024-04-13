import { Flex } from "antd";
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

function GameRoomForm({ roomName }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isStarted, isGameover, players, isSolo } = useSelector(
    (root) => root.game
  );

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

  const renderGame = isStarted && (isSolo ? true : players.length === 1);

  return (
    <Flex title="Game Room">
      {renderGame ? (
        <div>
          <SaveScoreModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
          <Tetris />
        </div>
      ) : (
        <p>Waiting for second player...</p>
      )}
    </Flex>
  );
}

export default GameRoomForm;
