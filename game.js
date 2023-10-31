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

  const diagonalWin = () => {
    let diagonals = {
      diagonal0: false,
      diagonal1: false,
      diagonal2: false,
    };

    let diagonalWins = [
      [0, 3, 6],
      [1, 4, 7],
    ];

    let firstCellMarker,
      secondCellMarker,
      thirdCellMarker,
      firstCellDefaultMarker,
      secondCellDefaultMarker,
      thirdCellDefaultMarker;

    for (let i = 0; i < 2; i++) {
      firstCellMarker = board[diagonalWins[i][0]].getValue();
      secondCellMarker = board[diagonalWins[i][1]].getValue();
      thirdCellMarker = board[diagonalWins[i][2]].getValue();
      firstCellDefaultMarker = board[diagonalWins[i][0]].getDefaultValue();
      secondCellDefaultMarker = board[diagonalWins[i][1]].getDefaultValue();
      thirdCellDefaultMarker = board[diagonalWins[i][2]].getDefaultValue();

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
        diagonals[`diagonal${i}`] = diagonalWins[i];
      }
    }

    return diagonals;
  };

  const drawGame = () => {
    for (let i = 0; i < 9; i++) {
      let cell = board[i];
      let marker = cell.getValue();
      if (marker === cell.getDefaultValue()) {
        return false;
      }
    }

    return true;
  };

  return {
    getBoard,
    printBoard,
    addMarker,
    rowWin,
    columnWin,
    diagonalWin,
    drawGame,
  };
}

// creating players for playing game
function Player(name, marker) {
  let playerName = name.trim();

  const getName = () => playerName;

  const getMarker = () => marker;

  return {
    getMarker,
    getName,
  };
}

// creating human player
function HumanPlayer(name, marker) {
  const player = Player(name, marker);

  return Object.assign({}, player);
}

// allows add one choice making logic for bot move making
function Computer(name, marker) {
  const player = Player(name, marker);

  const getRndInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getValidMoves = (board) => {
    const validMoves = [];

    for (let i = 0; i < 9; i++) {
      const cell = board[i];
      if (cell.getValue() !== cell.getDefaultValue()) continue;
      validMoves.push(i);
    }

    return validMoves;
  };

  const getChoice = (board) => {
    if (!board) return;

    const validMoves = getValidMoves(board);
    const index = getRndInt(0, validMoves.length - 1);
    const move = validMoves[index];
    return move;
  };

  const getSmartChoice = (board, botMarker, opponentMarker) => {
    // board is an array of all cells on board currently
    // each cell is an object with two methods
    // method getValue returns current value on cell
    // method getDefaultValue return value the cell was initialized with "-";
    if (!board || !botMarker || !opponentMarker) return;

    if (!Array.isArray(board)) return;

    function recreateBoard(currentBoard) {
      const newBoard = GameBoard();

      for (let i = 0; i < 9; i++) {
        const cell = currentBoard[i];
        const cellMarker = cell.getValue();
        if (cellMarker === cell.getDefaultValue()) continue;
        newBoard.addMarker(i, cellMarker);
      }
      return newBoard;
    }

    let currentBoard = recreateBoard(board);

    // bot has a getValid moves
    // which returns a one-dimensional array of all valid moves bot can make;

    function checkIfWinnerFound(board, currMark) {
      // a terminal function to check for winner
      let boardArr = board.getBoard();

      if (
        (boardArr[0].getValue() === currMark &&
          boardArr[1].getValue() === currMark &&
          boardArr[2].getValue() === currMark) ||
        (boardArr[3].getValue() === currMark &&
          boardArr[4].getValue() === currMark &&
          boardArr[5].getValue() === currMark) ||
        (boardArr[6].getValue() === currMark &&
          boardArr[7].getValue() === currMark &&
          boardArr[8].getValue() === currMark) ||
        (boardArr[0].getValue() === currMark &&
          boardArr[3].getValue() === currMark &&
          boardArr[6].getValue() === currMark) ||
        (boardArr[1].getValue() === currMark &&
          boardArr[4].getValue() === currMark &&
          boardArr[7].getValue() === currMark) ||
        (boardArr[2].getValue() === currMark &&
          boardArr[5].getValue() === currMark &&
          boardArr[8].getValue() === currMark) ||
        (boardArr[0].getValue() === currMark &&
          boardArr[4].getValue() === currMark &&
          boardArr[8].getValue() === currMark) ||
        (boardArr[2].getValue() === currMark &&
          boardArr[4].getValue() === currMark &&
          boardArr[6].getValue() === currMark)
      ) {
        return true;
      } else {
        return false;
      }
    }

    function checkTie(board) {
      let boardArr = board.getBoard();

      if (board.drawGame()) {
        return true;
      } else {
        return false;
      }
    }

    function minimax(currBdSt, alpha, beta, currMark) {
      // if at a terminal node return a score;
      if (checkIfWinnerFound(currBdSt, opponentMarker)) {
        return -1;
      } else if (checkIfWinnerFound(currBdSt, botMarker)) {
        return 1;
      } else if (checkTie(currBdSt)) {
        return 0;
      }

      const availableMoves = getValidMoves(currBdSt.getBoard());
      const movesCount = availableMoves.length;
      console.log({ movesCount, availableMoves });
      let move = [],
        result = null;
      if (currMark === botMarker) {
        for (let i = 0; i < movesCount; i++) {
          move = availableMoves[i];
          currBdSt.addMarker(move, currMark); // make a possible move;
          result = minimax(currBdSt, alpha, beta, opponentMarker);
          currBdSt.getBoard()[move].addToken("-"); // undo move made;
          alpha = Math.max(alpha, result);
          if (beta <= alpha) {
            break;
          }
        }
        return alpha;
      } else {
        for (let i = 0; i < movesCount; i++) {
          move = availableMoves[i];
          currBdSt.addMarker(move, currMark); // make a possible move;
          result = minimax(currBdSt, alpha, beta, botMarker);
          currBdSt.getBoard()[move].addToken("-"); // undo move made;
          beta = Math.min(beta, result);
          if (beta <= alpha) {
            break;
          }
        }
        return beta;
      }
    }

    function findBestMove(currBdSt) {
      let bestScore = -Infinity,
        bestMove = null,
        move = null;
      const availableMoves = getValidMoves(currBdSt.getBoard());
      const movesCount = availableMoves.length;
      console.log(movesCount);

      if (movesCount === 9) {
        let rndMove = getChoice(currBdSt.getBoard());
        console.log("not using minimax");
        return rndMove;
      }

      for (let i = 0; i < movesCount; i++) {
        move = availableMoves[i];
        currBdSt.addMarker(move, botMarker);
        let moveScore = minimax(currBdSt, -Infinity, Infinity, opponentMarker);
        currBdSt.getBoard()[move].addToken("-"); // undo move made;

        if (moveScore > bestScore) {
          bestScore = moveScore;
          bestMove = move;
        }
      }

      return bestMove;
    }

    const choice = findBestMove(currentBoard);

    return choice;
  };

  return Object.assign({}, player, { getChoice, getSmartChoice });
}
