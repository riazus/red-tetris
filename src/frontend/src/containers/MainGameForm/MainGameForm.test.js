import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import MainGameForm from "./MainGameForm";

const mockSocket = {
  on: (ev, callback) => {},
  off: (ev) => {},
};

const players = [
  {
    username: "test",
    score: 50,
    gameover: false,
  },
  {
    username: "test1",
    score: 60,
    gameover: false,
  },
];

it("should have buttons", () => {
  render(
    <Provider store={store}>
      <MainGameForm players={players} socket={mockSocket} />
    </Provider>
  );

  expect(screen.getAllByRole("button").length).toEqual(2);
});
