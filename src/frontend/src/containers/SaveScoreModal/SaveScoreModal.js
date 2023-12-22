import { useEffect, useRef } from "react";
import Modal from "react-modal";
import { SOCKETS } from "../../const";

function SaveScoreModal({
  socket,
  score,
  isOpen,
  setIsOpen,
  setRestartBtnEnable,
}) {
  const checkboxRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setTimeout(handleCloseModal, 5000);
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    if (checkboxRef.current.checked) {
      socket.emit(SOCKETS.ADD_LEADER, { score });
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
