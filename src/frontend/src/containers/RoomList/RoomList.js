import { Flex } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAvailableRoomsQuery } from "../../app/api/api";
import Link from "../../components/Link";
import CreateRoomModal from "../CreateRoomModal/CreateRoomModal";

function RoomList() {
  const { username } = useSelector((state) => state.player);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: rooms, isLoading: isRoomsLoading } =
    useGetAvailableRoomsQuery();

  if (isRoomsLoading) return <p>Loading...</p>;

  return (
    <Flex vertical align="center">
      <h1>Lobby</h1>
      <CreateRoomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />

      {rooms &&
        rooms.map((room, index) => (
          <React.Fragment key={index}>
            <Flex gap={6} justify="space-between">
              <p>{room.name}</p>
              <Link
                type={"primary"}
                to={`http://${window.location.host}/#${room.name}[${username}]`}
              >
                Join
              </Link>
            </Flex>
          </React.Fragment>
        ))}
      {/* <Link to="#">Return to Home Page</Link> */}
      <button onClick={() => setIsModalOpen(true)}>Create Room</button>
    </Flex>
  );
}

export default RoomList;
