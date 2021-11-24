import { render } from "@testing-library/react";
import App from "./App";

// Smoke test
test("should render without crashing", () => {
  render(<App />);
});

// Snapshot test
test("should match snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});