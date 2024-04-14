import { renderHook } from "@testing-library/react";
import { useCreateRoomMutation } from "../../app/api/api";
import { useCreateRoom } from "./useCreateRoom";

jest.mock("../../app/api/api");

describe("useCreateRoom", () => {
  it("should return create room mutation", () => {
    const createRoom = jest.fn();
    const reset = jest.fn();
    const data = { valid: true, message: "" };

    const mockData = [createRoom, { data, isSuccess: true, reset }];

    useCreateRoomMutation.mockReturnValueOnce(mockData);
    const { result } = renderHook(() => useCreateRoom());

    expect(result.current.data).toBe(data);
    expect(result.current.isSuccess).toBe(true);
  });
});
