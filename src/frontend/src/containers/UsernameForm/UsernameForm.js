import { useState } from "react";
import { useCreateUserMutation } from "../../app/api/api";
import { Input, Button, Flex } from "antd";

function UsernameForm() {
  const [username, setUsername] = useState("");
  const [createUser, { isLoading }] = useCreateUserMutation();

  const onUsernameInputSubmit = async (e, username) => {
    e.preventDefault();
    createUser(username);
  };

  return (
    <form onSubmit={(e) => onUsernameInputSubmit(e, username)}>
      <Flex gap={10}>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></Input>
        <Button
          onClick={(e) => onUsernameInputSubmit(e, username)}
          type="primary"
          disabled={isLoading}
        >
          Create!
        </Button>
      </Flex>
    </form>
  );
}

export default UsernameForm;
