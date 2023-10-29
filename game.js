

// Player Bot Screen Controller
function PlayerBotScreenController() {
    const playerBotModeBtn = document.querySelector("button.bot-vs-player-mode");
    const dialog = document.querySelector("dialog#player-bot");

    const showDialog = () => {
        dialog.showModal();
    }

    playerBotModeBtn.addEventListener("click", showDialog);

    console.log(playerBotModeBtn);
}
PlayerBotScreenController();

function PlayerPlayerScreenController() {
    const playerPlayerModeBtn = document.querySelector("button.player-vs-player-mode");
    const dialog = document.querySelector("dialog#player-player");

    const showDialog = () => {
        dialog.showModal();
    }

    playerPlayerModeBtn.addEventListener("click", showDialog);

    console.log(playerPlayerModeBtn);
}
PlayerPlayerScreenController();

// Mode Switching Module
function ModeSwitching() {

}