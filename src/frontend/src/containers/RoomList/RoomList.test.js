import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import RoomList from "./RoomList";

it("should have create room button", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <RoomList />
    </Provider>
  );

  //expect(getByRole("button")).toBeInTheDocument();
});
