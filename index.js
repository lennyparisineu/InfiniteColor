/**
 * BUGS:
 *
 * - Player sometimes gets stuck in block and does not fall or move to the left
 * - Player sometimes doesn't completely lie on top of block (hovers over it)
 * - Collision with spike is janky
 */

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

// dictionary that maps keys to colors that player can change into
const keyColorDict = {
  82: COLOR.RED, // r
  71: COLOR.GREEN, // g
  66: COLOR.BLUE, // b
};

// here is where we would process key input
// TODO -- implement color changes based on key presses.
function checkKey(e) {
  e = e || window.event;

  let keys = Object.keys(keyColorDict);
  for (let i = 0; i < keys.length; ++i) {
    if (e.keyCode === Number(keys[i])) {
      player.color = keyColorDict[keys[i]];
    }
  }

  if (e.keyCode == "32") {
    player.jump();
  }
}
