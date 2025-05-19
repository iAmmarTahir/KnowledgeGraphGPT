import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

// Mock Graph to isolate App testing
jest.mock("../Graph", () => () => <div data-testid="graph-mock" />);

test("renders app UI and interacts with key input fields", () => {
  render(<App />);

  // Check for title
  expect(screen.getByText(/KnowledgeGraph GPT/i)).toBeInTheDocument();

  // Check for prompt input
  const promptInput = screen.getByPlaceholderText("Enter your prompt");
  expect(promptInput).toBeInTheDocument();

  // Check for API key input
  const apiKeyInput = screen.getByPlaceholderText("Enter your OpenAI API Key");
  expect(apiKeyInput).toBeInTheDocument();

  // Check for Generate button and that it's initially disabled
  const generateButton = screen.getByRole("button", { name: /generate/i });
  expect(generateButton).toBeDisabled();

  // Simulate entering API key to enable button
  fireEvent.change(apiKeyInput, { target: { value: "sk-test" } });
  expect(generateButton).not.toBeDisabled();

  // Check that Graph is rendered
  expect(screen.getByTestId("graph-mock")).toBeInTheDocument();
});
