import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateScore, updateSpectrum } from "../../app/slices/playerSlice";
import { SOCKETS } from "../../const";
import { emitAppSocketEvent } from "../../sockets/socket";
import SaveScoreModal from "../SaveScoreModal/SaveScoreModal";
import Tetris from "../Tetris/Tetris";

/**
 * Renders tetris and modal form
 * @param {*} players Opponents in the room
 * @returns
 */
function MainGameForm({ players }) {
  const { score } = useSelector((root) => root.player);
  const { isGameover } = useSelector((root) => root.game);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isGameover) {
      setIsModalOpen(true);
    }
  }, [isGameover]);

  // TODO
  const handleUpdateSpectrum = (e) => {
    emitAppSocketEvent(
      SOCKETS.UPDATE_SPECTRUM,
      { spectrum: e.target.value },
      ({ spectrum }) => {
        dispatch(updateSpectrum(spectrum));
      }
    );
  };

  // TODO
  // const handleUpdateScore = () => {
  //   emitAppSocketEvent(
  //     SOCKETS.UPDATE_SCORE,
  //     { score: score + 20 },
  //     ({ score }) => {
  //       dispatch(updateScore(score));
  //     }
  //   );
  // };

  return (
    <div>
      <SaveScoreModal
        isOpen={isModalOpen}
        score={score}
        setIsOpen={setIsModalOpen}
      />

      <Tetris />
    </div>
  );
}

export default MainGameForm;
