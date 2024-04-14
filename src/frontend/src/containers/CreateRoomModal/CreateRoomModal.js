import { Input, Modal } from "antd";
import React, { useState } from "react";
import { useCreateRoom } from "./useCreateRoom";

function CreateRoomModal({ isOpen, onRequestClose }) {
  const [roomName, setRoomName] = useState("");
  const [isSolo, setIsSolo] = useState(false);
  const { createRoom, reset } = useCreateRoom();

  const handleCreateRoom = async () => {
    const { valid, message } = await createRoom({ roomName, isSolo });

    if (!valid) {
      console.log(message);
      return;
    }

    reset();
    setRoomName("");
    setIsSolo(false);
    onRequestClose();
  };

  return (
    <Modal
      open={isOpen}
      title={"Create Room"}
      onOk={handleCreateRoom}
      okText="Create"
      onCancel={onRequestClose}
    >
      <label>
        Room Name:
        <Input
          value={roomName}
          onChange={(e) =>
            inputValid(e.target.value) && setRoomName(e.target.value)
          }
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
    </Modal>
  );
}

const inputValid = (input) => {
  return (!input || /^[a-zA-Z0-9]+$/.test(input)) && input.length < 20;
};

export default CreateRoomModal;
