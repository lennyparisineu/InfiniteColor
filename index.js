const canvas = document.getElementById("canvas");
const SCREEN_WIDTH = canvas.clientWidth;
const SCREEN_HEIGHT = canvas.clientHeight;
const ctx = canvas.getContext("2d");
const player = new Player(
  BLOCK_SIZE * 2,
  canvas.clientHeight / 2 - BLOCK_SIZE / 2
);
const moduleManager = new ModuleManager();

let gameIsOver = false;

window.setInterval(update, REFRESH_RATE);
document.onkeydown = checkKey;

function update() {
  if (!gameIsOver) {
    // clear the screen
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.clear;

    // update the game
    moduleManager.update(ctx, player);

    // if the player is dead, stop the game
    if (player.isDead) {
      gameIsOver = true;
      console.log("game over");
    }
  }
}

// here is where we would process key input
// TODO -- implement color changes based on key presses.
function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == "37" || e.keyCode == "65") {
  } else if (e.keyCode == "39" || e.keycode == "68") {
  } else if (e.keyCode == "32") {
    player.jump();
  }
}
