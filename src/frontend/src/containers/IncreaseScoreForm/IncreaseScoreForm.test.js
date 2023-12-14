import { render } from "@testing-library/react";
import IncreaseScoreForm from "./IncreaseScoreForm";
import { Provider } from "react-redux";
import { store } from "../../app/store";

it("should have increase and reduce buttons", () => {
  const { getByText, getAllByRole } = render(
    <Provider store={store}>
      <IncreaseScoreForm />
    </Provider>
  );

  expect(getAllByRole("button").length).toBe(2);
  expect(getByText("+")).toBeInTheDocument();
  expect(getByText("-")).toBeInTheDocument();
});

it("should have count for increase input", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <IncreaseScoreForm />
    </Provider>
  );

  expect(getByRole("spinbutton")).toBeInTheDocument();
});
