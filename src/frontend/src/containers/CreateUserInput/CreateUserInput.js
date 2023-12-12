import { useState } from "react";

function CreateUserInput({ onNewUserCreate }) {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);

  return (
    <form onSubmit={(e) => onNewUserCreate(e, { username, score })}>
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
  );
}

export default CreateUserInput;
