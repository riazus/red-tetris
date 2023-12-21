import { useEffect, useState } from "react";
import { SOCKETS } from "../../const";
import SaveScoreModal from "../SaveScoreModal/SaveScoreModal";

function MainGameForm({
  playerName,
  socket,
  players,
  setPlayers,
  updateCurrentPlayers,
  setRestartBtnEnable,
}) {
  const [spectrum, setSpectrum] = useState("");
  const [score, setScore] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    socket.on(SOCKETS.UPDATE_SPECTRUM, ({ username, spectrum }) => {
      setPlayers((prevPlayers) => {
        const updatedPlayers = [...prevPlayers];
        const ind = players.findIndex((p) => p.username === username);
        if (ind !== -1) {
          updatedPlayers[ind] = { ...updatedPlayers[ind], spectrum };
        }
        return updatedPlayers;
      });
    });

    socket.on(SOCKETS.UPDATE_SCORE, ({ username, score }) => {
      setPlayers((prevPlayers) => {
        const updatedPlayers = [...prevPlayers];
        const ind = updatedPlayers.findIndex((p) => p.username === username);
        if (ind !== -1) {
          updatedPlayers[ind] = { ...updatedPlayers[ind], score };
        }
        return updatedPlayers;
      });
    });

    socket.on(SOCKETS.GAMEOVER, ({ players, endGame }) => {
      if (endGame) {
        setIsModalOpen(true);
      }

      updateCurrentPlayers([...players]);
    });

    return () => {
      socket.off(SOCKETS.UPDATE_SPECTRUM);
      socket.off(SOCKETS.UPDATE_SCORE);
      socket.off(SOCKETS.GAMEOVER);
    };
  }, []);

  const handleUpdateSpectrum = (e) => {
    socket.emit(
      SOCKETS.UPDATE_SPECTRUM,
      { spectrum: e.target.value },
      ({ spectrum }) => {
        setSpectrum(spectrum);
      }
    );
  };

  const handleUpdateScore = () => {
    socket.emit(SOCKETS.UPDATE_SCORE, { score: score + 20 }, ({ score }) => {
      setScore(score);
    });
  };

  const handleGameover = () => {
    socket.emit(SOCKETS.GAMEOVER);
  };

  return (
    <div>
      <SaveScoreModal
        isOpen={isModalOpen}
        score={score}
        setIsOpen={setIsModalOpen}
        setRestartBtnEnable={setRestartBtnEnable}
      />

      <p>Score: {score}</p>
      <input
        type="text"
        value={spectrum}
        onChange={handleUpdateSpectrum}
      ></input>
      <button onClick={handleUpdateScore}>Update score</button>
      <button onClick={handleGameover}>Gameover</button>
      <ul>
        {players
          .filter((p) => p.username !== playerName)
          .map((p, i) => {
            return (
              <li key={i}>
                <p>
                  {p.username} score: {p.score}
                </p>
                {p.gameover && <p>Gameover</p>}
                <input value={p.spectrum} disabled></input>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default MainGameForm;
