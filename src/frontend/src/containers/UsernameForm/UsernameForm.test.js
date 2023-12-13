import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import UsernameForm from "./UsernameForm";

it("should have textbox input", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <UsernameForm />
    </Provider>
  );

  expect(getByRole("textbox")).toBeInTheDocument();
  expect(getByRole("button")).toBeInTheDocument();
});
