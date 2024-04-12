import { Flex } from "antd";
import { useSelector } from "react-redux";
import RoomList from "../RoomList/RoomList";
import UsernameForm from "../UsernameForm/UsernameForm";
import "./Home.css";

function Home() {
  const { username } = useSelector((state) => state.player);

  return (
    <Flex vertical align="center">
      <Flex vertical align="center">
        {username.length > 0 ? (
          <RoomList />
        ) : (
          <>
            <h1>Welcome to 42 Tetris</h1>
            <UsernameForm />
          </>
        )}
      </Flex>
    </Flex>
  );
}
export default Home;
