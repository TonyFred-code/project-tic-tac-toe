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
    };

    let diagonalWins = [
      [2, 4, 6],
      [0, 4, 8],
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

    function minimax(currBdSt, alpha, beta, currMark, depth = 0) {
      // if at a terminal node return a score;
      if (checkIfWinnerFound(currBdSt, opponentMarker)) {
        return depth - 10;
      } else if (checkIfWinnerFound(currBdSt, botMarker)) {
        return 10 - depth;
      } else if (checkTie(currBdSt)) {
        return 0;
      }

      depth += 1;

      const availableMoves = getValidMoves(currBdSt.getBoard());
      const movesCount = availableMoves.length;
      console.log({ movesCount, availableMoves });
      let move = [],
        result = null;
      if (currMark === botMarker) {
        for (let i = 0; i < movesCount; i++) {
          move = availableMoves[i];
          currBdSt.addMarker(move, currMark); // make a possible move;
          result = minimax(currBdSt, alpha, beta, opponentMarker, depth);
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
          result = minimax(currBdSt, alpha, beta, botMarker, depth);
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

  //   const getIndex = (row, column) => {
  //     let store = {
  //       "0, 0": 0,
  //       "0, 1": 1,
  //       "0, 2": 2,
  //       "1, 0": 3,
  //       "1, 1": 4,
  //       "1, 2": 5,
  //       "2, 0": 6,
  //       "2, 1": 7,
  //       "2, 2": 8,
  //     };

  //     return store[`${row}, ${column}`];
  //   };

  const move = (cellPos) => {
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
      `${playerName} wants to add his marker - ${playerMarker} to Cell Position ${cellPos}`
    );

    // check if making a move should be allowed;
    // such as when game is tied or winner has been;

    console.log(`Adding marker - ${playerMarker} to Cell Position ${cellPos}`);

    // let cellPosition = getIndex(row, column);

    const markerAdded = gameBoard.addMarker(cellPos, playerMarker);

    if (!markerAdded) {
      console.warn("Failed to Add Marker");
      return;
    }

    console.log(`Added marker - ${playerMarker} to Cell Position ${cellPos}`);
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
  const gameWinDiv = boardContainer.querySelector(".game-win-bar");
  const gameDrawDiv = boardContainer.querySelector(".game-draw-bar");
  const playerBotDetailsDiv = boardContainer.querySelector(
    ".player-bot-details"
  );
  const modeSelectionContainer = document.querySelector(
    ".mode-selection-container"
  );
  const playerBotModeBtn = document.querySelector("button.bot-vs-player-mode");
  const dialog = document.querySelector("dialog#player-bot");
  const form = dialog.querySelector("form");
  const errMsgContainer = dialog.querySelector(".player-name-err");
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
    showElement(gameDrawDiv);
    hideElement(playerBotDetailsDiv);
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
      let cellPos = winArr[i];
      let selector = `[data-position='${cellPos}']`;

      let button = gameBoardDiv.querySelector(`${selector}`);
      setTimeout(() => {
        button.classList.add("win-cell");
      }, i * 110 + 500);
    }

    gameWinDiv.textContent = `${roundState.winnerName} wins 🎊️😁️🎊️`;
    showElement(gameWinDiv);
    hideElement(playerBotDetailsDiv);
  };

  const renderBoard = () => {
    let mode = getCurrentMode();
    if (mode !== "player-bot") {
      return;
    }

    gameBoardDiv.textContent = "";
    for (let i = 0; i < 9; i++) {
      const gameBoard = gameRound.getBoard();
      const cellVal = gameBoard[i].getValue();
      const defaultValue = gameBoard[i].getDefaultValue();
      const button = document.createElement("button");
      button.classList.add("cell");
      button.dataset.position = i;
      button.dataset.marker = cellVal;

      button.innerHTML = `${cellVal === defaultValue ? "&nbsp;" : cellVal}`;
      gameBoardDiv.appendChild(button);
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
      showElement(errMsgContainer);
      form["player-name"].focus();
      return;
    }

    hideElement(errMsgContainer);

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
    botName = `${botDifficultyVal === "easy" ? "Friday" : "Jarvis"}`;
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

  const makeMove = (cellPos) => {
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

    gameRound.move(cellPos);
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
    const bot = gameRound.getActivePlayer();
    console.log(bot.getName());
    let choice = null;
    if (botDifficulty === "hard") {
      console.log("using hard choice");
      choice = bot.getSmartChoice(board, botMarker, playerMarker);
    } else {
      choice = bot.getChoice(board);
    }
    console.log(choice);
    // const row = choice[0];
    // const column = choice[1];

    // setTimeout(() => {
    makeMove(choice);
    botDetails.classList.remove("active-player");
    // }, 1000);
  };

  function addMarker(e) {
    const activePlayer = gameRound.getActivePlayer();

    if (activePlayer.getName() === botName) {
      console.warn("Move disallowed");
      return;
    }

    const cellPos = e.target.dataset.position;

    if (!cellPos) {
      return;
    }

    makeMove(cellPos);
    playerDetails.classList.remove("active-player");
  }

  function restartRound() {
    gameRound = GameRound();
    assignMarkers();
    addPlayers(playerName, playerMarker, botName, botMarker);
    updateDetailsBar();
    gameWon = false;
    gameDraw = false;
    hideElement(gameWinDiv);
    hideElement(gameDrawDiv);
    showElement(playerBotDetailsDiv);

    let mode = getCurrentMode();
    if (mode !== "player-bot") {
      return;
    }

    setTimeout(() => {
      checkNextMove();
    }, 800);
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

    form["player-name"].value = "Player 1";

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
  const playerOneErrMsgContainer = dialog.querySelector(".player-one-err-msg");
  const playerTwoErrMsgContainer = dialog.querySelector(".player-two-err-msg");
  const form = dialog.querySelector("form");
  const submitDialogBtn = dialog.querySelector(".submit-dialog");
  const cancelDialogBtn = dialog.querySelector(".cancel-dialog");
  const gameWinDiv = boardContainer.querySelector(".game-win-bar");
  const gameDrawDiv = boardContainer.querySelector(".game-draw-bar");
  const playersDetailsDiv = boardContainer.querySelector(
    ".player-player-details"
  );

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

    return mode;
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
    showElement(gameDrawDiv);
    hideElement(playersDetailsDiv);
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
      let cellPos = winArr[i];
      let selector = `[data-position='${cellPos}']`;

      let button = gameBoardDiv.querySelector(`${selector}`);
      setTimeout(() => {
        button.classList.add("win-cell");
      }, i * 110 + 500);
    }
    // display win msg
    gameWinDiv.textContent = `${roundState.winnerName} wins 🎊️😁️🎊️`;
    showElement(gameWinDiv);
    hideElement(playersDetailsDiv);
  };

  const renderBoard = () => {
    gameBoardDiv.textContent = "";
    for (let i = 0; i < 9; i++) {
        const gameBoard = gameRound.getBoard();
        const cellVal = gameBoard[i].getValue();
        const defaultValue = gameBoard[i].getDefaultValue();
        const button = document.createElement("button");
        button.classList.add("cell");
        button.dataset.position = i;
        button.dataset.marker = cellVal;

        button.innerHTML = `${cellVal === defaultValue ? "&nbsp;" : cellVal}`;
        gameBoardDiv.appendChild(button);
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

      showElement(playerOneErrMsgContainer);
      form["player-one"].focus();
      return;
    }

    if (playerTwoNameVal.trim() === "") {
      console.warn(
        "enter a valid name for player two of at least one character long"
      );

      showElement(playerTwoErrMsgContainer);
      form["player-two"].focus();
      return;
    }

    hideElement(playerOneErrMsgContainer);
    hideElement(playerTwoErrMsgContainer);

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
    playerOneDetailsDiv.classList.remove("active-player");
    playerTwoDetailsDiv.classList.remove("active-player");

    if (activePlayer.getName() === playerOneName) {
      playerOneDetailsDiv.classList.add("active-player");
    } else {
      playerTwoDetailsDiv.classList.add("active-player");
    }
  };

  let gameWon = false;
  let gameDraw = false;

  const makeMove = (cellPos) => {
    if (gameWon) {
      return;
    }

    if (gameDraw) {
      return;
    }

    // const activePlayer = gameRound.getActivePlayer();
    gameRound.move(cellPos);
    renderBoard();

    const roundState = gameRound.getRoundState();

    console.log(roundState);

    if (roundState.gameTied) {
      renderGameDraw();
      console.log("NOBODY WINS");
      return;
    }

    if (roundState.gameWon) {
      renderGameWin();

      console.log(`${roundState.winnerName} has won this round.`);
      return;
    }

    checkNextMove();
  };

  function addMarker(e) {
    // const activePlayer = gameRound.getActivePlayer();
    console.log("added");

    const cellPos = e.target.dataset.position;

    if (!cellPos) {
      return;
    }

    makeMove(cellPos);
    // playerDetails.classList.remove("active-player");
  }

  function restartRound() {
    gameRound.removePlayers();
    gameRound = GameRound();
    assignMarkers();
    addPlayers(playerOneName, playerOneMarker, playerTwoName, playerTwoMarker);
    updateDetailsBar();
    hideElement(gameWinDiv);
    hideElement(gameDrawDiv);
    showElement(playersDetailsDiv);

    gameWon = false;
    gameDraw = false;

    let mode = getCurrentMode();
    if (mode !== "player-player") {
      console.log("going back");
      return;
    }
    setTimeout(() => {
      checkNextMove();
    }, 300);

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

    form["player-one"].value = "Player 1";
    form["player-two"].value = "Player 2";

    console.log("closed");
  });
}

PlayerPlayerScreenController();
