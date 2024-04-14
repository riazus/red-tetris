import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import UsernameForm from "./UsernameForm";

describe("UsernameForm", () => {
  it("should render textbox and submit button", () => {
    render(
      <Provider store={store}>
        <UsernameForm />
      </Provider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
