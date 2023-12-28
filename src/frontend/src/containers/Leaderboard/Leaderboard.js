import Link from "../../components/Link";
import { useGetLeaderboardQuery } from "../../app/api/api";

function Leaderboard() {
  const { data, isLoading } = useGetLeaderboardQuery();

  return (
    <>
      <h1>Leaderboard</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        data && (
          <ul>
            {[...data]
              .sort((a, b) => b.score - a.score)
              .map((item, ind) => {
                return (
                  <li key={ind}>
                    <p>{item.username}</p>
                    <p>{item.score}</p>
                  </li>
                );
              })}
          </ul>
        )
      )}
      <Link to="#">Go to Home</Link>
    </>
  );
}

export default Leaderboard;
