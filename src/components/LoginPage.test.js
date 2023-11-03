import { render, screen, fireEvent } from "@testing-library/react";
import LoginPage from "./LoginPage";

describe("LoginPage component", () => {
  test("renders Login heading", () => {
    render(<LoginPage />);
    const headingElement = screen.getByText("Login");
    expect(headingElement).toBeInTheDocument();
  });

  test("renders Email label and input field", () => {
    render(<LoginPage />);
    const emailLabelElement = screen.getByLabelText("Your Email");
    const emailInputElement = screen.getByRole("textbox", { name: "Your Email" });
    expect(emailLabelElement).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
  });

  test("renders Password label and input field", () => {
    render(<LoginPage />);
    const passwordLabelElement = screen.getByLabelText("Your Password");
    const passwordInputElement = screen.getByLabelText("Your Password");
    expect(passwordLabelElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
  });

  test("renders Create Account button", () => {
    render(<LoginPage />);
    const createAccountButtonElement = screen.getByRole("button", { name: "Create Account" });
    expect(createAccountButtonElement).toBeInTheDocument();
  });

  test("toggles between Login and Sign Up headings", () => {
    render(<LoginPage />);
    const toggleButtonElement = screen.getByRole("button", { name: "Create new account" });

    fireEvent.click(toggleButtonElement);
    expect(screen.getByText("Sign Up")).toBeInTheDocument();

    fireEvent.click(toggleButtonElement);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("displays Confirm Password field when Sign Up is selected", () => {
    render(<LoginPage />);
    const toggleButtonElement = screen.getByRole("button", { name: "Create new account" });

    fireEvent.click(toggleButtonElement);
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  test("shows and hides password when Show/Hide is clicked", () => {
    render(<LoginPage />);
    const passwordInput = screen.getByLabelText("Your Password");
    const toggleShowHideElement = screen.getByText("Show");

    fireEvent.click(toggleShowHideElement);
    expect(passwordInput.getAttribute("type")).toBe("text");

    fireEvent.click(toggleShowHideElement);
    expect(passwordInput.getAttribute("type")).toBe("password");
  });

  test("displays Loading message while submitting form", () => {
    render(<LoginPage />);
    const submitButtonElement = screen.getByRole("button", { name: "Login" });

    fireEvent.click(submitButtonElement);
    expect(screen.getByText("Sending request...")).toBeInTheDocument();
  });

  test("alerts on password mismatch when signing up", () => {
    render(<LoginPage />);
    const toggleButtonElement = screen.getByRole("button", { name: "Create new account" });
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButtonElement = screen.getByRole("button", { name: "Create Account" });

    fireEvent.click(toggleButtonElement);
    fireEvent.change(confirmPasswordInput, { target: { value: "password123" } });
    fireEvent.click(submitButtonElement);

    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith("Passwords do not match.");
  });

  test("triggers forgot password functionality", () => {
    render(<LoginPage />);
    const forgotPasswordButtonElement = screen.getByRole("button", { name: "Forgot Password" });

    fireEvent.click(forgotPasswordButtonElement);
  });
});