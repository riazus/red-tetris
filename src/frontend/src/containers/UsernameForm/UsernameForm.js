import { Button, Input } from "antd";
import { useState } from "react";
import { useCreateUserMutation } from "../../app/api/api";

function UsernameForm() {
  const [createUser] = useCreateUserMutation();
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Username"
        value={username}
        onChange={(e) =>
          inputValid(e.target.value) && setUsername(e.target.value)
        }
      />
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </form>
  );
}

const inputValid = (input) => {
  return (!input || /^[a-zA-Z0-9]+$/.test(input)) && input.length < 20;
};

export default UsernameForm;
