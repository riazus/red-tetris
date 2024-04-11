import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useCreateRoomMutation } from "../../app/api/api";

function CreateRoomModal({ isOpen, onRequestClose }) {
  const [roomName, setRoomName] = useState("");
  const [isSolo, setIsSolo] = useState(false);
  const [
    createRoom,
    { data: createRoomResp, isSuccess: isCreateRoomSuccess, reset },
  ] = useCreateRoomMutation();

  useEffect(() => {
    if (isCreateRoomSuccess) {
      const { valid, message } = createRoomResp;

      if (!valid) {
        console.log(message);
      } else {
        reset();
        setRoomName("");
        setIsSolo(false);
        onRequestClose();
      }
    }
  }, [isCreateRoomSuccess, createRoomResp, onRequestClose, reset]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createRoom({ roomName, isSolo });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      contentLabel="Create Room Modal"
    >
      <h2>Create Room</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Room Name:
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </label>
        <label>
          Is Solo:
          <input
            type="checkbox"
            checked={isSolo}
            onChange={() => setIsSolo(!isSolo)}
          />
        </label>
        <button>Create</button>
      </form>
    </Modal>
  );
}

export default CreateRoomModal;
