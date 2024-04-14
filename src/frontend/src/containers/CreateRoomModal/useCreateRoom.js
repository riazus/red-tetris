import { useCreateRoomMutation } from "../../app/api/api";

export const useCreateRoom = () => {
  const [createRoom, { data, isSuccess, reset }] = useCreateRoomMutation();

  return { createRoom, data, isSuccess, reset };
};
