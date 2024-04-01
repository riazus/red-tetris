import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import CreateRoomModal from "./CreateRoomModal";

it("should have create button", () => {
  render(
    <Provider store={store}>
      <CreateRoomModal isOpen={true} />
    </Provider>
  );

  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("Create")).toBeInTheDocument();
});
