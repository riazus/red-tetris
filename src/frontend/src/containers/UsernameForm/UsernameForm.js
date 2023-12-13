import { useEffect, useState } from "react";
import { useCheckIfNameValidMutation } from "../../app/api/api";
import { useDispatch } from "react-redux";
import { setUsername as setUsernameSlice } from "../../app/slices/userSlice";

function UsernameForm() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const [checkUsername, { data, isLoading, isSuccess }] =
    useCheckIfNameValidMutation();

  const onUsernameInputSubmit = async (e, username) => {
    e.preventDefault();
    await checkUsername(username);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data.isNameValid === true) {
        dispatch(setUsernameSlice(username));
      } else {
        console.error("Username is not valid");
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
