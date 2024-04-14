import { useCreateUserMutation } from "../../app/api/api";

export const useCreateUser = () => {
  const [createUser] = useCreateUserMutation();

  return {createUser};
}