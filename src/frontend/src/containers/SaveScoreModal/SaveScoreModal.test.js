import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { SOCKETS } from "../../const";
import { emitAppSocketEvent } from "../../sockets/socket";
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

  expect(screen.getByRole("checkbox")).toBeInTheDocument();
});

it("should be close while isOpen false", () => {
  let isOpen = false;
  render(
    <Provider store={store}>
      <SaveScoreModal isOpen={isOpen} setIsOpen={(open) => (isOpen = open)} />
    </Provider>
  );

  expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
});

it("should emit socket event while click", async () => {
  let isOpen = true;
  render(
    <Provider store={store}>
      <SaveScoreModal isOpen={isOpen} setIsOpen={(open) => (isOpen = open)} />
    </Provider>
  );

  const checkbox = screen.getByRole("checkbox", {
    name: /do you want save it?/i,
  });
  fireEvent.click(checkbox);

  const closeButton = screen.getByRole("button", { name: /close/i });
  fireEvent.click(closeButton);

  await waitFor(() =>
    expect(emitAppSocketEvent).toHaveBeenCalledWith(SOCKETS.ADD_LEADER, {
      score: expect.any(Number),
    })
  );
});
