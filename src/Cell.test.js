import { render } from "@testing-library/react";
import Cell from "./Cell";

// Smoke test
test("should render without crashing", () => {
  const tableRow = document.createElement('table').appendChild(
    document.createElement('tr')
  );
  render(<Cell />, {container: document.body.appendChild(tableRow)});
});

// Snapshot test
test("should match snapshot", () => {
  const tableRow = document.createElement('table').appendChild(
    document.createElement('tr')
  );
  const { asFragment } = render(<Cell />, {container: document.body.appendChild(tableRow)});
  expect(asFragment()).toMatchSnapshot();
});