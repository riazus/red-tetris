import { renderHook } from "@testing-library/react";
import { useGetLeaderboardQuery } from "../../app/api/api";
import { useGetLeaderboard } from "./useGetLeaderboard";

jest.mock("../../app/api/api");

describe("useGetLeaderboard", () => {
  it("should return leaderboard", () => {
    const mockData = [
      { username: "test-username1", score: 100 },
      { username: "test-username2", score: 100 },
    ];

    useGetLeaderboardQuery.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
    });

    const { result } = renderHook(() => useGetLeaderboard());

    expect(result.current.data).toBe(mockData);
    expect(result.current.isLoading).toBe(false);
  });
});
