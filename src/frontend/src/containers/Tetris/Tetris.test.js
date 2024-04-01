import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Tetris from "./Tetris";

it("should have start game button", () => {
  render(
    <Provider store={store}>
      <Tetris />
    </Provider>
  );

  const startGameButtons = screen.getAllByRole("button", {
    name: /start game/i,
  });
  expect(startGameButtons.length).toBeGreaterThan(0);
});
