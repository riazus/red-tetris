import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import userReducer from "../../app/slices/playerSlice";
import { store } from "../../app/store";
import { SOCKETS } from "../../const";
import { emitAppSocketEvent } from "../../sockets/socket";
import SaveScoreModal from "./SaveScoreModal";

jest.mock("../../sockets/socket", () => {
  return { emitAppSocketEvent: jest.fn() };
});

describe("SaveScoreModal", () => {
  it("should have cancel and save buttons", () => {
    let isOpen = true;
    render(
      <Provider store={store}>
        <SaveScoreModal isOpen={isOpen} setIsOpen={(open) => (isOpen = open)} />
      </Provider>
    );

    expect(
      screen.getByRole("button", {
        name: /save/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /cancel/i,
      })
    ).toBeInTheDocument();
  });

  it("should have redux score", () => {
    let isOpen = true;
    const testStore = configureStore({
      reducer: { player: userReducer },
      preloadedState: {
        player: {
          score: 50,
        },
      },
    });

    render(
      <Provider store={testStore}>
        <SaveScoreModal isOpen={isOpen} setIsOpen={(open) => (isOpen = open)} />
      </Provider>
    );

    expect(screen.getByText(/50/i)).toBeInTheDocument();
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

    const button = screen.getByRole("button", {
      name: /save/i,
    });
    fireEvent.click(button);

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    await waitFor(() =>
      expect(emitAppSocketEvent).toHaveBeenCalledWith(SOCKETS.ADD_LEADER, {
        score: expect.any(Number),
      })
    );
  });
});
