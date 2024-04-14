import { renderHook } from "@testing-library/react";
import { useGetAvailableRoomsQuery } from "../../app/api/api";
import { useGetAvailableRooms } from "./useGetAvailableRooms";

jest.mock("../../app/api/api");

describe("useGetAvailableRoom", () => {
  it("should return rooms", () => {
    const mockData = [
      { name: "test1", isSolo: true },
      { name: "test2", isSolo: true },
    ];

    useGetAvailableRoomsQuery.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    });

    const { result } = renderHook(() => useGetAvailableRooms());

    expect(result.current.rooms).toBe(mockData);
    expect(result.current.isLoading).toBe(false);
  });
});
