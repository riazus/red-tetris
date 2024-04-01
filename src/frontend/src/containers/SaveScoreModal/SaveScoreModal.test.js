import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import SaveScoreModal from "./SaveScoreModal";

const mockSocket = {
  on: (ev, callback) => {},
  off: (ev) => {},
};

it("should have save checkbox", () => {
  render(
    <Provider store={store}>
      <SaveScoreModal isOpen={true} socket={mockSocket} />
    </Provider>
  );

  expect(screen.getByRole("checkbox")).toBeInTheDocument();
});
