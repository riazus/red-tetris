import { Button, Flex, Table } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Link from "../../components/Link/Link";
import CreateRoomModal from "../CreateRoomModal/CreateRoomModal";
import { useGetAvailableRooms } from "./useGetAvailableRooms";

function RoomList() {
  const { username } = useSelector((state) => state.player);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { rooms, isLoading } = useGetAvailableRooms();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Flex vertical align="center">
      <h1>Lobby</h1>
      <CreateRoomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
      <Button
        data-testid="create-room-button"
        type="primary"
        onClick={() => setIsModalOpen(true)}
      >
        Create Room
      </Button>

      <Table
        data-testid="rooms-data"
        columns={[
          { title: "Room Name", dataIndex: "name" },
          { title: "Is Solo", dataIndex: "isSolo" },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Link
                to={`http://${window.location.host}/#${record.name}[${username}]`}
              >
                Join
              </Link>
            ),
          },
        ]}
        dataSource={rooms.map(({ name, isSolo }, i) => ({
          key: i,
          name,
          isSolo: isSolo ? "✅" : "❌",
        }))}
        bordered={true}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 30 }}
      />
    </Flex>
  );
}

export default RoomList;
