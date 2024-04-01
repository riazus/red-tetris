import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import RoomList from "./RoomList";

const { useGetAvailableRoomsQuery } = jest.requireMock("../../app/api/api");

//jest.mock("../../app/api/api/useGetAvailableRoomsQuery");

describe("RoomList", () => {
  beforeEach(() => {
    useGetAvailableRoomsQuery.mockClear();
  });

  it("should render data after API request", () => {
    const mockData = [
      { name: "testroom-1" },
      { name: "testroom-2" },
      { name: "testroom-3" },
      { name: "testroom-4" },
    ];
    useGetAvailableRoomsQuery.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <RoomList />
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
