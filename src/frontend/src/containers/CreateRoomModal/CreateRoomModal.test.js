import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import CreateRoomModal from "./CreateRoomModal";

it("should have create button", () => {
  const { getByRole, getByText } = render(
    <Provider store={store}>
      <CreateRoomModal isOpen={true} />
    </Provider>
  );

  expect(getByRole("button")).toBeInTheDocument();
  expect(getByText("Create")).toBeInTheDocument();
});