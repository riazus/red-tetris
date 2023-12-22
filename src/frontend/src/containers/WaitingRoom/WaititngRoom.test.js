import { render } from "@testing-library/react";
import WaitingRoom from "./WaitingRoom";

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

it("should have launch game button if admin", () => {
  const { getByRole } = render(
    <WaitingRoom isAdmin={true} players={players} />
  );

  expect(getByRole("button")).toBeInTheDocument();
});

it("not should have launch game button if not admin", () => {
  const { queryByRole } = render(
    <WaitingRoom isAdmin={false} players={players} />
  );

  expect(queryByRole("button")).not.toBeInTheDocument();
});
