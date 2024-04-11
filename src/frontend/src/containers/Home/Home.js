import { Flex } from "antd";
import { useSelector } from "react-redux";
import Link from "../../components/Link";
import UsernameForm from "../UsernameForm/UsernameForm";
import "./Home.css";

function Home() {
  const { username } = useSelector((state) => state.player);

  return (
    <Flex vertical align="center">
      <Flex vertical align="center">
        {username.length > 0 ? (
          <>
            <h2>Hello, {username}</h2>
            <Link to="#leaderboard">Link to the Leaderboard</Link> <br />
            <Link to="#rooms">Link to the Available Rooms</Link>
          </>
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
