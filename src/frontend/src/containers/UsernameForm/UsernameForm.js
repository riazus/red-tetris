import { Button, Flex, Input } from "antd";
import { useState } from "react";
import { useCreateUser } from "./useCreateUser";

function UsernameForm() {
  const { createUser } = useCreateUser();
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex justify="right">
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) =>
            inputValid(e.target.value) && setUsername(e.target.value)
          }
        />
        <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
          Submit
        </Button>
      </Flex>
    </form>
  );
}

const inputValid = (input) => {
  return (!input || /^[a-zA-Z0-9]+$/.test(input)) && input.length < 20;
};

export default UsernameForm;
