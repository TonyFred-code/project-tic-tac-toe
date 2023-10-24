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
  const addMarker = (row, column, playerMarker) => {
    if (row >= 3 || column >= 3 || row < 0 || column < 0) {
      console.warn("invalid board selection");
      return false;
    }

    // if there's a marker there already
    // return and log an error
    if (board[row][column].getValue() !== "U") {
      console.warn("cell occupied");
      return false;
    }

    const cell = board[row][column];
    cell.addToken(playerMarker);

    console.log(`Marker ${playerMarker} to cell - (${row}, ${column})`);
    return true;
  };

  //   print board (pending UI creation)
  const printBoard = () => {
    let output = "";
    const rows = 3;
    const columns = 3;

    for (let i = 0; i < rows; i++) {
      // output += "\n"
      for (let j = 0; j < columns; j++) {
        output += board[i][j].getValue();
      }
      output += "\n";
    }
    return output;
  };

  return {
    getBoard,
    addMarker,
    printBoard,
  };
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
  const addToken = (marker) => {
    value = marker;
  };

  // method for retrieving current value of cell through closure
  const getValue = () => value;

  return {
    addToken,
    getValue,
  };
}

// creating players for playing game
function Player(name, marker) {
  const getName = () => name;

  const getMarker = () => marker;

  return {
    getMarker,
    getName,
  };
}

function GameController() {
  const board = GameBoard();

  const players = [
    {
      name: "Player One",
      marker: "X",
    },
    {
      name: "Player Two",
      marker: "O",
    },
  ];

  let activePlayer = players[0];

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    console.log(board.printBoard());
    console.log(`${getActivePlayer().name}'s Turn`)
  }

  const makeMove = (row, column) => {
     console.log(`Fixing ${getActivePlayer().name}'s Marker in Row - ${row} Column ${column}`);

     const markerAdded = board.addMarker(row, column, getActivePlayer().marker);

     if (!markerAdded) {
        console.log("failed to add marker");
        return;
     }

// check for win and tie
// display appropriate message
     switchActivePlayer();
     printNewRound();
  }

  printNewRound();

  return {
    getActivePlayer,
    makeMove,
    getBoard: board.getBoard,
  }
}
