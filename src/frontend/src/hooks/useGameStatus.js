import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SOCKETS } from "../const";
import { emitAppSocketEvent } from "../sockets/socket";
import { updateScore } from "../app/slices/playerSlice";

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

  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      handleUpdateScore(score + linePoints[rowsCleared - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared);
    }
  }, [level, linePoints, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared]);

  return [rows, setRows, level, setLevel];
};
