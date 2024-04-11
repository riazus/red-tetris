import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
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

  return (
    <Modal
      open={isOpen}
      title={"Create Room"}
      onOk={() => createRoom({ roomName, isSolo })} onCancel={onRequestClose}>
      <label>
        Room Name:
        <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
      </label>
      <label>
        Is Solo:
        <input
          type="checkbox"
          checked={isSolo}
          onChange={() => setIsSolo(!isSolo)}
        />
      </label>
      {/* <button onClick={() => createRoom({ roomName, isSolo })}>Create</button> */}
    </Modal>
  );
}

export default CreateRoomModal;
