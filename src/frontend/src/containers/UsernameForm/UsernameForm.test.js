import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import UsernameForm from "./UsernameForm";
import { useCreateUser } from "./useCreateUser";

jest.mock("./useCreateUser", () => ({
  useCreateUser: jest.fn(),
}));

describe("UsernameForm", () => {
  beforeEach(() => {
    useCreateUser.mockImplementation(() => ({
      createUser: jest.fn(),
    }));
  });

  it("should render textbox and submit button", () => {
    render(
      <Provider store={store}>
        <UsernameForm />
      </Provider>
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should write valid input", () => {
    render(
      <Provider store={store}>
        <UsernameForm />
      </Provider>
    );

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test123" } });
    expect(input.value).toBe("test123");
  });

  it("should create user on Create button click with valid args", async () => {
    render(
      <Provider store={store}>
        <UsernameForm />
      </Provider>
    );

    const promise = Promise.resolve({ valid: true, message: "" });
    const createUser = jest.fn(() => promise);
    useCreateUser.mockImplementation(() => ({ createUser }));

    const input = screen.getByRole("textbox");
    const createButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "test123" } });
    expect(input.value).toBe("test123");

    fireEvent.click(createButton);
    expect(createUser).toHaveBeenCalledWith("test123");

    await act(() => promise);
  });
});
