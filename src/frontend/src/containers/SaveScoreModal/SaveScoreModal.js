import { useEffect, useState } from "react";
import Modal from "react-modal";

function SaveScoreModal({ score, isOpen, setIsOpen, setRestartBtnEnable }) {
  const [saveScore, setSaveScore] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(handleCloseModal, 5000);
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    setRestartBtnEnable(true);
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
      contentLabel="Save Score"
    >
      <h3>Your score: {score}</h3>
      <label>
        Do you want save it?
        <input
          type="checkbox"
          checked={saveScore}
          onChange={() => setSaveScore(!saveScore)}
        />
      </label>
    </Modal>
  );
}

export default SaveScoreModal;
