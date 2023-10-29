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

  console.log(playerPlayerModeBtn);
}
PlayerPlayerScreenController();

// Mode Switching Module
function ModeSwitching() {}
