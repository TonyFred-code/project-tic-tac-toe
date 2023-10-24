function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // create a 2d array that will represent the state of the game board
  // row-0 represents top row and
  // col-0 represents left-most column
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

//  method for getting board that game's UI needs
  const getBoard = () => board;

//   logic for adding marker to the gameBoard
  const addMarker = (row, column, player) => {
    if (row >= 3 || column >= 3 || row < 0 || column < 0) {
        console.warn("invalid board selection");
        return;
    }

    // if there's a marker there already
    // return and log an error
    if (board[row][column].getValue() !== "U") {
        console.warn("cell occupied");
        return;
    }

    const cell = board[row][column];
    cell.addToken(player);

    console.log(`${player} added a marker to cell - (${row}, ${column})`);
  }

//   print board (pending UI creation)
  const printBoard = () => {
    let output = "";
    const rows = 3
    const columns = 3;

    for (let i = 0; i < rows; i++) {
        // output += "\n"
        for (let j = 0; j < columns; j++) {
         output +=  board[i][j].getValue();
        }
        output += "\n"
    }
    return output;
  }

return {
    getBoard,
    addMarker,
    printBoard,
}
}

/*
 ** A Cell represents one "square" on the board and can have one of
 ** "U": no mark placed,
 ** "X": Player One's marker,
 ** "O": Player Two's marker
 */

function Cell() {
  let value = "U";

  // Accept player's marker and change value in the cell;
  const addToken = (player) => {
    value = player;
  };

  // method for retrieving current value of cell through closure
  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}
