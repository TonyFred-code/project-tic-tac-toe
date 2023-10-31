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
  }

  return {
    getBoard,
    printBoard,
    addMarker
  };
}
