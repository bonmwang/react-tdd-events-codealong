import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import '@testing-library/jest-dom';

test("pizza checkbox is initially unchecked", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  expect(addPepperoni).not.toBeChecked();
});

test("toppings list initially contains only cheese", () => {
  render(<App />);
  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(1);
  expect(listItems[0]).toHaveTextContent("Cheese");
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});

test("checkboxes become checked when user clicks them", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  userEvent.click(addPepperoni);
  expect(addPepperoni).toBeChecked();
});

test("topping appears in toppings list when checked", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  userEvent.click(addPepperoni);
  
  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(2);
  expect(listItems[0]).toHaveTextContent("Cheese");
  expect(listItems[1]).toHaveTextContent("Pepperoni");
});

test("selected topping disappears when checked a second time", () => {
  render(<App />);
  const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });
  
  // First click adds pepperoni
  userEvent.click(addPepperoni);
  
  // Second click removes it
  userEvent.click(addPepperoni);
  
  const listItems = screen.getAllByRole("listitem");
  expect(listItems.length).toBe(1);
  expect(listItems[0]).toHaveTextContent("Cheese");
  expect(screen.queryByText("Pepperoni")).not.toBeInTheDocument();
});