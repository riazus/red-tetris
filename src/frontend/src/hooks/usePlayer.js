import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";
import { MAX_TETROMINOS_COUNT, TETROMINOS } from "../tetrominos";

export const usePlayer = () => {
  const { tetrominos } = useSelector((root) => root.game);
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    ind: 0,
    collided: false,
  });

  function rotate(matrix, dir) {
    const mtrx = matrix.map((_, index) =>
      matrix.map((column) => column[index])
    );
    if (dir > 0) return mtrx.map((row) => row.reverse());
    return mtrx.reverse();
  }

  function playerRotate(stage, dir) {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  }

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(
    (resetGlobal) => {
      setPlayer((prev) => {
        const ind =
          prev.ind === MAX_TETROMINOS_COUNT - 1 || 0 || resetGlobal
            ? 0
            : prev.ind + 1;
        return {
          pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
          tetromino: TETROMINOS[tetrominos[ind]].shape,
          collided: false,
          ind,
        };
      });
    },
    [tetrominos]
  );

  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
