import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import UsernameForm from "./UsernameForm";

it("should have textbox input", () => {
  render(
    <Provider store={store}>
      <UsernameForm />
    </Provider>
  );

  expect(screen.getByRole("textbox")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});
