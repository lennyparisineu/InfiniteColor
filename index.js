const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const player = new Player(
  BLOCK_SIZE * 2,
  canvas.clientHeight / 2 - BLOCK_SIZE / 2
);

const moduleManager = new ModuleManager(canvas.clientWidth);

let gameIsOver = false;

window.setInterval(renderScreen, REFRESH_RATE);

function renderScreen() {
  if (!gameIsOver) {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.clear;
    moduleManager.update(ctx, player);

    if (player.isOutOfBounds(canvas.clientHeight)) {
      gameIsOver = true;
    }
  }
}

function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == "37" || e.keyCode == "65") {
  } else if (e.keyCode == "39" || e.keycode == "68") {
  }
}
