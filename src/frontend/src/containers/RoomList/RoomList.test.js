import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import RoomList from "./RoomList";
import { useGetAvailableRooms } from "./useGetAvailableRooms";

jest.mock("./useGetAvailableRooms", () => ({
  useGetAvailableRooms: jest.fn(),
}));

jest.mock(
  "../CreateRoomModal/CreateRoomModal",
  () =>
    function CreateRoomModal({ isOpen, onRequestClose }) {
      return isOpen && <button onClick={onRequestClose}>close modal</button>;
    }
);

describe("RoomList", () => {
  beforeEach(() => {
    useGetAvailableRooms.mockImplementation(() => ({}));
  });

  it("should render table data when data is ready", () => {
    const mockData = [
      { name: "testroom-1", isSolo: true },
      { name: "testroom-2", isSolo: false },
      { name: "testroom-3", isSolo: true },
      { name: "testroom-4", isSolo: true },
    ];

    useGetAvailableRooms.mockImplementation(() => ({
      rooms: mockData,
      isLoading: false,
    }));

    render(
      <Provider store={store}>
        <RoomList />
      </Provider>
    );

    expect(screen.getByTestId("rooms-data")).toBeInTheDocument();
  });

  it("should render waiting text while fetching", () => {
    useGetAvailableRooms.mockImplementation(() => ({
      isLoading: true,
    }));

    render(
      <Provider store={store}>
        <RoomList />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("should open create room modal on click", () => {
    const mockData = [{ name: "testroom-1", isSolo: true }];

    useGetAvailableRooms.mockImplementation(() => ({
      rooms: mockData,
      isLoading: false,
    }));

    render(
      <Provider store={store}>
        <RoomList />
      </Provider>
    );

    expect(screen.getByTestId("rooms-data")).toBeInTheDocument();
    const createRoomButton = screen.getByTestId("create-room-button");
    act(() => createRoomButton.click());
    const closeModalButton = screen.getByText(/close modal/i);
    act(() => closeModalButton.click());
  });
});
