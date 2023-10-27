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
    // return false
    if (board[row][column].getValue() !== "-") {
      return false;
    }

    const cell = board[row][column];
    cell.addToken(playerMarker);

    return true;
  };

  //   print board for console mode
  const printBoard = () => {
    let output = "";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        output += `${board[i][j].getValue()}`;
      }
      output += "\n";
    }

    return output;
  };

  return {
    printBoard,
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

function HumanPlayer(name, marker) {
  const player = Player(name, marker);

  return Object.assign({}, player);
}

function Computer(name, marker) {
  const player = Player(name, marker);

  const getRndInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getValidMoves = (board) => {
    const validMoves = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j].getValue() !== "-") continue;
        validMoves.push([i, j]);
      }
    }

    return validMoves;
  };

  const getChoice = (board) => {
    if (!board) return;

    const validMoves = getValidMoves(board.getBoard());
    const index = getRndInt(0, validMoves.length - 1);
    const move = validMoves[index];
    return move;
  };

  return Object.assign({}, player, { getChoice });
}

// function HumanHumanRound(
//     playerOneName = "Player One",
//     playerOneMarker = "X",
//     playerTwoName = "Player Two",
//     playerTwoMarker = "O"
// ) {

// }

function PlayerBotRound(
  playerOneName = "Player One",
  playerOneMarker = "X",
  botName = "Bot"
) {
  const gameBoard = GameBoard();
  const botMarker = `${playerOneMarker === "X" ? "O" : "X"}`;

  const players = [
    HumanPlayer(playerOneName, playerOneMarker),
    Computer(botName, botMarker),
  ];

  // ensures player with marker = "X" plays first;
  let activePlayer = players[0].getMarker() === "X" ? players[0] : players[1];

  // switches active player and allows bot move if bot is the player switched to;
  //   prints turn for new active player
  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    printPlayerTurn();
    if (activePlayer.getName() === botName) {
      console.log("Bot thinking");
      setTimeout(botMove, 5000); // delay to allow bot seem to be thinking;
    }
  };

  // allows easier access to active player
  const getActivePlayer = () => activePlayer;

  // printing player turn msg for console mode;
  const printPlayerTurn = () => {
    const currentPlayer = getActivePlayer();

    console.log(`${currentPlayer.getName()}'s Turn...`);
  };

  const move = (row, column) => {
    const currentPlayer = getActivePlayer();

    // check if move should be allowed;
    // such as when game is tied or winner has been

    console.log(
      `Adding marker - ${currentPlayer.getMarker()} to Row - ${row} Column - ${column}`
    );

    const markerAdded = gameBoard.addMarker(
      row,
      column,
      currentPlayer.getMarker()
    );

    if (!markerAdded) {
      console.warn("Failed to Add Marker");
      return;
    }

    console.log(
      `Added marker - ${currentPlayer.getMarker()} to Row - ${row} Column - ${column}`
    );
    console.log("Printing New Board");
    console.log(gameBoard.printBoard());
    switchActivePlayer();
  };

  //   bot move method not exposed to user;
  const botMove = () => {
    const choice = activePlayer.getChoice(gameBoard);
    const row = choice[0];
    const column = choice[1];

    console.log("Thinking done!");
    move(row, column);
  };

  //   player moving method exposed to user;
  const playerMove = (row, column) => {
    const currentPlayer = getActivePlayer();

    if (currentPlayer.getName() === botName) {
      console.log("Bot move expected... Hold on...");
      return;
    }

    move(row, column);
  };

  console.log(gameBoard.printBoard());
  printPlayerTurn();

  return {
    players,
    getActivePlayer,
    playerMove,
  };
}

function GameController(
  playerOneName = "Player One",
  playerOneMarker = "X",
  playerTwoName = "Player Two",
  playerTwoMarker = "O",
  gameMode = "player-player"
) {
  const board = GameBoard();

  const players = [
    Player(playerOneName, playerOneMarker),
    Player(playerTwoName, playerTwoMarker),
  ];

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
  /*
 Display area for choosing game mode
  - Player vs Bot
  - Player vs Player

 Display Dialog Forms based on player mode choice (include option to go back to mode selection)
  - Player vs Bot Selection (create basic random but legal move AI)
    - Request a name for player
    - Allow choice marker between X and O;
  - Player vs Player Selection
    - request a name for player one - Marker X
    - request a name for player two - Marker O

--- After Selection is Made and Dialog Form submitted---
--- Use details to create board and players

 Hide Game Mode and Dialogs from player.

 Display Details about players and playing mode and some rules
  - Display Player One Details
    - Marker and Name
  - Display Player Two (or Bot) details
    - Marker and Name
    - If (botmode)
      - Display custom bot name (easy = Edith, medium = Friday, hard = Jarvis)
  - Display a Start Game Button

  --- Upon Clicking Start Game ---
  Display tic tac toe board
  Display score board
  Display scores for each player (and bot) next to name and marker on scoreboard
*/

  // use modals to get this details;
  let gameController = GameController("Player One", "X", "Player Two", "O");

  const gameArea = document.querySelector(".game-area");
  const playerBotDialog = document.querySelector("dialog#player-bot");
  const playerPlayerDialog = document.querySelector("dialog#player-player");

  const modeSelectionBar = gameArea.querySelector(".mode-selection-container");

  const announcementsBar = gameArea.querySelector(".announcements");
  const board = gameArea.querySelector(".game-board");
  const startGameBtn = gameArea.querySelector(".start-game");
  const restartGameBtn = gameArea.querySelector(".restart-game");

  startGameBtn.addEventListener("click", startGame);
  restartGameBtn.addEventListener("click", restartGame);

  modeSelectionBar.addEventListener("click", selectMode);

  function selectMode(e) {
    const gameMode = e.target.dataset.mode;

    if (!gameMode) return;

    if (gameMode === "player-player") {
      playerPlayerDialog.showModal();
      return;
    }

    if (gameMode === "player-bot") {
      playerBotDialog.showModal();
      return;
    }
    console.log(gameMode);
  }
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
