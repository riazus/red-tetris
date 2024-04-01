import { useState } from "react";
import { useCreateUserMutation } from "../../app/api/api";

function UsernameForm() {
  const [username, setUsername] = useState("");
  const [createUser, { isLoading }] = useCreateUserMutation();

  const onUsernameInputSubmit = async (e, username) => {
    e.preventDefault();
    createUser(username);
  };

  return (
    <form onSubmit={(e) => onUsernameInputSubmit(e, username)}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <button disabled={isLoading}>Create!</button>
    </form>
  );
}

export default UsernameForm;
