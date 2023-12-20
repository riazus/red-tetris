import React, { useEffect, useState } from "react";
import Link from "../../components/Link";
import { useGetLeaderboardQuery } from "../../app/api/api";

function Leaderboard() {
  const { data, isLoading, isSuccess } = useGetLeaderboardQuery();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      const sortedData = [...data].sort((a, b) => b.score - a.score);

      setUsers(
        sortedData.map((item) => {
          return { username: item.username, score: item.score };
        })
      );
    }
  }, [isLoading]);

  return (
    <>
      <h1>Leaderboard</h1>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        users && (
          <ul>
            {users.map((item, ind) => {
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
