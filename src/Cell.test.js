import { render, fireEvent } from "@testing-library/react";
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

test("should execute callback in 'flipCellsAroundMe' prop on click", () => {
  const tableRow = document.createElement('table').appendChild(
    document.createElement('tr')
  );

  let x = 0;
  const foo = () => {x = 5};

  const r = render(<Cell flipCellsAroundMe={foo} />, {container: document.body.appendChild(tableRow)});
  expect(x).toEqual(0);
  fireEvent.click(r.getByTestId("cell"));
  expect(x).toBe(5);
});