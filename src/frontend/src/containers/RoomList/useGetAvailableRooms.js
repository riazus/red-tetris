import { useGetAvailableRoomsQuery } from "../../app/api/api";

export const useGetAvailableRooms = () => {
  const { data: rooms, isLoading } = useGetAvailableRoomsQuery();

  return { rooms, isLoading };
};
