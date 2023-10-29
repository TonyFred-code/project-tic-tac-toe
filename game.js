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
    let diagonal = {
      leftToRight: false,
      RightToLeft: false,
    };

    diagonal.RightToLeft = checkDiagonal([2, 1, 0]);
    diagonal.leftToRight = checkDiagonal([0, 1, 2]);

    // for (const key in diagonal) {
    //   if (diagonal[key]) {
    //     return diagonal[key];
    //   }
    // }

    return diagonal;
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
        if (board[i][j].getValue() !== "-") continue;
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

// Player Bot Screen Controller
function PlayerBotScreenController() {
  const boardsContainer = document.querySelector(".boards-container");
  const modeSelectionContainer = document.querySelector(
    ".mode-selection-container"
  );
  const playerBotModeBtn = document.querySelector("button.bot-vs-player-mode");
  const dialog = document.querySelector("dialog#player-bot");
  const form = dialog.querySelector("form");
  const submitDialogBtn = dialog.querySelector(".submit-dialog");
  const cancelDialogBtn = dialog.querySelector(".cancel-dialog");

  //   Round Playing Logic
  let botName = "";
  let botMarker = "";
  let playerName = "";
  let playerMarker = "";
  let botDifficulty = "";

  const setCurrentMode = (newMode) => {
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

  // dialog showing and mode selection logic
  const showDialog = () => {
    dialog.showModal();
  };

  function closeDialog(e) {
    e.preventDefault();

    dialog.closest();
  }

  function validateDialog(e) {
    e.preventDefault();

    console.log("validating player bot form");
    const form = dialog.querySelector("form");
    const playerNameVal = form["player-name"].value;
    const playerMarkerVal = form["player-marker"].value;
    const botDifficultyVal = form["bot-difficulty"].value;

    if (playerNameVal.trim() === "") {
      console.warn("enter a name of at least one valid character length");
      // todo: display UI error for when invalid
      form["player-name"].focus();
      return;
    }

    if (!playerMarkerVal) {
      console.warn("select one marker");
      return;
    }

    if (!botDifficultyVal) {
      console.warn("select a difficulty choice");
      return;
    }

    playerName = playerNameVal;
    playerMarker = playerMarkerVal;
    botMarker = `${playerMarker === "X" ? "O" : "X"}`;
    botName = `${botDifficultyVal === "easy" ? "Jarvis" : "Friday"}`;

    console.log({
      playerName,
      playerMarker,
      botMarker,
      botName,
      botDifficultyVal,
    });

    setCurrentMode("player-bot");
    hideElement(modeSelectionContainer);
    dialog.close();
  }

  function hideElement(elm) {
    if (!elm) return;

    elm.classList.add("hidden");
  }

  playerBotModeBtn.addEventListener("click", showDialog);
  cancelDialogBtn.addEventListener("click", closeDialog);
  submitDialogBtn.addEventListener("click", validateDialog);
  form.addEventListener("submit", validateDialog);
}

PlayerBotScreenController();

function PlayerPlayerScreenController() {
  const boardsContainer = document.querySelector(".boards-container");
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
  let playerOneName = "";
  let playerOneMarker = "";
  let playerTwoName = "";
  let playerTwoMarker = "";

  const setCurrentMode = (newMode) => {
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

  // dialog showing and mode selection logic
  const showDialog = () => {
    dialog.showModal();
  };

  function closeDialog(e) {
    e.preventDefault();

    dialog.closest();
  }

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
    playerOneMarker = "X";
    playerTwoMarker = "O";

    console.log({
      playerOneName,
      playerOneMarker,
      playerTwoName,
      playerTwoMarker,
    });

    setCurrentMode("player-player");
    hideElement(modeSelectionContainer);
    dialog.close();
  }

  function hideElement(elm) {
    if (!elm) return;

    elm.classList.add("hidden");
  }

  playerPlayerModeBtn.addEventListener("click", showDialog);
  cancelDialogBtn.addEventListener("click", closeDialog);
  submitDialogBtn.addEventListener("click", validateDialog);
  form.addEventListener("submit", validateDialog);
}

PlayerPlayerScreenController();

// Mode Switching Module
function ModeSwitching() {}
