import { render, screen } from "@testing-library/react";
import AddItem from "./AddItems";

describe("AddItem component", () => {
  test("renders Add Item heading", () => {
    render(<AddItem />);
    const headingElement = screen.getByText("Add Item");
    expect(headingElement).toBeInTheDocument();
  });

  test("renders Spent Amount label", () => {
    render(<AddItem />);
    const labelElement = screen.getByLabelText("Spent Amount");
    expect(labelElement).toBeInTheDocument();
  });

  test("renders Description label", () => {
    render(<AddItem />);
    const labelElement = screen.getByLabelText("Description");
    expect(labelElement).toBeInTheDocument();
  });

  test("renders Category label", () => {
    render(<AddItem />);
    const labelElement = screen.getByLabelText("Category:");
    expect(labelElement).toBeInTheDocument();
  });

  test("renders Add button", () => {
    render(<AddItem />);
    const buttonElement = screen.getByRole("button", { name: "Add" });
    expect(buttonElement).toBeInTheDocument();
  });

  test("displays initial input values as empty strings", () => {
    render(<AddItem />);
    const amountInput = screen.getByLabelText("Spent Amount");

    expect(amountInput).toHaveValue("");
  });

  test("updates state when entering amount", () => {
    render(<AddItem />);
    const amountInput = screen.getByLabelText("Spent Amount");
    const testValue = "100";
    fireEvent.change(amountInput, { target: { value: testValue } });
    expect(amountInput).toHaveValue(testValue);
  });

  test("updates state when entering description", () => {
    render(<AddItem />);
    const descriptionInput = screen.getByLabelText("Description");
    const testValue = "Test description";
    fireEvent.change(descriptionInput, { target: { value: testValue } });
    expect(descriptionInput).toHaveValue(testValue);
  });

  test("updates state when selecting category", () => {
    render(<AddItem />);
    const categoryInput = screen.getByLabelText("Category:");
    const testValue = "Food";
    fireEvent.change(categoryInput, { target: { value: testValue } });
    expect(categoryInput).toHaveValue(testValue);
  });

  test("displays alert when submitting with empty fields", () => {
    render(<AddItem />);
    const buttonElement = screen.getByRole("button", { name: "Add" });
    fireEvent.click(buttonElement);
    const alertElement = screen.getByText("Please fill in all fields.");
    expect(alertElement).toBeInTheDocument();
  });
});