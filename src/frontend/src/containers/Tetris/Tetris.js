import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsGameover } from "../../app/slices/playerSlice";
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

import Display from "../../components/Display";
import Stage from "../../components/Stage";
import StartButton from "../../components/StartButton";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(NaN);
  const [startGameBtnAvailable, setStartGameBtnAvaialable] = useState(true);
  const { isGameover, score } = useSelector((root) => root.player);
  const dispatch = useDispatch();

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const movePlayer = (dir) => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!isGameover) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1));
      }
    }
  };

  const startGame = () => {
    setStartGameBtnAvaialable(false);
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setLevel(0);
    setRows(0);
  };

  const drop = () => {
    if (rows > (level + 1) * 10) {
      setLevel((prev) => prev + 1);
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      if (player.pos.y < 1) {
        console.log("GAME OVER!!!");
        handleGameover();
        setDropTime(null);
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

  const move = ({ keyCode }) => {
    if (!isGameover) {
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

  return (
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
            <Display isGameover={isGameover} text="Game Over" />
          ) : (
            <div>
              <Display text={`Score: ${score}`} />
              <Display text={`rows: ${rows}`} />
              <Display text={`Level: ${level}`} />
            </div>
          )}
          {startGameBtnAvailable && <StartButton callback={startGame} />}
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
