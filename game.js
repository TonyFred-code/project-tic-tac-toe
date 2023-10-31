/*
 ** A Cell represents one "square" on the board and can have one of
 ** "-": no mark placed,
 ** "X": Player One's marker,
 ** "O": Player Two's marker
 */

function Cell() {
  let value = "-"; // dash chosen as default cell marker;
  const defaultValue = value;

  // Accept player's marker and change value in the cell;
  const addToken = (marker) => {
    value = marker;
  };

  // method for retrieving current value of cell through closure
  const getValue = () => value;

  const getDefaultValue = () => defaultValue;

  return {
    addToken,
    getValue,
    getDefaultValue,
  };
}

/*
0 | 1 | 2
---------
3 | 4 | 5
---------
6 | 7 | 8

- Board Created by Game Board;

*/

function GameBoard() {
  let board = [];

  for (let i = 0; i < 9; i++) {
    let cell = Cell();
    board.push(cell);
  }

  const getBoard = () => board;

  const printBoard = () => {
    let output = "";

    for (let i = 0; i < 3; i++) {
      output += `${board[i * 3].getValue()} ${board[
        i * 3 + 1
      ].getValue()} ${board[i * 3 + 2].getValue()}`;
      output += "\n";
    }

    return output;
  };

  const addMarker = (cellPosition, playerMarker) => {
    if (cellPosition < 0 || cellPosition >= 9) {
      console.warn("Invalid Cell Position value");
      return false;
    }

    if (playerMarker !== "X" && playerMarker !== "O") {
      console.warn("Marker not Valid in Tic Tac Toe");
      return false;
    }

    let cell = board[cellPosition];

    if (cell.getValue() !== cell.getDefaultValue()) {
      console.warn("There's a marker here already");
      return false;
    }

    cell.addToken(playerMarker);

    return true;
  };

  const rowWin = () => {
    let rows = {
      row0: false,
      row1: false,
      row2: false,
    };

    let rowWins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ];

    let firstCellMarker,
      secondCellMarker,
      thirdCellMarker,
      firstCellDefaultMarker,
      secondCellDefaultMarker,
      thirdCellDefaultMarker;

    for (let i = 0; i < 3; i++) {
      firstCellMarker = board[rowWins[i][0]].getValue();
      secondCellMarker = board[rowWins[i][1]].getValue();
      thirdCellMarker = board[rowWins[i][2]].getValue();
      firstCellDefaultMarker = board[rowWins[i][0]].getDefaultValue();
      secondCellDefaultMarker = board[rowWins[i][1]].getDefaultValue();
      thirdCellDefaultMarker = board[rowWins[i][2]].getDefaultValue();

      if (
        firstCellMarker === firstCellDefaultMarker ||
        secondCellMarker === secondCellDefaultMarker ||
        thirdCellMarker === thirdCellDefaultMarker
      ) {
        continue;
      }

      if (
        firstCellMarker === secondCellMarker &&
        secondCellMarker === thirdCellMarker
      ) {
        rows[`row${i}`] = rowWins[i];
      }
    }

    return rows;
  };

  const columnWin = () => {
    let columns = {
      column0: false,
      column1: false,
      column2: false,
    };

    let columnWins = [
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    let firstCellMarker,
      secondCellMarker,
      thirdCellMarker,
      firstCellDefaultMarker,
      secondCellDefaultMarker,
      thirdCellDefaultMarker;

    for (let i = 0; i < 3; i++) {
      firstCellMarker = board[columnWins[i][0]].getValue();
      secondCellMarker = board[columnWins[i][1]].getValue();
      thirdCellMarker = board[columnWins[i][2]].getValue();
      firstCellDefaultMarker = board[columnWins[i][0]].getDefaultValue();
      secondCellDefaultMarker = board[columnWins[i][1]].getDefaultValue();
      thirdCellDefaultMarker = board[columnWins[i][2]].getDefaultValue();

      if (
        firstCellMarker === firstCellDefaultMarker ||
        secondCellMarker === secondCellDefaultMarker ||
        thirdCellMarker === thirdCellDefaultMarker
      ) {
        continue;
      }

      if (
        firstCellMarker === secondCellMarker &&
        secondCellMarker === thirdCellMarker
      ) {
        columns[`column${i}`] = columnWins[i];
      }
    }

    return columns;
  };

  return {
    getBoard,
    printBoard,
    addMarker,
    rowWin,
    columnWin,
  };
}
