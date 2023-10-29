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

// BOARD CREATION LOGIC
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

    let rowStructure = [[row, 0]];

    for (let i = 1; i < 3; i++) {
      let cell = board[row][i];
      let marker = cell.getValue();
      if (marker !== firstCellMarker) {
        return false;
      }
      rowStructure.push([row, i]);
    }

    return rowStructure;
  };

  //   checking row logic - checks three rows at a time
  const rowWin = () => {
    let rows = {
      row0: false,
      row1: false,
      row2: false,
    };

    for (let i = 0; i < 3; i++) {
      rows[`row${i}`] = checkRow(i);
    }

    // for (const key in rows) {
    //   if (rows[key]) {
    //     return rows[key];
    //   }
    // }

    return rows;
  };

  //   helper function for checking a column
  const checkColumn = (column) => {
    let firstCell = board[0][column];
    let firstCellMarker = firstCell.getValue();
    if (firstCellMarker === firstCell.getDefaultValue()) {
      return false;
    }

    let columnStructure = [[0, column]];

    for (let i = 1; i < 3; i++) {
      let cell = board[i][column];
      let marker = cell.getValue();
      if (marker !== firstCellMarker) {
        return false;
      }
      columnStructure.push([i, column]);
    }

    return columnStructure;
  };

  //   column win checking logic - checks three columns at a time;
  const columnWin = () => {
    let columns = {
      column0: false,
      column1: false,
      column2: false,
    };

    for (let i = 0; i < 3; i++) {
      columns[`column${i}`] = checkColumn(i);
    }

    // for (const key in columns) {
    //   if (columns[key]) {
    //     return columns[key];
    //   }
    // }

    return columns;
  };

  //   helper function for checking a diagonal win
  const checkDiagonal = (columnIndexArr) => {
    let firstCell = board[0][columnIndexArr[0]];
    let firstCellMarker = firstCell.getValue();
    if (firstCellMarker === firstCell.getDefaultValue()) {
      return false;
    }

    let diagonalStructure = [[0, columnIndexArr[0]]];

    for (let i = 1; i < 3; i++) {
      let cell = board[i][columnIndexArr[i]];
      let marker = cell.getValue();
      if (marker !== firstCellMarker) {
        return false;
      }
      diagonalStructure.push([i, columnIndexArr[i]]);
    }

    return diagonalStructure;
  };

  //   checking the two diagonals - leftToRight and rightToLeft
  const diagonalWin = () => {
    let diagonals = {
      leftToRight: false,
      RightToLeft: false,
    };

    diagonals.RightToLeft = checkDiagonal([2, 1, 0]);
    diagonals.leftToRight = checkDiagonal([0, 1, 2]);

    // for (const key in diagonal) {
    //   if (diagonal[key]) {
    //     return diagonal[key];
    //   }
    // }

    return diagonals;
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
    checkRow,
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

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cell = board[i][j];
        if (cell.getValue() !== cell.getDefaultValue()) continue;
        validMoves.push([i, j]);
      }
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

  return Object.assign({}, player, { getChoice });
}

