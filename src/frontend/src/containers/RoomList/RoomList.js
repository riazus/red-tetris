import Link from "../../components/Link";
import { useGetAvailableRoomsQuery } from "../../app/api/api";
import { useState } from "react";
import CreateRoomModal from "../CreateRoomModal/CreateRoomModal";

function RoomList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: rooms, isLoading: isRoomsLoading } =
    useGetAvailableRoomsQuery();

  if (isRoomsLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Avaialable Rooms</h1>
      <button onClick={() => setIsModalOpen(true)}>Create Room</button>
      <CreateRoomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />

      {rooms && (
        <ul>
          {rooms.map((room, ind) => {
            return (
              <li key={ind}>
                <p>{room.name}</p>
              </li>
            );
          })}
        </ul>
      )}
      <Link to="#">Go to Home</Link>
    </div>
  );
}

export default RoomList;
