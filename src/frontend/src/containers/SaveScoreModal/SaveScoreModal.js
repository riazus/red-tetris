import { useEffect, useRef } from "react";
import Modal from "react-modal";
import { SOCKETS } from "../../const";
import { emitAppSocketEvent } from "../../sockets/socket";
import { useSelector } from "react-redux";

function SaveScoreModal({ isOpen, setIsOpen }) {
  const { score } = useSelector((root) => root.player);
  const checkboxRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setTimeout(handleCloseModal, 5000);
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    if (checkboxRef && checkboxRef.current.checked) {
      emitAppSocketEvent(SOCKETS.ADD_LEADER, { score });
    }
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