function GameRound() {
  const gameBoard = GameBoard();

  const players = [];

  const removePlayers = () => {
    if (players.length === 0) {
      console.log("add players before removing them");
      return;
    }
    players.splice(0, players.length);
  };

  const addHumanPlayer = (name, marker) => {
    if (!name || !marker) {
      return;
    }

    if (playersComplete()) {
      console.warn(`Refused to add ${name}. Players complete.`);
      return;
    }

    players.push(HumanPlayer(name, marker));
    console.info(`Added ${name}. Assigned "${marker}" as marker.`);
    assignActivePlayer();
  };

  const addBotPlayer = (name, marker) => {
    if (!name || !marker) {
      return;
    }

    if (playersComplete()) {
      console.warn(`Refused to add ${name}. Players complete`);
      return;
    }

    players.push(Computer(name, marker));
    console.info(`Added ${name} as Bot. Assigned "${marker}" as marker.`);
    assignActivePlayer();
  };

  const playersComplete = () => {
    if (players.length === 2) {
      return true;
    } else {
      return false;
    }
  };

  // ensures player with marker = "X" plays first;
  let activePlayer = null;

  const assignActivePlayer = () => {
    if (playersComplete()) {
      activePlayer = players[0].getMarker() === "X" ? players[0] : players[1];
    }
  };

  // switches active player
  //   prints turn for new active player
  const switchActivePlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  // allows easier access to active player
  const getActivePlayer = () => activePlayer;

  //   variables to check against while making move (win or tie)
  // let winnerFound = false;
  // let gameDraw = false;

  const roundState = {
    winnerName: "",
    winnerMarker: "",
    gameTied: false,
    gameWon: false,
  };

  const getRoundState = () => roundState;

  const rowWin = () => {
    let rows = gameBoard.rowWin();

    for (const key in rows) {
      if (rows[key]) {
        return rows[key];
      }
    }
    return false;
  };

  const columnWin = () => {
    let columns = gameBoard.columnWin();

    for (const key in columns) {
      if (columns[key]) {
        return columns[key];
      }
    }
    return false;
  };

  const diagonalWin = () => {
    let diagonals = gameBoard.diagonalWin();

    for (const key in diagonals) {
      if (diagonals[key]) {
        return diagonals[key];
      }
    }

    return false;
  };

  const checkWin = () => {
    let diagonalWinArr = diagonalWin();
    let columnWinArr = columnWin();
    let rowWinArr = rowWin();
    let win = false;

    if (diagonalWinArr || columnWinArr || rowWinArr) {
      win = true;
    }

    return win;
  };

  let winCells = null;

  const getWinCellsArr = () => {
    let arr = [];
    let diagonalWinArr = diagonalWin();
    let columnWinArr = columnWin();
    let rowWinArr = rowWin();

    if (diagonalWinArr) {
      arr.push(...diagonalWinArr);
    }

    if (columnWinArr) {
      arr.push(...columnWinArr);
    }

    if (rowWinArr) {
      arr.push(...rowWinArr);
    }

    return arr;
  };

  const setWinCells = () => {
    let arr = getWinCellsArr();

    winCells = arr;
  };

  const getWinCells = () => {
    return winCells;
  };

  //   making move logic
  //   disallows moving if a winner has been found or game is drawn
  //   makes move
  // checks for win or tie after making move
  //   switch active player to next player

  const move = (row, column) => {
    if (roundState.gameWon) {
      console.warn("Winner Found. Move Disallowed");
      return;
    }

    if (roundState.gameTied) {
      console.warn("Game Drawn.");
      return;
    }

    const currentPlayer = getActivePlayer();

    if (currentPlayer === null) {
      console.warn("Add two human players or one bot one human to play round");
      return;
    }

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

    roundState.gameWon = checkWin();

    if (roundState.gameWon) {
      roundState.winnerName = playerName;
      roundState.winnerMarker = playerMarker;
      setWinCells();
      console.info(
        `${roundState.winnerName}  Wins this round. Marker ${playerMarker} takes it.`
      );
      console.log(roundState.gameWon);
      return;
    }

    roundState.gameTied = gameBoard.drawGame();

    if (roundState.gameTied) {
      console.info("NOBODY WINS.");
      return;
    }

    switchActivePlayer();
  };

  return {
    move,
    getActivePlayer,
    removePlayers,
    addBotPlayer,
    addHumanPlayer,
    getBoard: gameBoard.getBoard,
    printBoard: gameBoard.printBoard,
    getRoundState,
    getWinCells,
    // columnWin,
    // rowWin,
    // diagonalWin,
  };
}

