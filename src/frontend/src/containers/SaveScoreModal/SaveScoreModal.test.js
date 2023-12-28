import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import SaveScoreModal from "./SaveScoreModal";

const mockSocket = {
  on: (ev, callback) => {},
  off: (ev) => {},
};

it("should have save checkbox", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <SaveScoreModal isOpen={true} socket={mockSocket} />
    </Provider>
  );

  expect(getByRole("checkbox")).toBeInTheDocument();
});
