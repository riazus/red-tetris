import { useSelector } from "react-redux";
import Link from "../../components/Link";
import UsernameForm from "../UsernameForm/UsernameForm";

function Home() {
  const { username } = useSelector((state) => state.userState);

  return (
    <>
      <h1>Home Page</h1>

      {username.length <= 0 ? (
        <UsernameForm />
      ) : (
        <>
          <h2>Hello, {username}</h2>
          <Link to="#leaderboard">Link to Leaderboard</Link>
        </>
      )}
    </>
  );
}

export default Home;
