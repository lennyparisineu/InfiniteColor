/**
 * BUGS:
 *
 * - Player sometimes gets stuck in block and does not fall or move to the left
 * - Collision with spike is janky
 * - Player will go through floor if going through a colored wall
 * - Player randomly dies on module 16
 * - Player can jump through colored walls without being same color
 */

const canvas = document.getElementById("canvas");
const SCREEN_WIDTH = canvas.clientWidth;
const SCREEN_HEIGHT = canvas.clientHeight;
const ctx = canvas.getContext("2d");
const player = new Player(
  BLOCK_SIZE * 2,
  canvas.clientHeight / 2 - BLOCK_SIZE / 2,
  canvas.clientHeight
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
    drawBackground();

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

let bg1x = 0;
let bg2x = SCREEN_WIDTH;

/**
 * Draws the scrolling background
 */
function drawBackground() {
  const image = document.getElementById("bg");
  ctx.drawImage(image, bg1x, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  ctx.drawImage(image, bg2x, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  if (bg1x <= -SCREEN_WIDTH) {
    bg1x = SCREEN_WIDTH - BACKGROUND_SCROLL_SPEED;
  } else if (bg2x <= -SCREEN_WIDTH) {
    bg2x = SCREEN_WIDTH - 2 * BACKGROUND_SCROLL_SPEED;
  }
  bg1x -= BACKGROUND_SCROLL_SPEED;
  bg2x -= BACKGROUND_SCROLL_SPEED;
}
