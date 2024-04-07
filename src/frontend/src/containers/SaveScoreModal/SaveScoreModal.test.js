import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import SaveScoreModal from "./SaveScoreModal";

jest.mock("../../sockets/socket", () => {
  return { emitAppSocketEvent: jest.fn() };
});

it("should have save checkbox while opened", () => {
  let isOpen = true;
  render(
    <Provider store={store}>
      <SaveScoreModal isOpen={isOpen} setIsOpen={(open) => (isOpen = open)} />
    </Provider>
  );

it("should have save checkbox", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <SaveScoreModal isOpen={true} socket={mockSocket} />
    </Provider>
  );

  expect(getByRole("checkbox")).toBeInTheDocument();
});
