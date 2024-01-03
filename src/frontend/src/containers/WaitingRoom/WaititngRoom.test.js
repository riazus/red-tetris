import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import WaitingRoom from "./WaitingRoom";

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

it("should have launch game button if admin", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <WaitingRoom players={players} isAdmin={true} isSolo={false} />
    </Provider>
  );

  expect(getByRole("button")).toBeInTheDocument();
});

it("not should have launch game button if not admin", () => {
  const { queryByRole } = render(
    <Provider store={store}>
      <WaitingRoom isAdmin={false} players={players} isSolo={false} />
    </Provider>
  );

  expect(queryByRole("button")).not.toBeInTheDocument();
});