// Player Bot Screen Controller
function PlayerBotScreenController() {
  const boardsContainer = document.querySelector(".boards-container");
  const boardContainer = document.querySelector(".player-bot-board-container");
  const gameBoardDiv = boardContainer.querySelector(".game-board");
  const botDetails = boardContainer.querySelector(".bot-details");
  const playerDetails = boardContainer.querySelector(".player-details");
  const playerNameBar = boardContainer.querySelector(".player-name");
  const playerMarkerBar = boardContainer.querySelector(".player-marker");
  const botNameBar = boardContainer.querySelector(".bot-name");
  const botMarkerBar = boardContainer.querySelector(".bot-marker");
  const restartRoundBtn = boardContainer.querySelector(".restart-game");
  const modeSelectionBtn = boardContainer.querySelector(".mode-selection-btn");
  const modeSelectionContainer = document.querySelector(
    ".mode-selection-container"
  );
  const playerBotModeBtn = document.querySelector("button.bot-vs-player-mode");
  const dialog = document.querySelector("dialog#player-bot");
  const form = dialog.querySelector("form");
  const submitDialogBtn = dialog.querySelector(".submit-dialog");
  const cancelDialogBtn = dialog.querySelector(".cancel-dialog");

  //   Round Playing Logic
  let gameRound = GameRound();
  let botName = "";
  let botMarker = "";
  let playerName = "";
  let playerMarker = "";
  let botDifficulty = "";

  const setNewMode = (newMode) => {
    if (newMode !== "none" && newMode !== "player-bot") {
      console.log("mode not accepted");
      return;
    }

    boardsContainer.dataset.mode = newMode;
  };

  const getCurrentMode = () => {
    const mode = boardsContainer.dataset.mode;

    if (!mode) {
      console.log("mode not found");
      return;
    }

    // console.log(mode);
    return mode;
  };

  const addPlayers = (playerName, playerMarker, botName, botMarker) => {
    gameRound.addHumanPlayer(playerName, playerMarker);
    gameRound.addBotPlayer(botName, botMarker);
  };

  const updateDetailsBar = () => {
    playerNameBar.textContent = playerName;
    playerMarkerBar.textContent = playerMarker;
    botNameBar.textContent = botName;
    botMarkerBar.textContent = botMarker;
  };

  const assignMarkers = () => {
    let milliseconds = Date.now();

    if (milliseconds % 2 === 0) {
      playerMarker = "X";
      botMarker = "O";
    } else {
      playerMarker = "O";
      botMarker = "X";
    }
  };

  // dialog showing and mode selection logic
  const showDialog = () => {
    dialog.showModal();
  };

  function closeDialog(e) {
    e.preventDefault();

    dialog.close();
  }

  const renderGameDraw = () => {
    gameBoardDiv.classList.add("game-drawn");
    gameDraw = true;
    gameWon = false;
    // display draw msg

    console.log(`NOBODY WINS`);
  };

  const renderGameWin = () => {
    gameBoardDiv.classList.add("game-won");
    gameWon = true;
    gameDraw = false;

    const roundState = gameRound.getRoundState();

    const winArr = gameRound.getWinCells();
    let length = winArr.length;
    for (let i = 0; i < length; i++) {
      let cell = winArr[i];
      let row = cell[0];
      let col = cell[1];
      let selector = `[data-row='${row}'][data-column='${col}']`;

      let button = gameBoardDiv.querySelector(`${selector}`);
      setTimeout(() => {
        button.classList.add("win-cell");
      }, i * 110 + 500);
    }
  };

  const renderBoard = () => {
    let mode = getCurrentMode();
    if (mode !== "player-bot") {
        return;
    }

    gameBoardDiv.textContent = "";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const gameBoard = gameRound.getBoard();
        const cellVal = gameBoard[i][j].getValue();
        const defaultValue = gameBoard[i][j].getDefaultValue();
        const button = document.createElement("button");
        button.classList.add("cell");
        button.dataset.row = i;
        button.dataset.column = j;
        button.dataset.marker = cellVal;

        button.innerHTML = `${cellVal === defaultValue ? "&nbsp;" : cellVal}`;
        gameBoardDiv.appendChild(button);
      }
    }
  };

  function validateDialog(e) {
    e.preventDefault();

    console.log("validating player bot form");
    const form = dialog.querySelector("form");
    const playerNameVal = form["player-name"].value;
    // const playerMarkerVal = form["player-marker"].value;
    const botDifficultyVal = form["bot-difficulty"].value;

    if (playerNameVal.trim() === "") {
      console.warn("enter a name of at least one valid character length");
      // todo: display UI error for when invalid
      form["player-name"].focus();
      return;
    }

    // if (!playerMarkerVal) {
    //   console.warn("select one marker");
    //   return;
    // }

    if (!botDifficultyVal) {
      console.warn("select a difficulty choice");
      return;
    }

    gameRound = GameRound();
    playerName = playerNameVal;
    botDifficulty = botDifficultyVal;
    assignMarkers(); // assigns random marker
    botName = `${botDifficultyVal === "easy" ? "Jarvis" : "Friday"}`;
    gameRound.removePlayers();
    addPlayers(playerName, playerMarker, botName, botMarker);
    updateDetailsBar();
    checkNextMove();

    console.log({
      playerName,
      playerMarker,
      botMarker,
      botName,
      botDifficultyVal,
    });

    setNewMode("player-bot");
    renderBoard();
    hideElement(modeSelectionContainer);
    dialog.close();
  }

  const checkNextMove = () => {
    const activePlayer = gameRound.getActivePlayer();

    if (activePlayer.getName() === botName) {
      botDetails.classList.add("active-player");
      setTimeout(() => {
        botMove();
      }, 1200);
    } else {
      playerDetails.classList.add("active-player");
    }
  };

  let gameWon = false;
  let gameDraw = false;

  const makeMove = (row, column) => {
    let mode = getCurrentMode();
    if (mode !== "player-bot") {
        return;
    }

    if (gameWon) {
      return;
    }

    if (gameDraw) {
      return;
    }

    gameRound.move(row, column);
    renderBoard();

    const activePlayer = gameRound.getActivePlayer();

    if (activePlayer.getName() === botName) {
      botDetails.classList.add("active-player");
    } else {
      playerDetails.classList.add("active-player");
    }

    const roundState = gameRound.getRoundState();

    if (roundState.gameTied) {
      renderGameDraw();
      console.log("Game Tied");
      return;
    }

    if (roundState.gameWon) {
      // display win msg

      renderGameWin();

      console.log(`${roundState.winnerName} has won this round.`);
      return;
    }

    checkNextMove();
  };

  const botMove = () => {
    const board = gameRound.getBoard();
    const player = gameRound.getActivePlayer();
    console.log(player.getName());
    const choice = player.getChoice(board);
    console.log(choice);
    const row = choice[0];
    const column = choice[1];

    // setTimeout(() => {
    makeMove(row, column);
    botDetails.classList.remove("active-player");
    // }, 1000);
  };

  function addMarker(e) {
    const activePlayer = gameRound.getActivePlayer();

    if (activePlayer.getName() === botName) {
      console.warn("Move disallowed");
      return;
    }

    const row = e.target.dataset.row;
    const column = e.target.dataset.column;

    if (!row || !column) {
      return;
    }

    makeMove(row, column);
    playerDetails.classList.remove("active-player");
  }

  function restartRound() {
    gameRound = GameRound();
    assignMarkers();
    addPlayers(playerName, playerMarker, botName, botMarker);
    updateDetailsBar();
    gameWon = false;
    gameDraw = false;
    renderBoard();

    let mode = getCurrentMode();
    if (mode !== "player-bot") {
        return;
    }

    setTimeout(() => {
        checkNextMove();
      }, 800);
  }

  function hideElement(elm) {
    if (!elm) return;

    elm.classList.add("hidden");
  }

  function showElement(elm) {
    if (!elm) return;

    elm.classList.remove("hidden");
  }

  playerBotModeBtn.addEventListener("click", showDialog);
  cancelDialogBtn.addEventListener("click", closeDialog);
  submitDialogBtn.addEventListener("click", validateDialog);
  form.addEventListener("submit", validateDialog);
  gameBoardDiv.addEventListener("click", addMarker);
  restartRoundBtn.addEventListener("click", restartRound);
  modeSelectionBtn.addEventListener("click", () => {
    setNewMode("none");
    showElement(modeSelectionContainer);
    restartRound();
    gameRound.removePlayers();
  });
  dialog.addEventListener("close", (e) => {
    const form = dialog.querySelector("form");

    form["player-name"].value = "";

    console.log("closed");
  });
}

