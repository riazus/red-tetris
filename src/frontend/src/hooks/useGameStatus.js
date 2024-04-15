import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateScore } from "../app/slices/playerSlice";
import { SOCKETS } from "../const";
import { emitAppSocketEvent } from "../sockets/socket";

export const useGameStatus = (rowsCleared) => {
  const { score } = useSelector((root) => root.player);
  const dispatch = useDispatch();
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  const handleUpdateScore = (newScore) => {
    emitAppSocketEvent(
      SOCKETS.UPDATE_SCORE,
      { score: newScore },
      ({ score }) => {
        dispatch(updateScore(score));
      }
    );
  };

  const calcScore = useCallback((rowsCleared) => {
    if (rowsCleared > 0) {
      handleUpdateScore(score + linePoints[rowsCleared - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, linePoints]);

  useEffect(() => {
    calcScore(rowsCleared);
  }, [calcScore, rowsCleared]);

  return [rows, setRows, level, setLevel];
};
