import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++){
      initialBoard.push(Array.from({length: ncols}));
      for (let j = 0; j < ncols; j++){
        initialBoard[i][j] = Math.random() < chanceLightStartsOn ? true : false;
      }
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every( row => row.every( cell => cell === false ));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const updated = [...oldBoard];

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, updated);
      flipCell(y+1, x, updated);
      flipCell(y, x+1, updated);
      flipCell(y-1, x, updated);
      flipCell(y, x-1, updated);

      // TODO: return the copy
      return updated;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  return (<table>
    <tr>
      <th>Lights Out</th>
    </tr>
    {board.map((row, y) => <tr>
      {row.map((cellVal, x) => <Cell isLit={cellVal} coord={`${y}-${x}`} flipCellsAroundMe={flipCellsAround} />)}
    </tr>)}
  </table>)

  // TODO
}

export default Board;
