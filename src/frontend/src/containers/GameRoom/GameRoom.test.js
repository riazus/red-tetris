import { render } from "@testing-library/react";
import GameRoomForm from "./GameRoom";
import { Provider } from "react-redux";
import { store } from "../../app/store";

it("should have increase and reduce buttons", () => {
  const { getByText, getAllByRole } = render(
    <Provider store={store}>
      <GameRoomForm />
    </Provider>
  );

  expect(getAllByRole("button").length).toBe(2);
  expect(getByText("+")).toBeInTheDocument();
  expect(getByText("-")).toBeInTheDocument();
});

it("should have count for increase input", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <GameRoomForm />
    </Provider>
  );

  expect(getByRole("spinbutton")).toBeInTheDocument();
});
