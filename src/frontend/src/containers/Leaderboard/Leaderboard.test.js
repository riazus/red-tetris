import { render } from "@testing-library/react";
import Leaderboard from "./Leaderboard";
import { Provider } from "react-redux";
import { store } from "../../app/store";

it("should have link to home", () => {
  const { getByText, getByRole } = render(
    <Provider store={store}>
      <Leaderboard />
    </Provider>
  );

  expect(getByRole("link")).toBeInTheDocument();
  expect(getByText(/Go to Home/i)).toBeInTheDocument();
});
