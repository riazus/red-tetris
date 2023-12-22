import { render } from "@testing-library/react";
import GameRoomForm from "./GameRoom";
import { Provider } from "react-redux";
import { store } from "../../app/store";

it("should have exit room button", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <GameRoomForm />
    </Provider>
  );

  expect(getByRole("button")).toBeInTheDocument();
});
