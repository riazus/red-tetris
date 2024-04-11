import Link from "../../components/Link";
import { useGetAvailableRoomsQuery } from "../../app/api/api";
import { useState } from "react";
import CreateRoomModal from "../CreateRoomModal/CreateRoomModal";
import { useSelector } from "react-redux";
import { Flex, Button } from "antd";
import React from "react";

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
              <Button
                type={"primary"}
                to={`http://${window.location.host}/#${room.name}[${username}]`}
              >
                Join
              </Button>
            </Flex>
          </React.Fragment>
        ))}
      {/* <Link to="#">Return to Home Page</Link> */}
      <button onClick={() => setIsModalOpen(true)}>Create Room</button>
    </Flex>
  );
}

export default RoomList;
