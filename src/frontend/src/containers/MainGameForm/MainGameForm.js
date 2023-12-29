import { useEffect, useState } from "react";
import { SOCKETS } from "../../const";
import SaveScoreModal from "../SaveScoreModal/SaveScoreModal";
import { emitAppSocketEvent } from "../../sockets/socket";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsGameover,
  updateScore,
  updateSpectrum,
} from "../../app/slices/playerSlice";
import Tetris from "../../components/Tetris";

function MainGameForm({ players }) {
  const {
    score,
    spectrum,
    isGameover: isPlayerGameover,
  } = useSelector((root) => root.player);
  const { isStarted, isGameover } = useSelector((root) => root.game);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isGameover) {
      setIsModalOpen(true);
    }
  }, [isGameover]);

  const handleUpdateSpectrum = (e) => {
    emitAppSocketEvent(
      SOCKETS.UPDATE_SPECTRUM,
      { spectrum: e.target.value },
      ({ spectrum }) => {
        dispatch(updateSpectrum(spectrum));
      }
    );
  };

  const handleUpdateScore = () => {
    emitAppSocketEvent(
      SOCKETS.UPDATE_SCORE,
      { score: score + 20 },
      ({ score }) => {
        dispatch(updateScore(score));
      }
    );
  };

  const handleGameover = () => {
    emitAppSocketEvent(SOCKETS.PLAYER_GAMEOVER);
    dispatch(setIsGameover(true));
  };

  //const controlDisabled = () => (isStarted && isGameover) || isPlayerGameover;

  return (
    <div>
      <SaveScoreModal
        isOpen={isModalOpen}
        score={score}
        setIsOpen={setIsModalOpen}
      />

      <Tetris />
      {/* <p>Score: {score}</p>
      <input
        type="text"
        value={spectrum}
        onChange={handleUpdateSpectrum}
        disabled={controlDisabled()}
      ></input>
      <button disabled={controlDisabled()} onClick={handleUpdateScore}>
        Update score
      </button>
      <button disabled={controlDisabled()} onClick={handleGameover}>
        Gameover
      </button>
      <ul>
        {players.map((p, i) => {
          return (
            <li key={i}>
              <p>
                {p.username} score: {p.score}
              </p>
              {p.gameover && <p>Player lost game</p>}
              <input value={p.spectrum} disabled></input>
            </li>
          );
        })}
      </ul> */}
    </div>
  );
}

export default MainGameForm;
