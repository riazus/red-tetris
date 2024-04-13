import { Button, Form, Input } from "antd";
import { useCreateUserMutation } from "../../app/api/api";

function UsernameForm() {
  const [createUser] = useCreateUserMutation();

  const handleSubmit = ({ username }) => {
    createUser(username);
  };

  const handleFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <Form onFinish={handleSubmit} onFinishFailed={handleFailed}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Invalid length!",
            max: 20,
          },
          () => ({
            validator(_, value) {
              if (!value || /^[a-zA-Z0-9]+$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Can contain only letters and numbers!")
              );
            },
          }),
        ]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default UsernameForm;
