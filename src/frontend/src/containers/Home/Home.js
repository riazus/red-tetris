import { useSelector } from "react-redux";
import Link from "../../components/Link";
import UsernameForm from "../UsernameForm/UsernameForm";
import "./Home.css";
import { Flex } from "antd";
import { render } from "react-dom";

function Home() {
  const { username } = useSelector((state) => state.player);

  const renderFormOrLobby = () => {
    if (username.length <= 0) {
      return <UsernameForm />;
    } else {
      return (
        <>
          <h2>Hello, {username}</h2>
          <Link to="#leaderboard">Link to the Leaderboard</Link> <br />
          <Link to="#rooms">Link to the Available Rooms</Link>
        </>
      );
    }
  };
  return (
    <Flex vertical align="center">
      {/* <h1>Welcome to 42 Tetris</h1> */}
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

        <div></div>
      </Flex>
    </Flex>
  );
}
export default Home;
