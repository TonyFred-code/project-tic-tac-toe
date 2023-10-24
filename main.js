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
    if (board[row][column].getValue() !== "-") {
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
 ** "-": no mark placed,
 ** "X": Player One's marker,
 ** "O": Player Two's marker
 */

function Cell() {
  let value = "-";

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

  //   replace with logic for getting custom player details
  //   using Players factory function
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
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    console.log(board.printBoard());
    console.log(`${getActivePlayer().name}'s Turn`);
  };

  const checkRow = (row, marker) => {
    for (let i = 0; i < 3; i++) {
      if (row[i].getValue() !== marker) {
        return false;
      }
    }

    return true;
  };

  const checkColumn = (board, colIndex, marker) => {
    for (let i = 0; i < 3; i++) {
      if (board[i][colIndex].getValue() !== marker) {
        return false;
      }
    }

    return true;
  };

  const checkTie = (board, defaultMarker) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] === defaultMarker) {
          return false;
        }
      }
    }

    return true;
  };

  const checkBoardStatus = () => {
    const currentBoard = board.getBoard();
    const playerMarker = getActivePlayer().marker;
    console.log("checking for wins and ties");
    let colWin =
      checkColumn(currentBoard, 0, playerMarker) ||
      checkColumn(currentBoard, 1, playerMarker) ||
      checkColumn(currentBoard, 2, playerMarker);
    let rowWin =
      checkRow(currentBoard[0], playerMarker) ||
      checkRow(currentBoard[1], playerMarker) ||
      checkRow(currentBoard[2], playerMarker);

    let diagonalLeftToRightWin =
      currentBoard[0][0].getValue() === playerMarker &&
      currentBoard[1][1].getValue() === playerMarker &&
      currentBoard[2][2].getValue() === playerMarker;

    let diagonalRightToLeftWin =
      currentBoard[0][2].getValue() === playerMarker &&
      currentBoard[1][1].getValue() === playerMarker &&
      currentBoard[2][0].getValue() === playerMarker;

    return {
      colWin,
      rowWin,
      diagonalLeftToRightWin,
      diagonalRightToLeftWin,
    };
  };

  let moveCount = 0;

  const makeMove = (row, column) => {
    console.log(
      `Fixing ${
        getActivePlayer().name
      }'s Marker in Row - ${row} Column ${column}`
    );

    const markerAdded = board.addMarker(row, column, getActivePlayer().marker);

    if (!markerAdded) {
      console.log("failed to add marker");
      return;
    }
    // count move
    moveCount++;

    // check for win and tie
    // display appropriate message
    let boardStatus = null;
    // it's gonna be a tie at this point.
    if (moveCount >= 9) {
      boardStatus = checkTie(board.getBoard(), "-");
      console.log("it's a tie");
    }
    // check to reduce a little how many checks are performed
    if (moveCount >= 5) {
      boardStatus = checkBoardStatus();
      console.table(boardStatus);

      if (
        boardStatus.colWin ||
        boardStatus.diagonalLeftToRightWin ||
        boardStatus.diagonalRightToLeftWin ||
        boardStatus.rowWin
      ) {
        console.log(`${getActivePlayer().name} wins in ${moveCount} moves using "${getActivePlayer().marker}" as marker`);
        return;
      }
    }
    switchActivePlayer();
    printNewRound();
  };

  printNewRound();

  return {
    getActivePlayer,
    makeMove,
    getBoard: board.getBoard,
  };
}

function ScreenController() {
    let gameController = GameController();
    const board = document.querySelector(".game-board");

    // <button  class="cell" data-row="0" data-column="0" data-marker="X">X</button>
    //
    const renderBoard = () => {
        const gameBoard = gameController.getBoard();
        board.textContent = "";
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cellVal = gameBoard[i][j].getValue();
                const button = document.createElement("button");
                button.classList.add("cell");
                button.setAttribute("data-row", `${i}`);
                button.setAttribute("data-column", `${j}`);
                button.setAttribute("data-marker", `${cellVal}`);

                button.innerHTML = `${cellVal === "-" ? "&nbsp;": cellVal}`;
                board.appendChild(button);
            }
        }
    }
    console.log(board);
    renderBoard();
}

ScreenController();
