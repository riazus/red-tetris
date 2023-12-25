import { useEffect, useState } from "react";
import { useCreateUserMutation } from "../../app/api/api";
import { useDispatch } from "react-redux";
import { setUsername as setUsernameSlice } from "../../app/slices/playerSlice";

function UsernameForm() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const [createUser, { data, isLoading, isSuccess }] = useCreateUserMutation();

  const onUsernameInputSubmit = async (e, username) => {
    e.preventDefault();
    createUser(username);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data.isUsernameInvalid) {
        console.log("Username invalid!");
      } else {
        dispatch(setUsernameSlice(username));
      }
    }
  }, [isLoading]);

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
