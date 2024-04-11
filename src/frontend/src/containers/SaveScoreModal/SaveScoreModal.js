import { Modal } from "antd";
import Title from "antd/es/typography/Title";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { SOCKETS } from "../../const";
import { emitAppSocketEvent } from "../../sockets/socket";

function SaveScoreModal({ isOpen, setIsOpen }) {
  const { score } = useSelector((root) => root.player);

  const handleSave = () => {
    emitAppSocketEvent(SOCKETS.ADD_LEADER, { score });
    setIsOpen(false);
  };

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(handleCancel, 5000);
    }
  }, [isOpen, handleCancel]);

  return (
    <Modal
      open={isOpen}
      title="Save Score"
      okText="Save"
      onOk={handleSave}
      onCancel={handleCancel}
      onRequestClose={handleCancel}
    >
      <Title level={3}>Your score: {score}</Title>
      <Title level={5}>Do you want save it?</Title>
    </Modal>
  );
}

export default SaveScoreModal;
