import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import CreateRoomModal from "./CreateRoomModal";

it("should have room name input", () => {
  render(
    <Provider store={store}>
      <CreateRoomModal isOpen={true} />
    </Provider>
  );

  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByText(/room name/i)).toBeInTheDocument();
});

it("should have create button", () => {
  render(
    <Provider store={store}>
      <CreateRoomModal isOpen={true} />
    </Provider>
  );

  expect(screen.getByRole("button")).toBeInTheDocument();
  expect(screen.getByText("Create")).toBeInTheDocument();
});

it("should have is solo checkbox", () => {
  render(
    <Provider store={store}>
      <CreateRoomModal isOpen={true} />
    </Provider>
  );

  expect(screen.getByText(/is solo/i)).toBeInTheDocument();
  expect(screen.getByRole("checkbox")).toBeInTheDocument();
});
