import React, { useEffect, useState } from "react";
import "./App.css";
import { useCreateUserMutation, useGetUsersQuery } from "./app/api/api";
import CreateUserInput from "./containers/CreateUserInput/CreateUserInput";

function App() {
  const { data: usersData, isLoading, isError, isSuccess } = useGetUsersQuery();
  const [createUser, {}] = useCreateUserMutation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setUsers(...usersData);
    }
  }, [isLoading]);

  const onNewUserCreate = async (e, newUser) => {
    e.preventDefault();
    setUsers((prev) => [...prev, newUser]);
    await createUser(newUser);
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
      <CreateUserInput onNewUserCreate={onNewUserCreate} />
    </div>
  );
}

export default App;
