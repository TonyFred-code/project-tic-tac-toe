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

     //   helper function for checking a row
     const checkRow = (row) => {
      let firstCell = board[row][0];
      let firstCellMarker = firstCell.getValue();
      if (firstCellMarker === firstCell.getDefaultValue()) {
        return false;
      }

      for (let i = 1; i < 3; i++) {
        let cell = board[row][i];
        let marker = cell.getValue();
        if (marker !== firstCellMarker) {
          return false;
        }
      }

      return true;
    };

    //   checking row logic - checks three rows at a time
    const rowWin = () => {
      let rows = {
        row1: false,
        row2: false,
        row3: false,
      };

      for (let i = 0; i < 3; i++) {
        rows[`row${i}`] = checkRow(i);
      }

      for (const key in rows) {
        if (rows[key]) {
          return true;
        }
      }

      return false;
    };

      //   helper function for checking a column
  const checkColumn = (column) => {
    let firstCell = board[0][column];
    let firstCellMarker = firstCell.getValue();
    if (firstCellMarker === firstCell.getDefaultValue()) {
      return false;
    }

    for (let i = 1; i < 3; i++) {
      let cell = board[i][column];
      let marker = cell.getValue();
      if (marker !== firstCellMarker) {
        return false;
      }
    }

    return true;
  };

  //   column win checking logic - checks three columns at a time;
  const columnWin = () => {
    let columns = {
      column1: false,
      column2: false,
      column3: false,
    };

    for (let i = 0; i < 3; i++) {
      columns[`column${i}`] = checkColumn(i);
    }

    for (const key in columns) {
      if (columns[key]) {
        return true;
      }
    }

    return false;
  };

  //   helper function for checking a diagonal win
  const checkDiagonal = (columnIndexArr) => {
    let firstCell = board[0][columnIndexArr[0]];
    let firstCellMarker = firstCell.getValue();
    if (firstCellMarker === firstCell.getDefaultValue()) {
      return false;
    }

    for (let i = 1; i < 3; i++) {
      let cell = board[i][columnIndexArr[i]];
      let marker = cell.getValue();
      if (marker !== firstCellMarker) {
        return false;
      }
    }

    return true;
  };

  //   checking the two diagonals - leftToRight and rightToLeft
  const diagonalWin = () => {
    let diagonal = {
      leftToRight: false,
      RightToLeft: false,
    };

    diagonal.RightToLeft = checkDiagonal([2, 1, 0]);
    diagonal.leftToRight = checkDiagonal([0, 1, 2]);

    for (const key in diagonal) {
      if (diagonal[key]) {
        return true;
      }
    }

    return false;
  };

  //   logic for checking if game is a draw;
  const drawGame = () => {

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let cell = board[i][j];
        let marker = cell.getValue();
        if (marker === cell.getDefaultValue()) {
          return false;
        }
      }
    }

    return true;
  };

  return {
    printBoard,
    getBoard,
    addMarker,
    rowWin,
    columnWin,
    diagonalWin,
    drawGame,
  };
}

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

function GameRound(
  playerOneName = "Player One",
  playerTwoName = "Player Two",
  roundMode = "player-player", // player-player or player-bot
  botDifficulty = "easy",
) {


  let round = null;

  if (roundMode === "player-bot") {
  let botName = botDifficulty === "easy" ? "Friday" : "Jarvis";
    round = PlayerBotRound(playerOneName, "X", botName) // set player one to use X as default marker
  } else if (roundMode === "player-player") {
    round = PlayerPlayerRound(playerOneName, playerTwoName);
  }

  return round;
}

