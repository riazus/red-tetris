import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Leaderboard from "./Leaderboard";

const { useGetLeaderboardQuery } = jest.requireMock("../../app/api/api");

describe("Leaderboard", () => {
  beforeEach(() => {
    useGetLeaderboardQuery.mockClear();
  });

  it("should render loading text while data is fetching", () => {
    useGetLeaderboardQuery.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      isSuccess: false,
    });

    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
