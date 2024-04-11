import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exitRoom, setIsGameover } from "../../app/slices/playerSlice";
import {
  StyledTetris,
  StyledTetrisWrapper,
} from "../../components/styles/StyledTetris";
import { SOCKETS } from "../../const";
import { checkCollision, createStage } from "../../gameHelpers";
import { useGameStatus } from "../../hooks/useGameStatus";
import { useInterval } from "../../hooks/useInterval";
import { usePlayer } from "../../hooks/usePlayer";
import { useStage } from "../../hooks/useStage";
import { emitAppSocketEvent } from "../../sockets/socket";

import { clearRoom } from "../../app/slices/gameSlice";
import Display from "../../components/Display";
import GameButton from "../../components/GameButton";
import Stage from "../../components/Stage";
import useNavigate from "../../hooks/useNavigate";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const { players, isGameover, isStarted } = useSelector((root) => root.game);
  const {
    isGameover: playerLose,
    score,
    isAdmin,
  } = useSelector((root) => root.player);
  const dispatch = useDispatch();

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
  const navigate = useNavigate();

  const handleStartGame = useCallback(() => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setLevel(0);
    setRows(0);
  }, [resetPlayer, setLevel, setRows, setStage]);

  useEffect(() => {
    if (isGameover) {
      setDropTime(null);
    } else {
      handleStartGame();
    }
  }, [isGameover, handleStartGame]);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!isGameover && !playerLose) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const handleExit = () => {
    emitAppSocketEvent(SOCKETS.EXIT_ROOM);
    dispatch(exitRoom());
    dispatch(clearRoom());
    navigate("#rooms");
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1 && !isGameover) {
        handleGameover();
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  };

  useInterval(() => {
    drop();
  }, dropTime);

  const handleGameover = () => {
    emitAppSocketEvent(SOCKETS.PLAYER_GAMEOVER);
    dispatch(setIsGameover(true));
  };

  const handleRestartGame = () => {
    emitAppSocketEvent(SOCKETS.RESTART_GAME);
    handleStartGame();
  };

  const move = ({ keyCode }) => {
    if (!isGameover && !playerLose) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  };

  const isRestartBtnEnable = isGameover && isStarted && isAdmin;

  return (
    <>
      <StyledTetrisWrapper
        role="button"
        tabIndex="0"
        onKeyDown={(e) => move(e)}
        onKeyUp={keyUp}
      >
        <StyledTetris>
          <Stage stage={stage} />
          <aside>
            {isGameover ? (
              <Display isGameover={playerLose} text="Game Over" />
            ) : (
              <div>
                <Display text={`Score: ${score}`} />
                <Display text={`rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
              </div>
            )}
            <GameButton
              text={"Exit from Room"}
              callback={handleExit}
              testid={"exit-room-button"}
            />
            {isRestartBtnEnable && (
              <GameButton
                text={"Restart Game"}
                callback={handleRestartGame}
                testid={"restart-game-button"}
              />
            )}
          </aside>
        </StyledTetris>
        {players.map(
          ({ spectrum }, i) =>
            spectrum && <Stage key={i} stage={spectrum}></Stage>
        )}
      </StyledTetrisWrapper>
    </>
  );
};

export default Tetris;
