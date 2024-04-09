import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Leaderboard from "./Leaderboard";

it("should have link to home", () => {
  render(
    <Provider store={store}>
      <Leaderboard />
    </Provider>
  );

  expect(screen.getByRole("link")).toBeInTheDocument();
  expect(screen.getByText(/Go to Home/i)).toBeInTheDocument();
});
