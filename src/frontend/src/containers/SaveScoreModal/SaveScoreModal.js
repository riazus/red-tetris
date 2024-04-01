import { useCallback, useEffect, useRef } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { SOCKETS } from "../../const";
import { emitAppSocketEvent } from "../../sockets/socket";

function SaveScoreModal({ isOpen, setIsOpen }) {
  const { score } = useSelector((root) => root.player);
  const checkboxRef = useRef();

  const handleCloseModal = useCallback(() => {
    if (checkboxRef.current && checkboxRef.current.checked) {
      emitAppSocketEvent(SOCKETS.ADD_LEADER, { score });
    }
    setIsOpen(false);
  }, [score, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(handleCloseModal, 5000);
    }
  }, [isOpen, handleCloseModal]);

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
