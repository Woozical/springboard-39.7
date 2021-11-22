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

function Board({ nrows, ncols, initialActivations }) {
  const [board, setBoard] = useState(createBoard);

  /** create a board nrows high/ncols wide, with a initialActivations number of randomly-determined cells activated */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++){
      initialBoard.push(Array.from({length: ncols}));
      for (let j = 0; j < ncols; j++){
        initialBoard[i][j] = false;
      }
    } 
    for (let n = 0; n < initialActivations; n++){
      const x = Math.floor(Math.random() * ncols);
      const y = Math.floor(Math.random() * nrows);
      initialBoard = flipCellsAround(`${y}-${x}`, false, initialBoard);
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every( row => row.every( cell => cell === false ));
  }

  function flipCellsAround(coord, stateUpdate=true, oldBoard=board){
    const [y, x] = coord.split("-").map(Number);
    const flipCell = (y, x, boardCopy) => {
      // if this coord is actually on the board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        boardCopy[y][x] = !boardCopy[y][x];
      }
    };
    const updated = [...oldBoard];
    flipCell(y, x, updated);
    flipCell(y+1, x, updated);
    flipCell(y, x+1, updated);
    flipCell(y-1, x, updated);
    flipCell(y, x-1, updated);

    if (stateUpdate){
      setBoard(updated);
      return;
    } else {
      return updated;
    }
  }

  function resetGame(){
    setBoard( () => createBoard() );
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()){
    return (
      <div>
        <h1>You win!</h1>
        <button onClick={resetGame}>Restart</button>
      </div>
    )
  }

  // make table board
  return (
  <table className="Board">
    <thead>
      <tr>
        <th colSpan={ncols}>Lights Out</th>
      </tr>
    </thead>
    <tbody>
    {board.map((row, y) => <tr key={y}>
      {row.map((cellVal, x) => <Cell key={`${y}-${x}`} isLit={cellVal} coord={`${y}-${x}`} flipCellsAroundMe={flipCellsAround} />)}
    </tr>)}
    </tbody>
  </table>)
}

Board.defaultProps = {
  nrows: 3, ncols: 3, chanceLightStartsOn: 0.5
}

export default Board;
