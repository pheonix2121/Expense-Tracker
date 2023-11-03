import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileCompletion } from "../store/AuthRedux";
import { getProfileData, updateProfile } from "../store/AuthApi";
import Profile from "./Profile";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../store/AuthApi", () => ({
  getProfileData: jest.fn(),
  updateProfile: jest.fn(),
}));

describe("Profile component", () => {
  beforeEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
    getProfileData.mockClear();
    updateProfile.mockClear();
  });

  test("renders Profile heading", () => {
    render(<Profile />);
    const headingElement = screen.getByText("Profile");
    expect(headingElement).toBeInTheDocument();
  });

  test("updates fullName state when input changes", () => {
    render(<Profile />);
    const fullNameInput = screen.getByLabelText("Full Name");
    const testValue = "John Doe";
    fireEvent.change(fullNameInput, { target: { value: testValue } });
    expect(fullNameInput).toHaveValue(testValue);
  });

  test("updates photoURL state when input changes", () => {
    render(<Profile />);
    const photoURLInput = screen.getByLabelText("Photo URL");
    const testValue = "https://example.com/user.jpg";
    fireEvent.change(photoURLInput, { target: { value: testValue } });
    expect(photoURLInput).toHaveValue(testValue);
  });

  test("displays alert when form is submitted with empty fields", () => {
    render(<Profile />);
    const submitButton = screen.getByRole("button", { name: "Update Profile" });
    fireEvent.click(submitButton);
    expect(window.alert).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith("Please enter full name and photo URL.");
  });

  test("dispatches updateProfileCompletion action after successful profile update", async () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({ auth: { token: "dummyToken" } });
    updateProfile.mockResolvedValueOnce({ /* mock response object */ });
    getProfileData.mockResolvedValueOnce({ users: [{ displayName: "John Doe", photoUrl: "https://example.com/user.jpg" }] });

    render(<Profile />);
    const fullNameInput = screen.getByLabelText("Full Name");
    const photoURLInput = screen.getByLabelText("Photo URL");
    const submitButton = screen.getByRole("button", { name: "Update Profile" });

    fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
    fireEvent.change(photoURLInput, { target: { value: "https://example.com/user.jpg" } });
    fireEvent.click(submitButton);

    expect(updateProfile).toHaveBeenCalledWith({
      idToken: "dummyToken",
      fullName: "John Doe",
      photoURL: "https://example.com/user.jpg",
    });

    expect(getProfileData).toHaveBeenCalledWith("dummyToken");

    await screen.findByText("Profile");
    expect(mockDispatch).toHaveBeenCalledWith(updateProfileCompletion({
      displayName: "John Doe",
      photoUrl: "https://example.com/user.jpg",
    }));

    expect(fullNameInput).toHaveValue("");
    expect(photoURLInput).toHaveValue("");
  });
});
