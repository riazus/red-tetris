import { renderHook } from "@testing-library/react";
import { useCreateUserMutation } from "../../app/api/api";
import { useCreateUser } from "./useCreateUser";

jest.mock("../../app/api/api");

describe("useCreateUser", () => {
  it("should return create user mutation", () => {
    const createUser = jest.fn();

    const mockData = [createUser];

    useCreateUserMutation.mockReturnValueOnce(mockData);
    const { result } = renderHook(() => useCreateUser());

    expect(result.current.createUser).toBe(createUser);
  });
});
