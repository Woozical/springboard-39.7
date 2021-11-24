import { render } from "@testing-library/react";
import Board from "./Board";

// Smoke test
test("should render without crashing", () => {
  render(<Board />);
});

// Snapshot test
test("should match snapshot", () => {
  const { asFragment } = render(<Board />);
  expect(asFragment()).toMatchSnapshot();
});