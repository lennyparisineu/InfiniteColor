// ========= VARS =========

const BLOCK_SIZE = 60;
const REFRESH_RATE = 50;
const GRAVITY = -2;
const PLATFORM_SPEED = 15;
const BACKGROUND_SCROLL_SPEED = PLATFORM_SPEED * 0.15;
const MAX_JUMPS = 2;
const OUTLINE_ONLY = false;
const PLAYER_JUMP_SPEED = 15;
const BACKGROUND_IMAGE = "assets/background.png";
const PLATFORM_BORDER_WIDTH = 4;

// ========= ENUMS =========

const COLOR = Object.freeze({
  DEFAULT: {
    start: "#969696",
    end: "#6b6b6b",
    border: {
      0: "#e1e1e1",
      1: "#ffffff",
    },
  },
  RED: {
    start: "#ff6984",
    end: "#ff0a0d",
    border: {
      0: "#ffffff",
      0.5: "#dfdfdf",
      1: "#ffffff",
    },
  },
  GREEN: {
    start: "#69ff86",
    end: "#0aff31",
    border: {
      0: "#ffffff",
      0.5: "#dfdfdf",
      1: "#ffffff",
    },
  },
  BLUE: {
    start: "#68d6ff",
    end: "#0aa7ff",
    border: {
      0: "#ffffff",
      0.5: "#dfdfdf",
      1: "#ffffff",
    },
  },
});

const TYPE = Object.freeze({
  BLOCK: 0,
  KILLER: 1,
  PLAYER: 2,
  MODULE: 3,
});
