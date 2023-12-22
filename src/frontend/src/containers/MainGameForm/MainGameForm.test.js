import { render } from "@testing-library/react";
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
    spectrum: "lolol",
    gameover: false,
  },
  {
    username: "test1",
    score: 60,
    spectrum: "lololol",
    gameover: false,
  },
];

it("should have buttons", () => {
  const { getAllByRole } = render(
    <Provider store={store}>
      <MainGameForm players={players} socket={mockSocket} />
    </Provider>
  );

  expect(getAllByRole("button").length).toEqual(2);
});