PlayerBotScreenController();

function PlayerPlayerScreenController() {
  const boardsContainer = document.querySelector(".boards-container");
  const boardContainer = document.querySelector(
    ".player-player-board-container"
  );
  const gameBoardDiv = boardContainer.querySelector(".game-board");
  const playerOneDetailsDiv = boardContainer.querySelector(
    ".player-one-details"
  );
  const playerTwoDetailsDiv = boardContainer.querySelector(
    ".player-two-details"
  );
  const playerOneNameBar = boardContainer.querySelector(".player-one-name");
  const playerOneMarkerBar = boardContainer.querySelector(".player-one-marker");
  const playerTwoNameBar = boardContainer.querySelector(".player-two-name");
  const playerTwoMarkerBar = boardContainer.querySelector(".player-two-marker");
  const restartRoundBtn = boardContainer.querySelector(".restart-game");
  const modeSelectionBtn = boardContainer.querySelector(".mode-selection-btn");
  const playerPlayerModeBtn = document.querySelector(
    "button.player-vs-player-mode"
  );
  const modeSelectionContainer = document.querySelector(
    ".mode-selection-container"
  );
  const dialog = document.querySelector("dialog#player-player");
  const form = dialog.querySelector("form");
  const submitDialogBtn = dialog.querySelector(".submit-dialog");
  const cancelDialogBtn = dialog.querySelector(".cancel-dialog");

  //   round playing logic
  let gameRound = GameRound();
  let playerOneName = "";
  let playerOneMarker = "";
  let playerTwoName = "";
  let playerTwoMarker = "";

  const setNewMode = (newMode) => {
    if (newMode !== "none" && newMode !== "player-player") {
      console.log("mode not accepted");
      return;
    }

    boardsContainer.dataset.mode = newMode;
  };

  const getCurrentMode = () => {
    const mode = boardsContainer.dataset.mode;

    if (!mode) {
      console.log("mode not found");
      return;
    }
  };

  const assignMarkers = () => {
    let milliseconds = Date.now();

    if (milliseconds % 2 === 0) {
      playerOneMarker = "X";
      playerTwoMarker = "O";
    } else {
      playerOneMarker = "O";
      playerTwoMarker = "X";
    }
  };

  // dialog showing and mode selection logic
  const showDialog = () => {
    dialog.showModal();
  };

  function closeDialog(e) {
    e.preventDefault();

    dialog.close();
  }

  const renderGameDraw = () => {
    gameBoardDiv.classList.add("game-drawn");
    gameDraw = true;
    gameWon = false;
    // display draw msg

    console.log(`NOBODY WINS`);
  };

  const renderGameWin = () => {
    gameBoardDiv.classList.add("game-won");
    gameWon = true;
    gameDraw = false;

    const roundState = gameRound.getRoundState();

    const winArr = gameRound.getWinCells();
    let length = winArr.length;
    for (let i = 0; i < length; i++) {
      let cell = winArr[i];
      let row = cell[0];
      let col = cell[1];
      let selector = `[data-row='${row}'][data-column='${col}']`;

      let button = gameBoardDiv.querySelector(`${selector}`);
      setTimeout(() => {
        button.classList.add("win-cell");
      }, i * 110 + 500);
    }
  };

  const renderBoard = () => {
    gameBoardDiv.textContent = "";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const gameBoard = gameRound.getBoard();
        const cellVal = gameBoard[i][j].getValue();
        const defaultValue = gameBoard[i][j].getDefaultValue();
        const button = document.createElement("button");
        button.classList.add("cell");
        button.dataset.row = i;
        button.dataset.column = j;
        button.dataset.marker = cellVal;

        button.innerHTML = `${cellVal === defaultValue ? "&nbsp;" : cellVal}`;
        gameBoardDiv.appendChild(button);
      }
    }
  };

  function validateDialog(e) {
    e.preventDefault();

    console.log("validating player-player");
    const form = dialog.querySelector("form");
    const playerOneNameVal = form["player-one"].value;
    const playerTwoNameVal = form["player-two"].value;

    if (playerOneNameVal.trim() === "") {
      console.warn(
        "enter a valid name for player one of at least one character long"
      );

      form["player-one"].focus();
      return;
    }

    if (playerTwoNameVal.trim() === "") {
      console.warn(
        "enter a valid name for player two of at least one character long"
      );

      form["player-two"].focus();
      return;
    }

    playerOneName = playerOneNameVal;
    playerTwoName = playerTwoNameVal;
    // playerOneMarker = "X";
    // playerTwoMarker = "O";
    assignMarkers();
    addPlayers(playerOneName, playerOneMarker, playerTwoName, playerTwoMarker);
    updateDetailsBar();

    console.log({
      playerOneName,
      playerOneMarker,
      playerTwoName,
      playerTwoMarker,
    });

    checkNextMove();

    setNewMode("player-player");
    renderBoard();
    hideElement(modeSelectionContainer);
    dialog.close();
  }

  function addPlayers(
    playerOneName,
    playerOneMarker,
    playerTwoName,
    playerTwoMarker
  ) {
    gameRound.addHumanPlayer(playerOneName, playerOneMarker);
    gameRound.addHumanPlayer(playerTwoName, playerTwoMarker);
  }

  const updateDetailsBar = () => {
    playerOneNameBar.textContent = playerOneName;
    playerTwoNameBar.textContent = playerTwoName;
    playerOneMarkerBar.textContent = playerOneMarker;
    playerTwoMarkerBar.textContent = playerTwoMarker;
  };

  const checkNextMove = () => {
    const activePlayer = gameRound.getActivePlayer();

    if (activePlayer.getName() === playerOneName) {
      playerOneDetailsDiv.classList.add("active-player");
    } else {
      playerTwoDetailsDiv.classList.add("active-player");
    }
  };

  let gameWon = false;
  let gameDraw = false;

  const makeMove = (row, column) => {
    if (gameWon) {
      return;
    }

    if (gameDraw) {
      return;
    }

    // const activePlayer = gameRound.getActivePlayer();
    playerOneDetailsDiv.classList.remove("active-player");
    playerTwoDetailsDiv.classList.remove("active-player");
    gameRound.move(row, column);
    renderBoard();

    const roundState = gameRound.getRoundState();

    console.log(roundState);

    if (roundState.gameTied) {
      renderGameDraw();
      console.log("NOBODY WINS");
      return;
    }

    if (roundState.gameWon) {
      // display win msg

      renderGameWin();

      console.log(`${roundState.winnerName} has won this round.`);
      return;
    }

    checkNextMove();
  };

  function addMarker(e) {
    // const activePlayer = gameRound.getActivePlayer();
    console.log("added");

    const row = e.target.dataset.row;
    const column = e.target.dataset.column;

    if (!row || !column) {
      return;
    }

    makeMove(row, column);
    // playerDetails.classList.remove("active-player");
  }

  function restartRound() {
    gameRound.removePlayers();
    gameRound = GameRound();
    assignMarkers();
    addPlayers(playerOneName, playerOneMarker, playerTwoName, playerTwoMarker);
    updateDetailsBar();
    setTimeout(() => {
      checkNextMove();
    }, 300);
    gameWon = false;
    gameDraw = false;
    renderBoard();
  }

  function hideElement(elm) {
    if (!elm) return;

    elm.classList.add("hidden");
  }

  function showElement(elm) {
    if (!elm) return;

    elm.classList.remove("hidden");
  }

  playerPlayerModeBtn.addEventListener("click", showDialog);
  cancelDialogBtn.addEventListener("click", closeDialog);
  submitDialogBtn.addEventListener("click", validateDialog);
  form.addEventListener("submit", validateDialog);
  gameBoardDiv.addEventListener("click", addMarker);
  restartRoundBtn.addEventListener("click", restartRound);
  modeSelectionBtn.addEventListener("click", () => {
    setNewMode("none");
    showElement(modeSelectionContainer);
    restartRound();
    gameRound.removePlayers();
  });

  dialog.addEventListener("close", (e) => {
    const form = dialog.querySelector("form");

    form["player-one"].value = "";
    form["player-two"].value = "";

    console.log("closed");
  });
}

PlayerPlayerScreenController();
