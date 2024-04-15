import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import CreateRoomModal from "./CreateRoomModal";
import { useCreateRoom } from "./useCreateRoom";

jest.mock("./useCreateRoom", () => ({
  useCreateRoom: jest.fn(),
}));

describe("CreateRoomModal", () => {
  beforeEach(() => {
    useCreateRoom.mockImplementation(() => ({
      createRoom: jest.fn(() => ({
        valid: true,
        message: "",
      })),
      reset: jest.fn(),
    }));
  });

  it("should render create room modal", () => {
    render(
      <Provider store={store}>
        <CreateRoomModal isOpen={true} />
      </Provider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByText(/room name/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
    expect(screen.getByText(/is solo/i)).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("should write valid input", () => {
    render(
      <Provider store={store}>
        <CreateRoomModal isOpen={true} />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test123" } });
    expect(input.value).toBe("test123");
  });

  it("should change checkbox", () => {
    render(
      <Provider store={store}>
        <CreateRoomModal isOpen={true} />
      </Provider>
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
  });

  it("should create room on Create button click with valid args", async () => {
    const handleRequestClose = jest.fn();
    render(
      <Provider store={store}>
        <CreateRoomModal isOpen={true} onRequestClose={handleRequestClose} />
      </Provider>
    );

    const promise = Promise.resolve({ valid: true, message: "" });
    const createRoom = jest.fn(() => promise);
    createRoom.mockImplementation(() => ({
      unwrap: () => ({ valid: true, message: "" }),
    }));
    const reset = jest.fn();
    useCreateRoom.mockImplementation(() => ({ createRoom, reset }));

    const input = screen.getByRole("textbox");
    const createButton = screen.getByRole("button", { name: /create/i });

    fireEvent.change(input, { target: { value: "test123" } });
    expect(input.value).toBe("test123");

    fireEvent.click(createButton);
    expect(createRoom).toHaveBeenCalledWith({
      roomName: "test123",
      isSolo: false,
    });

    await act(() => promise);
  });

  it("should create room on Create button click with invalid args", async () => {
    const handleRequestClose = jest.fn();
    render(
      <Provider store={store}>
        <CreateRoomModal isOpen={true} onRequestClose={handleRequestClose} />
      </Provider>
    );

    const promise = Promise.resolve({
      valid: false,
      message: "test invalid room",
    });
    const createRoom = jest.fn(() => promise);
    createRoom.mockImplementation(() => ({
      unwrap: () => ({
        valid: false,
        message: "call create room with invalid args",
      }),
    }));
    const reset = jest.fn();
    useCreateRoom.mockImplementation(() => ({ createRoom, reset }));

    const input = screen.getByRole("textbox");
    const createButton = screen.getByRole("button", { name: /create/i });

    fireEvent.change(input, { target: { value: "test123" } });
    expect(input.value).toBe("test123");

    fireEvent.click(createButton);
    expect(createRoom).toHaveBeenCalledWith({
      roomName: "test123",
      isSolo: false,
    });

    await act(() => promise);
  });
});
