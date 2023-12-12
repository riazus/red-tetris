import React, { useEffect, useState } from "react";
import "./App.css";
import { useCreateUserMutation, useGetUsersQuery } from "./app/api/api";

function App() {
  const { data: usersData, isLoading, isError, isSuccess } = useGetUsersQuery();
  const [createUser, {}] = useCreateUserMutation();
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setUsers(...usersData);
    }
  }, [isLoading]);

  const onNewUserCreate = async (e) => {
    e.preventDefault();
    setUsers((prev) => [...prev, { username, score }]);
    await createUser({ username, score });
  };

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : isError ? (
        <h1>Error occured</h1>
      ) : (
        isSuccess && (
          <>
            <h1>Hello world</h1>
            {users &&
              users.map((user, ind) => {
                return <p key={ind}>{user.username}</p>;
              })}
          </>
        )
      )}
      <form onSubmit={onNewUserCreate}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          value={score}
          type="number"
          onChange={(e) => setScore(e.target.value)}
        ></input>
        <button>Create!</button>
      </form>
    </div>
  );
}

export default App;
