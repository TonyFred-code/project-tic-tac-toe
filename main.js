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
      return false;
    }

    // if there's a marker there already
    // return and log an error
    if (board[row][column].getValue() !== "-") {
      return false;
    }

    const cell = board[row][column];
    cell.addToken(playerMarker);

    return true;
  };

  return {
    getBoard,
    addMarker,
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

function GameController(
  playerOneName = "Player One",
  playerOneMarker = "X",
  playerTwoName = "Player Two",
  playerTwoMarker = "O"
) {
  const board = GameBoard();

  const players = [
    Player(playerOneName, playerOneMarker),
    Player(playerTwoName, playerTwoMarker),
  ];

  //   const getPlayers = () => players;

  let activePlayer = players[0];

  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

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
    const playerMarker = getActivePlayer().getMarker();

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

    let tie = false;
    if (getMoveCount() >= 9) {
      tie = checkTie(currentBoard, "-");
    }

    return {
      colWin,
      rowWin,
      diagonalLeftToRightWin,
      diagonalRightToLeftWin,
      tie,
    };
  };

  let moveCount = 0;

  const getMoveCount = () => moveCount;

  const makeMove = (row, column) => {
    const markerAdded = board.addMarker(
      row,
      column,
      getActivePlayer().getMarker()
    );

    if (!markerAdded) {
      return;
    }

    // count move
    moveCount++;

    // check for win and tie
    let boardStatus = null;

    // check to reduce a little how many checks are performed
    if (moveCount >= 5) {
      boardStatus = checkBoardStatus();

      if (
        boardStatus.colWin ||
        boardStatus.diagonalLeftToRightWin ||
        boardStatus.diagonalRightToLeftWin ||
        boardStatus.rowWin ||
        boardStatus.tie
      ) {
        return;
      }
    }
    switchActivePlayer();
  };

  return {
    makeMove,
    getBoard: board.getBoard,
    getMoveCount,
    getActivePlayer,
    getBoardStatus: checkBoardStatus,
  };
}

function ScreenController() {
  // use modals to get this details;
  let gameController = GameController("Player One", "X", "Player Two", "O");

  const gameArea = document.querySelector(".game-area");
  const announcementsBar = gameArea.querySelector(".announcements");
  const board = gameArea.querySelector(".game-board");
  const startGameBtn = gameArea.querySelector(".start-game");
  const restartGameBtn = gameArea.querySelector(".restart-game");

  startGameBtn.addEventListener("click", startGame);
  restartGameBtn.addEventListener("click", restartGame);

  let gameStarted = false;
  let gameEnded = false;

  const renderBoard = () => {
    board.textContent = "";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const gameBoard = gameController.getBoard();
        const cellVal = gameBoard[i][j].getValue();
        const button = document.createElement("button");
        button.classList.add("cell");
        button.setAttribute("data-row", `${i}`);
        button.setAttribute("data-column", `${j}`);
        button.setAttribute("data-marker", `${cellVal}`);

        button.innerHTML = `${cellVal === "-" ? "&nbsp;" : cellVal}`;
        board.appendChild(button);
      }
    }
  };

  const renderPlayerTurn = () => {
    const currentPlayer = gameController.getActivePlayer().getName();

    announcementsBar.textContent = `${currentPlayer}'s Turn....`;
  };

  const renderRoundWinner = () => {
    const currentPlayer = gameController.getActivePlayer();
    const playerName = currentPlayer.getName();
    const currentMarker = currentPlayer.getMarker();

    announcementsBar.textContent = `Winner: ${playerName}. Marker: ${currentMarker}`;
  };

  const renderTie = () => {
    announcementsBar.textContent = `Tough Match... It's a TIE`;
  };

  function startGame() {
    const boardState = board.dataset.state;

    if (boardState === "enabled") {
      return;
    }

    board.dataset.state = "enabled";
    gameStarted = true;
    gameEnded = false;
    renderPlayerTurn();
    showElement(restartGameBtn);
    hideElement(startGameBtn);
  }

  function restartGame() {
    gameController = GameController();
    gameStarted = false;
    gameEnded = true;
    board.dataset.state = "disabled";
    renderBoard();
    announcementsBar.textContent = "Click the Start Button to Start Game";
    showElement(startGameBtn);
    hideElement(restartGameBtn);
  }

  function showElement(elm) {
    elm.classList.remove("hidden");
  }

  function hideElement(elm) {
    elm.classList.add("hidden");
  }

  //   function throbInstruction() {

  //   }

  function addMarker(e) {
    // if board is disabled, don't add marker;

    if (!gameStarted) {
      // throbInstruction();
      console.log("Start Game with button");
      return;
    }

    if (gameEnded) {
      console.log("game has ended");
      return;
    }


    const row = e.target.dataset.row;
    const currentMarker = e.target.dataset.marker;
    const column = e.target.dataset.column;

    if (!row || !column) {
        return;
    }

    gameController.makeMove(row, column);
    renderBoard();
    const boardState = gameController.getBoardStatus();

    if (
      boardState.colWin ||
      boardState.rowWin ||
      boardState.diagonalLeftToRightWin ||
      boardState.diagonalRightToLeftWin
    ) {
      console.log("winner found");
      gameEnded = true;
      renderRoundWinner();
      return;
    }

    if (boardState.tie) {
      console.log("game tied");
      gameEnded = true;
      renderTie();
      return;
    }

    renderPlayerTurn();
  }

  renderBoard();
  board.addEventListener("click", addMarker);
  announcementsBar.textContent = "Click Start Button to Start Game";
  showElement(startGameBtn);
  hideElement(restartGameBtn);
}

ScreenController();
