import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useAddPlayerToLeaderboardMutation } from "../../app/api/api";
import { useSelector } from "react-redux";

function SaveScoreModal({ score, isOpen, setIsOpen, setRestartBtnEnable }) {
  const checkboxRef = useRef();
  const [addPlayerToLeaderboard] = useAddPlayerToLeaderboardMutation();
  const { username } = useSelector((state) => state.userState);

  useEffect(() => {
    if (isOpen) {
      setTimeout(handleCloseModal, 5000);
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    if (checkboxRef.current.checked) {
      addPlayerToLeaderboard({ username, score });
    }
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
        <input type="checkbox" defaultChecked={false} ref={checkboxRef} />
      </label>
    </Modal>
  );
}

export default SaveScoreModal;
