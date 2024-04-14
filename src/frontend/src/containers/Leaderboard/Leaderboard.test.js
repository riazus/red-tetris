import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Leaderboard from "./Leaderboard";
import { useGetLeaderboard } from "./useGetLeaderboard";

jest.mock("./useGetLeaderboard", () => ({
  useGetLeaderboard: jest.fn(),
}));

describe("Leaderboard", () => {
  beforeEach(() => {
    useGetLeaderboard.mockImplementation(() => ({}));
  });

  it("should render loading text while data is fetching", () => {
    useGetLeaderboard.mockImplementation(() => ({ isLoading: true }));

    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("should render table data when data is ready", () => {
    const mockData = [
      { username: "test-username1", score: 100 },
      { username: "test-username2", score: 100 },
    ];
    useGetLeaderboard.mockImplementation(() => ({
      data: mockData,
      isLoading: false,
    }));

    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    expect(screen.getByTestId("leaderboard-data")).toBeInTheDocument();
  });
});