function PlayerPlayerRound(
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) {
  const gameBoard = GameBoard();

  //   use factory functions to create HumanPlayers
  const players = [
    HumanPlayer(playerOneName, "X"),
    HumanPlayer(playerTwoName, "O"),
  ];

  let activePlayer = players[0]; // player with marker "X" goes first

  // printing player turn msg for console mode;
  // and enables bot moving if bot is active player;

  const printPlayerTurn = () => {
    const currentPlayer = getActivePlayer();

    console.log(`${currentPlayer.getName()}'s Turn...`);
  };

  // switches active player
  //   prints turn for new active player
  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    printPlayerTurn();
  };

  // allows easier access to active player
  const getActivePlayer = () => activePlayer;

  //   variables to check against while making move (win or tie)
  let winnerFound = false;
  let gameDraw = false;

  //   making move logic
  //   disallows moving if a winner has been found or game is drawn
  //   makes move
  // checks for win or tie after making move
  //   switch active player to next player

  const move = (row, column) => {
    if (winnerFound) {
      console.warn("Winner Found. Move Disallowed");
      return;
    }

    if (gameDraw) {
      console.warn("Game Drawn.");
      return;
    }

    const currentPlayer = getActivePlayer();
    const playerName = currentPlayer.getName();
    const playerMarker = currentPlayer.getMarker();

    console.log(
      `${playerName} wants to add his marker - ${playerMarker} to Row - ${row} Column ${column}`
    );

    console.log(
      `Adding marker - ${playerMarker} to Row - ${row} Column - ${column}`
    );

    const markerAdded = gameBoard.addMarker(row, column, playerMarker);

    if (!markerAdded) {
      console.warn("Failed to Add Marker");
      return;
    }

    console.log(
      `Added marker - ${playerMarker} to Row - ${row} Column - ${column}`
    );
    console.log("Printing New Board");
    console.log(gameBoard.printBoard());

    winnerFound = gameBoard.rowWin() || gameBoard.columnWin() || gameBoard.diagonalWin();
    gameDraw = gameBoard.drawGame();

    if (winnerFound) {
      console.info("Winner Found");
      return;
    }

    if (gameDraw) {
      console.info("NOBODY WINS.");
      return;
    }

    switchActivePlayer();
  };

  //   player moving method exposed to user;
  const playerMove = (row, column) => {

    move(row, column);
  };

  console.log(gameBoard.printBoard()); // print board to allow user see board state in console mode;
  printPlayerTurn(); // initial board rendering for console playing mode

  return {
    players,
    getActivePlayer,
    playerMove,
  }
}

function PlayerBotRound(
  playerOneName = "Player One",
  playerOneMarker = "X",
  botName = "Bot"
) {
  const gameBoard = GameBoard();

  //   set bot marker to "O" if player choose "X"
  //   set bot marker to "X" if player choose "O"
  const botMarker = `${playerOneMarker === "X" ? "O" : "X"}`;

  //   use factory functions to create HumanPlayer
  //   use factory functions to create Bot to play against
  const players = [
    HumanPlayer(playerOneName, playerOneMarker),
    Computer(botName, botMarker),
  ];

  // ensures player with marker = "X" plays first;
  let activePlayer = players[0].getMarker() === "X" ? players[0] : players[1];

  // switches active player
  //   prints turn for new active player
  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    printPlayerTurn();
  };

  // allows easier access to active player
  const getActivePlayer = () => activePlayer;

  // printing player turn msg for console mode;
  // and enables bot moving if bot is active player;
  const printPlayerTurn = () => {
    const currentPlayer = getActivePlayer();

    console.log(`${currentPlayer.getName()}'s Turn...`);
    if (activePlayer.getName() === botName) {
      console.log(`${botName} is Thinking`);
      setTimeout(botMove, 800); // delay to allow bot seem to be thinking;
    }
  };

  //   variables to check against while making move (win or tie)
  let winnerFound = false;
  let gameDraw = false;

  //   making move logic
  //   disallows moving if a winner has been found or game is drawn
  //   makes move
  // checks for win or tie after making move
  //   switch active player to next player

  const move = (row, column) => {
    if (winnerFound) {
      console.warn("Winner Found. Move Disallowed");
      return;
    }

    if (gameDraw) {
      console.warn("Game Drawn.");
      return;
    }

    const currentPlayer = getActivePlayer();
    const playerName = currentPlayer.getName();
    const playerMarker = currentPlayer.getMarker();

    console.log(
      `${playerName} wants to add his marker - ${playerMarker} to Row - ${row} Column ${column}`
    );

    // check if making a move should be allowed;
    // such as when game is tied or winner has been;

    console.log(
      `Adding marker - ${playerMarker} to Row - ${row} Column - ${column}`
    );

    const markerAdded = gameBoard.addMarker(row, column, playerMarker);

    if (!markerAdded) {
      console.warn("Failed to Add Marker");
      return;
    }

    console.log(
      `Added marker - ${playerMarker} to Row - ${row} Column - ${column}`
    );
    console.log("Printing New Board");
    console.log(gameBoard.printBoard());

    winnerFound = gameBoard.rowWin() || gameBoard.columnWin() || gameBoard.diagonalWin();
    gameDraw = gameBoard.drawGame();

    if (winnerFound) {
      console.info("Winner Found");
      return;
    }

    if (gameDraw) {
      console.info("NOBODY WINS.");
      return;
    }

    switchActivePlayer();
  };

  //   bot move method not exposed to user;
  const botMove = () => {
    const choice = activePlayer.getChoice(gameBoard);
    const row = choice[0];
    const column = choice[1];

    console.log(`${botName} has finished thinking. Making a move now...`);
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

  console.log(gameBoard.printBoard()); // print board to allow user see board state in console mode;
  printPlayerTurn(); // initial board rendering for console playing mode

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
